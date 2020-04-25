import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
    @ApiProperty()
    readonly _id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly reports: any;
}