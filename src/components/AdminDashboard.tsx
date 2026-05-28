import { useState, useEffect } from 'react';
import { PieChart, Users, Globe, Book, MessageSquare, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Calculate percentages for languages
  const langs = Object.entries(stats.languageMetrics || {});
  const totalLangs = langs.reduce((acc, [_, count]: any) => acc + count, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Admin Dashboard</h2>
        <p className="text-slate-500">Overview of platform engagement and impact.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Interactions" value={stats.totalInteractions} icon={<Users className="w-6 h-6" />} color="text-blue-500" bg="bg-blue-50" />
        <StatCard title="Unique Sessions" value={totalLangs} icon={<Globe className="w-6 h-6" />} color="text-teal-500" bg="bg-teal-50" />
        <StatCard title="Verses Explored" value={Object.keys(stats.popularVerses).length} icon={<Book className="w-6 h-6" />} color="text-indigo-500" bg="bg-indigo-50" />
        <StatCard title="Themes Discussed" value={Object.keys(stats.commonThemes).length} icon={<MessageSquare className="w-6 h-6" />} color="text-rose-500" bg="bg-rose-50" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Metrics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-slate-400" /> Language Metrics
          </h3>
          <div className="space-y-4">
            {langs.map(([lang, count]: any) => {
              const perc = totalLangs === 0 ? 0 : Math.round((count / totalLangs) * 100);
              return (
                <div key={lang}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{lang}</span>
                    <span className="text-slate-500">{count} ({perc}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${perc}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Themes & Verses */}
        <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 Common Issues
              </h3>
              <ul className="space-y-3">
                {Object.entries(stats.commonThemes || {}).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([theme, count]: any) => (
                  <li key={theme} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                    <span className="capitalize font-medium text-slate-700">{theme}</span>
                    <span className="bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full text-xs">{count}</span>
                  </li>
                ))}
                {Object.keys(stats.commonThemes || {}).length === 0 && (
                   <div className="text-slate-500 text-sm text-center py-4">No data yet.</div>
                )}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 Popular Verses
              </h3>
              <ul className="space-y-3">
                {Object.entries(stats.popularVerses || {}).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5).map(([verse, count]: any) => (
                  <li key={verse} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-700">{verse}</span>
                    <span className="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full text-xs">{count}</span>
                  </li>
                ))}
                {Object.keys(stats.popularVerses || {}).length === 0 && (
                   <div className="text-slate-500 text-sm text-center py-4">No data yet.</div>
                )}
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, bg }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
      </div>
    </div>
  );
}
