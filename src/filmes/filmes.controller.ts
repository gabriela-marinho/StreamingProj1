import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '@prisma/client';
// authguardé quem olha o ingresso(payload) e confirma se pode ou nao passar
import { AuthGuard } from '@nestjs/passport';
@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return this.filmesService.create(createFilmeDto);
  }
  @UseGuards(AuthGuard())
  @Get('all')
  findAll(): Promise<Filme[]> {
    return this.filmesService.findAll();
  }
  // não tem um tipo de retorno mas posso colocar, pois é uma boa partica

  @Get('find-one/:id')
  findOne(@Param('id') id: string): Promise<Filme> {
    return this.filmesService.findOne(id);
  }
  @UseGuards(AuthGuard())
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
