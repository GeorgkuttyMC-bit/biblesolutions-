import { useState } from 'react';
import { motion } from 'motion/react';
import { Book } from 'lucide-react';

export function SplashScreen({ onComplete }: { onComplete: (name: string, lang: string) => void }) {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState('');
  const [name, setName] = useState('');

  const pickLang = (l: string) => {
    setLang(l);
    setStep(2);
    // Tell server about language selection for analytics
    fetch('/api/analytics/language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: l })
    }).catch(console.error);
  };

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim(), lang);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-8"
      >
        <div className="flex flex-col items-center gap-3">
          <Book className="w-12 h-12 text-blue-600" />
          <h1 className="text-2xl font-bold tracking-tight text-center">
            {step === 1 ? 'Select Your Language' : 'Welcome'}
          </h1>
        </div>

        {step === 1 ? (
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => pickLang('English')} className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-lg font-medium">
              English
            </button>
            <button onClick={() => pickLang('Malayalam')} className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-lg font-medium">
              മലയാളം (Malayalam)
            </button>
            <button onClick={() => pickLang('German')} className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-lg font-medium">
              Deutsch (German)
            </button>
          </div>
        ) : (
          <form onSubmit={submitName} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
                {lang === 'German' ? 'Dürfen wir Ihren Namen erfahren?' : lang === 'Malayalam' ? 'നിങ്ങളുടെ പേര് പറയാമോ?' : 'May we know your name?'}
              </label>
              <input
                id="name"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={lang === 'German' ? 'Dein Name' : lang === 'Malayalam' ? 'നിങ്ങളുടെ പേര്' : 'Your name'}
              />
            </div>
            <button type="submit" disabled={!name.trim()} className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {lang === 'German' ? 'Eintreten' : lang === 'Malayalam' ? 'പ്രവേശിക്കുക' : 'Enter'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
