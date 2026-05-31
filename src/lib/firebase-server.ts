import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, getDocs, updateDoc, increment } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

// Load config since we need it in API routes
const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
let firebaseConfig = {};
try {
  firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
} catch (e) {
  console.warn('Could not load firebase-applet-config.json');
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId as string);

export const logInteraction = async (type: string, query: string, language: string) => {
  try {
    const statsRef = doc(db, 'analytics', 'stats');
    const statsDoc = await getDoc(statsRef);
    if (!statsDoc.exists()) {
      await setDoc(statsRef, { totalInteractions: 1 });
    } else {
      await updateDoc(statsRef, { totalInteractions: increment(1) });
    }

    await addDoc(collection(db, 'queries'), {
      type,
      query,
      language,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Failed to log interaction to Firebase:', error);
  }
};

export const getAnalytics = async () => {
    try {
      const statsDoc = await getDoc(doc(db, 'analytics', 'stats'));
      const totalInteractions = statsDoc.exists() ? statsDoc.data().totalInteractions : 0;
      
      const queriesSnapshot = await getDocs(collection(db, 'queries'));
      const languageMetrics: Record<string, number> = {};
      const popularVerses: Record<string, number> = {};
      const commonThemes: Record<string, number> = {};
      const queries: any[] = [];
      
      queriesSnapshot.forEach(doc => {
          const data = doc.data();
          queries.push(data);
          
          if (data.language) {
              languageMetrics[data.language] = (languageMetrics[data.language] || 0) + 1;
          }
          if (data.type === 'verse' && data.query) {
              popularVerses[data.query] = (popularVerses[data.query] || 0) + 1;
          }
          if (data.type === 'issue' && data.query) {
              commonThemes[data.query] = (commonThemes[data.query] || 0) + 1;
          }
      });
      
      return { totalInteractions, languageMetrics, popularVerses, commonThemes, queries };
    } catch(err) {
        console.error('Failed to get analytics:', err);
        return { totalInteractions: 0, languageMetrics: {}, popularVerses: {}, commonThemes: {}, queries: [], error: String(err) };
    }
};
