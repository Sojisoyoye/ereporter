import { Controller, Get, Res, Query, HttpStatus, Body, Param, Post, UsePipes, NotFoundException, HttpException } from '@nestjs/common';
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
        try {
            const report = await this.reportService.createReport(companyId, createReportDto);
            return res.status(HttpStatus.OK).json({ staticId: report.id });
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new HttpException({ message: 'Bad request', error: err }, HttpStatus.BAD_REQUEST)
            }
            throw new HttpException({ message: 'Server error', error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation({ summary: 'Get all reports and get reports by filter' })
    @ApiResponse({ status: 200, description: 'Returns reports.' })
    @Get()
    async getReportByFilter(@Res() res, @Query('page') page, @Query('type') type, @Query('companyId') companyId) {
        try {
            const reports = await this.reportService.getAllReports(type, companyId, page);
            if (!reports.length) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'There are no reports available',
                    status: HttpStatus.BAD_REQUEST
                });
            }
            return res.status(HttpStatus.OK).json(reports);
        } catch (err) {
            throw new HttpException({ message: 'Server error', error: err }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
