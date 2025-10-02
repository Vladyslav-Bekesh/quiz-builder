'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Quiz } from '@/types/quiz';
import { quizApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const quizId = params.id as string;

  // Helper function to format question types
  const formatQuestionType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'multiple_choice':
        return 'Multiple Choice';
      case 'true_or_false':
        return 'True/False';
      case 'text':
        return 'Text Answer';
      default:
        return type;
    }
  };

  const fetchQuiz = useCallback(async () => {
    try {
      const data = await quizApi.getQuiz(quizId);
      setQuiz(data);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      alert('Failed to fetch quiz. Please try again.');
      router.push('/quizzes');
    } finally {
      setLoading(false);
    }
  }, [quizId, router]);

  const handleDelete = async () => {
    if (!quiz) return;
    
    if (!confirm(`Are you sure you want to delete the quiz "${quiz.title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      await quizApi.deleteQuiz(quiz.id);
      router.push('/quizzes');
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      alert('Failed to delete quiz. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId, fetchQuiz]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-gray-600">Loading quiz...</div>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">Quiz not found</div>
          <Link href="/quizzes">
            <Button>Back to Quizzes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/quizzes" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-gray-500 mt-1">
            Created: {new Date(quiz.createdAt).toLocaleDateString('en-US')}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
          <h2 className="text-lg font-semibold text-blue-900">
            {quiz.questions.length} Question{quiz.questions.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {quiz.questions.map((question, index) => (
          <div key={question.id || index} className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                Question {index + 1}
              </h3>
              <p className="text-gray-800 mt-3 text-base leading-relaxed">{question.question}</p>
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Type: </span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full text-gray-800">
                  {formatQuestionType(question.type)}
                </span>
              </div>

              {question.options && question.options.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-600 mb-2 block">Options:</span>
                  <ul className="space-y-1">
                    {question.options.map((option, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                        <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {question.correctAnswer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <span className="text-sm font-medium text-green-700">Correct Answer: </span>
                  <span className="text-sm text-green-800 font-medium">{question.correctAnswer}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link href="/quizzes">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Quiz List
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleting}
              className="w-full sm:w-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {deleting ? 'Deleting...' : 'Delete Quiz'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}