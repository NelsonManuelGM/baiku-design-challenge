import { UuidPipe } from 'src/pipes/uuid.pipes';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
    isArray: true
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id', UuidPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    try{
      return this.usersService.update(id, updateUserDto);
    }catch(error){
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.usersService.remove(id);
  }
}
