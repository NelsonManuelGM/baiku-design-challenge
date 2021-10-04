import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {

    @IsString()
    @IsNotEmpty()
    idUser: string;

    @IsString()
    @IsNotEmpty()
    idLocation: string;

    @IsString()
    @IsOptional()
    idBicycle: string;

    @IsDate()
    @IsOptional()
    reserveFor: Date;
}
