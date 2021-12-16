import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { User } from '@prisma/client';
import { UpdateUsersDto } from './dto/update.-users.dto';
import { get } from 'http';

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

  @Get('findMany')
  findMany(): Promise<any[]> {
    return this.service.findMany();
  }

  @Get('findUnique/:id')
  findUnique(@Param('id') id: string): Promise<User> {
    return this.service.findUnique(id);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.service.delete(id);
  }
}
