import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report } from './interfaces/report.interface';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
    constructor(@InjectModel('Report') private readonly reportModel: Model<Report>) { }

    async createReport(createReportDto: CreateReportDto): Promise<Report> {
        try {
            const newCompany = new this.reportModel(createReportDto);
            return await newCompany.save();
        }
        catch (err) {
            throw new Error('report can not be created')
        }
    }

    async getAllReports(queryObj): Promise<Report[]> {
        const reports = await this.reportModel
            .find(queryObj)
            .exec();
        return reports;
    }
}


















// async getReports(options: object): Promise<Report> {
    //     const reports = await this.reportModel.findOne(options).exec();
    //     return reports;
    // }