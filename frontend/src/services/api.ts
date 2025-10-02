import axios from 'axios';
import { Quiz, QuizSummary, CreateQuizRequest } from '@/types/quiz';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/quizzes`,
});

export const quizApi = {
  // Create a new quiz
  createQuiz: async (data: CreateQuizRequest): Promise<Quiz> => {
    const response = await api.post('/', data);
    return response.data;
  },

  // Get all quizzes
  getQuizzes: async (): Promise<QuizSummary[]> => {
    const response = await api.get('/');
    return response.data;
  },

  // Get a single quiz by ID
  getQuiz: async (id: string): Promise<Quiz> => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Delete a quiz
  deleteQuiz: async (id: string): Promise<void> => {
    await api.delete(`/${id}`);
  },
};

