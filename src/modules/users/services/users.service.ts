import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRep: Repository<User>) { }

  create({ firstName, lastName, email }: CreateUserDto) {
    const newUser = new User()
    newUser.first_name = firstName;
    newUser.last_name = lastName;
    newUser.email = email;

    return this.userRep.save(newUser)
  }

  findAll() {
    return this.userRep.find({});
  }

  findOne(id: string) {
    return this.userRep.findOne({ id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if(Object.keys(updateUserDto).length === 0){
      throw new BadRequestException('Update values are not defined!')
    }
    return this.userRep.update({ id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRep.delete({ id: id });
  }
}
