'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface QuizProps {
  locale: string;
}

const questions = {
  zh: [
    {
      question: '您平时容易感到疲劳吗？',
      options: [
        { value: 'a', label: '经常感到疲劳，稍微活动就累', icon: '😫' },
        { value: 'b', label: '偶尔感到疲劳', icon: '😐' },
        { value: 'c', label: '很少感到疲劳', icon: '😊' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您的面色看起来？',
      options: [
        { value: 'a', label: '苍白或萎黄', icon: '🌝' },
        { value: 'b', label: '偏红', icon: '🌞' },
        { value: 'c', label: '正常红润', icon: '😄' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您平时喜欢喝冷饮还是热饮？',
      options: [
        { value: 'a', label: '喜欢冷饮', icon: '🧊' },
        { value: 'b', label: '冷热都可以', icon: '🚰' },
        { value: 'c', label: '喜欢热饮', icon: '☕' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您的大便通常是？',
      options: [
        { value: 'a', label: '稀溏不成形', icon: '💧' },
        { value: 'b', label: '有时成形有时不成形', icon: '⚖️' },
        { value: 'c', label: '成形且规律', icon: '✅' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您容易出汗吗？',
      options: [
        { value: 'a', label: '容易出汗，尤其是自汗', icon: '💦' },
        { value: 'b', label: '出汗正常', icon: '😌' },
        { value: 'c', label: '很少出汗', icon: '🌵' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您的性格偏向？',
      options: [
        { value: 'a', label: '内向、安静', icon: '🧘' },
        { value: 'b', label: '适中', icon: '⚖️' },
        { value: 'c', label: '外向、活泼', icon: '🎉' },
      ],
      scores: { a: 1, b: 0, c: -1 },
    },
    {
      question: '您容易感冒吗？',
      options: [
        { value: 'a', label: '经常感冒', icon: '🤧' },
        { value: 'b', label: '偶尔感冒', icon: '😷' },
        { value: 'c', label: '很少感冒', icon: '💪' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您的睡眠质量如何？',
      options: [
        { value: 'a', label: '不易入睡或易醒', icon: '🌙' },
        { value: 'b', label: '睡眠一般', icon: '😴' },
        { value: 'c', label: '睡眠很好', icon: '🌟' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: '您平时的食欲如何？',
      options: [
        { value: 'a', label: '食欲不振', icon: '🍚' },
        { value: 'b', label: '食欲一般', icon: '🍜' },
        { value: 'c', label: '食欲很好', icon: '🍱' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
  ],
  en: [
    {
      question: 'Do you often feel tired?',
      options: [
        { value: 'a', label: 'Often tired, easily fatigued', icon: '😫' },
        { value: 'b', label: 'Occasionally tired', icon: '😐' },
        { value: 'c', label: 'Rarely tired', icon: '😊' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'What does your complexion look like?',
      options: [
        { value: 'a', label: 'Pale or sallow', icon: '🌝' },
        { value: 'b', label: 'Slightly red', icon: '🌞' },
        { value: 'c', label: 'Normal and rosy', icon: '😄' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'Do you prefer cold or hot drinks?',
      options: [
        { value: 'a', label: 'Prefer cold drinks', icon: '🧊' },
        { value: 'b', label: 'Either is fine', icon: '🚰' },
        { value: 'c', label: 'Prefer hot drinks', icon: '☕' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'What is your stool like?',
      options: [
        { value: 'a', label: 'Loose and unformed', icon: '💧' },
        { value: 'b', label: 'Sometimes formed, sometimes not', icon: '⚖️' },
        { value: 'c', label: 'Well-formed and regular', icon: '✅' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'Do you sweat easily?',
      options: [
        { value: 'a', label: 'Easily sweat, especially spontaneous sweating', icon: '💦' },
        { value: 'b', label: 'Normal sweating', icon: '😌' },
        { value: 'c', label: 'Rarely sweat', icon: '🌵' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'What is your personality like?',
      options: [
        { value: 'a', label: 'Introverted, quiet', icon: '🧘' },
        { value: 'b', label: 'Neutral', icon: '⚖️' },
        { value: 'c', label: 'Extroverted, lively', icon: '🎉' },
      ],
      scores: { a: 1, b: 0, c: -1 },
    },
    {
      question: 'Do you catch colds easily?',
      options: [
        { value: 'a', label: 'Often catch colds', icon: '🤧' },
        { value: 'b', label: 'Occasionally catch colds', icon: '😷' },
        { value: 'c', label: 'Rarely catch colds', icon: '💪' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'How is your sleep quality?',
      options: [
        { value: 'a', label: 'Hard to fall asleep or easily wake up', icon: '🌙' },
        { value: 'b', label: 'Average sleep', icon: '😴' },
        { value: 'c', label: 'Good sleep', icon: '🌟' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
    {
      question: 'What is your appetite like?',
      options: [
        { value: 'a', label: 'Poor appetite', icon: '🍚' },
        { value: 'b', label: 'Average appetite', icon: '🍜' },
        { value: 'c', label: 'Good appetite', icon: '🍱' },
      ],
      scores: { a: 2, b: 1, c: 0 },
    },
  ],
};

const results = {
  zh: {
    pinghe: {
      title: '平和体质',
      icon: '🌟',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      description: '恭喜！您属于平和体质，是最健康的体质类型。您的阴阳平衡、气血调和，脏腑功能良好。',
      suggestions: [
        '保持均衡饮食，多吃新鲜蔬果',
        '坚持适度运动，如散步、太极、瑜伽',
        '保持规律作息，充足睡眠',
        '保持心情愉悦，避免过度压力',
      ],
      foods: ['🍎 新鲜水果', '🥬 时令蔬菜', '🍚 五谷杂粮', '🐟 优质蛋白'],
      tips: '继续保持健康的生活方式，定期体检，让身体保持平衡状态。',
    },
    qixu: {
      title: '气虚体质',
      icon: '🌬️',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      description: '您属于气虚体质。这类体质的人容易疲劳、气短、自汗，体力较差，需要补气养生。',
      suggestions: [
        '多吃补气食物：黄芪、党参、山药、红枣、鸡肉',
        '进行温和运动：散步、太极、八段锦',
        '保证充足睡眠，避免过度劳累',
        '注意保暖，避免大汗淋漓',
      ],
      foods: ['🌿 黄芪', '🍠 山药', '🫘 红枣', '🍗 鸡肉'],
      tips: '循序渐进地增强体质，避免突然剧烈运动。',
    },
    shire: {
      title: '湿热体质',
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-orange-50',
      description: '您属于湿热体质。这类体质的人容易口干口苦、皮肤油腻、大便粘腻，需要清热利湿。',
      suggestions: [
        '多吃清热利湿食物：绿豆、冬瓜、薏米、苦瓜',
        '避免辛辣油腻食物，少喝酒',
        '保持室内通风干燥',
        '进行有氧运动，帮助排汗祛湿',
      ],
      foods: ['🟢 绿豆', '🥒 冬瓜', '🌾 薏米', '🥬 苦瓜'],
      tips: '注意饮食清淡，保持环境干燥通风，有助于改善湿热状态。',
    },
    xuyin: {
      title: '阴虚体质',
      icon: '🌙',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      description: '您属于阴虚体质。这类体质的人容易口干咽燥、手脚心发热、睡眠不安，需要滋阴润燥。',
      suggestions: [
        '多吃滋阴食物：银耳、百合、枸杞、梨、黑芝麻',
        '避免辛辣刺激食物，少吃煎炸烧烤',
        '保持情绪稳定，避免急躁',
        '保证充足睡眠，不要熬夜',
      ],
      foods: ['🍄 银耳', '🌷 百合', '🔴 枸杞', '🍐 梨'],
      tips: '阴虚体质需要慢慢调理，保持心境平和有助于滋阴养血。',
    },
  },
  en: {
    pinghe: {
      title: 'Balanced Constitution',
      icon: '🌟',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      description: 'Congratulations! You have a balanced constitution - the healthiest type. Your Yin and Yang are balanced, Qi and Blood are harmonious, and your organs function well.',
      suggestions: [
        'Maintain a balanced diet, eat more fresh fruits and vegetables',
        'Exercise regularly: walking, Tai Chi, yoga',
        'Keep regular routines, get enough sleep',
        'Stay happy and avoid excessive stress',
      ],
      foods: ['🍎 Fresh fruits', '🥬 Seasonal vegetables', '🍚 Whole grains', '🐟 Quality protein'],
      tips: 'Continue your healthy lifestyle and get regular check-ups to maintain balance.',
    },
    qixu: {
      title: 'Qi Deficiency',
      icon: '🌬️',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      description: 'You have a Qi Deficiency constitution. People with this type tend to feel tired easily, have shortness of breath, and spontaneous sweating. You need to nourish Qi.',
      suggestions: [
        'Eat Qi-nourishing foods: Astragalus, Codonopsis, Yam, Red dates, Chicken',
        'Practice gentle exercises: Walking, Tai Chi, Ba Duan Jin',
        'Get enough sleep, avoid overexertion',
        'Keep warm, avoid excessive sweating',
      ],
      foods: ['🌿 Astragalus', '🍠 Yam', '🫘 Red dates', '🍗 Chicken'],
      tips: 'Build up your strength gradually, avoid sudden intense exercise.',
    },
    shire: {
      title: 'Damp-Heat',
      icon: '🔥',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-orange-50',
      description: 'You have a Damp-Heat constitution. People with this type tend to have dry mouth with bitter taste, oily skin, and sticky stool. You need to clear heat and resolve dampness.',
      suggestions: [
        'Eat heat-clearing foods: Mung beans, Winter melon, Coix seed, Bitter melon',
        'Avoid spicy and greasy foods, limit alcohol',
        'Keep indoor ventilation and dryness',
        'Do aerobic exercise to promote sweating',
      ],
      foods: ['🟢 Mung beans', '🥒 Winter melon', '🌾 Coix seed', '🥬 Bitter melon'],
      tips: 'Eat light, keep your environment dry and ventilated - this helps improve damp-heat conditions.',
    },
    xuyin: {
      title: 'Yin Deficiency',
      icon: '🌙',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      description: 'You have a Yin Deficiency constitution. People with this type tend to have dry mouth/throat, warm palms/soles, and restless sleep. You need to nourish Yin and moisten dryness.',
      suggestions: [
        'Eat Yin-nourishing foods: Tremella, Lily bulb, Goji berries, Pear, Black sesame',
        'Avoid spicy and stimulating foods, limit fried and grilled',
        'Keep emotions stable, avoid irritability',
        'Get enough sleep, don\'t stay up late',
      ],
      foods: ['🍄 Tremella', '🌷 Lily bulb', '🔴 Goji berries', '🍐 Pear'],
      tips: 'Yin deficiency requires gradual conditioning. Keeping a peaceful mindset helps nourish Yin and Blood.',
    },
  },
};

type ResultType = 'pinghe' | 'qixu' | 'shire' | 'xuyin';

export default function BodyTypeQuiz({ locale }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | undefined)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<ResultType>('pinghe');
  const [isAnimating, setIsAnimating] = useState(false);

  const quizQuestions = questions[locale as keyof typeof questions] || questions.zh;
  const isZh = locale === 'zh';
  const localeKey = locale as 'zh' | 'en';
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  useEffect(() => {
    setAnswers(new Array(totalQuestions).fill(undefined));
  }, []);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (!answers[currentQuestion]) return;
    setIsAnimating(true);
    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult();
      }
      setIsAnimating(false);
    }, 300);
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    let totalScore = 0;
    let yinDeficiencySigns = 0;
    let dampHeatSigns = 0;
    
    quizQuestions.forEach((q, index) => {
      const answer = answers[index];
      if (answer) {
        totalScore += q.scores[answer as keyof typeof q.scores];
      }
    });

    const answer1 = answers[1]; 
    const answer2 = answers[2]; 
    const answer7 = answers[7]; 
    const answer8 = answers[8]; 
    
    if (answer1 === 'b') yinDeficiencySigns++;
    if (answer2 === 'c') yinDeficiencySigns++;
    if (answer7 === 'a') yinDeficiencySigns++;
    if (answer8 === 'a') dampHeatSigns++;

    let result: ResultType;
    if (totalScore <= 3) {
      result = 'pinghe';
    } else if (totalScore <= 7 && yinDeficiencySigns >= 2) {
      result = 'xuyin';
    } else if (totalScore <= 8 && dampHeatSigns >= 1) {
      result = 'shire';
    } else if (totalScore <= 6) {
      result = 'xuyin';
    } else if (totalScore <= 10) {
      result = 'shire';
    } else {
      result = 'qixu';
    }

    setResultType(result);
    setShowResult(true);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(totalQuestions).fill(undefined));
    setShowResult(false);
  };

  if (showResult) {
    const result = results[localeKey][resultType];
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 fade-in-up">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className={`bg-gradient-to-br ${result.color} text-white p-8 text-center`}>
            <div className="text-6xl mb-4 animate-bounce">{result.icon}</div>
            <h2 className="text-3xl font-bold mb-2">{result.title}</h2>
            <p className="text-white/90 max-w-lg mx-auto">{result.description}</p>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className={`${result.bgColor} rounded-2xl p-6`}>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span>
                {isZh ? '养生建议' : 'Wellness Suggestions'}
              </h3>
              <ul className="space-y-3">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                {isZh ? '推荐食材' : 'Recommended Foods'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.foods.map((food, index) => (
                  <div key={index} className="bg-white rounded-xl px-4 py-3 text-center text-sm text-text-primary shadow-sm hover:shadow-md transition-shadow">
                    {food}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💚</span>
                <p className="text-gray-700 text-sm leading-relaxed">{result.tips}</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-amber-800 text-sm text-center">
                ⚠️ {isZh
                  ? '本测试仅供参考，不能替代专业医疗诊断。如有健康问题，请咨询专业中医师。'
                  : 'This test is for reference only and does not replace professional medical diagnosis. Please consult a qualified TCM practitioner for health concerns.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={restart}
                className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium shadow-lg shadow-green-600/20"
              >
                🔄 {isZh ? '重新测试' : 'Retake Quiz'}
              </button>
              <Link
                href={`/${locale}/knowledge`}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-all font-medium text-center"
              >
                📚 {isZh ? '了解更多养生知识' : 'Learn More Wellness Tips'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h1 className="text-xl font-bold">{isZh ? '中医体质测试' : 'TCM Body Type Quiz'}</h1>
                <p className="text-green-100 text-sm">
                  {isZh
                    ? `第 ${currentQuestion + 1} / ${totalQuestions} 题`
                    : `Question ${currentQuestion + 1} of ${totalQuestions}`}
                </p>
              </div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className={`p-6 md:p-8 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-lg md:text-xl font-semibold text-text-primary mb-6">
            {currentQ.question}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = answers[currentQuestion] === option.value;
              return (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleAnswer(option.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="flex-1 text-text-primary">{option.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 flex gap-3">
          {currentQuestion > 0 && (
            <button
              onClick={prevQuestion}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
            >
              ← {isZh ? '上一题' : 'Previous'}
            </button>
          )}
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion]}
            className={`flex-1 px-6 py-4 bg-primary-600 text-white rounded-xl transition-all font-medium shadow-lg shadow-primary-600/20 ${
              !answers[currentQuestion]
                ? 'opacity-50 cursor-not-allowed shadow-none'
                : 'hover:bg-primary-700 hover:-translate-y-0.5'
            }`}
          >
            {currentQuestion < totalQuestions - 1
              ? `${isZh ? '下一题' : 'Next'} →`
              : isZh
              ? '查看结果 →'
              : 'Get Results →'}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={restart}
          className="text-text-muted hover:text-text-primary text-sm transition-colors"
        >
          🔄 {isZh ? '重新开始' : 'Start Over'}
        </button>
      </div>
    </div>
  );
}
