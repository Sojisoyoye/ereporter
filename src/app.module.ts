import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/e-reporter', { useNewUrlParser: true }),
    CompanyModule,
    ReportModule
  ], // MongooseModule.forRoot('mongodb://localhost/e-reporter', { useUnifiedTopology: true }{ useNewUrlParser: true }),
  controllers: [],
  providers: [],
})
export class AppModule { }

// mongodb://db:27017/e-reporter