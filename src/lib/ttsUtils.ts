let activeUtterances: SpeechSynthesisUtterance[] = [];

export function playAudio(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech Synthesis not supported or restricted in this environment.");
    return;
  }
  
  try {
    window.speechSynthesis.cancel();
    activeUtterances = []; // reset
    
    // Strip basic markdown
    const cleanText = text
        .replace(/[#*`_]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text
        .replace(/\n+/g, ' ');

    // Match sentences (roughly) to avoid chunk limits limits
    const chunks = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    
    let langCode = 'en-US';
    if (lang === 'German') langCode = 'de-DE';
    else if (lang === 'Malayalam') langCode = 'ml-IN';

    chunks.forEach((chunk) => {
        if (!chunk.trim()) return;
        const utterance = new SpeechSynthesisUtterance(chunk.trim());
        utterance.lang = langCode;
        activeUtterances.push(utterance);
        window.speechSynthesis.speak(utterance);
    });

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
