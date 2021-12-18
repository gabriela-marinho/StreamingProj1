import { IsString, IsNotEmpty } from 'class-validator';
export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsString()
  @IsNotEmpty()
  ator: string;

  @IsString()
  @IsNotEmpty()
  produtora: string;

  @IsString()
  @IsNotEmpty()
  linkImagem: string;

  @IsString()
  @IsNotEmpty()
  nomeFilme: string;
}
