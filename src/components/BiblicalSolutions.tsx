import { useState } from 'react';
import Markdown from 'react-markdown';
import { Loader2, PlayCircle, Heart, MessageSquare, Anchor, Sunrise, Square } from 'lucide-react';
import { translations } from '../translations';
import { playAudio, stopAudio } from '../lib/ttsUtils';

export function BiblicalSolutions({ language, ttsEnabled }: { language: string, ttsEnabled: boolean }) {
  const [issue, setIssue] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const t = translations[language].solutions;

  const getSolution = async () => {
    if (!issue.trim()) return;
    setLoading(true);
    setSolution('');
    try {
      const res = await fetch('/api/solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issue, language })
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(`Invalid server response: ${text.substring(0, 80)}...`);
      }

      if (!res.ok) {
        setSolution(`Error: ${data?.error || res.statusText}. Please check the server logs or verify your Gemini API key.`);
      } else if (data && data.solution) {
        setSolution(data.solution);
        if (ttsEnabled) {
          playAudio(data.solution, language);
        }
      }
    } catch (e: any) {
      console.error(e);
      let errorMsg = e.message || String(e);
      if (errorMsg === 'Failed to fetch') {
        errorMsg = 'Failed to connect. Please check your internet connection or disable ad-blockers, as they might block API requests.';
      }
      setSolution(`Error: Something went wrong on the client. ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="relative bg-gradient-to-r from-rose-900 to-pink-800 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border border-white/20">
            <Heart className="w-12 h-12" />
          </div>
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{t.title}</h2>
            <p className="text-rose-200 text-lg">{t.subtitle}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      </div>

       {/* How to use section */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border text-center md:text-left border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-rose-50 p-3 rounded-full text-rose-600"><MessageSquare className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[0].title}</p>
            <p className="text-sm text-slate-500">{t.steps[0].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-rose-50 p-3 rounded-full text-rose-600"><Anchor className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[1].title}</p>
            <p className="text-sm text-slate-500">{t.steps[1].desc}</p>
          </div>
        </div>
        <div className="bg-white border text-center md:text-left border-rose-100 p-6 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-rose-50 p-3 rounded-full text-rose-600"><Sunrise className="w-6 h-6" /></div>
          <div>
            <p className="font-bold text-slate-800 text-base mb-1">{t.steps[2].title}</p>
            <p className="text-sm text-slate-500">{t.steps[2].desc}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-md border border-slate-200">
        <textarea 
          value={issue}
          onChange={e => setIssue(e.target.value)}
          placeholder={t.placeholder}
          className="w-full min-h-[160px] px-6 py-5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-lg resize-none transition-all leading-relaxed"
        />
        <div className="flex justify-end">
          <button 
            onClick={getSolution}
            disabled={loading || !issue.trim()}
            className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t.button}
          </button>
        </div>
      </div>

      {solution && (
        <div className="bg-white border-2 border-rose-100 rounded-3xl p-8 sm:p-12 shadow-xl prose prose-lg prose-rose max-w-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-400 to-rose-600"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-100 gap-4">
            <h3 className="text-3xl font-bold font-serif text-slate-900 m-0">{t.comfort}</h3>
            {ttsEnabled && (
              <div className="flex gap-2">
                <button 
                  onClick={() => playAudio(solution, language)}
                  className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 rounded-xl flex items-center gap-2 transition font-medium"
                  title="Playback Guidance"
                >
                  <PlayCircle className="w-5 h-5" />
                  {t.listen}
                </button>
                <button 
                  onClick={stopAudio}
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
            <Markdown>{solution}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
