'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { SendIcon, StopIcon } from '@/components/ui/icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

/**
 * Поле ввода сообщения
 * - Textarea авторасширяется до 5 строк (~120px)
 * - Enter отправляет, Shift+Enter — новая строка
 */
export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Авторесайз textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`; // max ~5 строк
  }, [value]);

  // Автофокус после отправки
  useEffect(() => {
    if (!isLoading && !disabled) {
      textareaRef.current?.focus();
    }
  }, [isLoading, disabled]);

  const handleSubmit = () => {
    if (!value.trim() || isLoading || disabled) return;
    onSend(value);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-5 bg-white border-t border-gray-200">
      <div className="flex items-end gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            placeholder="Напишите сообщение... (Enter — отправить)"
            rows={1}
            className="w-full resize-none rounded-2xl py-3.5 px-5 text-[15px]
                       border-2 border-gray-200 text-gray-900 bg-white
                       focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20
                       transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-sm hover:shadow-md hover:border-gray-300"
          />
          {/* Subtle gradient border effect on focus */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 opacity-0 -z-10 blur-lg transition-opacity duration-200 peer-focus:opacity-30"></div>
        </div>

        {isLoading ? (
          <button
            onClick={onStop}
            className="group flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center
                       bg-gradient-to-br from-red-500 to-red-600 text-white
                       hover:from-red-600 hover:to-red-700
                       shadow-lg hover:shadow-xl
                       transition-all duration-200 hover:scale-105 active:scale-95"
            title="Остановить"
          >
            <StopIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className="group flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center
                       bg-gradient-to-br from-purple-400 via-pink-400 to-orange-500 text-white
                       hover:from-purple-500 hover:via-pink-500 hover:to-orange-600
                       shadow-lg hover:shadow-xl
                       transition-all duration-200 hover:scale-105 active:scale-95
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-lg"
            title="Отправить"
          >
            <SendIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
