import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
export class UpdateUsersDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  email: string;
}
