import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmesService {
  banco = [];

  createFilmes(data) {
    this.banco.push(data);
    return this.banco;
  }
}
