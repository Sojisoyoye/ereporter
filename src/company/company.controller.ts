import { Controller, Get, Res, HttpStatus, Post, Body, NotFoundException, Param, Query, UsePipes, HttpException } from '@nestjs/common';
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
    @ApiResponse({ status: 404, description: 'The company is not available.' })
    @Get(':companyId')
    async getCompany(@Res() res, @Param('companyId', new ValidateObjectId()) companyId) {
        try {
            const company = await this.companyService.getCompanyById(companyId);
            if (!company) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'This company is not available',
                    status: HttpStatus.NOT_FOUND
                });
            }
            return res.status(HttpStatus.OK).json({
                data: [company]
            });
        } catch (err) {
            throw new HttpException({ message: 'Server error', error: err }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @ApiOperation({ summary: 'Create company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
    @Post()
    @UsePipes(new ValidationPipe())
    async createCompany(@Res() res, @Body() createCompanyDto: CreateCompanyDto) {
        try {
            const company = await this.companyService.createCompany(createCompanyDto);
            return res.status(HttpStatus.OK).json({ statidId: company.id });
        } catch (err) {
            if (err.name === 'ValidationError') {
                throw new HttpException({ message: 'Bad request', error: err }, HttpStatus.BAD_REQUEST)
            }
            throw new HttpException({ message: 'Server error', error: err }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAllCompanies(@Res() res) {
        const company = await this.companyService.getAllCompanies();
        return res.status(HttpStatus.OK).json({
            data: company
        })
    }
}
