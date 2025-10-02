import { IsString, IsNotEmpty, IsArray, ValidateNested, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsInt()
  queue: number;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  @IsOptional()
  correctAnswer?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];
}

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  quizTitle: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
