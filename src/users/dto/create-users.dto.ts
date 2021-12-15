import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class CreateUsersDto {
  
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 15)
  senha: string;
  confirmacaoSenha: string;
}
