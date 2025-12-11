'use client';

import { ChatStats, CompressionStats } from '@/types/chat';

interface StatisticsPanelProps {
    stats: ChatStats;
    compressionStats: CompressionStats;
    isHydrated: boolean;
}

export function StatisticsPanel({ stats, compressionStats, isHydrated }: StatisticsPanelProps) {
    if (!isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-white">Загрузка...</span>
            </div>
        );
    }

    const totalTokens = stats.inputTokens + stats.outputTokens;
    const avgInputPerMessage = stats.totalMessages > 0 
        ? Math.round(stats.inputTokens / (stats.totalMessages / 2)) 
        : 0;
    const avgOutputPerMessage = stats.totalMessages > 0 
        ? Math.round(stats.outputTokens / (stats.totalMessages / 2)) 
        : 0;

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ru-RU').format(num);
    };

    const formatCost = (cost: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 6,
        }).format(cost);
    };

    const getQualityColor = (quality: 'HIGH' | 'MEDIUM' | 'LOW') => {
        switch (quality) {
            case 'HIGH': return 'text-green-600';
            case 'MEDIUM': return 'text-yellow-600';
            case 'LOW': return 'text-red-600';
        }
    };

    const getQualityLabel = (quality: 'HIGH' | 'MEDIUM' | 'LOW') => {
        switch (quality) {
            case 'HIGH': return 'Высокое';
            case 'MEDIUM': return 'Среднее';
            case 'LOW': return 'Низкое';
        }
    };

    const getGradeColor = (grade: string) => {
        if (grade === 'A+') return 'text-green-600';
        if (grade === 'A') return 'text-green-500';
        if (grade === 'A-') return 'text-green-400';
        if (grade === 'B+') return 'text-blue-600';
        if (grade === 'B') return 'text-blue-500';
        if (grade === 'C') return 'text-yellow-600';
        if (grade === 'D') return 'text-red-600';
        return 'text-gray-600'; // F
    };

    const compressionRatio = compressionStats.originalTokens > 0
        ? (compressionStats.compressedTokens / compressionStats.originalTokens).toFixed(2)
        : '0.00';

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-[450px] mx-auto px-4">
                <div className="flex flex-col h-[calc(100vh-64px)] gap-4">
                    {/* Header Card */}
                    <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                        <div className="h-16 flex items-center justify-between px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center shadow-lg">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-white">
                                        Статистика
                                    </h2>
                                    <p className="text-xs text-white opacity-80">Использование токенов</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Stats Cards */}
                    <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin">

                        {/* Compression Stats Card v2.0 */}
                        {compressionStats.totalCompressions > 0 && (
                            <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.5s' }}>
                                <div className="mb-4 pb-4 border-b-2 border-amber-200">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                                            <span className="text-2xl">🗜️</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-amber-900">КОМПРЕССИЯ v4.0 ULTRA</h3>
                                            <p className="text-xs text-amber-700">с жёстким контролем качества</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 font-mono text-sm">
                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">Всего сообщений:</span>
                                        <span className="font-bold text-amber-900">{formatNumber(stats.totalMessages)}</span>
                                    </div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">Активных блоков сжатия:</span>
                                        <span className="font-bold text-amber-900">{formatNumber(compressionStats.totalCompressions)}</span>
                                    </div>

                                    <div className="my-2 border-t border-amber-300"></div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">Исходный объём:</span>
                                        <span className="font-bold text-amber-900">~{formatNumber(compressionStats.originalTokens)} токенов</span>
                                    </div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">После сжатия:</span>
                                        <span className="font-bold text-amber-900">~{formatNumber(compressionStats.compressedTokens)} токенов</span>
                                    </div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">Коэффициент сжатия:</span>
                                        <span className="font-bold text-amber-900">{compressionRatio}x</span>
                                    </div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300">
                                        <span className="text-gray-700">Экономия:</span>
                                        <span className="font-bold text-green-700">
                                            {((compressionStats.savedTokens / compressionStats.originalTokens) * 100).toFixed(1)}% ({formatNumber(compressionStats.savedTokens)} токенов)
                                        </span>
                                    </div>

                                    <div className="my-2 border-t border-amber-300"></div>

                                    {/* Метрики качества v4.0 ULTRA */}
                                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-orange-50 border border-orange-200">
                                        <div className="text-xs font-bold text-orange-900 mb-1 uppercase">🎯 Качество сохранения v4.0:</div>
                                        <div className="text-xs text-orange-600 mb-3">Целевая оценка: A+ (95%+) • &lt;5% потерь</div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-700">Конкретные данные:</span>
                                                <span className="text-sm font-bold text-blue-700">{compressionStats.dataQuality}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${compressionStats.dataQuality}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-700">Причинные связи:</span>
                                                <span className="text-sm font-bold text-purple-700">{compressionStats.logicQuality}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${compressionStats.logicQuality}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-700">Эмоциональный тон:</span>
                                                <span className="text-sm font-bold text-pink-700">{compressionStats.emotionalTone}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-pink-400 to-orange-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${compressionStats.emotionalTone}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-700">Открытые темы:</span>
                                                <span className="text-sm font-bold text-orange-700">{compressionStats.contextPreservation}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${compressionStats.contextPreservation}%` }}
                                                ></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-700">Намерения юзера:</span>
                                                <span className="text-sm font-bold text-teal-700">{compressionStats.intentPreservation}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000"
                                                    style={{ width: `${compressionStats.intentPreservation}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="my-2 border-t border-amber-300"></div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-to-r from-purple-100 to-orange-100 border border-orange-200">
                                        <span className="text-gray-700">ОБЩАЯ ОЦЕНКА:</span>
                                        <span className={`font-bold text-xl ${getGradeColor(compressionStats.overallGrade)}`}>
                                            {compressionStats.overallGrade}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-2 rounded-lg bg-white bg-opacity-60">
                                        <span className="text-gray-700">Потеря информации:</span>
                                        <span className={`font-bold ${compressionStats.informationLoss < 15 ? 'text-green-600' : compressionStats.informationLoss < 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                                            {compressionStats.informationLoss}%
                                        </span>
                                    </div>

                                    {/* v4.0 ULTRA: Автокомментарий системы */}
                                    <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-orange-50 border border-orange-200">
                                        <div className="text-xs font-bold text-orange-900 mb-2">📝 Комментарий системы v4.0:</div>
                                        <div className="text-xs text-gray-700">
                                            {(() => {
                                                const avgScore = Math.round(
                                                    compressionStats.dataQuality * 0.25 +
                                                    compressionStats.logicQuality * 0.20 +
                                                    compressionStats.emotionalTone * 0.15 +
                                                    compressionStats.contextPreservation * 0.20 +
                                                    compressionStats.intentPreservation * 0.20
                                                );
                                                if (avgScore >= 95) return '🏆 Идеальное сжатие! Контекст полностью сохранён. Можно продолжать диалог без потерь.';
                                                if (avgScore >= 90) return '🏆 Отличная работа! Минимальные потери информации. Качество сжатия выше целевого.';
                                                if (avgScore >= 85) return '✅ Отличная работа, минимальные потери. Система работает корректно.';
                                                if (avgScore >= 80) return '✅ Качество в норме, но есть пространство для улучшения.';
                                                if (avgScore >= 70) return '⚠️ Приемлемо, но есть пробелы. Рекомендуется доработка алгоритма.';
                                                if (avgScore >= 60) return '⚠️ Заметные потери информации. Требуется улучшение.';
                                                return '❌ КРИТИЧЕСКИЕ ПОТЕРИ! Качество неприемлемо низкое. Автокоррекция не помогла.';
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                {/* Overall Progress bar */}
                                <div className="mt-4 pt-4 border-t-2 border-amber-200">
                                    <div className="text-xs text-gray-600 mb-2 font-semibold">Эффективность сжатия</div>
                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                                            style={{ width: `${((compressionStats.savedTokens / compressionStats.originalTokens) * 100)}%` }}
                                        >
                                            <span className="text-xs text-white font-bold drop-shadow">
                                                {((compressionStats.savedTokens / compressionStats.originalTokens) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {totalTokens === 0 && (
                            <div className="glass-effect rounded-2xl p-8 shadow-xl border border-white border-opacity-20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                                    <span className="text-4xl">📭</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Пока нет данных</h3>
                                <p className="text-sm text-gray-500">
                                    Начните диалог, чтобы увидеть статистику
                                </p>
                            </div>
                        )}

                        {/* Total Tokens Card */}
                        <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-slide-up hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-orange-500 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">🔢</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Всего токенов</h3>
                                </div>
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-orange-600 bg-clip-text text-transparent">
                                {formatNumber(totalTokens)}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2">
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">Входящие</div>
                                    <div className="text-sm font-semibold text-gray-700">{formatNumber(stats.inputTokens)}</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 mb-1">Исходящие</div>
                                    <div className="text-sm font-semibold text-gray-700">{formatNumber(stats.outputTokens)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Cost Card */}
                        <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.1s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Стоимость</h3>
                                </div>
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                {formatCost(stats.cost)}
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                Общая стоимость за все сообщения
                            </div>
                        </div>

                        {/* Messages Card */}
                        <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-orange-500 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Сообщения</h3>
                                </div>
                            </div>
                            <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-600 bg-clip-text text-transparent">
                                {formatNumber(stats.totalMessages)}
                            </div>
                            <div className="mt-3 text-xs text-gray-500">
                                Всего отправлено и получено
                            </div>
                        </div>

                        {/* Average Stats Card */}
                        <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Средние значения</h3>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-50 to-red-50">
                                    <span className="text-sm text-gray-600">Входящие за сообщение</span>
                                    <span className="text-lg font-bold text-orange-600">{formatNumber(avgInputPerMessage)}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50">
                                    <span className="text-sm text-gray-600">Исходящие за сообщение</span>
                                    <span className="text-lg font-bold text-red-600">{formatNumber(avgOutputPerMessage)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Token Distribution Visualization */}
                        {totalTokens > 0 && (
                            <div className="glass-effect rounded-2xl p-6 shadow-xl border border-white border-opacity-20 animate-slide-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.4s' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg">
                                        <span className="text-2xl">📊</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Распределение токенов</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Входящие</span>
                                            <span className="text-sm font-semibold text-purple-600">
                                                {((stats.inputTokens / totalTokens) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(stats.inputTokens / totalTokens) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-600">Исходящие</span>
                                            <span className="text-sm font-semibold text-pink-600">
                                                {((stats.outputTokens / totalTokens) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(stats.outputTokens / totalTokens) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

