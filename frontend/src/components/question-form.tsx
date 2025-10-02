import React, { useEffect, useState } from 'react';
import { UseFormRegister, useFormContext } from 'react-hook-form';
import { QuestionType } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LabelWrapper } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface QuestionFormData {
  quizTitle: string;
  questions: {
    queue: number;
    question: string;
    type: QuestionType;
    correctAnswer?: string;
    options?: string[];
  }[];
}

interface QuestionFormProps {
  register: UseFormRegister<QuestionFormData>;
  index: number;
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
  onRemove: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  register,
  index,
  questionType,
  setQuestionType,
  onRemove,
}) => {
  const { setValue } = useFormContext<QuestionFormData>();
  const [options, setOptions] = useState<string[]>(['', '']);

  useEffect(() => {
    setValue(`questions.${index}.queue`, index + 1);
    setValue(`questions.${index}.type`, questionType);
  }, [index, questionType, setValue]);

  const addOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
    setValue(`questions.${index}.options`, newOptions);
  };

  const removeOption = (optionIndex: number) => {
    const newOptions = options.filter((_, i) => i !== optionIndex);
    setOptions(newOptions);
    setValue(`questions.${index}.options`, newOptions);
  };

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...options];
    newOptions[optionIndex] = value;
    setOptions(newOptions);
    setValue(`questions.${index}.options`, newOptions);
  };

  const renderCorrectAnswerField = () => {
    switch (questionType) {
      case QuestionType.TRUE_OR_FALSE:
        return (
          <div>
            <LabelWrapper htmlFor={`questions.${index}.correctAnswer`}>
              Correct Answer
            </LabelWrapper>
            <select
              {...register(`questions.${index}.correctAnswer` as const, { required: true })}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              <option value="">Select correct answer</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        );
      
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div>
            <LabelWrapper htmlFor={`questions.${index}.correctAnswer`}>
              Correct Answer
            </LabelWrapper>
            <select
              {...register(`questions.${index}.correctAnswer` as const, { required: true })}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
            >
              <option value="">Select correct answer</option>
              {options.filter(opt => opt.trim()).map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      
      default:
        return (
          <div>
            <LabelWrapper htmlFor={`questions.${index}.correctAnswer`}>
              Correct Answer
            </LabelWrapper>
            <Input
              {...register(`questions.${index}.correctAnswer` as const)}
              placeholder="Enter correct answer"
              className="mt-1"
            />
          </div>
        );
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Question {index + 1}</h3>
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <LabelWrapper htmlFor={`questions.${index}.question`}>
            Question Text
          </LabelWrapper>
          <Input
            {...register(`questions.${index}.question` as const, { required: true })}
            placeholder="Enter question text"
            className="mt-1"
          />
        </div>

        <div>
          <LabelWrapper>Question Type</LabelWrapper>
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`true-false-${index}`}
                name={`question-type-${index}`}
                value={QuestionType.TRUE_OR_FALSE}
                checked={questionType === QuestionType.TRUE_OR_FALSE}
                onChange={() => setQuestionType(QuestionType.TRUE_OR_FALSE)}
                className="mr-2"
              />
              <LabelWrapper htmlFor={`true-false-${index}`}>True or False</LabelWrapper>
            </div>
            
            <div className="flex items-center space-x-2">
             <input
                type="radio"
                id={`text-${index}`}
                name={`question-type-${index}`}
                value={QuestionType.TEXT}
                checked={questionType === QuestionType.TEXT}
                onChange={() => setQuestionType(QuestionType.TEXT)}
                className="mr-2"
              />
              <LabelWrapper htmlFor={`text-${index}`}>Text</LabelWrapper>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id={`multiple-choice-${index}`}
                name={`question-type-${index}`}
                value={QuestionType.MULTIPLE_CHOICE}
                checked={questionType === QuestionType.MULTIPLE_CHOICE}
                onChange={() => setQuestionType(QuestionType.MULTIPLE_CHOICE)}
                className="mr-2"
              />
              <LabelWrapper htmlFor={`multiple-choice-${index}`}>Multiple Choice</LabelWrapper>
            </div>
          </div>
        </div>

        {questionType === QuestionType.MULTIPLE_CHOICE && (
          <div>
            <LabelWrapper>Answer Options</LabelWrapper>
            <div className="space-y-2 mt-2">
              {options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeOption(optionIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Option</span>
              </Button>
            </div>
          </div>
        )}

        {renderCorrectAnswerField()}
      </div>
    </div>
  );
};

export default QuestionForm;