import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportEntity } from './interfaces/report.interface';
import { CreateReportDto } from './dto/create-report.dto';
import { Company } from 'src/company/interfaces/company.interface';

@Injectable()
export class ReportService {
    constructor(
        @InjectModel('Report')
        private readonly reportModel: Model<Report>,
        @InjectModel('Company')
        private readonly companyModel: Model<Company>
    ) { }

    async createReport(companyId, createReportDto: CreateReportDto): Promise<Report> {
        let company = await this.companyModel.findById(companyId).exec();

        const newReport = new this.reportModel(createReportDto);
        const report = await newReport.save();

        company.reports.push(newReport);

        await company.save();

        return report;
    }

    async getAllReports(queryObj): Promise<Report[]> {
        const reports = await this.reportModel
            .find(queryObj)
            .exec();
        return reports;
    }

    async getReportsByCompany(option) {
        const company = await this.companyModel.findOne(option).exec();
        return { reports: company.reports };
    }
}
