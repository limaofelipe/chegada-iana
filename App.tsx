import React, { useState, useEffect } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { MapPin, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set the target date to today at 6:40 PM (18:40)
    const now = new Date();
    const target = new Date(now);
    target.setHours(18, 40, 0, 0);
    setTargetDate(target);
  }, []);

  if (!targetDate) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-4 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
      </div>

      <div className="z-10 w-full max-w-3xl flex flex-col items-center gap-8">
        
        {/* Header Section */}
        <header className="text-center space-y-2 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-lg mb-4">
            <MapPin size={16} className="text-yellow-200" />
            <span className="text-sm font-medium tracking-wide">Fortaleza, CE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-md">
            A Chegada da Iana
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light">
            Contando os segundos para o reencontro hoje às 18:40
          </p>
        </header>

        {/* Timer Card - Centered and Responsive */}
        <div className="w-full glass rounded-3xl p-6 md:p-12 flex flex-col items-center justify-center shadow-2xl min-h-[300px] transition-transform hover:scale-[1.01] duration-300 relative">
            <div className="absolute top-4 right-4">
              <Sun className="text-yellow-300 opacity-80" size={32} />
            </div>
            <CountdownTimer targetDate={targetDate} />
        </div>

        {/* Footer */}
        <footer className="mt-8 text-white/60 text-sm">
          <p>Feito com ❤️ esperando a Iana</p>
        </footer>
      </div>
    </div>
  );
};

export default App;