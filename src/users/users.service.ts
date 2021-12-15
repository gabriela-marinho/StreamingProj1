import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUsersDto } from './dto/update.-users.dto';
@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}
  // na promisse abaixo se eu quisesse q retornasse uma mensagem coloca <message: string> e no return coloco a mensagem.

  async createUser(dadosUsuario: CreateUsersDto): Promise<User> {
    //aqui fiz uma validaçao na confirmacao da senha,com inicio nos pipes
    if (dadosUsuario.senha !== dadosUsuario.confirmacaoSenha) {
      throw new UnauthorizedException('A senha não confere');
    }

    const userExists = await this.db.user.findUnique({
      where: { email: dadosUsuario.email },
    });

    if (userExists) {
      throw new ConflictException('email ja cadastrado,use outro!');
    }
    const saltos = 10;
    const hashSenha = await bcrypt.hash(dadosUsuario.senha, saltos);
    delete dadosUsuario.confirmacaoSenha;
    const user = await this.db.user.create({
      data: {
        ...dadosUsuario,
        senha: hashSenha,
      },
    });
    delete user.senha;
    return user;
  }

  async update(id: string, dadosUsuario: UpdateUsersDto): Promise<User> {
    const user = await this.db.user.update({
      data: dadosUsuario,
      where: { id: id },
    });
    return user;
  }
}
