import { Controller, Get, Res, HttpStatus, Post, Body, NotFoundException, Param, Query, UsePipes } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id';
import { ValidationPipe } from 'src/shared/pipes/validate-input';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @ApiOperation({ summary: 'Gets a company' })
    @ApiResponse({ status: 200, description: 'Returns a company.' })
    @Get(':companyId')
    async getCompany(@Res() res, @Param('companyId', new ValidateObjectId()) companyId) {
        const company = await this.companyService.getCompanyById(companyId);
        if (!company) {
            throw new NotFoundException('Company does not exist!');
        }
        return res.status(HttpStatus.OK).json(company);
    }

    @ApiOperation({ summary: 'Create company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
    @Post()
    @UsePipes(new ValidationPipe())
    async createCompany(@Res() res, @Body() createCompanyDto: CreateCompanyDto) {
        const company = await this.companyService.createCompany(createCompanyDto);
        return res.status(HttpStatus.OK).json({
            company
        });
    }
}
