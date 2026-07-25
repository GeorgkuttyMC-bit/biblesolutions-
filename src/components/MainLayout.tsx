import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Home, BookOpen, Heart, History, Volume2, VolumeX, ShieldUser, Globe, User } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../translations';
import { VisitorCounter } from './VisitorCounter';

export function MainLayout({ children, language, setLanguage, ttsEnabled, toggleTts }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  const isLinkActive = (path: string) => location.pathname === path;
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Global Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-semibold text-lg flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 font-bold tracking-tight">{t.nav.title}</span>
            </Link>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavItem to="/" icon={<Home className="w-4 h-4" />} label={t.nav.home} active={isLinkActive('/')} />
            <NavItem to="/bible" icon={<BookOpen className="w-4 h-4" />} label={t.nav.bible} active={isLinkActive('/bible')} />
            <NavItem to="/solutions" icon={<Heart className="w-4 h-4" />} label={t.nav.guidance} active={isLinkActive('/solutions')} />
            <NavItem to="/journey" icon={<History className="w-4 h-4" />} label={t.nav.journey} active={isLinkActive('/journey')} />
            
            <div className="w-px h-6 bg-slate-200 mx-2" />

            {/* Language Selector */}
            <div id="nav-language" className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 transition-colors p-1 rounded-lg">
              <Globe className="w-4 h-4 text-slate-600 ml-2" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none pr-1 py-1 cursor-pointer appearance-none"
              >
                <option value="English">English</option>
                <option value="Malayalam">മലയാളം</option>
                <option value="German">Deutsch</option>
              </select>
            </div>
            
            <button
              id="nav-tts"
              onClick={toggleTts}
              className={`p-2 rounded-lg transition-colors ml-1 ${ttsEnabled ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-slate-400 hover:bg-slate-100'}`}
              title={ttsEnabled ? "Disable Voiceover" : "Enable Voiceover"}
            >
              {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            
            <Link 
              to="/admin-portal"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1"
              title="Admin Dashboard"
            >
              <ShieldUser className="w-5 h-5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full items-center justify-start">
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-7xl px-4 py-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-slate-800">{t.footer.about}</h3>
            <p className="text-slate-600 leading-relaxed max-w-2xl">
              {t.footer.bio}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <button className="px-5 py-2.5 text-sm font-medium text-white shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all">
                {t.footer.contact}
              </button>
              <button className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 shadow-sm rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all">
                {t.footer.linkedin}
              </button>
              <Link to="/admin-portal" className="text-slate-400 hover:text-indigo-600 p-2 transition-colors" title="Admin Portal">
                <ShieldUser className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <VisitorCounter language={language} />
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}