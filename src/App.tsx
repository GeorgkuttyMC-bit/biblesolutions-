/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { MainLayout } from './components/MainLayout';
import { HomeDashboard } from './components/HomeDashboard';
import { StoryBible } from './components/StoryBible';
import { BiblicalSolutions } from './components/BiblicalSolutions';
import { JourneyTimeline } from './components/JourneyTimeline';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [language, setLanguage] = useState('Malayalam');
  const [ttsEnabled, setTtsEnabled] = useState(true);

  return (
    <Router>
      <MainLayout 
        language={language}
        setLanguage={setLanguage}
        ttsEnabled={ttsEnabled} 
        toggleTts={() => setTtsEnabled(!ttsEnabled)}
      >
        <Routes>
          <Route path="/" element={<HomeDashboard language={language} />} />
          <Route path="/bible" element={<StoryBible language={language} ttsEnabled={ttsEnabled} />} />
          <Route path="/solutions" element={<BiblicalSolutions language={language} ttsEnabled={ttsEnabled} />} />
          <Route path="/journey" element={<JourneyTimeline language={language} ttsEnabled={ttsEnabled} />} />
          <Route path="/admin-portal" element={<AdminDashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}


