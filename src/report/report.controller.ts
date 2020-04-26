import { Controller, Get, Res, Query, HttpStatus, Body, Param, Post, UsePipes } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id';
import { ValidationPipe } from 'src/shared/pipes/validate-input';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @ApiOperation({ summary: 'Create report' })
    @ApiResponse({ status: 201, description: 'The report has been successfully created.' })
    @Post(':companyId')
    @UsePipes(new ValidationPipe())
    async createReport(@Res() res, @Param('companyId', new ValidateObjectId()) companyId, @Body() createReportDto: CreateReportDto) {
        const report = await this.reportService.createReport(companyId, createReportDto);
        return res.status(HttpStatus.OK).json({
            report
        });
    }

    @ApiOperation({ summary: 'Get all reports and get reports by filter' })
    @ApiResponse({ status: 200, description: 'Returns reports.' })
    @Get()
    async getReportByFilter(@Res() res, @Query() query) {
        const reports = await this.reportService.getAllReports(query);
        return res.status(HttpStatus.OK).json(reports);
    }
}
