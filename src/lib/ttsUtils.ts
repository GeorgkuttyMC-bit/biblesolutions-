let activeUtterances: SpeechSynthesisUtterance[] = [];
let currentLangCode = 'en-US';
let resumeInterval: any = null;

export function playAudio(text: string, lang: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech Synthesis not supported or restricted in this environment.");
    return;
  }
  
  try {
    if (resumeInterval) clearInterval(resumeInterval);
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
    const parts = cleanText.split(/([.,;!?\n]+)/);
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (let i = 0; i < parts.length; i++) {
        currentChunk += parts[i];
        // Every odd index is a punctuation match, or ending
        if (i % 2 !== 0 || i === parts.length - 1) {
            let textToPush = currentChunk.trim();
            if (textToPush) {
                // If chunk is still too long, break it by spaces
                if (textToPush.length > 150) {
                    const words = textToPush.split(' ');
                    let temp = '';
                    words.forEach(w => {
                        if (temp.length + w.length > 150) {
                            chunks.push(temp.trim());
                            temp = w + ' ';
                        } else {
                            temp += w + ' ';
                        }
                    });
                    if (temp.trim()) chunks.push(temp.trim());
                } else {
                    chunks.push(textToPush);
                }
            }
            currentChunk = '';
        }
    }
    
    if (chunks.length === 0) return;

    const speakAll = () => {
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang.startsWith(currentLangCode) || v.lang.replace('_', '-').startsWith(currentLangCode));

        chunks.forEach((chunk) => {
            const utterance = new SpeechSynthesisUtterance(chunk);
            utterance.lang = currentLangCode;
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }
            
            // Keep a reference to prevent garbage collection
            activeUtterances.push(utterance);
            window.speechSynthesis.speak(utterance);
        });

        // Bug fix for Chrome on Android: keeps the engine awake for long texts
        resumeInterval = setInterval(() => {
            if (!window.speechSynthesis.speaking) {
                clearInterval(resumeInterval);
                resumeInterval = null;
            } else {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 10000);
    };

    // If voices are not yet loaded (WebKit/Chrome quirk), wait for them, otherwise speak immediately
    if (window.speechSynthesis.getVoices().length === 0) {
        const onVoicesReady = () => {
             speakAll();
             window.speechSynthesis.removeEventListener('voiceschanged', onVoicesReady);
        };
        window.speechSynthesis.addEventListener('voiceschanged', onVoicesReady);
    } else {
        speakAll();
    }

  } catch (err) {
    console.error("Text-to-speech error:", err);
  }
}

export function stopAudio() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    if (resumeInterval) {
        clearInterval(resumeInterval);
        resumeInterval = null;
    }
    window.speechSynthesis.cancel();
    activeUtterances = [];
  }
}

