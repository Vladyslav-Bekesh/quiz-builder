import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question, Quiz, QuestionType, Prisma } from '@prisma/client';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz & { questions: Question[] }> {
    const { quizTitle, questions } = createQuizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        title: quizTitle,
        questions: {
          create: questions.map((question): any => ({
            question: question.question,
            type: question.type,
            queue: question.queue,
            options: question.options || [],
            correctAnswer: question.correctAnswer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });
    
    // Sort questions by queue
    quiz.questions = quiz.questions.sort((a: any, b: any) => a.queue - b.queue);
    
    return quiz;
  }

  async findAll(): Promise<Array<{ id: string; title: string; questionCount: number }>> {
    const quizzes = await this.prisma.quiz.findMany({
      include: {
        questions: true,
      },
    });

    return quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz.questions.length,
    }));
  }

  async findOne(id: string): Promise<Quiz & { questions: Question[] } | null> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });
    
    if (quiz) {
      // Sort questions by queue
      quiz.questions = quiz.questions.sort((a: any, b: any) => a.queue - b.queue);
    }
    
    return quiz;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.quiz.delete({
    where: { id },
    });
  }
}
