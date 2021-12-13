import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create')
  createUser(@Body() data: CreateUsersDto) {
    return this.service.createUser(data);
  }
}
