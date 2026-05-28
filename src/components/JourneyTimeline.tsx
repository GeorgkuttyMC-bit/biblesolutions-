import { useState } from 'react';
import { History, PlayCircle, Map, MousePointerClick, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';

const timelineData = [
  {
    year: "33 AD",
    title: "The Ascension & Pentecost",
    desc: "The Holy Spirit descends on the Apostles, marking the birth of the early church. They begin preaching boldly in many languages.",
  },
  {
    year: "33-64 AD",
    title: "Apostolic Missions",
    desc: "Apostles like Paul and Peter travel across the Roman Empire, enduring persecution while establishing churches in Asia Minor and Europe.",
  },
  {
    year: "313 AD",
    title: "Edict of Milan",
    desc: "Emperor Constantine legalizes Christianity across the Roman Empire, ending centuries of state-sponsored persecution.",
  },
  {
    year: "325 AD",
    title: "Council of Nicaea",
    desc: "The first ecumenical council is held, resulting in the Nicene Creed, which unifies foundational Christian doctrines.",
  },
  {
    year: "1054 AD",
    title: "The Great Schism",
    desc: "The Church splits into the Eastern Orthodox Church and the Roman Catholic Church over theological and political differences.",
  },
  {
    year: "1517 AD",
    title: "The Protestant Reformation",
    desc: "Martin Luther nails his 95 Theses to the door in Wittenberg, seeking reform and emphasizing salvation by grace through faith.",
  },
  {
    year: "19th-20th Century",
    title: "Global Missions",
    desc: "A vast expansion of missionary work spreads the gospel across Africa, Asia, and the Americas, translating the Bible into hundreds of new languages.",
  }
];

export function JourneyTimeline({ language, ttsEnabled }: { language: string, ttsEnabled: boolean }) {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const playAudio = (text: string) => {
    if (!ttsEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'German') utterance.lang = 'de-DE';
    else if (language === 'Malayalam') utterance.lang = 'ml-IN';
    else utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="relative bg-gradient-to-r from-amber-700 to-orange-600 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20">
            <History className="w-12 h-12" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">The Journey of Faith</h2>
            <p className="text-amber-100 text-lg">Trace the miraculous historical timeline of the early church to modern times.</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-40 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* How to use section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><Map className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">1. Explore Eras</p>
            <p className="text-sm text-slate-500">Scroll down the golden timeline to visualize the path of history.</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><MousePointerClick className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">2. Select Events</p>
            <p className="text-sm text-slate-500">Click on any historical node to highlight that specific era.</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-amber-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full text-amber-600"><Volume2 className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">3. Listen to History</p>
            <p className="text-sm text-slate-500">When clicked, the voiceover will seamlessly narrate the events.</p>
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
                      setActiveNode(index);
                      playAudio(`${node.title}. ${node.desc}`);
                    }}
                    className={`bg-white p-8 rounded-3xl border-2 transition-all cursor-pointer w-full max-w-md ${isActive ? 'border-amber-500 shadow-xl ring-4 ring-amber-50 scale-105 z-10' : 'border-slate-100 shadow-md hover:border-amber-300 hover:shadow-lg'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-sm font-bold rounded-full shadow-sm">
                        {node.year}
                      </span>
                      {ttsEnabled && isActive && <PlayCircle className="w-6 h-6 text-amber-500 animate-pulse" />}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{node.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed">{node.desc}</p>
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
