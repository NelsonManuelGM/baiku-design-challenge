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

export class CreatedReservation{
    @ApiProperty()
    "id": string;

    @ApiProperty()
    user_id: string | null;

    @ApiProperty()
    location_id: string;

    @ApiProperty()
    bicycle_id: string;

    @ApiProperty()
    reserve_for: Date;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    completed: boolean
}