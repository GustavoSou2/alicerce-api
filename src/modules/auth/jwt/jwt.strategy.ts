import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { users } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET || "GuJa@17082024103280783*___._a1901",
    });
  }

  async validate(payload: JwtPayload): Promise<users> {
    const user = await this.prisma.users.findUnique({
      where: { id: +payload.sub },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
