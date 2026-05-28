import { Link } from 'react-router-dom';
import { BookOpen, Heart, History, ArrowRight, Sparkles, MessageCircle, Navigation, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function HomeDashboard({ language }: { language: string }) {
  const getGreeting = () => {
    switch(language) {
      case 'German': return `Spirituelle Reise`;
      case 'Malayalam': return `ആത്മീയ യാത്ര`;
      default: return `Spiritual Journey`;
    }
  };

  const getSubTitle = () => {
    switch(language) {
      case 'German': return 'Entdecken Sie die Schrift durch Geschichten, finden Sie biblische Führung und erkunden Sie die Geschichte des Glaubens.';
      case 'Malayalam': return 'കഥകളിലൂടെ തിരുവെഴുത്തുകൾ കണ്ടെത്തുക, മാർഗ്ഗനിർദ്ദേശം കണ്ടെത്തുക, വിശ്വാസത്തിന്റെ ചരിത്രം പര്യവേക്ഷണം ചെയ്യുക.';
      default: return 'Discover scripture through stories, find biblical guidance, and explore the history of faith.';
    }
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto py-12">
      <div className="text-center mb-16 space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Faith Platform</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Welcome to Your <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {getGreeting()}
          </span>
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          {getSubTitle()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
        <HeroCard
          to="/bible"
          icon={<BookOpen className="w-8 h-8 text-indigo-100" />}
          title="Story Bible"
          desc="Enter any verse and receive an engaging, narrated story explaining its context and moral."
          bg="bg-gradient-to-br from-indigo-500 to-blue-600"
          steps={['Enter a Bible verse', 'Generate the story', 'Listen to the narration']}
        />
        <HeroCard
          to="/solutions"
          icon={<Heart className="w-8 h-8 text-rose-100" />}
          title="Biblical Solutions"
          desc="Share your current personal struggles to receive empathetic, scriptural guidance."
          bg="bg-gradient-to-br from-rose-500 to-pink-600"
          steps={['Type out your burden', 'Seek AI-guided wisdom', 'Reflect on scriptures']}
        />
        <HeroCard
          to="/journey"
          icon={<History className="w-8 h-8 text-amber-100" />}
          title="Journey of Faith"
          desc="Scroll through an interactive, narrated timeline of Christian history from 33 AD to modern times."
          bg="bg-gradient-to-br from-amber-500 to-orange-500"
          steps={['Scroll the timeline', 'Click historical eras', 'Hear the events unfold']}
        />
      </div>
      
      {/* Helpful banner */}
      <div className="w-full bg-slate-900 text-slate-100 p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transform hover:scale-[1.01] transition-transform">
        <div className="flex items-center gap-4">
           <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
             <Navigation className="w-8 h-8 text-blue-400" />
           </div>
           <div>
             <h3 className="text-2xl font-bold text-white">How to Get Started</h3>
             <p className="text-slate-400">Select your preferred language at the top right of the navigation bar. Your selection will instantly translate the interface and adjust the voiceover language for stories and historical readings.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function HeroCard({ to, icon, title, desc, bg, steps }: any) {
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
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">How to use</p>
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
          <span className="border-b-2 border-transparent group-hover:border-blue-600 transition-colors">Start Experience</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </div>
      {/* Decorative gradient blur in background of card */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full ${bg}`} />
    </Link>
  );
}
