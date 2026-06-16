import BodyTypeQuiz from '@/components/tools/BodyTypeQuiz';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function QuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <BodyTypeQuiz locale={locale || 'zh'} />;
}
