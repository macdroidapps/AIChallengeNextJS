'use client';

import { useState } from 'react';

interface WelcomeMessageProps {
  onStartDemo?: () => void;
}

export function WelcomeMessage({ onStartDemo }: WelcomeMessageProps) {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-6 py-3 rounded-full mb-4">
          <span className="text-3xl">🧠</span>
          <h1 className="text-2xl font-bold text-white">
            Система СМЫСЛОВОГО сжатия v4.0 ULTRA
          </h1>
        </div>
        <p className="text-zinc-400 text-lg">
          AI-ассистент с революционной технологией извлечения сути и намерений
        </p>
      </div>

      {/* Main Concept */}
      <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>🎯</span>
          Что это такое?
        </h2>
        <div className="space-y-3 text-zinc-300">
          <p>
            Это чат с <strong className="text-purple-400">интеллектуальным управлением контекстом</strong>. 
            После каждых 10 сообщений система автоматически сжимает диалог, 
            но не просто копирует текст, а <strong className="text-orange-400">извлекает СМЫСЛ и НАМЕРЕНИЯ</strong>.
          </p>
          <div className="bg-zinc-900 rounded p-4 border-l-4 border-orange-500">
            <p className="text-sm">
              <strong className="text-orange-400">Революция подхода:</strong> Вместо 
              "Пользователь сказал X, потом Y" система понимает 
              "Пользователь интересуется [тема], потому что [причина]"
            </p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>⚙️</span>
          Как это работает?
        </h2>
        <div className="grid gap-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div>
              <p className="text-white font-medium">Накопление сообщений (1-10)</p>
              <p className="text-zinc-400 text-sm">
                Система анализирует ваш стиль общения, намерения и эмоциональный тон
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div>
              <p className="text-white font-medium">Автоматическое сжатие (на 10-м сообщении)</p>
              <p className="text-zinc-400 text-sm">
                Создаётся COMPRESSED_BLOCK — структурированная суть диалога с сохранением:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-zinc-500">
                <li>• 🧠 Сути диалога и основных тем</li>
                <li>• 🎯 Ваших намерений и целей</li>
                <li>• 📊 Конкретных данных с контекстом (имена, числа, даты)</li>
                <li>• 💬 Вашего стиля и уровня экспертизы</li>
                <li>• ✅ Достигнутых результатов</li>
                <li>• ❌ Незавершённых вопросов</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div>
              <p className="text-white font-medium">Оценка качества</p>
              <p className="text-zinc-400 text-sm">
                Система оценивает 5 метрик качества сжатия и присваивает Grade (A+, A, A-, B+, B, C, D, F)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              4
            </div>
            <div>
              <p className="text-white font-medium">Продолжение диалога (11-20)</p>
              <p className="text-zinc-400 text-sm">
                Вы продолжаете общаться, а система работает с сжатым блоком + новыми сообщениями
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-gradient-to-br from-purple-900/50 to-orange-900/50 rounded-lg p-6 border border-purple-700">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span>✨</span>
          Преимущества v4.0 ULTRA
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm font-medium">85-90% качества сохранения</p>
              <p className="text-zinc-400 text-xs">vs 22-38% в предыдущих версиях</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm font-medium">Понимание намерений</p>
              <p className="text-zinc-400 text-xs">Система знает, ЗАЧЕМ вы спрашиваете</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm font-medium">Эмоциональный интеллект</p>
              <p className="text-zinc-400 text-xs">Учитывает ваше настроение и тон</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm font-medium">Экономия 70-80% токенов</p>
              <p className="text-zinc-400 text-xs">Меньше затрат при высоком качестве</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Button */}
      <div className="text-center">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors font-medium"
        >
          {showComparison ? '🔼 Скрыть' : '🔽 Показать'} сравнение v3.0 vs v4.0 ULTRA
        </button>
      </div>

      {/* Comparison */}
      {showComparison && (
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">
            📊 Сравнение версий
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-3 text-zinc-400">Аспект</th>
                  <th className="text-center py-2 px-3 text-zinc-400">v2.0</th>
                  <th className="text-center py-2 px-3 text-zinc-400">v4.0 ULTRA</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-700/50">
                  <td className="py-3 px-3">Философия</td>
                  <td className="text-center text-orange-400">Фильтрация</td>
                  <td className="text-center text-orange-500 font-bold">СМЫСЛ</td>
                </tr>
                <tr className="border-b border-zinc-700/50">
                  <td className="py-3 px-3">Качество данных</td>
                  <td className="text-center text-red-400">22-38%</td>
                  <td className="text-center text-green-400 font-bold">85-90%</td>
                </tr>
                <tr className="border-b border-zinc-700/50">
                  <td className="py-3 px-3">Оценка Grade</td>
                  <td className="text-center text-red-400">C / D</td>
                  <td className="text-center text-green-400 font-bold">A / A-</td>
                </tr>
                <tr className="border-b border-zinc-700/50">
                  <td className="py-3 px-3">Намерения</td>
                  <td className="text-center text-red-400">❌</td>
                  <td className="text-center text-green-400 font-bold">✅</td>
                </tr>
                <tr className="border-b border-zinc-700/50">
                  <td className="py-3 px-3">Эмоции</td>
                  <td className="text-center text-red-400">❌</td>
                  <td className="text-center text-green-400 font-bold">✅</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">Метрики</td>
                  <td className="text-center text-orange-400">3</td>
                  <td className="text-center text-green-400 font-bold">5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          🚀 Готовы протестировать?
        </h3>
        <p className="text-white text-opacity-90 mb-4">
          Начните диалог и убедитесь в мощности семантического сжатия!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onStartDemo && (
            <button
              onClick={onStartDemo}
              className="px-6 py-3 bg-white text-orange-600 hover:bg-gray-100 rounded-lg transition-colors font-bold"
            >
              🧪 Запустить демо-тест
            </button>
          )}
          <button
            onClick={() => {
              const input = document.querySelector('textarea');
              if (input) {
                input.focus();
              }
            }}
            className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors font-medium"
          >
            💬 Начать обычный диалог
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-zinc-500">
        <p>После каждых 10 сообщений вы увидите уведомление о сжатии</p>
        <p>Сжатые блоки будут отображаться в истории сообщений</p>
      </div>
    </div>
  );
}

