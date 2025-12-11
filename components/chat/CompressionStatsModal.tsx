'use client';

import { CompressionStats } from '@/types/chat';
import { generateCompressionStatsDisplay } from '@/lib/utils';

interface CompressionStatsModalProps {
  stats: CompressionStats;
  totalMessages: number;
  isOpen: boolean;
  onClose: () => void;
}

export function CompressionStatsModal({
  stats,
  totalMessages,
  isOpen,
  onClose,
}: CompressionStatsModalProps) {
  if (!isOpen) return null;

  const statsDisplay = generateCompressionStatsDisplay({
    totalMessages,
    totalCompressions: stats.totalCompressions,
    originalTokens: stats.originalTokens,
    compressedTokens: stats.compressedTokens,
    savedTokens: stats.savedTokens,
    compressionRatio: stats.compressionRatio,
    dataQuality: stats.dataQuality,
    logicQuality: stats.logicQuality,
    emotionalTone: stats.emotionalTone,
    contextPreservation: stats.contextPreservation,
    intentPreservation: stats.intentPreservation,
    overallGrade: stats.overallGrade,
    informationLoss: stats.informationLoss,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              🧠 Статистика компрессии v4.0 ULTRA
            </h2>
            <p className="text-sm text-white text-opacity-90">
              СМЫСЛОВОЕ сжатие диалога с извлечением намерений
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* ASCII Stats */}
          <div className="bg-black rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-xs text-green-400 font-mono whitespace-pre">
              {statsDisplay}
            </pre>
          </div>

          {/* Philosophy */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              🎯 Философия v4.0 ULTRA
            </h3>
            <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <p className="text-red-400 font-medium">НЕ ДЕЛАЕМ (v1.0/v2.0):</p>
                  <p className="text-zinc-400 text-sm">
                    "Пользователь сказал X, потом сказал Y, потом Z" — механическое копирование
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-400 font-medium">ДЕЛАЕМ (v4.0 ULTRA):</p>
                  <p className="text-zinc-400 text-sm">
                    "Пользователь интересуется [тема], потому что [причина]" — извлечение СМЫСЛА и НАМЕРЕНИЙ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Principles */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              🔑 Ключевые принципы
            </h3>
            <div className="grid gap-3">
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-orange-400 font-medium mb-1">1️⃣ НАМЕРЕНИЕ ВАЖНЕЕ СЛОВ</p>
                <p className="text-zinc-400 text-sm">
                  Извлекаем цели и желания пользователя, а не цитируем дословно
                </p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-blue-400 font-medium mb-1">2️⃣ КОНТЕКСТ ВАЖНЕЕ ФАКТОВ</p>
                <p className="text-zinc-400 text-sm">
                  Сохраняем не просто имена/числа, а их значение и эмоциональную окраску
                </p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-green-400 font-medium mb-1">3️⃣ СВЯЗИ ВАЖНЕЕ ПЕРЕЧИСЛЕНИЯ</p>
                <p className="text-zinc-400 text-sm">
                  Показываем причинно-следственные связи между темами
                </p>
              </div>
              <div className="bg-zinc-800 rounded-lg p-4">
                <p className="text-yellow-400 font-medium mb-1">4️⃣ ПРЕДПОЧТЕНИЯ ВАЖНЕЕ СОДЕРЖАНИЯ</p>
                <p className="text-zinc-400 text-sm">
                  Анализируем стиль общения, уровень экспертизы и эмоциональное состояние
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Explanation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              📊 Метрики качества (5 измерений)
            </h3>
            <div className="bg-zinc-800 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">• Конкретные данные (25%)</span>
                <span className="text-zinc-500">Сохранность имён, чисел, дат с контекстом</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">• Причинные связи (20%)</span>
                <span className="text-zinc-500">Логика "потому что", "из-за", "поэтому"</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">• Эмоциональный тон (15%)</span>
                <span className="text-zinc-500">Настроение и отношение пользователя</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">• Открытые темы (20%)</span>
                <span className="text-zinc-500">Незавершённые вопросы и контекст</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-300">• Намерения пользователя (20%)</span>
                <span className="text-zinc-500">Цели и желания в общении</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-700 px-6 py-4 bg-zinc-800/50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500">
              Версия: v4.0 ULTRA | Философия: СМЫСЛ {'>'} Слова • Жёсткий контроль качества
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

