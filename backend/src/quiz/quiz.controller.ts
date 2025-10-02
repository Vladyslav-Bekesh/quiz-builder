import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Logger,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quizzes')
export class QuizController {
  private readonly logger = new Logger(QuizController.name);

  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    this.logger.log(`Creating quiz with title: ${createQuizDto.quizTitle}`);
    this.logger.log(`Quiz data: ${JSON.stringify(createQuizDto, null, 2)}`);
    
    try {
      const result = await this.quizService.create(createQuizDto);
      this.logger.log(`Quiz created successfully with ID: ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Error creating quiz: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
