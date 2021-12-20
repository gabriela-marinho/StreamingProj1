import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post('create')
  create(@Body() createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmesService.create(createFilmeDto);
  }

  @Get('all')
  findAll(): Promise<Filme[]> {
    return this.filmesService.findAll();
  }
  // não tem um tipo de retorno mas posso colocar, pois é uma boa partica

  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Filme> {
    return this.filmesService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateFilmeDto: UpdateFilmeDto,
  ): Promise<Filme> {
    return this.filmesService.update(id, updateFilmeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.filmesService.remove(id);
  }
}
