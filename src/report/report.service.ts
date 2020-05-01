import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './interfaces/report.interface';
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

    async getAllReports(type, companyId, page: number = 1): Promise<any[]> {
        let queryObj = {};
        let limit = 5;
        let pageNo = (Math.abs(page) || 1) - 1;

        if (companyId) {
            const reports = await this.companyModel
                .find({ _id: companyId })
                .populate({
                    path: 'reports',
                    options: {
                        skip: limit * pageNo,
                        limit: limit
                    }
                })
                .select('reports -_id')
                .exec()
            return reports;
        }

        if (type) {
            const reports = await this.reportModel
                .find({ type: type })
                .limit(limit)
                .skip(limit * pageNo)
                .exec();
            return reports;
        }

        const reports = await this.reportModel
            .find(queryObj)
            .limit(limit)
            .skip(limit * pageNo)
            .sort({
                name: 'asc'
            })
            .exec();
        return reports;
    }
}
