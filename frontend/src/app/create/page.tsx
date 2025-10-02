'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { CreateQuizRequest, QuestionType } from '@/types/quiz';
import { quizApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LabelWrapper } from '@/components/ui/label';
import QuestionForm from '@/components/question-form';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const quizSchema = z.object({
  quizTitle: z.string().min(1, 'Quiz title is required'),
  questions: z.array(
    z.object({
      queue: z.number(),
      question: z.string().min(1, 'Question text is required'),
      type: z.nativeEnum(QuestionType),
      correctAnswer: z.string().optional(),
      options: z.array(z.string()).optional(),
    })
  ).min(1, 'At least one question is required'),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  const methods = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizTitle: '',
      questions: [
        {
          queue: 1,
          question: '',
          type: QuestionType.TRUE_OR_FALSE,
          correctAnswer: '',
          options: ['True', 'False'],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'questions',
  });

  const updateQuestionType = (index: number, type: QuestionType) => {
    setQuestionTypes(prev => {
      const updated = [...prev];
      updated[index] = type;
      return updated;
    });
  };

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true);
    try {
      const formattedData: CreateQuizRequest = {
        quizTitle: data.quizTitle,
        questions: data.questions.map((q, index) => ({
          queue: q.queue || (index + 1),
          question: q.question,
          type: q.type || questionTypes[index] || QuestionType.TRUE_OR_FALSE,
          correctAnswer: q.correctAnswer,
          options: q.options || [],
        })),
      };

      console.log('Sending data:', formattedData);

      await quizApi.createQuiz(formattedData);
      router.push('/quizzes');
    } catch (error) {
      console.error('Failed to create quiz:', error);
      alert('Failed to create quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = () => {
    append({
      queue: fields.length + 1,
      question: '',
      type: QuestionType.TRUE_OR_FALSE,
      correctAnswer: '',
      options: ['True', 'False'],
    });
    setQuestionTypes(prev => [...prev, QuestionType.TRUE_OR_FALSE]);
  };

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center mb-6">
          <Link href="/quizzes" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Create Quiz</h1>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <LabelWrapper htmlFor="quizTitle">Quiz Title</LabelWrapper>
          <Input
            {...methods.register('quizTitle')}
            id="quizTitle"
            placeholder="Enter quiz title"
            className="mt-1"
          />
          {methods.formState.errors.quizTitle && (
            <p className="text-red-500 text-sm mt-1">{methods.formState.errors.quizTitle.message}</p>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Questions</h2>
            <Button type="button" onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {fields.map((field, index) => (
            <QuestionForm
              key={field.id}
              register={methods.register}
              index={index}
              questionType={questionTypes[index] || QuestionType.TRUE_OR_FALSE}
              setQuestionType={(type) => updateQuestionType(index, type)}
              onRemove={() => remove(index)}
            />
          ))}

          {methods.formState.errors.questions && (
            <p className="text-red-500 text-sm">{methods.formState.errors.questions.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Quiz'}
          </Button>
          <Link href="/quizzes">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
        </form>
      </div>
    </FormProvider>
  );
}
