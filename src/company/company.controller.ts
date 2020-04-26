import { Controller, Get, Res, HttpStatus, Post, Body, NotFoundException, Param, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @ApiOperation({ summary: 'Gets a company' })
    @ApiResponse({ status: 200, description: 'Returns a company.' })
    @Get(':companyId')
    async getCompany(@Res() res, @Param('companyId') companyId) {
        const company = await this.companyService.getCompanyById(companyId);
        if (!company) {
            throw new NotFoundException('Company does not exist!');
        }
        return res.status(HttpStatus.OK).json(company);
    }

    @ApiOperation({ summary: 'Create company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
    @Post()
    async createCompany(@Res() res, @Body() createCompanyDto: CreateCompanyDto) {
        const company = await this.companyService.createCompany(createCompanyDto);
        return res.status(HttpStatus.OK).json({
            company
        });
    }

    // @Get()
    // async getCompanies(@Res() res, @Query() query) {
    //     const companies = await this.companyService.getAllCompanies();
    //     return res.status(HttpStatus.OK).json(companies);
    // }
}
