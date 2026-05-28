import { useState } from 'react';
import Markdown from 'react-markdown';
import { Loader2, PlayCircle, Book, Search, Sparkles, Ear, Square } from 'lucide-react';
import { translations } from '../translations';

export function StoryBible({ language, ttsEnabled }: { language: string, ttsEnabled: boolean }) {
  const [verse, setVerse] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const t = translations[language].bible;

  const getStory = async () => {
    if (!verse.trim()) return;
    setLoading(true);
    setStory('');
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse, language })
      });
      const data = await res.json();
      if (data.story) {
        setStory(data.story);
        if (ttsEnabled) {
          playAudio(data.story, language);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (text: string, lang: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (lang === 'German') utterance.lang = 'de-DE';
    else if (lang === 'Malayalam') utterance.lang = 'ml-IN';
    else utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20">
            <Book className="w-12 h-12" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t.title}</h2>
            <p className="text-indigo-200 text-lg">{t.subtitle}</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* How to use section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border text-center md:text-left border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Search className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[0].title}</p>
            <p className="text-sm text-slate-500">{t.steps[0].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Sparkles className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[1].title}</p>
            <p className="text-sm text-slate-500">{t.steps[1].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-indigo-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-indigo-50 p-3 rounded-full text-indigo-600"><Ear className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[2].title}</p>
            <p className="text-sm text-slate-500">{t.steps[2].desc}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-2xl shadow-md border border-slate-200">
        <input 
          type="text"
          value={verse}
          onChange={e => setVerse(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && getStory()}
          placeholder={t.placeholder}
          className="flex-1 px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
        />
        <button 
          onClick={getStory}
          disabled={loading || !verse.trim()}
          className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t.button}
        </button>
      </div>

      {story && (
        <div className="bg-white border-2 border-indigo-100 rounded-3xl p-8 sm:p-12 shadow-xl prose prose-lg prose-indigo max-w-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-100 gap-4">
            <h3 className="text-3xl font-bold font-serif text-slate-900 m-0">{t.exploring} "{verse}"</h3>
            {ttsEnabled && (
              <div className="flex gap-2">
                <button 
                  onClick={() => playAudio(story, language)}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 rounded-xl flex items-center gap-2 transition font-medium"
                  title="Play/Re-play Audio"
                >
                  <PlayCircle className="w-5 h-5" />
                  {t.listen}
                </button>
                <button 
                  onClick={() => window.speechSynthesis.cancel()}
                  className="px-4 py-2 bg-slate-50 text-slate-700 hover:bg-slate-200 hover:text-slate-800 rounded-xl flex items-center gap-2 transition font-medium"
                  title="Stop Audio"
                >
                  <Square className="w-5 h-5 fill-current" />
                  {t.stop}
                </button>
              </div>
            )}
          </div>
          <div className="markdown-body leading-relaxed text-slate-700 text-lg space-y-4">
            <Markdown>{story}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
