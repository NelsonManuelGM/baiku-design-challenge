import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {

    @IsString()
    @IsNotEmpty()
    id_user: string;

    @IsString()
    @IsNotEmpty()
    id_location: string;

    @IsString()
    @IsOptional()
    id_bicycle: string;

    @IsDate()
    @IsNotEmpty()
    reserve_for: Date;
}
