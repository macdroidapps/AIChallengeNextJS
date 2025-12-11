// DeepSeek pricing (per token)
export const PRICING = {
  INPUT_COST_PER_TOKEN: 0.000028,  // cache hit rate
  OUTPUT_COST_PER_TOKEN: 0.00042,
} as const;

export const STORAGE_KEYS = {
  MESSAGES: 'deepseek_chat_messages',
  STATS: 'deepseek_chat_stats',
  COMPRESSION_STATS: 'deepseek_compression_stats',
} as const;

export const API_CONFIG = {
  MODEL: 'deepseek-chat',
  ENDPOINT: 'https://api.deepseek.com/v1/chat/completions',
  MAX_TOKENS: 2048,
} as const;

