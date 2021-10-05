import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id_user: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id_location: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    id_bicycle: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    reserve_for: Date;
}
