import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/prisma.service';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmesService {
  // preciso desse construtor para o meu 'this' poder acessar meu banco
  constructor(private db: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto) {
    // findunique sempre pede um objeto
    const filmExist = await this.db.filme.findUnique({

    });
  }

  findAll() {
    return `This action returns all filmes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filme`;
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return `This action updates a #${id} filme`;
  }

  remove(id: number) {
    return `This action removes a #${id} filme`;
  }
}
