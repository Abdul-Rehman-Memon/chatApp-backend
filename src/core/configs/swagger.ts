import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Chat App').build();

  const document = SwaggerModule.createDocument(app, config);

  // ? api docs apis goes like https://domain/api-docs
  SwaggerModule.setup('api-docs', app, document);
};
