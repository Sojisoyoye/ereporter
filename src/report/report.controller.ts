import { Controller, Get, Res, Query, HttpStatus, Body, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @Post()
    async createReport(@Res() res, @Body() createReportDto: CreateReportDto) {
        const report = await this.reportService.createReport(createReportDto);
        return res.status(HttpStatus.OK).json({
            message: "Company succesfully created",
            report
        });
    }

    @Get()
    async getReports(@Res() res, @Query() query) {
        let queryObj = {};


        if (query) {
            queryObj = query;
        }

        const reports = await this.reportService.getAllReports(queryObj);
        return res.status(HttpStatus.OK).json(reports);
    }
}
