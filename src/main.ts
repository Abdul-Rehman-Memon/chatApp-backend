import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './core/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('chat/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove the field that are not in Dto
      forbidNonWhitelisted: true, // throw an error is field does not exits in dto
    }),
  );
  swaggerConfig(app);

  const port = process.env.APP_PORT || 3000;

  await app.listen(port).then(() => {
    console.log(`Application is working on port ${port}`);
  });
}
bootstrap();
