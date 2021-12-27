import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
// tudo q é externo tenho que criar uma instancia no construtor
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}
  //   importei o prismaservive dentro dos modulo e agora posso comecar a rodar
  async login(dadosLogin: CredentialsDto) {
    const dadosExistem = await this.db.user.findUnique({
      // dado obrigatorio é o where
      where: { email: dadosLogin.email },
    });
    if (!dadosExistem) {
      throw new NotFoundException('Email não encontrado!');
    }
    // se existir o email vou seguindo para pedir a senha,onde sera pedido o hash da senha q vem do dto

    const senhaValida = await bcrypt.compare(
      dadosLogin.senha,
      dadosExistem.senha,
    );

    if (senhaValida) {
      const payload = {
        id: dadosExistem.id,
      };
        // vou liberar o token, assinar o payload(ingresso) com o id do usuario
      const token = await this.jwt.sign(payload);
      return { token };
    } else {
      throw new UnauthorizedException('Credenciais invalidas');
    }
  }
}
