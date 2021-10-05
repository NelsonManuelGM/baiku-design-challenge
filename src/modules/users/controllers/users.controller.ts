import { UuidPipe } from 'src/pipes/uuid.pipes';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreatedUser, CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: CreateUserDto})
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: CreatedUser,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedUser,
    isArray: true
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CreatedUser,
  })
  @Get(':id')
  findOne(@Param('id', UuidPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @ApiBody({ type: CreateUserDto})
  @Patch(':id')
  update(@Param('id', UuidPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    try{
      return this.usersService.update(id, updateUserDto);
    }catch(error){
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiParam({ name: 'id', type: String, example: 'caeee726-01e9-4496-a5b4-3133f5675876' })
  @Delete(':id')
  remove(@Param('id', UuidPipe) id: string) {
    return this.usersService.remove(id);
  }
}
