'use client';

import { Message } from '@/types/chat';

interface ChatMessageProps {
    message: Message;
}

/**
 * Компонент сообщения
 * - AI: слева, светлый пузырь с тенью, текст темный
 * - User: справа, градиентный пузырь, текст белый
 * - Compressed: системное сообщение с особым стилем
 */
export function ChatMessage({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';
    const isCompressed = message.isCompressed && message.role === 'system';

    // Сжатое сообщение v2.0 - иерархический стиль
    if (isCompressed) {
        // Извлечение номера блока из содержимого
        const blockMatch = message.content.match(/COMPRESSED_BLOCK #(\d+)/);
        const blockNumber = blockMatch ? blockMatch[1] : '?';

        return (
            <div className="flex justify-center animate-fade-in my-3">
                <div className="rounded-2xl px-5 py-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 max-w-[92%] shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b-2 border-amber-200">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                            <span className="text-lg">🗜️</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                                Compressed Block #{blockNumber}
                            </div>
                            {message.compressedRange && (
                                <div className="text-xs text-amber-700 mt-0.5">
                                    Сообщения #{message.compressedRange.start}-#{message.compressedRange.end}
                                </div>
                            )}
                        </div>
                        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-200 to-orange-200 text-xs font-semibold text-orange-900">
                            v4.0 ULTRA 🚀
                        </div>
                    </div>
                    <div className="text-xs leading-relaxed whitespace-pre-wrap break-words text-gray-800 font-mono bg-white bg-opacity-60 p-3 rounded-lg shadow-inner border border-amber-100">
                        {message.content}
                    </div>
                    <div className="mt-2 text-xs text-amber-700 font-medium">
                        💡 Смысловое сжатие v4.0 ULTRA • Целевое качество: A+ (95%+) • &#60;5% потерь
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex animate-fade-in ${
                isUser ? 'justify-end' : 'justify-start'
            }`}
        >
            {/* Пузырь */}
            <div
                className={`rounded-3xl px-5 py-3.5 relative overflow-hidden max-w-[85%] ${
                    isUser
                        ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-xl'
                        : 'bg-white text-gray-900 shadow-lg border border-gray-100'
                }`}
            >
                {/* Subtle gradient overlay для user messages */}
                {isUser && (
                    <div className="absolute inset-0 bg-white bg-opacity-10 pointer-events-none"></div>
                )}

                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words relative z-10">
                    {message.content}
                </p>

                {/* Timestamp (опционально) */}
                {message.timestamp && (
                    <div className={`text-xs mt-2 ${
                        isUser ? 'text-white text-opacity-80' : 'text-gray-500'
                    }`}>
                        {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

interface StreamingMessageProps {
    content: string;
}

/** Стриминг-сообщение AI с мигающим курсором */
export function StreamingMessage({ content }: StreamingMessageProps) {
    return (
        <div className="flex justify-start animate-fade-in">
            {/* Пузырь */}
            <div className="rounded-3xl px-5 py-3.5 bg-white text-gray-900 shadow-lg border border-gray-100 max-w-[85%]">
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                    {content}
                    <span className="inline-block w-0.5 h-4 ml-1 bg-gradient-to-b from-purple-400 to-orange-500 animate-pulse align-middle rounded-full" />
                </p>
            </div>
        </div>
    );
}

/** Индикатор «печатает...» */
export function TypingIndicator() {
    return (
        <div className="flex justify-start animate-fade-in">
            {/* Точки */}
            <div className="rounded-3xl px-6 py-4 bg-white shadow-lg border border-gray-100">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-orange-500 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-orange-500 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-orange-500 animate-bounce [animation-delay:300ms]" />
                </div>
            </div>
        </div>
    );
}