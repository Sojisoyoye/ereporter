import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('eReporter API')
    .setDescription('The eReporter API description')
    .setVersion('1.0')
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(4000);
}
bootstrap();
