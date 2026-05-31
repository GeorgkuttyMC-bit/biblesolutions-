import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, History, ArrowRight, Sparkles, Navigation, Loader2, PlayCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../translations';
import { playAudio, stopAudio } from '../lib/ttsUtils';

export function HomeDashboard({ language }: { language: string }) {
  const t = translations[language].home;
  const [showWelcome, setShowWelcome] = useState(true);

  const playWelcomeAudio = () => {
    const welcomeText = language === 'English' 
      ? "Welcome to the Holy AI experience. This website is designed to help you explore the Bible in an interactive and comforting way. You can use the Story Bible to read verses with historical context and stories. If you need comfort, visit the Biblical Solutions page. To trace historical events, use the Journey Timeline. Select an option below to begin."
      : language === 'Malayalam'
      ? "Holy AI അനുഭവത്തിലേക്ക് സ്വാഗതം. നിങ്ങൾക്ക് ഈ വെബ്സൈറ്റ് വഴി ബൈബിൾ കഥകളിലൂടെയും ചരിത്രത്തിലൂടെയും പഠിക്കാം. സ്റ്റോറി ബൈബിൾ ഉപയോഗിച്ച് ഓരോ വചനത്തിന്റെയും സന്ദർഭവും അർത്ഥവും മനസ്സിലാക്കാം. ആശ്വാസത്തിനായി ബിബ്ലിക്കൽ സൊല്യൂഷൻസ് സന്ദർശിക്കുക. താഴെയുള്ള ഓപ്ഷനുകളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക."
      : "Willkommen beim Holy AI Erlebnis. Diese Website soll Ihnen helfen, die Bibel auf interaktive und tröstende Weise zu erkunden. Sie können die Geschichte der Bibel nutzen. Wählen Sie unten eine Option, um zu beginnen.";
    
    playAudio(welcomeText, language);
    setShowWelcome(false);
  };

  const skipWelcome = () => {
    setShowWelcome(false);
    stopAudio();
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-12 relative">
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-3xl mb-12 bg-indigo-50 border border-indigo-200 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Audio Guide</h3>
              <p className="text-indigo-700 leading-relaxed text-sm">
                Click below to hear an introduction about how to use this website.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={playWelcomeAudio}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" /> Play Guide
              </button>
              <button 
                onClick={skipWelcome}
                className="p-3 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors"
                title="Dismiss"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center mb-16 space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>{t.badge}</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {t.welcome} <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {t.title}
          </span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <DailyInspiration language={language} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
        <HeroCard
          to="/bible"
          icon={<BookOpen className="w-8 h-8 text-indigo-100" />}
          title={t.cards.bible.title}
          desc={t.cards.bible.desc}
          bg="bg-gradient-to-br from-indigo-500 to-blue-600"
          steps={t.cards.bible.steps}
          action={t.cards.bible.action}
          howToUse={t.cards.bible.howToUse}
        />
        <HeroCard
          to="/solutions"
          icon={<Heart className="w-8 h-8 text-rose-100" />}
          title={t.cards.solutions.title}
          desc={t.cards.solutions.desc}
          bg="bg-gradient-to-br from-rose-500 to-pink-600"
          steps={t.cards.solutions.steps}
          action={t.cards.solutions.action}
          howToUse={t.cards.solutions.howToUse}
        />
        <HeroCard
          to="/journey"
          icon={<History className="w-8 h-8 text-amber-100" />}
          title={t.cards.journey.title}
          desc={t.cards.journey.desc}
          bg="bg-gradient-to-br from-amber-500 to-orange-500"
          steps={t.cards.journey.steps}
          action={t.cards.journey.action}
          howToUse={t.cards.journey.howToUse}
        />
      </div>
      
      {/* Helpful banner */}
      <div className="w-full bg-slate-900 text-slate-100 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-transform">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
             <Navigation className="w-8 h-8 text-blue-400" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-white">{t.guideTitle}</h3>
             <p className="text-slate-400">{t.guideDesc}</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function DailyInspiration({ language }: { language: string }) {
  const [verse, setVerse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Basic caching mechanism to ensure we don't spam the API unnecessarily 
    // and give the same verse per day ideally. For now, just fetching on mount.
    setLoading(true);
    fetch('/api/daily-verse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language })
    })
      .then(res => res.json())
      .then(data => {
        if (data.verse) {
          setVerse(data.verse);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [language]);

  if (error || (!loading && !verse)) return null;

  return (
    <div className="w-full max-w-3xl mb-16 bg-white border border-slate-200 shadow-md rounded-3xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles className="w-32 h-32 text-indigo-900" />
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Daily Inspiration</h2>
      </div>

      <div className="relative z-10 min-h-[80px] flex items-center">
        {loading ? (
          <div className="flex items-center gap-3 text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Finding today's verse...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl text-slate-700 italic font-medium leading-relaxed"
          >
            "{verse}"
          </motion.div>
        )}
      </div>
    </div>
  );
}

function HeroCard({ to, icon, title, desc, bg, steps, action, howToUse }: any) {
  return (
    <Link to={to} className="group relative bg-white border border-slate-200 rounded-3xl p-1 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2 overflow-hidden">
      <div className="p-8 pb-6 bg-white rounded-[22px] flex flex-col h-full z-10 relative">
        <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center mb-6 shadow-md shadow-slate-200 transform group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 mb-8 flex-1 leading-relaxed">{desc}</p>
        
        {/* Instructions Module inside Card */}
        <div className="bg-slate-50 p-4 rounded-xl mb-6 flex-1">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{howToUse}</p>
          <ul className="space-y-2">
            {steps.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center text-blue-600 font-semibold mt-auto group-hover:translate-x-2 transition-transform">
          <span className="border-b-2 border-transparent group-hover:border-blue-600 transition-colors">{action}</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </div>
      {/* Decorative gradient blur in background of card */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full ${bg}`} />
    </Link>
  );
}
