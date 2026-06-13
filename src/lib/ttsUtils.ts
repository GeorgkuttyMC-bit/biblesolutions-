let activeUtterances: SpeechSynthesisUtterance[] = [];
let currentVoice: SpeechSynthesisVoice | null = null;
let currentLangCode = 'en-US';

export function playAudio(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech Synthesis not supported or restricted in this environment.");
    return;
  }
  
  try {
    window.speechSynthesis.cancel();
    activeUtterances = []; // reset
    
    // Strip basic markdown
    let cleanText = text
        .replace(/[#*`_]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Determine language
    currentLangCode = 'en-US';
    if (lang === 'German') currentLangCode = 'de-DE';
    else if (lang === 'Malayalam') currentLangCode = 'ml-IN';

    // Split text accurately by common punctuation or newlines without dropping text
    const parts = cleanText.split(/([.!?\n]+)/);
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (let i = 0; i < parts.length; i++) {
      currentChunk += parts[i];
      // Every odd index is a punctuation match, or ending
      if (i % 2 !== 0 || i === parts.length - 1) {
        if (currentChunk.trim()) {
           chunks.push(currentChunk.trim());
        }
        currentChunk = '';
      }
    }
    
    if (chunks.length === 0) return;

    // We will chain the utterances one by one to avoid overwhelming mobile TTS
    const speakChunk = (index: number) => {
        if (index >= chunks.length) return;
        
        const chunk = chunks[index];
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = currentLangCode;
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith(currentLangCode) || v.lang.replace('_', '-').startsWith(currentLangCode));
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        utterance.onend = () => speakChunk(index + 1);
        utterance.onerror = (e) => {
            console.error("TTS error:", e);
            speakChunk(index + 1); // attempt to continue
        };

        // Keep a reference to prevent garbage collection
        activeUtterances.push(utterance);
        window.speechSynthesis.speak(utterance);
    };

    // If voices are not yet loaded (WebKit/Chrome quirk), wait for them, otherwise speak immediately
    if (window.speechSynthesis.getVoices().length === 0) {
        const onVoicesReady = () => {
             speakChunk(0);
             window.speechSynthesis.removeEventListener('voiceschanged', onVoicesReady);
        };
        window.speechSynthesis.addEventListener('voiceschanged', onVoicesReady);
    } else {
        speakChunk(0);
    }

  } catch (err) {
    console.error("Text-to-speech error:", err);
  }
}

export function stopAudio() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    activeUtterances = [];
  }
}

