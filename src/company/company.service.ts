import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './interfaces/company.interface';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectModel('Company') private readonly companyModel: Model<Company>) { }

    async getCompanyById(companyId): Promise<Company> {
        const company = await this.companyModel.findById(companyId).exec();
        return company;
    }

    async getCompany(options): Promise<Company> {
        const company = await this.companyModel.findOne(options).exec();
        return company;
    }

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const newCompany = new this.companyModel(createCompanyDto);
        return await newCompany.save();
    }

    async getAllCompanies(): Promise<Company[]> {
        const companies = await this.companyModel.find().exec();
        return companies;
    }
}
