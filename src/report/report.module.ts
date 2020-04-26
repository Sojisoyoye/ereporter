import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportSchema } from './schemas/report.schema';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Report', schema: ReportSchema },
    ]),
    CompanyModule
  ],
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule { }
