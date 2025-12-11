'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatStats, CompressionStats } from '@/types/chat';
import { useLocalStorage } from './useLocalStorage';
import { 
  generateId, 
  calculateCost, 
  shouldCompress, 
  compressMessages,
  evaluateContextQuality 
} from '@/lib/utils';
import { STORAGE_KEYS } from '@/lib/constants';

const initialStats: ChatStats = {
  inputTokens: 0,
  outputTokens: 0,
  cost: 0,
  totalMessages: 0,
};

const initialCompressionStats: CompressionStats = {
  totalCompressions: 0,
  originalTokens: 0,
  compressedTokens: 0,
  savedTokens: 0,
  compressionRatio: 0,
  contextQuality: 'HIGH',
  dataQuality: 100,
  logicQuality: 100,
  emotionalTone: 100, // v4.0 ULTRA
  contextPreservation: 100,
  intentPreservation: 100, // v4.0 ULTRA
  overallGrade: 'A+',
  informationLoss: 0,
};

export function useChat() {
  const {
    value: messages,
    setValue: setMessages,
    clearValue: clearMessages,
    isHydrated,
  } = useLocalStorage<Message[]>(STORAGE_KEYS.MESSAGES, []);

  const {
    value: stats,
    setValue: setStats,
    clearValue: clearStats,
  } = useLocalStorage<ChatStats>(STORAGE_KEYS.STATS, initialStats);

  const {
    value: compressionStats,
    setValue: setCompressionStats,
    clearValue: clearCompressionStats,
  } = useLocalStorage<CompressionStats>(STORAGE_KEYS.COMPRESSION_STATS, initialCompressionStats);

  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [showCompressionNotification, setShowCompressionNotification] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Автоматическая компрессия при достижении порога (v2.0)
  useEffect(() => {
    if (!isHydrated || messages.length === 0) return;

    if (shouldCompress(messages)) {
      const { compressedMessages, stats: compressionResult } = compressMessages(messages);
      
      if (compressionResult.originalTokens > 0) {
        setMessages(compressedMessages);
        
        // Обновляем статистику компрессии с расширенными метриками
        const newTotalOriginal = compressionStats.originalTokens + compressionResult.originalTokens;
        const newTotalCompressed = compressionStats.compressedTokens + compressionResult.compressedTokens;
        const newSavedTokens = newTotalOriginal - newTotalCompressed;
        const ratio = newTotalOriginal > 0 ? newTotalCompressed / newTotalOriginal : 0;
        
        // Усредняем метрики качества (v4.0 ULTRA с расширенными метриками)
        const totalComps = compressionStats.totalCompressions + 1;
        const avgDataQuality = Math.round(
          (compressionStats.dataQuality * compressionStats.totalCompressions + compressionResult.dataQuality) / totalComps
        );
        const avgLogicQuality = Math.round(
          (compressionStats.logicQuality * compressionStats.totalCompressions + compressionResult.logicQuality) / totalComps
        );
        const avgEmotionalTone = Math.round(
          (compressionStats.emotionalTone * compressionStats.totalCompressions + compressionResult.emotionalTone) / totalComps
        );
        const avgContextPreservation = Math.round(
          (compressionStats.contextPreservation * compressionStats.totalCompressions + compressionResult.contextPreservation) / totalComps
        );
        const avgIntentPreservation = Math.round(
          (compressionStats.intentPreservation * compressionStats.totalCompressions + compressionResult.intentPreservation) / totalComps
        );
        const avgInformationLoss = Math.round(
          (compressionStats.informationLoss * compressionStats.totalCompressions + compressionResult.informationLoss) / totalComps
        );
        
        setCompressionStats({
          totalCompressions: totalComps,
          originalTokens: newTotalOriginal,
          compressedTokens: newTotalCompressed,
          savedTokens: newSavedTokens,
          compressionRatio: ratio,
          contextQuality: evaluateContextQuality(
            avgDataQuality, 
            avgLogicQuality, 
            avgEmotionalTone,
            avgContextPreservation,
            avgIntentPreservation
          ),
          dataQuality: avgDataQuality,
          logicQuality: avgLogicQuality,
          emotionalTone: avgEmotionalTone,
          contextPreservation: avgContextPreservation,
          intentPreservation: avgIntentPreservation,
          overallGrade: compressionResult.overallGrade,
          informationLoss: avgInformationLoss,
        });

        // Показываем уведомление
        setShowCompressionNotification(true);
        setTimeout(() => setShowCompressionNotification(false), 3000);
      }
    }
  }, [messages, isHydrated]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Create user message
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: content.trim(),
        timestamp: Date.now(),
      };

      // Add user message to history
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);
      setStreamingContent('');

      // Prepare for streaming
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/deepseek', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch response');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No reader available');
        }

        let fullContent = '';
        let usage = { prompt_tokens: 0, completion_tokens: 0 };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                }
                if (parsed.usage) {
                  usage = parsed.usage;
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        // Create assistant message
        const assistantMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: fullContent || 'Не удалось получить ответ',
          timestamp: Date.now(),
        };

        setMessages([...updatedMessages, assistantMessage]);
        setStreamingContent('');

        // Update stats
        const cost = calculateCost(usage.prompt_tokens, usage.completion_tokens);
        setStats((prev) => ({
          inputTokens: prev.inputTokens + usage.prompt_tokens,
          outputTokens: prev.outputTokens + usage.completion_tokens,
          cost: prev.cost + cost,
          totalMessages: prev.totalMessages + 2,
        }));
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }

        const errorMessage: Message = {
          id: generateId(),
          role: 'assistant',
          content: 'Произошла ошибка при соединении с DeepSeek. Попробуйте ещё раз.',
          timestamp: Date.now(),
        };

        setMessages([...updatedMessages, errorMessage]);
        setStreamingContent('');
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [messages, setMessages, setStats, isLoading]
  );

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setStreamingContent('');
  }, []);

  const clearChat = useCallback(() => {
    clearMessages();
    clearStats();
    clearCompressionStats();
    setStreamingContent('');
    setShowCompressionNotification(false);
  }, [clearMessages, clearStats, clearCompressionStats]);

  return {
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
  };
}

