'use client';

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatMessage, StreamingMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { WelcomeMessage } from './WelcomeMessage';
import { CompressionStatsModal } from './CompressionStatsModal';

interface ChatContainerProps {
    onStatsChange?: (stats: any, isHydrated: boolean) => void;
}

export function ChatContainer({ onStatsChange }: ChatContainerProps) {
    const {
        messages,
        stats,
        compressionStats,
        isLoading,
        streamingContent,
        isHydrated,
        showCompressionNotification,
        sendMessage,
        stopGeneration,
        clearChat,
    } = useChat();

    const [showStatsModal, setShowStatsModal] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent]);

    useEffect(() => {
        if (onStatsChange) {
            onStatsChange({ stats, compressionStats }, isHydrated);
        }
    }, [stats, compressionStats, isHydrated, onStatsChange]);

    if (!isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-white">Загрузка...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-[900px] mx-auto px-4">
                {/* Окно чата с glassmorphism эффектом */}
                <div className="flex flex-col h-[calc(100vh-64px)] glass-effect rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
                    {/* Header с градиентом */}
                    <header className="h-16 flex items-center justify-between px-6 border-b border-white border-opacity-30 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white bg-opacity-20 flex items-center justify-center shadow-lg">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-white">
                                    AI Ассистент
                                </h1>
                                <p className="text-xs text-white opacity-80">Всегда готов помочь</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg"></div>
                                <span className="text-sm text-white opacity-90 font-medium">Онлайн</span>
                            </div>
                            
                            {compressionStats.totalCompressions > 0 && (
                                <button
                                    onClick={() => setShowStatsModal(true)}
                                    className="group relative px-3 py-2 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 
                                               text-white text-sm font-medium transition-all duration-200 
                                               hover:scale-105 active:scale-95 border border-white border-opacity-20 
                                               hover:border-opacity-30 shadow-lg"
                                    title="Детальная статистика v4.0 ULTRA"
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">📊</span>
                                        <span className="hidden sm:inline">Статистика</span>
                                    </span>
                                </button>
                            )}
                            
                            {messages.length > 0 && (
                                <button
                                    onClick={() => {
                                        if (window.confirm('Вы уверены, что хотите очистить весь чат?')) {
                                            clearChat();
                                            setShowWelcome(true);
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="group relative px-3 py-2 rounded-xl bg-white bg-opacity-10 hover:bg-opacity-20 
                                               text-white text-sm font-medium transition-all duration-200 
                                               hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed 
                                               disabled:hover:scale-100 border border-white border-opacity-20 
                                               hover:border-opacity-30 shadow-lg"
                                    title="Очистить чат"
                                >
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="hidden sm:inline">Очистить</span>
                                    </span>
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Сообщения */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin bg-gradient-to-b from-gray-50 to-white">
                        {messages.length === 0 && !isLoading ? (
                            showWelcome ? (
                                <WelcomeMessage 
                                    onStartDemo={() => {
                                        setShowWelcome(false);
                                        // Запуск демо-режима
                                        sendMessage('Привет! Меня зовут Джек. Хочу протестировать систему сжатия.');
                                    }}
                                />
                            ) : (
                                <EmptyState onSuggestionClick={sendMessage} />
                            )
                        ) : (
                            <>
                                {messages.map((m) => (
                                    <ChatMessage key={m.id} message={m} />
                                ))}

                                {isLoading && streamingContent && (
                                    <StreamingMessage content={streamingContent} />
                                )}

                                {isLoading && !streamingContent && <TypingIndicator />}
                            </>
                        )}

                        <div ref={endRef} />
                    </div>

                    {/* Input */}
                    <ChatInput
                        onSend={sendMessage}
                        onStop={stopGeneration}
                        isLoading={isLoading}
                    />
                </div>

                {/* Compression Notification v4.0 ULTRA */}
                {showCompressionNotification && (
                    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
                        <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-2 border-white">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-2xl">🧠</span>
                                <span className="font-bold text-lg">v4.0 ULTRA — СМЫСЛОВОЕ сжатие!</span>
                            </div>
                            <div className="text-sm text-white text-opacity-90 ml-9">
                                Извлечена суть • Намерения сохранены • Контекст понят
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Modal */}
                <CompressionStatsModal
                    stats={compressionStats}
                    totalMessages={stats.totalMessages}
                    isOpen={showStatsModal}
                    onClose={() => setShowStatsModal(false)}
                />
            </div>
        </div>
    );
}

interface EmptyStateProps {
    onSuggestionClick: (text: string) => void;
}

function EmptyState({ onSuggestionClick }: EmptyStateProps) {
    const suggestions = [
        { text: 'Привет! Расскажи о себе', icon: '👋' },
        { text: 'Как работает React?', icon: '⚛️' },
        { text: 'Напиши функцию сортировки', icon: '💻' },
        { text: 'Что такое TypeScript?', icon: '📘' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-500 flex items-center justify-center text-5xl shadow-2xl animate-pulse-ring">
                    🤖
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-400 to-orange-500 blur-xl opacity-50 animate-pulse"></div>
            </div>

            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-600 bg-clip-text text-transparent">
                Привет! Я AI Ассистент
            </h2>
            <p className="text-center mb-8 text-gray-600 text-lg">
                Задайте мне любой вопрос, и я с радостью помогу
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full px-4">
                {suggestions.map(({ text, icon }) => (
                    <button
                        key={text}
                        onClick={() => onSuggestionClick(text)}
                        className="group relative px-5 py-4 rounded-2xl text-sm bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:shadow-lg transition-all duration-300 text-left overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center gap-3">
                            <span className="text-2xl">{icon}</span>
                            <span className="font-medium">{text}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}