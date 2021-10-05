import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
