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

    async getAllReports(type, companyId, page: number = 1): Promise<any[]> {
        let queryObj = {};
        let limit = 2;
        let pageNo = (Math.abs(page) || 1) - 1;

        if (companyId) {
            const reports = await this.companyModel
                .find({ _id: companyId })
                .populate({
                    path: 'reports',
                    options: {
                        sort: {},
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
                .sort({
                    name: 'asc'
                })
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










// const queryKey = Object.keys(queryOption)[0];
        // const queryValue = queryOption[queryKey];
        // const companyId = '_id';

        // console.log(':::::::', Number(queryValue));
        // let page: number = queryValue;
        // console.log('>>>>>', page);



        // queryObj = queryOption;




// let limit = Math.abs(req.query.limit) || 10; 
// let page = (Math.abs(req.query.page) || 1) - 1; 
// Schema.find().limit(limit).skip(limit * page)

// .populate([
//     {
//         path: 'reports',
//         select: 'reports -_id',
//         model: 'Report',
//         options: {
//             sort: {},
//             skip: 5,
//             limit: 1 - 1
//         }
//     }
// ])