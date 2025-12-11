'use client';

import { useState } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { StatisticsPanel } from '@/components/chat/StatisticsPanel';
import { ChatStats, CompressionStats } from '@/types/chat';

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

export default function Home() {
  const [stats, setStats] = useState<ChatStats>(initialStats);
  const [compressionStats, setCompressionStats] = useState<CompressionStats>(initialCompressionStats);
  const [isHydrated, setIsHydrated] = useState(false);

  const handleStatsChange = (
    data: { stats: ChatStats; compressionStats: CompressionStats },
    hydrated: boolean
  ) => {
    setStats(data.stats);
    setCompressionStats(data.compressionStats);
    setIsHydrated(hydrated);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex-1 lg:flex-shrink-0">
        <ChatContainer onStatsChange={handleStatsChange} />
      </div>
      <div className="w-full lg:w-[500px] lg:flex-shrink-0">
        <StatisticsPanel 
          stats={stats} 
          compressionStats={compressionStats}
          isHydrated={isHydrated} 
        />
      </div>
    </div>
  );
}
