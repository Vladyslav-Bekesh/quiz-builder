'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/quizzes');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg text-gray-600">Redirecting...</div>
    </div>
  );
}