import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { Loader2, PlayCircle, Book, Search, Sparkles, Ear, Square } from 'lucide-react';
import { translations } from '../translations';
import { playAudio, stopAudio } from '../lib/ttsUtils';

const oldTestamentBooks = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", 
  "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", 
  "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", 
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
];

const newTestamentBooks = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", 
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", 
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", 
  "1 John", "2 John", "3 John", "Jude", "Revelation"
];

export function StoryBible({ language, ttsEnabled }: { language: string, ttsEnabled: boolean }) {
  const [verseText, setVerseText] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verseNum, setVerseNum] = useState('');
  
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const t = translations[language].bible;

  const currentVerse = selectedBook ? `${selectedBook} ${chapter ? chapter : ''}${chapter && verseNum ? ':' + verseNum : ''}`.trim() : verseText;

  const getStory = async () => {
    const finalVerse = selectedBook ? `${selectedBook} ${chapter ? chapter : ''}${chapter && verseNum ? ':' + verseNum : ''}`.trim() : verseText;
    if (!finalVerse) return;
    
    setLoading(true);
    setStory('');
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verse: finalVerse, language })
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(`Invalid server response: ${text.substring(0, 80)}...`);
      }
      
      if (!res.ok) {
        setStory(`Error: ${data?.error || res.statusText}. Please check the server logs or verify your Gemini API key.`);
      } else if (data && data.story) {
        setStory(data.story);
        if (ttsEnabled) {
          playAudio(data.story, language);
        }
      }
    } catch (e: any) {
      console.error(e);
      setStory(`Error: Something went wrong on the client. ${e.message || e}`);
    } finally {
      setLoading(false);
    }
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

      <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={selectedBook}
            onChange={e => setSelectedBook(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
          >
            <option value="">Select a Book (Optional)</option>
            <optgroup label="Old Testament">
              {oldTestamentBooks.map(b => <option key={b} value={b}>{b}</option>)}
            </optgroup>
            <optgroup label="New Testament">
              {newTestamentBooks.map(b => <option key={b} value={b}>{b}</option>)}
            </optgroup>
          </select>

          {selectedBook && (
            <div className="flex flex-row gap-4 flex-1">
              <input 
                type="number"
                value={chapter}
                onChange={e => setChapter(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && getStory()}
                placeholder="Chapter"
                min="1"
                className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
              />
              <input 
                type="number"
                value={verseNum}
                onChange={e => setVerseNum(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && getStory()}
                placeholder="Verse"
                min="1"
                className="w-1/2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
              />
            </div>
          )}
        </div>

        {!selectedBook && (
          <input 
            type="text"
            value={verseText}
            onChange={e => setVerseText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && getStory()}
            placeholder={t.placeholder}
            className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition-all"
          />
        )}

        <button 
          onClick={getStory}
          disabled={loading || !currentVerse}
          className="w-full sm:w-auto px-10 py-4 mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 self-end"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : t.button}
        </button>
      </div>

      {story && (
        <div className="bg-white border-2 border-indigo-100 rounded-3xl p-8 sm:p-12 shadow-xl prose prose-lg prose-indigo max-w-none relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-slate-100 gap-4">
            <h3 className="text-3xl font-bold font-serif text-slate-900 m-0">{t.exploring} "{currentVerse}"</h3>
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
            <Markdown>{story}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}
