import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api/')
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions : {
          enableImplicitConversion: true
        }
      })
        );
  const options = new DocumentBuilder()
                      .setTitle('SuperFlight API')
                      .setDescription('Programacion de vuelos')
                      .setVersion('1.0.0')
                      .addBearerAuth()
                      .build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true
    }
  })

  await app.listen(3000);
}
bootstrap();
