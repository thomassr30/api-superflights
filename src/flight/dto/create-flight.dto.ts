import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateFlightDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    piloto: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    airplane: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destinationCity: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(()=> Date)
    @IsDate()
    flightDate: Date
}
