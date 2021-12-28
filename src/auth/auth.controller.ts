import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from './auth-user.decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login com um usuário e gerar um token como resposta',
  })
  login(@Body() dadoslogin: CredentialsDto) {
    return this.authService.login(dadoslogin);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  @ApiOperation({
    summary: 'Retorna as informações do usuário dono do token informado',
  })
  @ApiBearerAuth()
  profile(@AuthUser() user: User): User {
    return user;
  }
}
