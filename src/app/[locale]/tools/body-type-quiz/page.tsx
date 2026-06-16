'use client';

import BodyTypeQuiz from '@/components/tools/BodyTypeQuiz';
import { useParams } from 'next/navigation';

export default function QuizPage() {
  const params = useParams<{ locale: string }>();
  return <BodyTypeQuiz locale={params.locale || 'zh'} />;
}
