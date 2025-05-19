// src/documents/documents.service.ts
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  // Função para gerar o arquivo a partir dos dados no banco
  async generateDocumentFile(id: number) {
    const document = await this.prisma.documents.findUnique({
      where: { id },
    });

    if (!document) {
      throw new Error("Documento não encontrado");
    }

    // Decodificando o conteúdo base64, se necessário
    const fileBuffer = Buffer.from(document.base64, "base64");

    // Definindo o diretório onde o arquivo será salvo
    const uploadDir = path.join(__dirname, "..", "..", "uploads"); // Diretório para armazenar os arquivos temporários

    // Verificando se o diretório existe, e criando caso não exista
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Caminho completo do arquivo
    const filePath = path.join(
      uploadDir,
      `${document.fileName}.${document.extension}`,
    );

    // Salvando o arquivo fisicamente
    fs.writeFileSync(filePath, fileBuffer);

    // Retorna o caminho completo para o arquivo gerado
    return filePath;
  }

  // Função para salvar o documento (com dados do base64)
  async saveDocument({
    fileName,
    extension,
    size,
    base64,
  }: {
    fileName: string;
    extension: string;
    size: number;
    base64: string;
  }) {
    // Decodificando o conteúdo base64
    const fileBuffer = Buffer.from(base64, "base64");

    // Definindo o diretório onde o arquivo será salvo
    const uploadDir = path.join(__dirname, "..", "..", "uploads"); // Aqui, a pasta 'uploads' é onde o arquivo será salvo
    const filePath = path.join(uploadDir, `${fileName}.${extension}`);

    // Criando o diretório, caso não exista
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Salvando o arquivo no diretório
    fs.writeFileSync(filePath, fileBuffer);

    // Salvando os dados no banco de dados
    return this.prisma.documents.create({
      data: {
        fileName,
        extension,
        size,
        base64, // Armazenando o base64 no banco
      },
    });
  }
}
