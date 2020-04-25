import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
    @ApiProperty()
    readonly _id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly period: string;

    @ApiProperty()
    readonly year: number;

    @ApiProperty()
    readonly assignee: string;

    @ApiProperty()
    readonly deadline: Date;

    @ApiProperty()
    readonly submitted: boolean;

    @ApiProperty()
    readonly url: string;

    // @ApiProperty()
    // readonly companyId: string;
}
