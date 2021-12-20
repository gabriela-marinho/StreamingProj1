import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from 'src/prisma.service';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmesService {
  // preciso desse construtor para o meu 'this' poder acessar meu banco
  constructor(private db: PrismaService) {}

  // a linha de codigo abaixo procura no banco e preenche
  // a variavel :filmExist, preenchendo a mesma
  // entra no if, caso seja encontrada,preciso parar o create
  // usando o throw new
  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    // findunique sempre pede um objeto
    const filmExist = await this.db.filme.findUnique({
      where: { nomeFilme: createFilmeDto.nomeFilme },
    });
    if (filmExist) {
      throw new ConflictException('Nome do Filme já cadastrado!');
    }
    const filme = await this.db.filme.create({ data: createFilmeDto });
    return filme;
  }
  // so tem parametro de saída nao tem de entrada
  // primeiro faz uma consulta no banco, depois retorna a consulta
  // passando o mouse em cima de filme (return) vemos q a promessa
  // é um VETOR,logo a promisse tem q ter um vetor
  async findAll(): Promise<Filme[]> {
    const filme = await this.db.filme.findMany();
    return filme;
  }
  // a promose aqui só quer encontrar uma retorno e nao todos
  async findOne(id: string): Promise<Filme> {
    const filmExist = await this.db.filme.findUnique({
      // qnd vc tem o mesmo nome da propriedade com o mesmo nome do parametyro
      // q está passando pode deixar só um nome, no nosso caso é o id
      where: { id },
    });
    if (!filmExist) {
      throw new NotFoundException('Filme com esse id não encontrado!');
    }
    return filmExist;
  }

  async update(id: string, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    const filmExist = await this.db.filme.update({
      // o update recebe 2 itens obrigatorios :where e o data.
      data: updateFilmeDto,
      where: { id },
    });
    return filmExist;
  }

  async remove(id: string): Promise<{ message: string }> {
    const filmExist = await this.db.filme.findUnique({
      // qnd vc tem o mesmo nome da propriedade com o mesmo nome do parametyro
      // q está passando pode deixar só um nome, no nosso caso é o id
      where: { id },
    });
    if (!filmExist) {
      throw new NotFoundException('Filme com esse id não encontrado!');
    } else {
      // delete precisa de um where obrigatorio
      await this.db.filme.delete({
        where: { id },
      });
    }
    // return { message: 'Filme com id encontrado e deletado' };
    return { message: `'Filme com ${id} encontrado e deletado'` };
  }
}
