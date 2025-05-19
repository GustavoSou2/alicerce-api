import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { AuthService } from "src/modules/auth/service/auth.service";
import { MailService } from "src/modules/mail/service/mail.service";
import { Public } from "src/modules/auth/decorators/public.decorator";
import { action_plan_status_behavior_type } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  @Public()
  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }

  @Post("register")
  async register(
    @Body()
    data: {
      username: string;
      email: string;
      password: string;
      companyName: string;
      document: string;
    },
  ) {
    const existingUser = await this.prisma.users.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException("Usuário já cadastrado");
    }

    await this.validateDocument(data.document);

    const token = await this.authService.generateRegistrationToken(data);

    await this.mailService.sendUserConfirmation(data.email, token);

    return { message: "E-mail de verificação enviado", token };
  }

  @Public()
  @Get("confirm")
  async completeRegistration(@Query("token") token: string) {
    try {
      const decoded = this.jwtService.verify(token);

      if (!decoded) throw new BadRequestException("Token inválido ou expirado");

      const { cpf, cnpj } = await this.validateDocument(decoded.document);

      const company = await this.prisma.companies.create({
        data: {
          name: decoded.companyName,
          cpf,
          cnpj,
          email: decoded.email,
        },
      });

      const hashedPassword = await bcrypt.hash(decoded.password, 10);
      const adminRole = await this.prisma.roles.create({
        data: {
          company_id: Number(company.id),
          name: "admin",
          role_code: "admin",
        },
      });

      const user = await this.prisma.users.create({
        data: {
          username: decoded.username,
          email: decoded.email,
          password: hashedPassword,
          company_id: Number(company.id),
          role_id: Number(adminRole.id),
        },
      });
      console.log("Cheguei até aqui", user);

      return { message: "Cadastro finalizado com sucesso" };
    } catch (error: Error | unknown) {
      throw new BadRequestException(
        `Erro ao processar cadastro. Erro: ${error}`,
      );
    }
  }

  private async createDefaultStatuses(companyId: number) {
    const statuses = [
      {
        name: "Análise Inicial",
        name_code: "initial_analysis",
        description:
          "Revisão inicial dos dados do item ou subitem antes de qualquer ação.",
        rank: 1,
        color: "#C0C0C0",
      },
      {
        name: "Validação de Documentação",
        name_code: "documentation_validation",
        description: "Conferência de documentos obrigatórios e regulatórios.",
        rank: 2,
        color: "#F4A261",
      },
      {
        name: "Validação de NBA",
        name_code: "nba_validation",
        description:
          "Verificação se o item atende à Norma de Boa Administração (NBA).",
        rank: 3,
        color: "#E76F51",
      },
      {
        name: "Validação de Padrão de Execução",
        name_code: "execution_standard_validation",
        description:
          "Checagem se o serviço segue os padrões técnicos e qualitativos.",
        rank: 4,
        color: "#2A9D8F",
      },
      {
        name: "Confirmação de Orçamento",
        name_code: "budget_confirmation",
        description:
          "Validação se o custo estimado está dentro dos limites e orçamento aprovado.",
        rank: 5,
        color: "#E9C46A",
      },
      {
        name: "Aguardando Aprovação Final",
        name_code: "final_approval_pending",
        description:
          "Etapa final aguardando aprovação superior ou da gerência.",
        rank: 6,
        color: "#264653",
      },
      {
        name: "Aprovado",
        name_code: "approved",
        description: "Plano aprovado e liberado para execução.",
        rank: 7,
        color: "#2ECC71",
      },
      {
        name: "Em Execução",
        name_code: "in_progress",
        description: "Ação está em andamento.",
        rank: 8,
        color: "#3498DB",
      },
      {
        name: "Concluído",
        name_code: "completed",
        description: "Ação finalizada com sucesso.",
        rank: 9,
        color: "#1ABC9C",
      },
      {
        name: "Arquivado",
        name_code: "archived",
        description: "Ação arquivada. Não será mais executada ou alterada.",
        rank: 10,
        color: "#95A5A6",
      },
      {
        name: "Arquivado",
        name_code: "archived",
        description: "Ação arquivada. Não será mais executada ou alterada.",
        rank: 10,
        color: "#95A5A6",
      },
    ];

    const createdStatuses = await Promise.all(
      statuses.map((status) =>
        this.prisma.action_plan_status.create({
          data: {
            company_id: companyId,
            name: status.name,
            name_code: status.name_code,
            description: status.description,
            rank: status.rank,
            color: status.color,
          },
        }),
      ),
    );

    for (const status of createdStatuses) {
      await this.createDefaultBehaviors(status.id);
    }
  }

  private async createDefaultBehaviors(statusId: number) {
    const behaviors = [
      {
        type: "approval",
        name: "Aprovação por Responsável",
        description: "Ação necessita aprovação do responsável técnico.",
        config: { rolesAllowed: ["admin"] },
      },
    ];

    await Promise.all(
      behaviors.map((behavior) =>
        this.prisma.action_plan_status_behavior.create({
          data: {
            status_id: statusId,
            type: behavior.type as unknown as action_plan_status_behavior_type,
            name: behavior.name,
            description: behavior.description,
            config: behavior.config,
          },
        }),
      ),
    );
  }

  async validateDocument(document: string) {
    const cleanDocument = document.replace(/\D/g, "");

    let cpf: string | null = null;
    let cnpj: string | null = null;

    if (cleanDocument.length === 11) {
      cpf = cleanDocument;
    } else if (cleanDocument.length === 14) {
      cnpj = cleanDocument;
    } else {
      throw new BadRequestException(
        "Documento inválido. CPF deve ter 11 dígitos e CNPJ deve ter 14.",
      );
    }

    const existingCompany = await this.prisma.companies.findFirst({
      where: {
        AND: [{ cnpj: cnpj }, { cpf: cpf }],
      },
    });

    if (existingCompany) {
      throw new BadRequestException(
        "Já existe uma empresa cadastrada com este CNPJ.",
      );
    }

    return { cpf, cnpj };
  }
}
