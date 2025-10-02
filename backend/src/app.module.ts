import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [QuizModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
