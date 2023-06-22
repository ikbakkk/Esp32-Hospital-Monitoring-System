'use client';

import timeFormatter from '@/utils/timeFormatter';
import { useState, useEffect, FC } from 'react';

const Clock: FC = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = new Date(time).toLocaleTimeString();

  return <span>{formattedTime}</span>;
};

export default Clock;
