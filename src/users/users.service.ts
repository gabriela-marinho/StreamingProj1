import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async createUser(data: CreateUsersDto) {
    const userExists = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('email ja cadastrado,use outro!');
    }
    const saltos = 10;
    const hashSenha = await bcrypt.hash(data.senha, saltos);
  }
}
