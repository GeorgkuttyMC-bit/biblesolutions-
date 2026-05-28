export const translations: Record<string, any> = {
  English: {
    nav: {
      title: "Christian Journey",
      home: "Home",
      bible: "Bible",
      guidance: "Guidance",
      journey: "Journey"
    },
    footer: {
      about: "About the Developer",
      bio: "Georkutty MC is a passionate developer and visionary who blends technology with faith to create accessible, interactive spiritual tools. Driven by a desire to make the teachings of the Holy Bible engaging and globally accessible, Georkutty built this platform to bridge the gap between ancient scripture and modern digital storytelling.",
      contact: "Contact Form",
      linkedin: "LinkedIn Profile"
    },
    home: {
      title: "Spiritual Journey",
      subtitle: "Discover scripture through stories, find biblical guidance, and explore the history of faith.",
      badge: "Interactive Faith Platform",
      welcome: "Welcome to Your",
      guideTitle: "How to Get Started",
      guideDesc: "Select your preferred language at the top right of the navigation bar. Your selection will instantly translate the interface and adjust the voiceover language for stories and historical readings.",
      cards: {
        bible: {
          title: "Story Bible",
          desc: "Enter any verse and receive an engaging, narrated story explaining its context and moral.",
          steps: ['Enter a Bible verse', 'Generate the story', 'Listen to the narration'],
          action: "Start Experience",
          howToUse: "How to use"
        },
        solutions: {
          title: "Biblical Solutions",
          desc: "Share your current personal struggles to receive empathetic, scriptural guidance.",
          steps: ['Type out your burden', 'Seek AI-guided wisdom', 'Reflect on scriptures'],
          action: "Start Experience",
          howToUse: "How to use"
        },
        journey: {
          title: "Journey of Faith",
          desc: "Scroll through an interactive, narrated timeline of Christian history from 33 AD to modern times.",
          steps: ['Scroll the timeline', 'Click historical eras', 'Hear the events unfold'],
          action: "Start Experience",
          howToUse: "How to use"
        }
      }
    },
    bible: {
      title: "The Interactive Story Bible",
      subtitle: "Enter a verse and witness scripture come alive through narrative context.",
      steps: [
        { title: "1. Find a Verse", desc: "Pick any scripture reference (e.g., Philippians 4:13) and enter it below." },
        { title: "2. Generate Story", desc: "Our AI weaves the historical background and moral context into a narrative." },
        { title: "3. Listen & Learn", desc: "Enjoy the automatic, high-quality voiceover narration in your language." }
      ],
      placeholder: "e.g. John 3:16",
      button: "Explore Context",
      exploring: "Exploring",
      listen: "Listen",
      stop: "Stop"
    },
    solutions: {
      title: "Biblical Guidance & Solutions",
      subtitle: "Share your burden, and let the timeless wisdom of scripture offer comfort.",
      steps: [
        { title: "1. Share Openly", desc: "Type out what you are struggling with—anxiety, grief, doubt, or seeking direction." },
        { title: "2. Seek Anchor", desc: "Our compassionate AI matches your feelings with specific, uplifting bible verses." },
        { title: "3. Find Peace", desc: "Listen to the practical advice and let the scripture renew your mind and spirit." }
      ],
      placeholder: "I have been feeling overwhelmed lately with my job and balancing my family...",
      button: "Seek Guidance",
      comfort: "Words of Comfort",
      listen: "Listen",
      stop: "Stop"
    },
    journey: {
      title: "The Journey of Faith",
      subtitle: "Trace the miraculous historical timeline of the early church to modern times.",
      steps: [
        { title: "1. Explore Eras", desc: "Scroll down the golden timeline to visualize the path of history." },
        { title: "2. Select Events", desc: "Click on any historical node to highlight that specific era." },
        { title: "3. Listen to History", desc: "When clicked, the voiceover will seamlessly narrate the events." }
      ],
      timeline: [
        {
          year: "33 AD",
          title: "The Ascension & Pentecost",
          desc: "The Holy Spirit descends on the Apostles, marking the birth of the early church.",
          details: "After Jesus' resurrection and ascension, the Apostles gathered in Jerusalem. During the festival of Pentecost, they received the Holy Spirit, appearing as tongues of fire. They were suddenly able to speak in different languages, allowing them preach the Gospel to the diverse crowds in Jerusalem, leading to the baptism of about 3,000 people in a single day."
        },
        {
          year: "33-64 AD",
          title: "Apostolic Missions",
          desc: "Apostles like Paul and Peter travel across the Roman Empire, enduring persecution.",
          details: "Driven by the Great Commission, the Apostles traveled extensively. Paul the Apostle became its most zealous missionary, undertaking major journeys across Asia Minor and Europe. He established numerous churches and wrote epistles forming a significant part of the New Testament. Peter ministered to the Jews and eventually went to Rome."
        },
        {
          year: "313 AD",
          title: "Edict of Milan",
          desc: "Emperor Constantine legalizes Christianity across the Roman Empire.",
          details: "Following his victory at the Milvian Bridge, Emperor Constantine, along with Licinius, issued the Edict of Milan. This decree mandated religious tolerance throughout the empire and restored confiscated property to Christians. It marked a turning point, ending centuries of intermittent severe persecution."
        },
        {
          year: "325 AD",
          title: "Council of Nicaea",
          desc: "The first ecumenical council is held, resulting in the Nicene Creed.",
          details: "Convened by Emperor Constantine in Nicaea, this council aimed to resolve theological disputes, primarily Arianism (which debated the nature of the Son of God). The resulting Nicene Creed established the orthodox doctrine of the Trinity, affirming that the Son is consubstantial with the Father."
        },
        {
          year: "1054 AD",
          title: "The Great Schism",
          desc: "The Church splits into the Eastern Orthodox Church and the Roman Catholic Church.",
          details: "Also known as the East-West Schism, this was the culmination of long-standing theological, political, and cultural divergences. Key disputes included the source of the Holy Spirit, the type of bread used in the Eucharist, and the Pope's claim to universal jurisdiction. Mutual excommunications finalized the split."
        },
        {
          year: "1517 AD",
          title: "The Protestant Reformation",
          desc: "Martin Luther nails his 95 Theses to the door in Wittenberg, seeking reform.",
          details: "Seeking reform within the Catholic Church, particularly concerning the sale of indulgences, Martin Luther published his 95 Theses. He argued that salvation is a free gift of God's grace received through faith alone (sola fide) and that the Bible is the sole source of divine authority (sola scriptura)."
        },
        {
          year: "19th-20th Century",
          title: "Global Missions",
          desc: "A vast expansion of missionary work spreads the gospel across the globe.",
          details: "The modern missionary movement saw an unprecedented surge of Christian missionaries traveling to Africa, Asia, and the Americas. Organizations focused not only on evangelism but also on translating the Bible into hundreds of indigenous languages, establishing schools, and building hospitals."
        }
      ]
    }
  },
  Malayalam: {
    nav: {
      title: "ക്രിസ്തീയ യാത്ര",
      home: "ഹോം",
      bible: "ബൈബിൾ",
      guidance: "മാർഗ്ഗനിർദ്ദേശം",
      journey: "യാത്ര"
    },
    footer: {
      about: "ഡെവലപ്പറെക്കുറിച്ച്",
      bio: "സാങ്കേതികവിദ്യയെ വിശ്വാസവുമായി സംയോജിപ്പിച്ച് ഉപയോഗപ്രദമായ ആത്മീയ ഉപകരണങ്ങൾ സൃഷ്ടിക്കുന്ന ഒരു ഡെവലപ്പറാണ് ജോർജുകുട്ടി എം.സി. പൗരാണിക തിരുവെഴുത്തുകളും ആധുനിക ഡിജിറ്റൽ സംവിധാനങ്ങളും തമ്മിലുള്ള വിടവ് നികത്താൻ അദ്ദേഹം ഈ പ്ലാറ്റ്ഫോം നിർമ്മിച്ചു.",
      contact: "ബന്ധപ്പെടുക",
      linkedin: "ലിങ്ക്ഡ്ഇൻ"
    },
    home: {
      title: "ആത്മീയ യാത്ര",
      subtitle: "കഥകളിലൂടെ തിരുവെഴുത്തുകൾ കണ്ടെത്തുക, മാർഗ്ഗനിർദ്ദേശം കണ്ടെത്തുക, വിശ്വാസത്തിന്റെ ചരിത്രം പര്യവേക്ഷണം ചെയ്യുക.",
      badge: "സംവേദനാത്മക വിശ്വാസ പ്ലാറ്റ്ഫോം",
      welcome: "സ്വാഗതം",
      guideTitle: "എങ്ങനെ തുടങ്ങാം",
      guideDesc: "നാവിഗേഷൻ ബാറിന്റെ മുകളിൽ വലതുവശത്ത് നിന്ന് നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക. ഇത് ഉടനടി എല്ലാം വിവർത്തനം ചെയ്യുകയും വോയ്‌സ്‌ഓവർ ക്രമീകരിക്കുകയും ചെയ്യും.",
      cards: {
        bible: {
          title: "കഥാ ബൈബിൾ",
          desc: "ഏതെങ്കിലും വാക്യം നൽകുക, അതിന്റെ പശ്ചാത്തലവും സന്ദേശവും വിശദീകരിക്കുന്ന മനോഹരമായ ഒരു കഥ കേൾക്കുക.",
          steps: ['ഒരു വാക്യം നൽകുക', 'കഥ സൃഷ്ടിക്കുക', 'വിവരണം കേൾക്കുക'],
          action: "തുടങ്ങുക",
          howToUse: "എങ്ങനെ ഉപയോഗിക്കാം"
        },
        solutions: {
          title: "ബൈബിൾ പരിഹാരങ്ങൾ",
          desc: "നിങ്ങളുടെ വ്യക്തിപരമായ പോരാട്ടങ്ങൾ പങ്കുവെച്ച് വേദപുസ്തകപരമായ മാർഗ്ഗനിർദ്ദേശങ്ങൾ നേടുക.",
          steps: ['നിങ്ങളുടെ ഭാരം പങ്കുവെക്കുക', 'ജ്ഞാനം തേടുക', 'തിരുവെഴുത്തുകൾ ധ്യാനിക്കുക'],
          action: "തുടങ്ങുക",
          howToUse: "എങ്ങനെ ഉപയോഗിക്കാം"
        },
        journey: {
          title: "വിശ്വാസത്തിന്റെ യാത്ര",
          desc: "എ.ഡി 33 മുതൽ ആധുനിക കാലം വരെയുള്ള ക്രിസ്തീയ ചരിത്രത്തിലൂടെ ഒരു യാത്ര.",
          steps: ['ടൈംലൈൻ സ്ക്രോൾ ചെയ്യുക', 'കാലഘട്ടങ്ങൾ ക്ലിക്ക് ചെയ്യുക', 'സംഭവങ്ങൾ കേൾക്കുക'],
          action: "തുടങ്ങുക",
          howToUse: "എങ്ങനെ ഉപയോഗിക്കാം"
        }
      }
    },
    bible: {
      title: "സംവേദനാത്മക കഥാ ബൈബിൾ",
      subtitle: "ഒരു വാക്യം നൽകുക, വിവരണാത്മക പശ്ചാത്തലത്തിലൂടെ തിരുവെഴുത്ത് സജീവമാകുന്നതിന് സാക്ഷ്യം വഹിക്കുക.",
      steps: [
        { title: "1. വാക്യം കണ്ടെത്തുക", desc: "നിങ്ങൾക്ക് താൽപ്പര്യമുള്ള ഒരു വാക്യം നൽകുക (ഉദാ: ഫിലിപ്പിയർ 4:13)." },
        { title: "2. കഥ സൃഷ്ടിക്കുക", desc: "ഞങ്ങളുടെ വിഎ ചരിത്ര പശ്ചാത്തലവും ധാർമ്മികതയും ഒരു കഥയായി നെയ്യുന്നു." },
        { title: "3. കേൾക്കുക, പഠിക്കുക", desc: "നിങ്ങളുടെ ഭാഷയിൽ ഉന്നത നിലവാരമുള്ള വോയ്‌സ്‌ഓവർ ആസ്വദിക്കുക." }
      ],
      placeholder: "ഉദാ: യോഹന്നാൻ 3:16",
      button: "പശ്ചാത്തലം പര്യവേക്ഷണം ചെയ്യുക",
      exploring: "പഠിക്കുന്നു",
      listen: "കേൾക്കുക",
      stop: "നിർത്തുക"
    },
    solutions: {
      title: "ബൈബിൾ മാർഗ്ഗനിർദ്ദേശങ്ങളും പരിഹാരങ്ങളും",
      subtitle: "നിങ്ങളുടെ ഭാരം പങ്കുവെക്കുക, സമാധാനം കണ്ടെത്താൻ തിരുവെഴുത്തുകളെ അനുവദിക്കുക.",
      steps: [
        { title: "1. തുറന്നു പറയുക", desc: "ഉത്കണ്ഠയോ സങ്കടമോ സംശയമോ ആകട്ടെ, നിങ്ങളുടെ പ്രയാസങ്ങൾ എഴുതുക." },
        { title: "2. മാർഗ്ഗനിർദ്ദേശം തേടുക", desc: "ഞങ്ങളുടെ വിഎ നിങ്ങളുടെ വികാരങ്ങളെ ഉചിതമായ വാക്യങ്ങളുമായി പൊരുത്തപ്പെടുത്തുന്നു." },
        { title: "3. സമാധാനം കണ്ടെത്തുക", desc: "പ്രായോഗിക ഉപദേശങ്ങൾ കേൾക്കുകയും മനസ്സിനെ പുതുക്കുകയും ചെയ്യുക." }
      ],
      placeholder: "ജോലിയും കുടുംബവും ഒരുമിച്ച് കൊണ്ടുപോകുന്നതിൽ ഞാൻ വളരെ വേദനിക്കുന്നു...",
      button: "മാർഗ്ഗനിർദ്ദേശം തേടുക",
      comfort: "ആശ്വാസവചനങ്ങൾ",
      listen: "കേൾക്കുക",
      stop: "നിർത്തുക"
    },
    journey: {
      title: "വിശ്വാസത്തിന്റെ യാത്ര",
      subtitle: "ആദിമ സഭ മുതൽ ആധുനിക കാലം വരെയുള്ള ചരിത്രപരമായ കാലഘട്ടങ്ങളെ പിന്തുടരുക.",
      steps: [
        { title: "1. കാലഘട്ടങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക", desc: "ചരിത്രത്തിന്റെ പാത കാണാൻ ടൈംലൈൻ സ്ക്രോൾ ചെയ്യുക." },
        { title: "2. സംഭവങ്ങൾ തിരഞ്ഞെടുക്കുക", desc: "ഒരു പ്രത്യേക കാലഘട്ടം എടുത്തുകാണിക്കാൻ ചരിത്ര നോഡിൽ ക്ലിക്ക് ചെയ്യുക." },
        { title: "3. ചരിത്രം കേൾക്കുക", desc: "ക്ലിക്ക് ചെയ്യുമ്പോൾ, സംഭവങ്ങൾ വിവരിക്കുന്നത് നിങ്ങൾക്ക് കേൾക്കാം." }
      ],
      timeline: [
        {
          year: "എ.ഡി 33",
          title: "സ്വർഗ്ഗാരോഹണവും പെന്തെക്കോസ്തും",
          desc: "പരിശുദ്ധാത്മാവ് അപ്പൊസ്തലന്മാരുടെ മേൽ ഇറങ്ങുകയും ആദിമ സഭ ആരംഭിക്കുകയും ചെയ്തു.",
          details: "യേശുവിന്റെ ഉയിർത്തെഴുന്നേൽപ്പിനും സ്വർഗ്ഗാരോഹണത്തിനും ശേഷം, അപ്പൊസ്തലന്മാർ യെരൂശലേമിൽ ഒന്നിച്ചുകൂടി. പെന്തെക്കൊസ്ത് പെരുന്നാളിൽ പരിശുദ്ധാത്മാവ് അഗ്നിജ്വാലയായി അവരുടെമേൽ ഇറങ്ങി. അവർക്ക് വിവിധ ഭാഷകളിൽ സംസാരിക്കാൻ കഴിഞ്ഞു, ഏതാണ്ട് 3,000 പേർ ഒരു ദിവസം മാമോദീസ സ്വീകരിച്ചു."
        },
        {
          year: "എ.ഡി 33-64",
          title: "അപ്പൊസ്തോലിക ദൗത്യങ്ങൾ",
          desc: "പൗലോസും പത്രോസും ഉൾപ്പെടെയുള്ള അപ്പൊസ്തലന്മാർ റോമാസാമ്രാജ്യത്തിലുടനീളം യാത്ര ചെയ്തു.",
          details: "വലിയ നിയോഗത്താൽ പ്രേരിതരായി അപ്പൊസ്തലന്മാർ ലോകമെങ്ങും സഞ്ചരിച്ചു. പൗലോസ് അപ്പൊസ്തലൻ ഏഷ്യാമൈനർ, യൂറോപ്പ് തുടങ്ങിയ സ്ഥലങ്ങളിൽ സഭകൾ സ്ഥാപിക്കുകയും പുതിയ നിയമത്തിലെ പ്രധാന ലേഖനങ്ങൾ എഴുതുകയും ചെയ്തു. പത്രോസ് ജൂതന്മാരുടെ ഇടയിൽ ശുശ്രൂഷ ചെയ്യുകയും പിന്നീട് റോമിലേക്ക് പോകുകയും ചെയ്തു."
        },
        {
          year: "എ.ഡി 313",
          title: "മിലാൻ വിളംബരം",
          desc: "കോൺസ്റ്റന്റൈൻ ചക്രവർത്തി ക്രിസ്തുമതത്തിന് നിയമപരമായ അംഗീകാരം നൽകി.",
          details: "മിൽവിയൻ പാലത്തിലെ വിജയത്തിനുശേഷം, കോൺസ്റ്റന്റൈനും ലിസിനിയസും ചേർന്ന് മിലാൻ വിളംബരം പുറപ്പെടുവിച്ചു. ഇത് ക്രിസ്ത്യാനികൾക്കെതിരെയുള്ള മതപീഡനങ്ങൾ അവസാനിപ്പിക്കുകയും അവരുടെ കണ്ടുകെട്ടിയ സ്വത്തുക്കൾ തിരികെ നൽകുകയും ചെയ്തു."
        },
        {
          year: "എ.ഡി 325",
          title: "നിഖ്യാ സുന്നഹദോസ്",
          desc: "ആദ്യത്തെ സാർവത്രിക കൗൺസിൽ നടന്നു, നിഖ്യാ വിശ്വാസപ്രമാണം രൂപീകരിച്ചു.",
          details: "കോൺസ്റ്റന്റൈൻ ചക്രവർത്തി വിളിച്ചുകൂട്ടിയ ഈ കൗൺസിൽ, പുത്രനായ ദൈവത്തിന്റെ സ്വഭാവത്തെക്കുറിച്ചുള്ള തർക്കങ്ങൾ പരിഹരിച്ചു. പിതാവും പുത്രനും തുല്യരാണെന്ന് (ത്രിത്വം) തെളിയിക്കുന്ന നിഖ്യാ വിശ്വാസപ്രമാണം രൂപീകരിക്കപ്പെട്ടു."
        },
        {
          year: "എ.ഡി 1054",
          title: "വലിയ ഭിന്നിപ്പ്",
          desc: "സഭ ഈസ്റ്റേൺ ഓർത്തഡോക്സ് സഭയും റോമൻ കത്തോലിക്കാ സഭയുമായി വിഭജിച്ചു.",
          details: "ദൈവശാസ്ത്രപരവും രാഷ്ട്രീയപരവുമായ പല അഭിപ്രായവ്യത്യാസങ്ങളുടെയും ഫലമായി വലിയ ഭിന്നിപ്പുണ്ടായി. മാർപ്പാപ്പയുടെ അധികാരവും പരിശുദ്ധാത്മാവിന്റെ ഉറവിടവും പോലുള്ള വിഷയങ്ങളിലെ തർക്കങ്ങൾ ഒടുവിൽ പൂർണ്ണ വിഭജനത്തിലേക്ക് നയിച്ചു."
        },
        {
          year: "എ.ഡി 1517",
          title: "പ്രൊട്ടസ്റ്റന്റ് നവീകരണം",
          desc: "മാർട്ടിൻ ലൂഥർ തന്റെ 95 വാദങ്ങൾ വിറ്റൻബർഗിലെ പള്ളി വാതിലിൽ പതിപ്പിച്ചു.",
          details: "കത്തോലിക്കാ സഭയിലെ പാപമോചന പത്രങ്ങളുടെ വിൽപ്പനയെ ചോദ്യം ചെയ്ത് മാർട്ടിൻ ലൂഥർ തന്റെ 95 വാദങ്ങൾ അവതരിപ്പിച്ചു. വിശ്വാസത്താൽ മാത്രമേ രക്ഷിക്കപ്പെടുകയുള്ളൂവെന്നും ബൈബിൾ മാത്രമാണ് ഏക അധികാരം എന്നും അദ്ദേഹം വാദിച്ചു."
        },
        {
          year: "19-20 നൂറ്റാണ്ടുകൾ",
          title: "ലോക മിഷനറി പ്രവർത്തനങ്ങൾ",
          desc: "ആഫ്രിക്ക, ഏഷ്യ, അമേരിക്ക എന്നിവിടങ്ങളിൽ മിഷനറി പ്രവർത്തനങ്ങൾ വ്യാപകമായി.",
          details: "ആധുനിക മിഷനറി പ്രസ്ഥാനം ചരിത്രത്തിൽ വലിയ മാറ്റങ്ങൾ വരുത്തി. മിഷനറിമാർ ബൈബിൾ നൂറുകണക്കിന് ഭാഷകളിലേക്ക് വിവർത്തനം ചെയ്യുകയും ആശുപത്രികളും സ്കൂളുകളും നിർമ്മിക്കുകയും സുവിശേഷം ലോകമെങ്ങും എത്തിക്കുകയും ചെയ്തു."
        }
      ]
    }
  },
  German: {
    nav: {
      title: "Christliche Reise",
      home: "Startseite",
      bible: "Bibel",
      guidance: "Führung",
      journey: "Reise"
    },
    footer: {
      about: "Über den Entwickler",
      bio: "Georkutty MC ist ein leidenschaftlicher Entwickler und Visionär, der Technologie mit dem Glauben verbindet, um zugängliche, interaktive spirituelle Werkzeuge zu schaffen. Angetrieben von dem Wunsch, die Lehren der Heiligen Bibel ansprechend und weltweit zugänglich zu machen, baute Georkutty diese Plattform, um die alte Schrift mit dem modernen digitalen Geschichtenerzählen zu verbinden.",
      contact: "Kontakt",
      linkedin: "LinkedIn"
    },
    home: {
      title: "Spirituelle Reise",
      subtitle: "Entdecken Sie die Schrift durch Geschichten, finden Sie biblische Führung und erkunden Sie die Geschichte des Glaubens.",
      badge: "Interaktive Glaubensplattform",
      welcome: "Willkommen auf deiner",
      guideTitle: "So fangen Sie an",
      guideDesc: "Wählen Sie oben rechts in der Navigationsleiste Ihre bevorzugte Sprache aus. Ihre Auswahl übersetzt sofort die Oberfläche und passt die Voiceover-Sprache an.",
      cards: {
        bible: {
          title: "Geschichten-Bibel",
          desc: "Geben Sie einen beliebigen Vers ein und erhalten Sie eine fesselnde Geschichte, die den Kontext erklärt.",
          steps: ['Vers eingeben', 'Geschichte generieren', 'Erzählung anhören'],
          action: "Erfahrung starten",
          howToUse: "So funktioniert es"
        },
        solutions: {
          title: "Biblische Lösungen",
          desc: "Teilen Sie Ihre persönlichen Kämpfe, um einfühlsame biblische Führung zu erhalten.",
          steps: ['Ihre Sorgen teilen', 'Weisheit suchen', 'Schriften reflektieren'],
          action: "Erfahrung starten",
          howToUse: "So funktioniert es"
        },
        journey: {
          title: "Glaubensreise",
          desc: "Blättern Sie durch eine interaktive Zeitachse der christlichen Geschichte von 33 n. Chr. bis heute.",
          steps: ['Zeitachse scrollen', 'Epochen anklicken', 'Ereignisse anhören'],
          action: "Erfahrung starten",
          howToUse: "So funktioniert es"
        }
      }
    },
    bible: {
      title: "Die Interaktive Geschichten-Bibel",
      subtitle: "Geben Sie einen Vers ein und erleben Sie, wie die Schrift lebendig wird.",
      steps: [
        { title: "1. Vers finden", desc: "Wählen Sie eine beliebige Bibelstelle (z.B. Philipper 4,13)." },
        { title: "2. Geschichte generieren", desc: "Unsere KI verwebt den historischen Hintergrund zu einer Erzählung." },
        { title: "3. Zuhören & Lernen", desc: "Genießen Sie die automatische Sprachausgabe in Ihrer Sprache." }
      ],
      placeholder: "z.B. Johannes 3:16",
      button: "Kontext erkunden",
      exploring: "Erkundung von",
      listen: "Anhören",
      stop: "Stopp"
    },
    solutions: {
      title: "Biblische Führung & Lösungen",
      subtitle: "Teilen Sie Ihre Sorgen und lassen Sie sich von der Weisheit der Schrift trösten.",
      steps: [
        { title: "1. Offen teilen", desc: "Schreiben Sie auf, womit Sie kämpfen – Angst, Trauer oder Zweifel." },
        { title: "2. Anker suchen", desc: "Unsere KI verbindet Ihre Gefühle mit spezifischen, erhebenden Bibelversen." },
        { title: "3. Frieden finden", desc: "Hören Sie sich die Ratschläge an und lassen Sie Ihren Geist erneuern." }
      ],
      placeholder: "Ich fühle mich in letzter Zeit mit meinem Job und meiner Familie überfordert...",
      button: "Führung suchen",
      comfort: "Worte des Trostes",
      listen: "Anhören",
      stop: "Stopp"
    },
    journey: {
      title: "Die Glaubensreise",
      subtitle: "Verfolgen Sie die wunderbare historische Zeitleiste der frühen Kirche bis heute.",
      steps: [
        { title: "1. Epochen erkunden", desc: "Scrollen Sie die Zeitachse herunter, um die Geschichte zu visualisieren." },
        { title: "2. Ereignisse wählen", desc: "Klicken Sie auf einen historischen Knoten, um diese Epoche hervorzuheben." },
        { title: "3. Geschichte hören", desc: "Wenn angeklickt, wird die Voiceover-Stimme die Ereignisse nahtlos erzählen." }
      ],
      timeline: [
        {
          year: "33 n. Chr.",
          title: "Himmelfahrt & Pfingsten",
          desc: "Der Heilige Geist kommt auf die Apostel herab und markiert die Geburt der frühen Kirche.",
          details: "Nach der Auferstehung und Himmelfahrt Jesu versammelten sich die Apostel in Jerusalem. Während des Pfingstfestes empfingen sie den Heiligen Geist. Sie konnten plötzlich in verschiedenen Sprachen sprechen und predigten der Menge das Evangelium, was an einem Tag zur Taufe von etwa 3.000 Menschen führte."
        },
        {
          year: "33-64 n. Chr.",
          title: "Apostolische Missionen",
          desc: "Apostel wie Paulus und Petrus reisen durch das Römische Reich und erleiden Verfolgung.",
          details: "Die Apostel reisten weit umher. Der Apostel Paulus unternahm große Reisen durch Kleinasien und Europa. Er gründete zahlreiche Gemeinden und schrieb viele Briefe, die das Neue Testament bilden. Petrus diente den Juden und ging schließlich nach Rom."
        },
        {
          year: "313 n. Chr.",
          title: "Toleranzedikt von Mailand",
          desc: "Kaiser Konstantin legalisiert das Christentum im Römischen Reich.",
          details: "Kaiser Konstantin erließ das Toleranzedikt von Mailand, das die religiöse Toleranz vorschrieb und verfolgten Christen Sicherheit gab. Dies war ein Wendepunkt und beendete Jahrhunderte staatlich geförderter Verfolgung."
        },
        {
          year: "325 n. Chr.",
          title: "Konzil von Nicäa",
          desc: "Das erste ökumenische Konzil findet statt.",
          details: "Dieses Konzil wurde von Kaiser Konstantin in Nicäa einberufen, um theologische Streitigkeiten zu lösen. Das daraus resultierende Glaubensbekenntnis von Nicäa etablierte die orthodoxe Dreifaltigkeitslehre."
        },
        {
          year: "1054 n. Chr.",
          title: "Das Morgenländische Schisma",
          desc: "Die Kirche spaltet sich in die Östlich-Orthodoxe Kirche und die Römisch-Katholische Kirche.",
          details: "Aufgrund langjähriger theologischer und politischer Meinungsverschiedenheiten spaltete sich die Kirche. Wichtige Streitigkeiten betrafen die Quelle des Heiligen Geistes und den universellen Zuständigkeitsanspruch des Papstes."
        },
        {
          year: "1517 n. Chr.",
          title: "Die Protestantische Reformation",
          desc: "Martin Luther schlägt seine 95 Thesen an die Tür in Wittenberg.",
          details: "Martin Luther forderte Reformen innerhalb der katholischen Kirche und veröffentlichte seine 95 Thesen. Er argumentierte, dass die Erlösung ein freies Geschenk der Gnade Gottes ist (sola fide) und die Bibel die einzige Quelle göttlicher Autorität (sola scriptura) sei."
        },
        {
          year: "19.-20. Jh.",
          title: "Globale Missionen",
          desc: "Eine immense Ausweitung der Missionsarbeit verbreitet das Evangelium auf der ganzen Welt.",
          details: "Die moderne Missionsbewegung führte zu unzähligen Missionaren in Afrika, Asien und Amerika. Organisationen übersetzten die Bibel in Hunderte von indigenen Sprachen, gründeten Schulen und bauten Krankenhäuser."
        }
      ]
    }
  }
};
