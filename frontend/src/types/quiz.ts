export enum QuestionType {
  TRUE_OR_FALSE = 'TRUE_OR_FALSE',
  TEXT = 'TEXT',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export interface Question {
  id?: string;
  question: string;
  type: QuestionType;
  queue: number;
  options: string[];
  correctAnswer?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizSummary {
  id: string;
  title: string;
  questionCount: number;
}

export interface CreateQuizRequest {
  quizTitle: string;
  questions: {
    queue: number;
    question: string;
    type: QuestionType;
    correctAnswer?: string;
    options?: string[];
  }[];
}

export interface CreateQuestionRequest {
  queue: number;
  question: string;
  type: QuestionType;
  correctAnswer?: string;
}
