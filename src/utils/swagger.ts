import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export enum ApiControllerTags {
  Users = 'Users',
}

function buildSwaggerDocument(app: INestApplication): OpenAPIObject {
  const config = new DocumentBuilder()
    .setTitle('Nestjs PostgreSQL')
    .setDescription('Nestjs PostgreSQL Boilerplate API Service')
    .setVersion('1.0')
    .addTag(ApiControllerTags.Users)
    .addBasicAuth()
    .build();

  return SwaggerModule.createDocument(app, config);
}

export function swaggerConfig(app: INestApplication, uiPath: string = '') {
  const document = buildSwaggerDocument(app);
  SwaggerModule.setup(uiPath, app, document);
}
