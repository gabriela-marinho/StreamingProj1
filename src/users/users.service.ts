import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async createUser(data: CreateUsersDto) {
    delete data.confirmacaoSenha;
    await this.db.user.create({ data });
  }
}
