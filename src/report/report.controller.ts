import { Controller, Get, Res, Query, HttpStatus, Body, Param, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Post(':companyId')
    async createReport(@Res() res, @Param('companyId') companyId, @Body() createReportDto: CreateReportDto) {
        const report = await this.reportService.createReport(companyId, createReportDto);
        return res.status(HttpStatus.OK).json({
            message: "Report succesfully created",
            report
        });
    }

    @Get()
    async getReportByFilter(@Res() res, @Query() query) {
        let queryObj = {};


        if (query) {
            queryObj = query;
        }

        const reports = await this.reportService.getAllReports(queryObj);
        return res.status(HttpStatus.OK).json(reports);
    }

    @Get()
    async getByCompanyId(@Res() res, @Query() query) {
        const reports = await this.reportService.getReportsByCompany(query);
        return res.status(HttpStatus.OK).json(reports);
    }
}
