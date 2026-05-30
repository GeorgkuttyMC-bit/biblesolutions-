import { useState } from 'react';
import { History, PlayCircle, Map, MousePointerClick, Volume2, Square, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../translations';

export function JourneyTimeline({ language, ttsEnabled }: { language: string, ttsEnabled: boolean }) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const t = translations[language].journey;
  const timelineData = t.timeline;

  const playAudio = (e: React.MouseEvent | null, text: string) => {
    if (e) e.stopPropagation();
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (language === 'German') utterance.lang = 'de-DE';
      else if (language === 'Malayalam') utterance.lang = 'ml-IN';
      else utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error(err);
    }
  };

  const stopAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="relative bg-gradient-to-r from-amber-700 to-orange-600 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20">
            <History className="w-12 h-12" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t.title}</h2>
            <p className="text-amber-100 text-lg">{t.subtitle}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* How to use section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><Map className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[0].title}</p>
            <p className="text-sm text-slate-500">{t.steps[0].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><MousePointerClick className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[1].title}</p>
            <p className="text-sm text-slate-500">{t.steps[1].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><Volume2 className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[2].title}</p>
            <p className="text-sm text-slate-500">{t.steps[2].desc}</p>
          </div>
        </div>
      </div>

      <div className="relative pl-8 md:pl-0 mt-8">
        {/* Central timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-100 transform md:-translate-x-1/2 rounded-full"></div>
        
        <div className="space-y-16">
          {timelineData.map((node, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeNode === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content Side */}
                <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  <div 
                    onClick={() => {
                      if (activeNode === index) {
                        setActiveNode(null);
                        window.speechSynthesis.cancel();
                      } else {
                        setActiveNode(index);
                        playAudio(null, `${node.title}. ${node.desc}. ${node.details}`);
                      }
                    }}
                    className={`bg-white p-8 rounded-3xl border-2 transition-all cursor-pointer w-full max-w-md ${isActive ? 'border-amber-500 shadow-xl ring-4 ring-amber-50 scale-105 z-10' : 'border-slate-100 shadow-md hover:border-amber-300 hover:shadow-lg'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-bold rounded-full shadow-sm">
                        {node.year}
                      </span>
                      <div className="flex gap-2">
                        {ttsEnabled && isActive && (
                          <>
                            <button 
                              onClick={(e) => playAudio(e, `${node.title}. ${node.desc}. ${node.details}`)}
                              className="p-1 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                              title="Play Audio"
                            >
                              <PlayCircle className="w-6 h-6 animate-pulse" />
                            </button>
                            <button 
                              onClick={stopAudio}
                              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
                              title="Stop Audio"
                            >
                               <Square className="w-5 h-5 fill-current" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{node.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">{node.desc}</p>
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-slate-100 text-slate-700">
                            <p>{node.details}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-4 flex justify-center text-slate-300">
                       {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Center Node */}
                <div className={`absolute left-0 md:left-1/2 transform -translate-x-[22px] md:-translate-x-1/2 w-8 h-8 rounded-full border-4 shadow-md flex items-center justify-center transition-colors ${isActive ? 'bg-amber-500 border-white scale-125' : 'bg-white border-amber-300'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-amber-400'}`}></div>
                </div>
                
                {/* Empty Side for layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
