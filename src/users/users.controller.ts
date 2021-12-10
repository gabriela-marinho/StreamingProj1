import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create')
  createUser(@Body() data: CreateUsersDto) {
    return this.service.createUser(data);
  }
}
