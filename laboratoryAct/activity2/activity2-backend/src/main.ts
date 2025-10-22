import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (or just your frontend)
  app.enableCors({
    origin: 'http://localhost:3001', // frontend URL
    credentials: true,               // optional if you use cookies
  });

  await app.listen(3000);
}
bootstrap();
