'use client';

import { useEffect } from 'react';

interface GenerateTimeProps {
  onUserIdGenerated: (userId: string) => void;
}

function GenerateTime({ onUserIdGenerated }: GenerateTimeProps) {
  useEffect(() => {
    const generatedUserId = Date.now().toString();
    onUserIdGenerated(generatedUserId);
  }, [onUserIdGenerated]);

  return null;
}

export default GenerateTime;