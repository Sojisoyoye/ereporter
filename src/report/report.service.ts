import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './interfaces/report.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { Company } from 'src/company/interfaces/company.interface';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel('Report')
        private readonly reportModel: Model<Report>,
        @InjectModel('Company')
        private readonly companyModel: Model<Company>
    ) { }

    async createReport(companyId, createReportDto: CreateReportDto): Promise<Report> {
        try {
            let company = await this.companyModel.findById(companyId).exec();

            const newReport = new this.reportModel(createReportDto);
            const report = await newReport.save();

            company.reports.push(newReport);

            await company.save();

            return report;
        }
        catch (err) {
            if (err.name === 'ValidationError') {
                throw new HttpException({ message: 'Bad request', error: err }, HttpStatus.BAD_REQUEST)
            }

            throw new HttpException({ message: 'Server error', error: err }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAllReports(queryOption): Promise<any[]> {
        const queryKey = Object.keys(queryOption)[0];
        const queryValue = queryOption[queryKey];
        const companyId = '_id';
        let queryObj = {};

        if (queryKey === 'companyId') {
            queryObj[companyId] = queryValue;
            const reports = await this.companyModel.find(queryObj).populate('reports').select('reports -_id');
            return reports;
        }

        queryObj = queryOption;
        const reports = await this.reportModel
            .find(queryObj)
            .exec();
        return reports;
    }
}
