import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express from 'express'
async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: true });
  //app.use(express.json({ limit: '10kb' }))
  //app.use(express.urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
