import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/e-reporter', { useNewUrlParser: true }),
    CompanyModule,
    ReportModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
