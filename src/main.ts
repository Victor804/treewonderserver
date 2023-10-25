import { NestFactory } from '@nestjs/core';
import { TreeModule } from './tree.module';

async function bootstrap() {
  const app = await NestFactory.create(TreeModule);
  await app.listen(3000);
}
bootstrap();
