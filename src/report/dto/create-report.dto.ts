import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsBoolean, IsDateString } from "class-validator";

export class CreateReportDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly period: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    readonly year: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly assignee: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsDateString()
    readonly deadline: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly submitted: boolean;

    @ApiProperty()
    @IsString()
    readonly url: string;
}
