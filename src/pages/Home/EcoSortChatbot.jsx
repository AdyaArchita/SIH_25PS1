import React, { useEffect, useRef, useState } from "react";

// React-Icons को हटा दिया गया है और इमोजी का उपयोग किया गया है

export function EcoSortChatbot({ open, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-IN");
  const [reportId, setReportId] = useState("");
  const messagesRef = useRef(null);
  const recognitionRef = useRef(null);
  const isInitialMount = useRef(true);

  // Languages remain the same
  const languages = [
    { code: "en-IN", label: "English" },
    { code: "hi-IN", label: "हिन्दी" },
    { code: "or-IN", label: "ଓଡ଼ିଆ" },
    { code: "mr-IN", label: "मराठी" },
    { code: "ta-IN", label: "தமிழ்" },
    { code: "te-IN", label: "తెలుగు" },
    { code: "bn-IN", label: "বাংলা" },
  ];

  // --- Greetings updated for EcoSort ---
  const greetings = {
    "en-IN": "Hi! I'm the EcoSort Assistant. I can help you check the status of a bin report, escalate an urgent issue, or provide information on our smart bins.",
    "hi-IN": "नमस्ते! मैं इकोसॉर्ट असिस्टेंट हूँ। मैं आपकी बिन रिपोर्ट की स्थिति देखने, किसी জরুরি मुद्दे को प्राथमिकता देने, या हमारे स्मार्ट बिन्स के बारे में जानकारी देने में मदद कर सकता हूँ।",
    "or-IN": "ନମସ୍କାର! ମୁଁ ଇକୋସର୍ଟ ଆସିଷ୍ଟାଣ୍ଟ। ମୁଁ ଆପଣଙ୍କର ବିନ୍ ରିପୋର୍ଟର ସ୍ଥିତି ଯାଞ୍ଚ କରିବାରେ, କୌଣସି ଜରୁରୀ ସମସ୍ୟାକୁ ପ୍ରାଥମିକତା ଦେବାରେ, କିମ୍ବା ଆମ ସ୍ମାର୍ଟ ବିନ୍ ବିଷୟରେ ସୂଚନା ଦେବାରେ ସାହାଯ୍ୟ କରିପାରେ।",
    "mr-IN": "नमस्कार! मी इकोसॉर्ट असिस्टंट आहे. मी तुमच्या बिन रिपोर्टची स्थिती तपासण्यात, तातडीच्या समस्येला प्राधान्य देण्यात, किंवा आमच्या स्मार्ट बिन्सबद्दल माहिती देण्यात मदत करू शकेन.",
    "ta-IN": "வணக்கம்! நான் ஈக்கோசார்ட் உதவியாளர். உங்கள் தொட்டி அறிக்கையின் நிலையைச் சரிபார்க்க, அவசரப் பிரச்சினைக்கு முன்னுரிமை அளிக்க, அல்லது எங்கள் ஸ்மார்ட் தொட்டிகளைப் பற்றிய தகவல்களை வழங்க என்னால் உதவ முடியும்.",
    "te-IN": "నమస్కారం! నేను ఈకోసార్ట్ అసిస్టెంట్. మీ బిన్ రిపోర్ట్ యొక్క స్థితిని తనిఖీ చేయడానికి, అత్యవసర సమస్యకు ప్రాధాన్యత ఇవ్వడానికి, లేదా మా స్మార్ట్ బిన్‌ల గురించి సమాచారం అందించడానికి నేను సహాయపడగలను.",
    "bn-IN": "নমস্কার! আমি ইকোসর্ট অ্যাসিস্ট্যান্ট। আমি আপনার বিন রিপোর্টের স্ট্যাটাস পরীক্ষা করতে, জরুরি সমস্যাকে অগ্রাধিকার দিতে, অথবা আমাদের স্মার্ট বিন সম্পর্কে তথ্য প্রদানে সহায়তা করতে পারি।",
  };

  // --- Quick buttons updated for EcoSort with Emojis ---
  const quickButtons = [
    { label: "Bin Full", icon: '🗑️' },
    { label: "Damaged Bin", icon: '🔧' },
    { label: "Sorting Error", icon: '⚙️' },
    { label: "Illegal Dumping", icon: '🚫' },
    { label: "Bin Offline", icon: '🔌' },
    { label: "Status", icon: 'ℹ️' },
    { label: "Escalate", icon: '🚨' },
    { label: "Help", icon: '❓' },
  ];

  // --- Issue replies updated for EcoSort ---
  const issueReplies = {
    "en-IN": {
      "Bin Full": "Reports for full bins are typically addressed within 2-4 hours by the local collection team. Please track your report with its ID.",
      "Damaged Bin": "Maintenance teams are usually dispatched within 24 hours for damaged bins.",
      "Sorting Error": "A technical team will investigate sorting errors within 12-24 hours.",
      "Illegal Dumping": "This has been forwarded to the local sanitation authority for immediate action.",
      "Bin Offline": "A technician will be assigned to inspect the bin's power and connectivity issues within 8 hours.",
      "Status": "Please provide your Bin Report ID (e.g., BIN-1A45) to check the latest status.",
      "Escalate": "To escalate an issue, please provide the Bin Report ID. High-priority issues are reviewed every hour.",
      "Help": "You can ask about the status of a report, escalate an issue, or get information about different bin problems.",
    },
    "hi-IN": {
      "Bin Full": "भरे हुए डिब्बे की रिपोर्ट पर स्थानीय संग्रह टीम द्वारा 2-4 घंटे के भीतर कार्रवाई की जाती है। कृपया अपनी रिपोर्ट आईडी से ट्रैक करें।",
      "Damaged Bin": "क्षतिग्रस्त डिब्बे के लिए रखरखाव टीमें आमतौर पर 24 घंटे के भीतर भेजी जाती हैं।",
      "Sorting Error": "तकनीकी टीम 12-24 घंटे के भीतर सॉर्टिंग त्रुटियों की जांच करेगी।",
      "Illegal Dumping": "इसे तत्काल कार्रवाई के लिए स्थानीय स्वच्छता प्राधिकरण को भेज दिया गया है।",
      "Bin Offline": "एक तकनीशियन 8 घंटे के भीतर बिन की बिजली और कनेक्टिविटी समस्याओं का निरीक्षण करने के लिए नियुक्त किया जाएगा।",
      "Status": "नवीनतम स्थिति की जांच के लिए कृपया अपनी बिन रिपोर्ट आईडी (जैसे, BIN-1A45) प्रदान करें।",
      "Escalate": "किसी समस्या को आगे बढ़ाने के लिए, कृपया बिन रिपोर्ट आईडी प्रदान करें। उच्च-प्राथमिकता वाले मुद्दों की हर घंटे समीक्षा की जाती है।",
      "Help": "आप किसी रिपोर्ट की स्थिति के बारे में पूछ सकते हैं, किसी समस्या को आगे बढ़ा सकते हैं, या विभिन्न बिन समस्याओं के बारे में जानकारी प्राप्त कर सकते हैं।",
    },
    "or-IN": {
      "Bin Full": "ପୂର୍ଣ୍ଣ ବିନ୍ ପାଇଁ ରିପୋର୍ଟଗୁଡିକ ସାଧାରଣତଃ ୨-୪ ଘଣ୍ଟା ମଧ୍ୟରେ ସ୍ଥାନୀୟ ସଂଗ୍ରହକାରୀ ଦଳ ଦ୍ଵାରା ସମାଧାନ କରାଯାଏ। ଦୟାକରି ଆପଣଙ୍କ ରିପୋର୍ଟ ID ସହିତ ଟ୍ରାକ୍ କରନ୍ତୁ।",
      "Damaged Bin": "କ୍ଷତିଗ୍ରସ୍ତ ବିନ୍ ପାଇଁ ରକ୍ଷଣାବେକ୍ଷଣକାରୀ ଦଳ ସାଧାରଣତଃ ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ପଠାଯାଏ।",
      "Sorting Error": "ଏକ ବୈଷୟିକ ଦଳ ୧୨-୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ସର୍ଟିଂ ତ୍ରୁଟିର ଅନୁସନ୍ଧାନ କରିବ।",
      "Illegal Dumping": "ଏହାକୁ ତୁରନ୍ତ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ପାଇଁ ସ୍ଥାନୀୟ ସ୍ୱଚ୍ଛତା ପ୍ରାଧିକରଣକୁ ପଠାଯାଇଛି।",
      "Bin Offline": "ଜଣେ ଟେକ୍ନିସିଆନ୍ ୮ ଘଣ୍ଟା ମଧ୍ୟରେ ବିନ୍‌ର ପାୱାର୍ ଏବଂ କନେକ୍ଟିଭିଟି ସମସ୍ୟାର ଯାଞ୍ଚ କରିବା ପାଇଁ ନିଯୁକ୍ତ ହେବେ।",
      "Status": "ନୂତନ ସ୍ଥିତି ଯାଞ୍ଚ କରିବାକୁ ଦୟାକରି ଆପଣଙ୍କର ବିନ୍ ରିପୋର୍ଟ ID (ଉଦାହରଣ ସ୍ୱରୂପ, BIN-1A45) ପ୍ରଦାନ କରନ୍ତୁ।",
      "Escalate": "କୌଣସି ସମସ୍ୟାକୁ ଏସ୍କାଲେଟ୍ କରିବାକୁ, ଦୟାକରି ବିନ୍ ରିପୋର୍ଟ ID ପ୍ରଦାନ କରନ୍ତୁ। ଉଚ୍ଚ-ପ୍ରାଥମିକତା ଥିବା ସମସ୍ୟାଗୁଡ଼ିକର ପ୍ରତି ଘଣ୍ଟାରେ ସମୀକ୍ଷା କରାଯାଏ।",
      "Help": "ଆପଣ ଏକ ରିପୋର୍ଟର ସ୍ଥିତି ବିଷୟରେ ପଚାରିପାରିବେ, ଏକ ସମସ୍ୟାକୁ ଏସ୍କାଲେଟ୍ କରିପାରିବେ, କିମ୍ବା ବିଭିନ୍ନ ବିନ୍ ସମସ୍ୟା ବିଷୟରେ ସୂଚନା ପାଇପାରିବେ।",
    }
  };

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (!SpeechRecognition) return;

    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      appendMessage({ from: "user", text });
      setInput(text);
      setListening(false);
      stopRecognition();
      handleBotReply(text);
    };

    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [lang]);

  useEffect(() => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, open]);

  // Effect for the initial greeting message when the chatbot is opened
  useEffect(() => {
    if (open && messages.length === 0) {
      const greet = greetings[lang] || greetings["en-IN"];
      appendMessage({ from: "bot", text: greet, type: "info" });
      speak(greet);
    }
  }, [open]);

  // Effect for changing the greeting message when the language is changed
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (open) {
      const greet = greetings[lang] || greetings["en-IN"];
      appendMessage({ from: "bot", text: greet, type: "info" });
      speak(greet);
    }
  }, [lang, open]);

  function appendMessage(msg) {
    setMessages((m) => [...m, { ...msg, time: new Date().toISOString() }]);
  }

  function startRecognition() {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.lang = lang;
      recognitionRef.current.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  function stopRecognition() {
    try {
      recognitionRef.current && recognitionRef.current.stop();
    } catch {}
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = lang || "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(ut);
  }

  function handleBotReply(userText) {
    const responses = issueReplies[lang] || issueReplies["en-IN"];
    let reply = "Sorry, I couldn't understand that. You can ask about a bin report's status or how to escalate an issue.";
    let type = "info";

    for (let key in responses) {
      const pattern = new RegExp(key, "i");
      if (pattern.test(userText)) {
        reply = responses[key];
        break;
      }
    }
    
    // Check for report ID in user text
    const foundReportId = userText.match(/BIN-\w+/i);
    const currentReportId = foundReportId ? foundReportId[0].toUpperCase() : reportId;

    if (/status/i.test(userText)) {
      type = "status";
      reply = currentReportId
        ? `Status for report ${currentReportId} is currently 'In Progress'. A team has been assigned.`
        : responses.Status;
    } else if (/escalate/i.test(userText)) {
      type = "urgent";
      reply = currentReportId
        ? `Report ${currentReportId} has been flagged for urgent review by the operations team.`
        : responses.Escalate;
    }

    appendMessage({ from: "bot", text: reply, type });
    speak(reply);
  }

  function handleQuickClick(btn) {
    appendMessage({ from: "user", text: btn.label });
    const responses = issueReplies[lang] || issueReplies["en-IN"];
    const reply = responses[btn.label] || "Sorry, I couldn't understand that.";
    appendMessage({ from: "bot", text: reply, type: "info" });
    speak(reply);
  }

  const fmtTime = (iso) => new Date(iso).toLocaleTimeString();

  return (
    <div>
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white flex justify-between items-center rounded-t-2xl">
            <div className="font-semibold">EcoSort Assistant</div>
            <div className="flex gap-2 items-center">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="text-sm rounded px-2 py-1 bg-white/20 text-white border-none outline-none appearance-none"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="text-black">
                    {l.label}
                  </option>
                ))}
              </select>
              <button onClick={() => setOpen(false)} className="text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors">&times;</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div ref={messagesRef} className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50 text-black">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                  <div className={`inline-block max-w-[85%] px-4 py-3 rounded-xl ${m.from === 'bot' ? 'bg-white shadow-sm' : 'bg-blue-500 text-white'} break-words`}>
                    <p className="text-sm">{m.text}</p>
                    <div className="text-xs opacity-60 mt-1 text-right">{fmtTime(m.time)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Buttons */}
            <div className="px-4 py-2 border-t bg-white flex flex-wrap gap-2">
              {quickButtons.map((b) => (
                <button
                  key={b.label}
                  onClick={() => handleQuickClick(b)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-gray-100 text-gray-800 text-xs font-medium hover:bg-gray-200 transition"
                >
                  <span className="text-base">{b.icon}</span> {b.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-2 border-t bg-white flex flex-col gap-2">
              <input
                value={reportId}
                onChange={(e) => setReportId(e.target.value.toUpperCase())}
                placeholder="Enter Bin Report ID (e.g., BIN-1A45)"
                className="w-full px-3 py-2 rounded-lg border bg-gray-100 text-black text-sm"
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!input.trim()) return;
                  appendMessage({ from: "user", text: input });
                  handleBotReply(input);
                  setInput("");
                }}
                className="flex gap-2 items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your bin report..."
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => (listening ? stopRecognition() : startRecognition())}
                  className={`px-3 py-2 rounded-lg border text-lg ${listening ? "bg-red-100 text-red-600 border-red-400" : "bg-gray-100 text-gray-600 border-gray-300"}`}
                >
                  {listening ? '🔇' : '🎤'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

