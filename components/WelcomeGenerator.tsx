import React, { useState } from 'react';
import { Sparkles, MessageCircleHeart, RefreshCw } from 'lucide-react';
import { generateWelcomeMessage, generateFunFact } from '../services/geminiService';
import { GeneratorStatus } from '../types';

export const WelcomeGenerator: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);
  const [mode, setMode] = useState<'welcome' | 'fact'>('welcome');

  const handleGenerate = async (selectedMode: 'welcome' | 'fact') => {
    setMode(selectedMode);
    setStatus(GeneratorStatus.LOADING);
    setMessage(""); // Clear previous message
    
    try {
      let result = "";
      if (selectedMode === 'welcome') {
        result = await generateWelcomeMessage();
      } else {
        result = await generateFunFact();
      }
      setMessage(result);
      setStatus(GeneratorStatus.SUCCESS);
    } catch (e) {
      setMessage("Não foi possível conectar com a inspiração agora. Tente novamente!");
      setStatus(GeneratorStatus.ERROR);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 opacity-90">
        <Sparkles size={20} className="text-yellow-200" />
        <span className="uppercase tracking-widest text-sm font-semibold">Assistente de Recepção</span>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        {status === GeneratorStatus.IDLE && (
          <div className="space-y-4">
            <p className="text-lg opacity-90">
              Prepare-se para a chegada! Use a IA para criar algo especial.
            </p>
          </div>
        )}

        {status === GeneratorStatus.LOADING && (
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm opacity-80">Consultando as musas de Fortaleza...</p>
          </div>
        )}

        {status === GeneratorStatus.SUCCESS && (
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 shadow-inner w-full animate-fade-in">
             <p className="text-lg italic leading-relaxed font-serif">"{message}"</p>
          </div>
        )}

        {status === GeneratorStatus.ERROR && (
           <div className="text-red-200 bg-red-500/20 p-4 rounded-lg">
             {message}
           </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        <button
          onClick={() => handleGenerate('welcome')}
          disabled={status === GeneratorStatus.LOADING}
          className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-400 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1"
        >
          <MessageCircleHeart size={18} />
          <span>Mensagem de Afeto</span>
        </button>
        
        <button
          onClick={() => handleGenerate('fact')}
          disabled={status === GeneratorStatus.LOADING}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
        >
          <RefreshCw size={18} className={status === GeneratorStatus.LOADING && mode === 'fact' ? "animate-spin" : ""} />
          <span>Curiosidade Local</span>
        </button>
      </div>
    </div>
  );
};