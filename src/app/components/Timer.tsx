import { useAppContext } from '@/context/Context';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // Initial time in seconds
}

const Timer = ({ initialTime }: TimerProps) => {

  const { isTimeUp, setIsTimeUp } = useAppContext();

  const getInitialTime = () => {

    if (typeof window !== "undefined") {
      const storedTimeStr = sessionStorage.getItem('currentTimer');
      return storedTimeStr ? parseInt(storedTimeStr, 10) : initialTime;
    }
    return initialTime;
    // const storedTime = sessionStorage.getItem('currentTimer');
    // return storedTime && parseInt(storedTime) !== 0 ? parseInt(storedTime) : initialTime;
  };

  const [time, setTime] = useState(getInitialTime());

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          sessionStorage.setItem('currentTimer', newTime.toString());
          return newTime;
        });
      }
    }, 1000);

    if (time === 0) {
      setIsTimeUp(true);
    }

    return () => clearInterval(timer);
  }, [time, setIsTimeUp]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  };

  return (
    <div>{`Time: ${formatTime(time)}`}</div>
  );
};

export default Timer;
