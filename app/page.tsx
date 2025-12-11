'use client';

import { useState } from 'react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { StatisticsPanel } from '@/components/chat/StatisticsPanel';
import { ChatStats } from '@/types/chat';

const initialStats: ChatStats = {
  inputTokens: 0,
  outputTokens: 0,
  cost: 0,
  totalMessages: 0,
};

export default function Home() {
  const [stats, setStats] = useState<ChatStats>(initialStats);
  const [isHydrated, setIsHydrated] = useState(false);

  const handleStatsChange = (newStats: ChatStats, hydrated: boolean) => {
    setStats(newStats);
    setIsHydrated(hydrated);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex-1 lg:flex-shrink-0">
        <ChatContainer onStatsChange={handleStatsChange} />
      </div>
      <div className="w-full lg:w-[500px] lg:border-l border-gray-200 lg:flex-shrink-0">
        <StatisticsPanel stats={stats} isHydrated={isHydrated} />
      </div>
    </div>
  );
}
