import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users } from 'lucide-react';
import { translations } from '../translations';

export function VisitorCounter({ language }: { language: string }) {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const docRef = doc(db, 'analytics', 'stats');

    // Increment visitor count on first load per session
    const incrementVisitor = async () => {
      if (!sessionStorage.getItem('visited')) {
        try {
          await setDoc(docRef, { totalVisitors: increment(1) }, { merge: true });
          sessionStorage.setItem('visited', 'true');
        } catch (error) {
          console.error("Failed to increment visitor count", error);
        }
      }
    };

    incrementVisitor();

    // Listen to visitor count
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (typeof data.totalVisitors === 'number') {
          setVisitorCount(data.totalVisitors);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (visitorCount === null) return null;

  const getTranslatedText = (count: number) => {
    if (language === 'Malayalam') {
      return `${count.toLocaleString('ml-IN')} ആളുകൾ ഈ വെബ്സൈറ്റ് സന്ദർശിച്ചു`;
    } else if (language === 'German') {
      return `${count.toLocaleString('de-DE')} ${count === 1 ? 'Person hat' : 'Personen haben'} diese Website besucht`;
    }
    return `${count.toLocaleString()} ${count === 1 ? 'person has' : 'people have'} visited this website`;
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium py-1.5 px-4 flex items-center justify-center gap-2 shadow-sm">
      <Users className="w-4 h-4" />
      <span>{getTranslatedText(visitorCount)}</span>
    </div>
  );
}
