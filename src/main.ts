import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import compression from 'compression';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  const options = new DocumentBuilder()
    .setTitle('Time Watcher')
    .setDescription('The Time Watcher API description')
    .setVersion('1.0')
    .addTag('watcher')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
