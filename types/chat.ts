export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isCompressed?: boolean;
  compressedRange?: {
    start: number;
    end: number;
  };
}

export interface ChatStats {
  inputTokens: number;
  outputTokens: number;
  cost: number;
  totalMessages: number;
}

export interface CompressionStats {
  totalCompressions: number;
  originalTokens: number;
  compressedTokens: number;
  savedTokens: number;
  compressionRatio: number;
  contextQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  // v4.0 ULTRA: СМЫСЛОВЫЕ метрики с жёстким контролем
  dataQuality: number; // % сохранения конкретных данных
  logicQuality: number; // % сохранения причинных связей
  emotionalTone: number; // v4.0: % сохранения эмоционального тона
  contextPreservation: number; // % сохранения открытых тем
  intentPreservation: number; // v4.0: % сохранения намерений пользователя
  overallGrade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C' | 'D' | 'F'; // Расширенная шкала
  informationLoss: number; // % потери информации
}

export interface UserProfile {
  preferredDetailLevel: 'brief' | 'detailed' | 'comprehensive';
  communicationStyle: string[];
  expertiseLevel: 'beginner' | 'intermediate' | 'expert';
  interests: string[];
  satisfactionIndicators: ('satisfied' | 'neutral' | 'dissatisfied')[];
}

export interface StreamChunk {
  content?: string;
  done?: boolean;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

