import { Body, Controller, Patch, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { User } from '@prisma/client';
import { UpdateUsersDto } from './dto/update.-users.dto';

@Controller('user')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('create')
  createUser(@Body() data: CreateUsersDto): Promise<User> {
    return this.service.createUser(data);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: UpdateUsersDto): Promise<User> {
    return this.service.update(id, data);
  }
}
