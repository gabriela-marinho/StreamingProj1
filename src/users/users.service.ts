import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
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
    // por algum motivo precisaei colocar uma constante com a confirmacao de senha tbm linha 30 a 41.
    const hashSenha = await bcrypt.hash(dadosUsuario.senha, 10);
    const hashConfirmacaoSenha = await bcrypt.hash(
      dadosUsuario.confirmacaoSenha,
      10,
    );
    delete dadosUsuario.confirmacaoSenha;
    const user = await this.db.user.create({
      data: {
        ...dadosUsuario,
        senha: hashSenha,
        confirmacaoSenha: hashConfirmacaoSenha,
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
    delete user.senha;
    return user;
  }

  async findMany(): Promise<any[]> {
    const user = await this.db.user.findMany();
    const userNoPass = user.map(({ senha, ...resto }) => resto);
    return userNoPass;
  }

  async findUnique(id: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }
    delete user.senha;
    return user;
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    } else {
      await this.db.user.delete({
        where: { id },
      });
    }

    return { message: 'ID encontrada e excluído' };
  }
}
