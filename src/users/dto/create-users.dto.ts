import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  senha: string;

  @IsString()
  @IsNotEmpty()
  linkImagem: string;

  @IsString()
  @IsNotEmpty()
  confirmacaoSenha: string;
}
