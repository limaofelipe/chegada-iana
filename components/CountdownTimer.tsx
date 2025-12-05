import React, { useState, useEffect, useCallback } from 'react';
import { TimeLeft } from '../types';
import { Clock, PartyPopper } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60))), // Absolute hours left
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (timeLeft.isExpired) {
    return (
      <div className="text-center animate-bounce">
        <PartyPopper size={64} className="mx-auto mb-4 text-yellow-300" />
        <h2 className="text-3xl font-bold mb-2">Ela Chegou!</h2>
        <p className="text-xl opacity-90">Bem-vinda a Fortaleza, Iana!</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-6 opacity-80">
        <Clock size={20} />
        <span className="uppercase tracking-widest text-sm font-semibold">Tempo Restante</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 text-center w-full">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] shadow-inner border border-white/10">
            <span className="text-3xl sm:text-4xl md:text-7xl font-bold font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm mt-2 uppercase tracking-wider font-medium">Horas</span>
        </div>

        <div className="text-3xl sm:text-4xl md:text-6xl font-bold self-start mt-2 sm:mt-4 opacity-50 hidden sm:block">:</div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] shadow-inner border border-white/10">
            <span className="text-3xl sm:text-4xl md:text-7xl font-bold font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm mt-2 uppercase tracking-wider font-medium">Minutos</span>
        </div>

        <div className="text-3xl sm:text-4xl md:text-6xl font-bold self-start mt-2 sm:mt-4 opacity-50 hidden sm:block">:</div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] shadow-inner border border-white/10">
            <span className="text-3xl sm:text-4xl md:text-7xl font-bold font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs md:text-sm mt-2 uppercase tracking-wider font-medium">Segundos</span>
        </div>
      </div>
    </div>
  );
};