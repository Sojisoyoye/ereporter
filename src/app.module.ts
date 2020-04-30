import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db:27017/e-reporter', { useNewUrlParser: true }),
    CompanyModule,
    ReportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
