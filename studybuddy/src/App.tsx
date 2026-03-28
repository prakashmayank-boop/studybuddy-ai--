import { useState, useRef, useEffect } from "react";

type Lang = "en" | "hi";

const t = {
  en: {
    appTitle: "StudyBuddy AI",
    appSubtitle: "Exam Stress Coach",
    tagline: "Learn smarter · ⚡ Revise faster · 🎓 Stress less",
    badge1: "🧠 AI-Powered Explanations",
    badge2: "📋 Auto Quiz Generator",
    badge3: "😌 Stress Coach",
    scroll: "Scroll to explore",
    topicTitle: "Topic Learning",
    topicSub: "Type any topic to get an easy explanation",
    topicPlaceholder: "Enter a topic like Photosynthesis, Algebra, Mughal Empire...",
    explainBtn: "💡 Explain Topic",
    quizBtn: "📋 Generate Quiz (10 MCQs)",
    clearBtn: "🗑 Clear All",
    recentTopics: "Recent Topics",
    explaining: "Generating explanation...",
    generatingQuiz: "Generating 10 questions...",
    quizTitle: "Quiz Time! 🎯",
    quizSub: "10 Questions • Select the correct answer",
    scoreTitle: "Quiz Complete!",
    retryQuiz: "Retry Quiz",
    stressTitle: "Exam Stress Help 😌",
    stressOpen: "Stress Help",
    motivateBtn: "🌟 Motivate Me",
    breathBtn: "🫁 Breathing Tip",
    studyBtn: "📚 Study Tip",
    footer: "Made for students with ❤️ by StudyBuddy AI",
    langToggle: "हिंदी",
    question: "Question",
    explanationTitle: "📖 Explanation",
    excellent: "Excellent! 🎉",
    great: "Great! 👏",
    good: "Good! 👍",
    keep: "Keep Practicing! 💪",
    stressTip: "💡 Tip of the moment:",
    initialTip: "Break big chapters into small 15-minute study sessions. Your brain learns better in short bursts!",
    plannerTitle: "📅 7-Day Study Planner",
    plannerSub: "Personalized exam plan",
    subjectLabel: "Subject / Exam name",
    subjectPlaceholder: "e.g. Mathematics, Physics, UPSC...",
    daysLabel: "Days left for exam",
    weakLabel: "Your weak area",
    weakPlaceholder: "e.g. Calculus, Organic Chemistry...",
    stressLevelLabel: "Stress level right now",
    stressLow: "Low",
    stressHigh: "High",
    generatePlanBtn: "Generate my 7-day plan",
    planReady: "Your Personalized Plan",
    day: "Day",
  },
  hi: {
    appTitle: "StudyBuddy AI",
    appSubtitle: "परीक्षा तनाव कोच",
    tagline: "स्मार्ट पढ़ो · ⚡ तेज़ रिवाइज करो · 🎓 तनाव कम करो",
    badge1: "🧠 AI स्पष्टीकरण",
    badge2: "📋 ऑटो क्विज़ जनरेटर",
    badge3: "😌 तनाव कोच",
    scroll: "नीचे स्क्रॉल करें",
    topicTitle: "विषय अध्ययन",
    topicSub: "कोई भी विषय टाइप करें और आसान व्याख्या पाएं",
    topicPlaceholder: "विषय लिखें जैसे प्रकाश संश्लेषण, बीजगणित, मुगल साम्राज्य...",
    explainBtn: "💡 विषय समझाओ",
    quizBtn: "📋 क्विज़ बनाओ (10 सवाल)",
    clearBtn: "🗑 सब साफ करो",
    recentTopics: "हाल के विषय",
    explaining: "व्याख्या तैयार हो रही है...",
    generatingQuiz: "10 सवाल तैयार हो रहे हैं...",
    quizTitle: "क्विज़ शुरू! 🎯",
    quizSub: "10 सवाल • सही जवाब चुनें",
    scoreTitle: "क्विज़ पूरी!",
    retryQuiz: "फिर से करो",
    stressTitle: "परीक्षा तनाव सहायता 😌",
    stressOpen: "तनाव सहायता",
    motivateBtn: "🌟 प्रेरणा दो",
    breathBtn: "🫁 श्वास व्यायाम",
    studyBtn: "📚 पढ़ाई टिप",
    footer: "StudyBuddy AI द्वारा छात्रों के लिए ❤️",
    langToggle: "English",
    question: "सवाल",
    explanationTitle: "📖 व्याख्या",
    excellent: "शानदार! 🎉",
    great: "बढ़िया! 👏",
    good: "अच्छा! 👍",
    keep: "अभ्यास जारी रखो! 💪",
    stressTip: "💡 आज की टिप:",
    initialTip: "बड़े अध्यायों को 15 मिनट के छोटे सत्रों में बांटो। छोटे हिस्सों में दिमाग बेहतर सीखता है!",
    plannerTitle: "📅 7-दिन की पढ़ाई योजना",
    plannerSub: "आपकी व्यक्तिगत परीक्षा योजना",
    subjectLabel: "विषय / परीक्षा का नाम",
    subjectPlaceholder: "जैसे गणित, भौतिकी, UPSC...",
    daysLabel: "परीक्षा में कितने दिन बाकी",
    weakLabel: "आपका कमज़ोर क्षेत्र",
    weakPlaceholder: "जैसे कलन, कार्बनिक रसायन...",
    stressLevelLabel: "अभी तनाव का स्तर",
    stressLow: "कम",
    stressHigh: "ज़्यादा",
    generatePlanBtn: "7-दिन की योजना बनाओ",
    planReady: "आपकी व्यक्तिगत योजना",
    day: "दिन",
  },
};

// ── Topic data ──────────────────────────────────────────────────────────────
const topicData: Record<string, { en: { explain: string; mcqs: { q: string; opts: string[]; ans: number }[] }; hi: { explain: string; mcqs: { q: string; opts: string[]; ans: number }[] } }> = {
  photosynthesis: {
    en: {
      explain: "Photosynthesis is the process by which green plants make their own food using sunlight, water, and carbon dioxide. It is one of the most important biological processes on Earth.\n\n🌿 Where it happens: Inside the chloroplasts of plant cells. Chloroplasts contain a green pigment called chlorophyll, which gives plants their green colour and captures sunlight energy.\n\n🔄 How it works (Step by Step):\n1. The plant absorbs water (H₂O) from the soil through its roots.\n2. Carbon dioxide (CO₂) enters through tiny pores on leaves called stomata.\n3. Chlorophyll captures sunlight energy.\n4. This energy is used to split water molecules and combine CO₂ with hydrogen to form glucose (C₆H₁₂O₆).\n5. Oxygen (O₂) is released as a byproduct into the air.\n\n⚗️ Chemical Equation:\n6CO₂ + 6H₂O + Sunlight Energy → C₆H₁₂O₆ + 6O₂\n\n📌 Two Stages of Photosynthesis:\n• Light Reactions (in thylakoids): Sunlight splits water, produces ATP and NADPH, releases O₂.\n• Dark Reactions / Calvin Cycle (in stroma): Uses ATP and NADPH to fix CO₂ into glucose.\n\n🌍 Why it matters: Plants are called producers because they make food from non-living things. All animals (including us) ultimately depend on photosynthesis for energy and oxygen to breathe!",
      mcqs: [
        { q: "Where does photosynthesis mainly take place in a plant?", opts: ["Root", "Stem", "Chloroplast", "Mitochondria"], ans: 2 },
        { q: "Which gas do plants absorb during photosynthesis?", opts: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], ans: 2 },
        { q: "What is the byproduct of photosynthesis?", opts: ["Water", "Carbon Dioxide", "Glucose", "Oxygen"], ans: 3 },
        { q: "Which pigment is responsible for capturing sunlight?", opts: ["Hemoglobin", "Chlorophyll", "Melanin", "Carotene"], ans: 1 },
        { q: "What is the main product of photosynthesis?", opts: ["Starch", "Protein", "Glucose", "Fat"], ans: 2 },
        { q: "Through which pores do plants take in CO₂?", opts: ["Root hairs", "Stomata", "Lenticels", "Veins"], ans: 1 },
        { q: "Which energy source drives photosynthesis?", opts: ["Heat", "Chemical energy", "Sunlight", "Electrical energy"], ans: 2 },
        { q: "What happens to oxygen produced in photosynthesis?", opts: ["Used by plant", "Released in air", "Stored in roots", "Converted to CO₂"], ans: 1 },
        { q: "Which organelle contains chlorophyll?", opts: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], ans: 3 },
        { q: "Plants are called producers because they:", opts: ["Eat other organisms", "Make their own food", "Release CO₂", "Absorb oxygen"], ans: 1 },
      ],
    },
    hi: {
      explain: "प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड का उपयोग करके अपना भोजन बनाते हैं। यह पृथ्वी पर सबसे महत्वपूर्ण जैविक प्रक्रियाओं में से एक है।\n\n🌿 कहाँ होता है: पौधे की कोशिकाओं के क्लोरोप्लास्ट में। क्लोरोप्लास्ट में क्लोरोफिल नामक हरा रंगद्रव्य होता है जो पौधों को हरा रंग देता है और सूर्य की ऊर्जा को ग्रहण करता है।\n\n🔄 यह कैसे होता है (चरण दर चरण):\n1. पौधा जड़ों के माध्यम से मिट्टी से पानी (H₂O) अवशोषित करता है।\n2. कार्बन डाइऑक्साइड (CO₂) पत्तियों के स्टोमेटा नामक छिद्रों से प्रवेश करती है।\n3. क्लोरोफिल सूर्य की ऊर्जा को पकड़ता है।\n4. इस ऊर्जा से पानी के अणु टूटते हैं और CO₂ के साथ मिलकर ग्लूकोज बनता है।\n5. ऑक्सीजन (O₂) उपोत्पाद के रूप में हवा में छोड़ी जाती है।\n\n⚗️ रासायनिक समीकरण:\n6CO₂ + 6H₂O + सूर्य प्रकाश → C₆H₁₂O₆ + 6O₂\n\n📌 प्रकाश संश्लेषण के दो चरण:\n• प्रकाश अभिक्रिया (थायलाकॉइड में): सूर्य का प्रकाश पानी को तोड़ता है, ATP और NADPH बनाता है, O₂ निकलती है।\n• अंधेरी अभिक्रिया / केल्विन चक्र (स्ट्रोमा में): ATP और NADPH का उपयोग करके CO₂ से ग्लूकोज बनता है।\n\n🌍 यह क्यों ज़रूरी है: पौधों को उत्पादक इसलिए कहते हैं क्योंकि वे निर्जीव चीजों से भोजन बनाते हैं। सभी जानवर (हम सहित) अंततः ऊर्जा और ऑक्सीजन के लिए प्रकाश संश्लेषण पर निर्भर हैं!",
      mcqs: [
        { q: "पौधे में प्रकाश संश्लेषण मुख्यतः कहाँ होता है?", opts: ["जड़", "तना", "क्लोरोप्लास्ट", "माइटोकॉन्ड्रिया"], ans: 2 },
        { q: "प्रकाश संश्लेषण में पौधे कौन सी गैस लेते हैं?", opts: ["ऑक्सीजन", "नाइट्रोजन", "कार्बन डाइऑक्साइड", "हाइड्रोजन"], ans: 2 },
        { q: "प्रकाश संश्लेषण का उपोत्पाद क्या है?", opts: ["पानी", "कार्बन डाइऑक्साइड", "ग्लूकोज", "ऑक्सीजन"], ans: 3 },
        { q: "सूर्य प्रकाश ग्रहण करने के लिए कौन सा रंगद्रव्य जिम्मेदार है?", opts: ["हीमोग्लोबिन", "क्लोरोफिल", "मेलानिन", "कैरोटीन"], ans: 1 },
        { q: "प्रकाश संश्लेषण का मुख्य उत्पाद क्या है?", opts: ["स्टार्च", "प्रोटीन", "ग्लूकोज", "वसा"], ans: 2 },
        { q: "पौधे किन छिद्रों से CO₂ लेते हैं?", opts: ["मूल रोम", "स्टोमेटा", "लेंटिसेल", "शिराएं"], ans: 1 },
        { q: "प्रकाश संश्लेषण को कौन सी ऊर्जा चलाती है?", opts: ["ताप", "रासायनिक ऊर्जा", "सूर्य प्रकाश", "विद्युत ऊर्जा"], ans: 2 },
        { q: "प्रकाश संश्लेषण में उत्पन्न ऑक्सीजन का क्या होता है?", opts: ["पौधा उपयोग करता है", "वायु में निकलती है", "जड़ों में जमा होती है", "CO₂ में बदलती है"], ans: 1 },
        { q: "कौन सी कोशिकांग में क्लोरोफिल होता है?", opts: ["केंद्रक", "माइटोकॉन्ड्रिया", "राइबोसोम", "क्लोरोप्लास्ट"], ans: 3 },
        { q: "पौधों को उत्पादक क्यों कहते हैं?", opts: ["दूसरे जीवों को खाते हैं", "अपना भोजन बनाते हैं", "CO₂ छोड़ते हैं", "ऑक्सीजन लेते हैं"], ans: 1 },
      ],
    },
  },
  algebra: {
    en: {
      explain: "Algebra is a branch of mathematics where we use letters (called variables) to represent unknown numbers and find their values. It is the gateway to all advanced mathematics!\n\n📘 Key Terms:\n• Variable: A letter (like x, y, z) that stands for an unknown number.\n• Constant: A fixed number that doesn't change (like 5, -3, 100).\n• Expression: A combination of variables and constants without an = sign. Example: 2x + 3\n• Equation: Two expressions connected by an = sign. Example: 2x + 3 = 7\n• Coefficient: The number in front of a variable. In 5x, the coefficient is 5.\n\n🔄 How to Solve a Simple Equation:\nGoal: Get the variable alone on one side.\nExample: Solve 3x + 6 = 15\nStep 1: Subtract 6 from both sides → 3x = 9\nStep 2: Divide both sides by 3 → x = 3 ✓\nAlways check: 3(3) + 6 = 9 + 6 = 15 ✓\n\n📌 Types of Algebraic Equations:\n• Linear: x + 2 = 5 (highest power = 1)\n• Quadratic: x² + 3x + 2 = 0 (highest power = 2)\n• Simultaneous: Two equations solved together\n\n🌍 Real-life uses: Calculating discounts, splitting bills, finding speed/distance/time, engineering, programming, and science formulas all use algebra every day!",
      mcqs: [
        { q: "What does a variable represent in algebra?", opts: ["A fixed number", "An unknown number", "A negative number", "A fraction"], ans: 1 },
        { q: "Solve: x + 7 = 12. What is x?", opts: ["5", "19", "7", "12"], ans: 0 },
        { q: "Which is an algebraic expression?", opts: ["2 + 3 = 5", "2x + 3", "10 ÷ 2", "5 > 3"], ans: 1 },
        { q: "Solve: 3x = 15. What is x?", opts: ["3", "12", "5", "45"], ans: 2 },
        { q: "What is the value of 2x + 3 when x = 4?", opts: ["11", "14", "8", "5"], ans: 0 },
        { q: "Which letter commonly represents an unknown in algebra?", opts: ["a", "x", "p", "z"], ans: 1 },
        { q: "Solve: x - 4 = 9. What is x?", opts: ["5", "13", "4", "36"], ans: 1 },
        { q: "What is a constant in algebra?", opts: ["A changing value", "A fixed number", "An equation", "A variable"], ans: 1 },
        { q: "Solve: 2x + 1 = 7. What is x?", opts: ["4", "3", "8", "2"], ans: 1 },
        { q: "An equation must always have:", opts: ["Only variables", "Only numbers", "An equals sign", "A fraction"], ans: 2 },
      ],
    },
    hi: {
      explain: "बीजगणित गणित की वह शाखा है जिसमें हम अज्ञात संख्याओं को अक्षरों (चरों) से दर्शाते हैं और उनका मान निकालते हैं। यह सभी उन्नत गणित का आधार है!\n\n📘 मुख्य शब्द:\n• चर (Variable): एक अक्षर (जैसे x, y, z) जो अज्ञात संख्या दर्शाता है।\n• स्थिरांक (Constant): एक निश्चित संख्या जो नहीं बदलती (जैसे 5, -3, 100)।\n• व्यंजक (Expression): चर और स्थिरांक का संयोजन, बिना = चिह्न के। उदाहरण: 2x + 3\n• समीकरण (Equation): दो व्यंजक = से जुड़े। उदाहरण: 2x + 3 = 7\n• गुणांक (Coefficient): चर के सामने वाली संख्या। 5x में गुणांक 5 है।\n\n🔄 सरल समीकरण हल करने का तरीका:\nलक्ष्य: चर को एक तरफ अकेला करो।\nउदाहरण: 3x + 6 = 15 हल करो\nचरण 1: दोनों तरफ से 6 घटाओ → 3x = 9\nचरण 2: दोनों तरफ 3 से भाग दो → x = 3 ✓\nजाँच: 3(3) + 6 = 9 + 6 = 15 ✓\n\n📌 बीजगणितीय समीकरणों के प्रकार:\n• रैखिक: x + 2 = 5 (उच्चतम घात = 1)\n• द्विघात: x² + 3x + 2 = 0 (उच्चतम घात = 2)\n• युगपत: दो समीकरण एक साथ हल\n\n🌍 वास्तविक जीवन में उपयोग: छूट निकालना, बिल बाँटना, गति/दूरी/समय, इंजीनियरिंग, प्रोग्रामिंग — बीजगणित हर जगह काम आता है!",
      mcqs: [
        { q: "बीजगणित में चर क्या दर्शाता है?", opts: ["निश्चित संख्या", "अज्ञात संख्या", "ऋणात्मक संख्या", "भिन्न"], ans: 1 },
        { q: "हल करो: x + 7 = 12। x का मान क्या है?", opts: ["5", "19", "7", "12"], ans: 0 },
        { q: "कौन सा बीजगणितीय व्यंजक है?", opts: ["2 + 3 = 5", "2x + 3", "10 ÷ 2", "5 > 3"], ans: 1 },
        { q: "हल करो: 3x = 15। x का मान क्या है?", opts: ["3", "12", "5", "45"], ans: 2 },
        { q: "2x + 3 का मान क्या होगा जब x = 4?", opts: ["11", "14", "8", "5"], ans: 0 },
        { q: "बीजगणित में अज्ञात को सामान्यतः किस अक्षर से दर्शाते हैं?", opts: ["a", "x", "p", "z"], ans: 1 },
        { q: "हल करो: x - 4 = 9। x का मान क्या है?", opts: ["5", "13", "4", "36"], ans: 1 },
        { q: "बीजगणित में स्थिरांक क्या होता है?", opts: ["बदलने वाला मान", "निश्चित संख्या", "एक समीकरण", "एक चर"], ans: 1 },
        { q: "हल करो: 2x + 1 = 7। x का मान क्या है?", opts: ["4", "3", "8", "2"], ans: 1 },
        { q: "एक समीकरण में हमेशा क्या होता है?", opts: ["केवल चर", "केवल संख्याएं", "बराबर का चिह्न", "भिन्न"], ans: 2 },
      ],
    },
  },
  gravity: {
    en: {
      explain: "Gravity is a fundamental force of nature that pulls any two objects with mass towards each other. It is what keeps planets in orbit, the Moon around Earth, and us firmly on the ground!\n\n🍎 Discovery: Sir Isaac Newton (1687) observed an apple falling from a tree and realised that the same force pulling the apple must be keeping the Moon in orbit around Earth. He published the Universal Law of Gravitation.\n\n📐 Newton's Law of Universal Gravitation:\nF = G × (m₁ × m₂) / r²\n• F = Gravitational force between two objects\n• G = Universal gravitational constant (6.674 × 10⁻¹¹ N·m²/kg²)\n• m₁, m₂ = Masses of the two objects\n• r = Distance between their centres\n\n🔑 Key Effects of Gravity:\n• On Earth: Acceleration due to gravity (g) = 9.8 m/s² (objects fall 9.8 m/s faster every second)\n• On Moon: g ≈ 1.6 m/s² (about 1/6th of Earth's) — that's why astronauts bounce!\n• On Jupiter: g ≈ 24.8 m/s² — you'd feel much heavier!\n\n📌 Gravity vs Weight vs Mass:\n• Mass: Amount of matter in an object (stays the same everywhere).\n• Weight: Force of gravity on an object = mass × g (changes on different planets).\n\n🌍 Real-world Importance: Gravity holds our atmosphere in place, controls ocean tides, keeps satellites in orbit, and is responsible for the formation of stars and galaxies!",
      mcqs: [
        { q: "Who discovered the law of gravity?", opts: ["Einstein", "Newton", "Galileo", "Kepler"], ans: 1 },
        { q: "What is the acceleration due to gravity on Earth?", opts: ["9.8 m/s²", "6.7 m/s²", "10.5 m/s²", "8.9 m/s²"], ans: 0 },
        { q: "What does gravity depend on?", opts: ["Color and size", "Mass and distance", "Speed and time", "Temperature and pressure"], ans: 1 },
        { q: "Moon's gravity compared to Earth is approximately:", opts: ["Equal", "Double", "1/6th", "1/3rd"], ans: 2 },
        { q: "What causes gravity?", opts: ["Electricity", "Magnetism", "Mass", "Light"], ans: 2 },
        { q: "In which direction does gravity on Earth pull?", opts: ["Upward", "Sideways", "Downward", "In all directions"], ans: 2 },
        { q: "What happens to gravitational force as distance increases?", opts: ["Increases", "Stays same", "Decreases", "Doubles"], ans: 2 },
        { q: "Which formula represents gravitational force?", opts: ["F = ma", "F = G×m₁m₂/r²", "E = mc²", "F = mv"], ans: 1 },
        { q: "Why do astronauts bounce on the Moon?", opts: ["More oxygen", "Less air resistance", "Weaker gravity", "Stronger magnetic field"], ans: 2 },
        { q: "What did Newton observe that inspired his gravity theory?", opts: ["A star moving", "An apple falling", "Water flowing", "Moon rising"], ans: 1 },
      ],
    },
    hi: {
      explain: "गुरुत्वाकर्षण प्रकृति का एक मूलभूत बल है जो द्रव्यमान वाली किसी भी दो वस्तुओं को एक-दूसरे की ओर खींचता है। यह ग्रहों को कक्षा में, चंद्रमा को पृथ्वी के चारों ओर और हमें जमीन पर रखता है!\n\n🍎 खोज: सर आइजैक न्यूटन (1687) ने एक सेब को पेड़ से गिरते देखा और महसूस किया कि यही बल चंद्रमा को पृथ्वी की कक्षा में रखता है। उन्होंने गुरुत्वाकर्षण का सार्वभौमिक नियम प्रकाशित किया।\n\n📐 न्यूटन का गुरुत्वाकर्षण का सार्वभौमिक नियम:\nF = G × (m₁ × m₂) / r²\n• F = दो वस्तुओं के बीच गुरुत्वाकर्षण बल\n• G = सार्वभौमिक गुरुत्वाकर्षण स्थिरांक (6.674 × 10⁻¹¹ N·m²/kg²)\n• m₁, m₂ = दोनों वस्तुओं के द्रव्यमान\n• r = उनके केंद्रों के बीच की दूरी\n\n🔑 गुरुत्वाकर्षण के मुख्य प्रभाव:\n• पृथ्वी पर: g = 9.8 m/s² (वस्तुएं हर सेकंड 9.8 m/s तेज़ी से गिरती हैं)\n• चंद्रमा पर: g ≈ 1.6 m/s² (पृथ्वी का लगभग 1/6) — इसीलिए अंतरिक्ष यात्री उछलते हैं!\n• बृहस्पति पर: g ≈ 24.8 m/s² — आप वहाँ बहुत भारी महसूस करेंगे!\n\n📌 द्रव्यमान vs भार:\n• द्रव्यमान: वस्तु में पदार्थ की मात्रा (हर जगह समान रहती है)।\n• भार: वस्तु पर गुरुत्वाकर्षण बल = द्रव्यमान × g (अलग-अलग ग्रहों पर बदलता है)।\n\n🌍 महत्व: गुरुत्वाकर्षण हमारे वायुमंडल को टिकाए रखता है, ज्वार-भाटा नियंत्रित करता है, उपग्रहों को कक्षा में रखता है और तारों-आकाशगंगाओं के निर्माण के लिए ज़िम्मेदार है!",
      mcqs: [
        { q: "गुरुत्वाकर्षण के नियम की खोज किसने की?", opts: ["आइंस्टीन", "न्यूटन", "गैलीलियो", "केपलर"], ans: 1 },
        { q: "पृथ्वी पर गुरुत्वाकर्षण के कारण त्वरण क्या है?", opts: ["9.8 m/s²", "6.7 m/s²", "10.5 m/s²", "8.9 m/s²"], ans: 0 },
        { q: "गुरुत्वाकर्षण किस पर निर्भर करता है?", opts: ["रंग और आकार", "द्रव्यमान और दूरी", "गति और समय", "तापमान और दबाव"], ans: 1 },
        { q: "पृथ्वी की तुलना में चंद्रमा का गुरुत्वाकर्षण लगभग है:", opts: ["बराबर", "दोगुना", "1/6", "1/3"], ans: 2 },
        { q: "गुरुत्वाकर्षण का कारण क्या है?", opts: ["बिजली", "चुंबकत्व", "द्रव्यमान", "प्रकाश"], ans: 2 },
        { q: "पृथ्वी पर गुरुत्वाकर्षण किस दिशा में खींचता है?", opts: ["ऊपर की ओर", "बगल में", "नीचे की ओर", "सभी दिशाओं में"], ans: 2 },
        { q: "दूरी बढ़ने पर गुरुत्वाकर्षण बल क्या होता है?", opts: ["बढ़ता है", "समान रहता है", "घटता है", "दोगुना होता है"], ans: 2 },
        { q: "गुरुत्वाकर्षण बल का सूत्र कौन सा है?", opts: ["F = ma", "F = G×m₁m₂/r²", "E = mc²", "F = mv"], ans: 1 },
        { q: "अंतरिक्ष यात्री चंद्रमा पर क्यों उछलते हैं?", opts: ["अधिक ऑक्सीजन", "कम वायु प्रतिरोध", "कमज़ोर गुरुत्वाकर्षण", "तेज़ चुंबकीय क्षेत्र"], ans: 2 },
        { q: "न्यूटन ने क्या देखा जिसने उन्हें प्रेरित किया?", opts: ["तारा चलते हुए", "सेब गिरते हुए", "पानी बहते हुए", "चंद्रमा उगते हुए"], ans: 1 },
      ],
    },
  },
  computer: {
    en: {
      explain: "A computer is an electronic device that accepts data (input), processes it according to instructions (programs), stores results, and produces output. Modern life depends on computers in almost every field!\n\n🖥️ Main Hardware Components:\n• CPU (Central Processing Unit): The 'brain' of the computer. It carries out all instructions — arithmetic, logic, and control operations. Speed is measured in GHz.\n• RAM (Random Access Memory): Temporary/working memory. Stores data of programs currently running. When you shut down, RAM is cleared. More RAM = faster multitasking.\n• ROM (Read Only Memory): Permanent memory that stores the BIOS/boot instructions. Data stays even when power is off.\n• Storage (HDD/SSD): Permanent storage for files, OS, and programs. HDD = spinning disk (slower), SSD = flash memory (faster).\n• Motherboard: The main circuit board connecting all components.\n• GPU: Processes graphics/visuals — important for gaming and video editing.\n\n⌨️ Input Devices: Keyboard, Mouse, Scanner, Microphone, Camera, Touch screen\n🖨️ Output Devices: Monitor, Printer, Speaker, Projector\n\n💻 Software:\n• System Software: OS like Windows, macOS, Linux — manages hardware.\n• Application Software: MS Office, Chrome, WhatsApp — used by users.\n\n📡 Binary System: Computers work only in 0s and 1s (Binary). One binary digit = 1 Bit. 8 Bits = 1 Byte. 1024 Bytes = 1 KB → 1024 KB = 1 MB → 1024 MB = 1 GB.\n\n🌐 Internet: Connects billions of computers worldwide using TCP/IP protocol. Data travels via cables, Wi-Fi, and satellites.",
      mcqs: [
        { q: "What is the 'brain' of a computer?", opts: ["RAM", "CPU", "Hard Drive", "Monitor"], ans: 1 },
        { q: "What does RAM stand for?", opts: ["Read Access Memory", "Random Access Memory", "Read And Memory", "Rapid Action Memory"], ans: 1 },
        { q: "Which is an input device?", opts: ["Monitor", "Printer", "Keyboard", "Speaker"], ans: 2 },
        { q: "Which is an output device?", opts: ["Mouse", "Keyboard", "Scanner", "Monitor"], ans: 3 },
        { q: "Computers use which number system?", opts: ["Decimal", "Hexadecimal", "Binary", "Octal"], ans: 2 },
        { q: "What stores data permanently in a computer?", opts: ["RAM", "Cache", "Hard Drive", "CPU"], ans: 2 },
        { q: "What is software?", opts: ["Physical components", "Set of instructions", "Computer memory", "Input device"], ans: 1 },
        { q: "What does CPU stand for?", opts: ["Computer Power Unit", "Central Processing Unit", "Control Processing Unit", "Core Power Unit"], ans: 1 },
        { q: "Which protocol does the Internet use?", opts: ["HTTP only", "FTP only", "TCP/IP", "SMTP"], ans: 2 },
        { q: "What are the physical parts of a computer called?", opts: ["Software", "Firmware", "Hardware", "Middleware"], ans: 2 },
      ],
    },
    hi: {
      explain: "कंप्यूटर एक इलेक्ट्रॉनिक उपकरण है जो डेटा (इनपुट) लेता है, निर्देशों के अनुसार प्रोसेस करता है, परिणाम संग्रहीत करता है और आउटपुट देता है। आधुनिक जीवन लगभग हर क्षेत्र में कंप्यूटर पर निर्भर है!\n\n🖥️ मुख्य हार्डवेयर भाग:\n• CPU (सेंट्रल प्रोसेसिंग यूनिट): कंप्यूटर का 'दिमाग'। सभी निर्देश — अंकगणित, तर्क और नियंत्रण — यही करता है। गति GHz में मापी जाती है।\n• RAM (रैंडम एक्सेस मेमोरी): अस्थायी/कार्यशील मेमोरी। चालू प्रोग्रामों का डेटा संग्रहीत करती है। बंद होने पर मिट जाती है। ज़्यादा RAM = तेज़ मल्टीटास्किंग।\n• ROM (रीड ओनली मेमोरी): स्थायी मेमोरी जिसमें BIOS निर्देश होते हैं। बिजली बंद होने पर भी डेटा सुरक्षित रहता है।\n• स्टोरेज (HDD/SSD): फाइलों, OS और प्रोग्रामों का स्थायी संग्रहण। HDD = घूमती डिस्क (धीमी), SSD = फ्लैश मेमोरी (तेज़)।\n• मदरबोर्ड: मुख्य सर्किट बोर्ड जो सभी भागों को जोड़ता है।\n• GPU: ग्राफ़िक्स प्रोसेस करता है — गेमिंग और वीडियो एडिटिंग के लिए ज़रूरी।\n\n⌨️ इनपुट डिवाइस: कीबोर्ड, माउस, स्कैनर, माइक्रोफोन, कैमरा, टच स्क्रीन\n🖨️ आउटपुट डिवाइस: मॉनिटर, प्रिंटर, स्पीकर, प्रोजेक्टर\n\n💻 सॉफ्टवेयर:\n• सिस्टम सॉफ्टवेयर: Windows, macOS, Linux — हार्डवेयर को नियंत्रित करता है।\n• एप्लीकेशन सॉफ्टवेयर: MS Office, Chrome, WhatsApp — उपयोगकर्ता द्वारा उपयोग।\n\n📡 बाइनरी प्रणाली: कंप्यूटर केवल 0 और 1 (बाइनरी) में काम करते हैं। 1 बाइनरी अंक = 1 Bit। 8 Bits = 1 Byte। 1024 Bytes = 1 KB → 1024 KB = 1 MB → 1024 MB = 1 GB।\n\n🌐 इंटरनेट: TCP/IP प्रोटोकॉल से दुनिया भर के अरबों कंप्यूटरों को जोड़ता है। डेटा केबल, Wi-Fi और उपग्रहों के ज़रिए यात्रा करता है।",
      mcqs: [
        { q: "कंप्यूटर का 'दिमाग' क्या कहलाता है?", opts: ["RAM", "CPU", "हार्ड ड्राइव", "मॉनिटर"], ans: 1 },
        { q: "RAM का पूर्ण रूप क्या है?", opts: ["Read Access Memory", "Random Access Memory", "Read And Memory", "Rapid Action Memory"], ans: 1 },
        { q: "कौन सा इनपुट डिवाइस है?", opts: ["मॉनिटर", "प्रिंटर", "कीबोर्ड", "स्पीकर"], ans: 2 },
        { q: "कौन सा आउटपुट डिवाइस है?", opts: ["माउस", "कीबोर्ड", "स्कैनर", "मॉनिटर"], ans: 3 },
        { q: "कंप्यूटर कौन सी संख्या प्रणाली का उपयोग करते हैं?", opts: ["दशमलव", "षोडशाधारी", "द्विआधारी", "अष्टाधारी"], ans: 2 },
        { q: "कंप्यूटर में डेटा स्थायी रूप से कहाँ संग्रहित होता है?", opts: ["RAM", "कैशे", "हार्ड ड्राइव", "CPU"], ans: 2 },
        { q: "सॉफ्टवेयर क्या है?", opts: ["भौतिक भाग", "निर्देशों का समूह", "कंप्यूटर मेमोरी", "इनपुट डिवाइस"], ans: 1 },
        { q: "CPU का पूर्ण रूप क्या है?", opts: ["Computer Power Unit", "Central Processing Unit", "Control Processing Unit", "Core Power Unit"], ans: 1 },
        { q: "इंटरनेट कौन से प्रोटोकॉल का उपयोग करता है?", opts: ["केवल HTTP", "केवल FTP", "TCP/IP", "SMTP"], ans: 2 },
        { q: "कंप्यूटर के भौतिक भागों को क्या कहते हैं?", opts: ["सॉफ्टवेयर", "फर्मवेयर", "हार्डवेयर", "मिडलवेयर"], ans: 2 },
      ],
    },
  },
};

function getGenericData(topic: string, lang: Lang) {
  const t2 = topic.charAt(0).toUpperCase() + topic.slice(1);
  const explain_en = `${t2} is a fascinating topic studied in schools! Here's a simple overview: ${t2} refers to an important concept that students learn about. It involves understanding key principles and applying them in real-world situations. To study ${t2} effectively: (1) Start with the basic definitions and concepts, (2) Look for patterns and rules, (3) Practice with examples, (4) Connect it to things you already know. Remember — every expert was once a beginner. Keep practicing and you'll master ${t2}!`;
  const explain_hi = `${t2} स्कूलों में पढ़ा जाने वाला एक रोचक विषय है! सरल अवलोकन: ${t2} एक महत्वपूर्ण अवधारणा है जिसे छात्र पढ़ते हैं। इसमें मुख्य सिद्धांतों को समझना और वास्तविक जीवन में लागू करना शामिल है। ${t2} के प्रभावी अध्ययन के लिए: (1) बुनियादी परिभाषाओं से शुरू करें, (2) पैटर्न और नियम खोजें, (3) उदाहरणों से अभ्यास करें, (4) पहले से जानी चीजों से जोड़ें। याद रखें — हर विशेषज्ञ कभी शुरुआती था। अभ्यास जारी रखें और आप ${t2} में महारत हासिल करेंगे!`;

  const mcqs_en = [
    { q: `What is the primary focus of ${t2}?`, opts: ["Understanding concepts", "Memorizing facts", "Skipping details", "Avoiding practice"], ans: 0 },
    { q: `How should you start studying ${t2}?`, opts: ["With advanced topics", "With basic definitions", "With examples only", "By skipping chapters"], ans: 1 },
    { q: `Which is the best way to learn ${t2}?`, opts: ["Just reading", "Practice and application", "Watching only", "Avoiding revision"], ans: 1 },
    { q: `What helps in remembering ${t2} concepts?`, opts: ["Regular revision", "Single reading", "Ignoring examples", "Avoiding notes"], ans: 0 },
    { q: `Why is ${t2} important for students?`, opts: ["It's not important", "Builds foundation", "Only for exams", "Only for teachers"], ans: 1 },
    { q: `Where can ${t2} concepts be applied?`, opts: ["Nowhere", "Only in class", "Real-world situations", "Only in books"], ans: 2 },
    { q: `What should you do when you don't understand ${t2}?`, opts: ["Give up", "Ask for help", "Skip the topic", "Copy answers"], ans: 1 },
    { q: `Which habit helps master ${t2}?`, opts: ["Procrastinating", "Daily practice", "Avoiding tests", "Memorizing blindly"], ans: 1 },
    { q: `What makes ${t2} interesting?`, opts: ["It's boring", "Real-life connections", "Only theory", "No applications"], ans: 1 },
    { q: `How can you improve at ${t2}?`, opts: ["By avoiding it", "By consistent study", "By guessing answers", "By copying notes"], ans: 1 },
  ];

  const mcqs_hi = [
    { q: `${t2} का मुख्य उद्देश्य क्या है?`, opts: ["अवधारणाएं समझना", "तथ्य रटना", "विवरण छोड़ना", "अभ्यास से बचना"], ans: 0 },
    { q: `${t2} का अध्ययन कहाँ से शुरू करना चाहिए?`, opts: ["उन्नत विषयों से", "बुनियादी परिभाषाओं से", "केवल उदाहरणों से", "अध्याय छोड़कर"], ans: 1 },
    { q: `${t2} सीखने का सबसे अच्छा तरीका क्या है?`, opts: ["केवल पढ़ना", "अभ्यास और अनुप्रयोग", "केवल देखना", "पुनरावृत्ति से बचना"], ans: 1 },
    { q: `${t2} की अवधारणाएं याद रखने में क्या मदद करता है?`, opts: ["नियमित पुनरावृत्ति", "एक बार पढ़ना", "उदाहरण अनदेखा करना", "नोट्स से बचना"], ans: 0 },
    { q: `${t2} छात्रों के लिए क्यों महत्वपूर्ण है?`, opts: ["यह महत्वपूर्ण नहीं है", "आधार बनाता है", "केवल परीक्षाओं के लिए", "केवल शिक्षकों के लिए"], ans: 1 },
    { q: `${t2} की अवधारणाएं कहाँ लागू होती हैं?`, opts: ["कहीं नहीं", "केवल कक्षा में", "वास्तविक जीवन में", "केवल किताबों में"], ans: 2 },
    { q: `${t2} न समझने पर क्या करना चाहिए?`, opts: ["हार मानना", "मदद मांगना", "विषय छोड़ना", "उत्तर कॉपी करना"], ans: 1 },
    { q: `${t2} में महारत हासिल करने के लिए कौन सी आदत मदद करती है?`, opts: ["टालमटोल", "रोज़ अभ्यास", "परीक्षाओं से बचना", "अंधे याद करना"], ans: 1 },
    { q: `${t2} को क्या रोचक बनाता है?`, opts: ["यह उबाऊ है", "जीवन से जुड़ाव", "केवल सिद्धांत", "कोई उपयोग नहीं"], ans: 1 },
    { q: `${t2} में सुधार कैसे करें?`, opts: ["इससे बचकर", "लगातार अध्ययन से", "जवाब अनुमान लगाकर", "नोट्स कॉपी करके"], ans: 1 },
  ];

  return {
    en: { explain: explain_en, mcqs: mcqs_en },
    hi: { explain: explain_hi, mcqs: mcqs_hi },
  };
}

function getTopicContent(topic: string, lang: Lang) {
  const key = topic.toLowerCase().trim();
  const known = topicData[key] ?? getGenericData(topic, lang);
  return known[lang];
}

const motivations = {
  en: [
    "You are capable of achieving anything you set your mind to! 🌟",
    "Every hour of study is an investment in your future! 📈",
    "Mistakes are proof that you are trying! 💪",
    "One day at a time — you've got this! 🎯",
    "Your hard work will pay off. Trust the process! ⭐",
    "Stars can't shine without darkness. Keep going! ✨",
    "Success is the sum of small efforts, repeated daily! 🔥",
    "Believe in yourself — you're smarter than you think! 🧠",
  ],
  hi: [
    "आप जो ठान लेते हैं वह कर सकते हैं! 🌟",
    "अध्ययन का हर घंटा आपके भविष्य में निवेश है! 📈",
    "गलतियाँ इस बात का सबूत हैं कि आप कोशिश कर रहे हैं! 💪",
    "एक दिन एक कदम — आप यह कर सकते हैं! 🎯",
    "आपकी मेहनत रंग लाएगी। प्रक्रिया पर भरोसा रखें! ⭐",
    "अंधेरे के बिना तारे नहीं चमकते। आगे बढ़ते रहो! ✨",
    "सफलता रोज़ के छोटे-छोटे प्रयासों का योग है! 🔥",
    "खुद पर विश्वास रखें — आप उतने होशियार हैं जितना सोचते हैं! 🧠",
  ],
};

const studyTips = {
  en: [
    "Break one big chapter into 3 small parts — study each separately! 📚",
    "Use the Pomodoro technique: 25 min study, 5 min break. Repeat! ⏱",
    "Teach what you learned to an imaginary friend — it sticks better! 🗣",
    "Make colorful mind maps for complex topics — visual memory is powerful! 🗺",
    "Review your notes within 24 hours of class — recall improves 70%! 📝",
    "Start with the easiest topic to build momentum! 🚀",
    "Sleep well — your brain consolidates memory during sleep! 😴",
  ],
  hi: [
    "एक बड़े अध्याय को 3 छोटे भागों में तोड़ें — हर भाग अलग पढ़ें! 📚",
    "पोमोडोरो तकनीक: 25 मिनट पढ़ाई, 5 मिनट ब्रेक। दोहराएं! ⏱",
    "जो सीखा उसे एक काल्पनिक दोस्त को सिखाएं — बेहतर याद रहेगा! 🗣",
    "जटिल विषयों के लिए रंगीन माइंड मैप बनाएं! 🗺",
    "क्लास के 24 घंटे के भीतर नोट्स की समीक्षा करें — याददाश्त 70% बढ़ती है! 📝",
    "गति बनाने के लिए सबसे आसान विषय से शुरू करें! 🚀",
    "अच्छी नींद लें — नींद में दिमाग यादें पक्की करता है! 😴",
  ],
};

const breathingTips = {
  en: [
    "Breathe in for 4 seconds → Hold for 4 seconds → Breathe out for 6 seconds. Repeat 4 times! 🫁",
    "Box breathing: In 4s → Hold 4s → Out 4s → Hold 4s. Calms your nervous system! 📦",
    "Deep belly breathing: Put hand on belly, breathe in so belly rises, out so belly falls. Do 5 times! 🌬",
  ],
  hi: [
    "4 सेकंड श्वास लें → 4 सेकंड रोकें → 6 सेकंड श्वास छोड़ें। 4 बार दोहराएं! 🫁",
    "बॉक्स ब्रीदिंग: 4s लें → 4s रोकें → 4s छोड़ें → 4s रोकें। तंत्रिका तंत्र शांत होता है! 📦",
    "पेट से गहरी सांस: पेट पर हाथ रखें, सांस लें ताकि पेट उठे, छोड़ें ताकि पेट गिरे। 5 बार करें! 🌬",
  ],
};

function generatePlan(subject: string, days: number, weak: string, stress: number, lang: Lang): string[] {
  const hi = lang === "hi";
  const s = subject || (hi ? "आपका विषय" : "your subject");
  const w = weak || (hi ? "कमज़ोर क्षेत्र" : "weak areas");
  const highStress = stress >= 7;

  if (hi) {
    const plans: string[][] = [
      [`📖 ${s} का पूरा syllabus एक बार पढ़ें, मुख्य बिंदु नोट करें।`, `🧠 बुनियादी अवधारणाएं समझें, आसान topics से शुरू करें।`],
      [`📝 ${w} पर ध्यान दें — 2 घंटे सिर्फ इसी पर लगाएं।`, `🔁 कल के notes दोहराएं, 10 practice प्रश्न हल करें।`],
      [`📋 पिछले वर्षों के प्रश्नपत्र देखें, pattern समझें।`, `✍️ Mock test दें और गलत उत्तरों की समीक्षा करें।`],
      [`${highStress ? "😌 तनाव कम करने के लिए 10 मिनट ध्यान करें।" : "🚀 कठिन topics को छोटे भागों में बांटें।"}`, `📚 Important formulas/definitions याद करें।`],
      [`🔄 ${w} पर revision करें, अभी भी कमज़ोर concepts पक्के करें।`, `📊 Full syllabus का quick revision करें।`],
      [`📝 2 पूरे mock tests दें — time management practice करें।`, `🧘 ${highStress ? "योग और ध्यान से तनाव घटाएं।" : "हल्की exercise करें, fresh mind से पढ़ें।"}`],
      [`🌟 केवल revision — नया topic मत पढ़ें।`, `😴 जल्दी सोएं, पूरी नींद लें। आप तैयार हैं! 💪`],
    ];
    return plans.slice(0, Math.min(days, 7)).map((p, i) => `${hi ? "दिन" : "Day"} ${i + 1}: ${p[0]} ${p[1]}`);
  } else {
    const plans: string[][] = [
      [`📖 Read the full ${s} syllabus once and note key topics.`, `🧠 Understand basic concepts, start with easy chapters.`],
      [`📝 Focus on ${w} — spend 2 hours only on weak areas.`, `🔁 Revise yesterday's notes, solve 10 practice questions.`],
      [`📋 Review past year papers, understand the question pattern.`, `✍️ Take a mock test and review all wrong answers carefully.`],
      [`${highStress ? "😌 Meditate 10 minutes to reduce exam stress." : "🚀 Break difficult topics into smaller manageable parts."}`, `📚 Memorize important formulas and key definitions.`],
      [`🔄 Revise ${w} again — make sure no concept is left unclear.`, `📊 Do a quick revision of the full syllabus.`],
      [`📝 Take 2 full-length mock tests — practice time management.`, `🧘 ${highStress ? "Do yoga or light exercise to reduce anxiety." : "Light exercise and fresh mind study session."}`],
      [`🌟 Revision only today — don't start any new topic!`, `😴 Sleep early, get full rest. You're ready! 💪`],
    ];
    return plans.slice(0, Math.min(days, 7)).map((p, i) => `Day ${i + 1}: ${p[0]} ${p[1]}`);
  }
}

const recentTopicsList = ["Photosynthesis", "Algebra", "Gravity", "Computer"];
const dayOptions = [3, 5, 7, 10, 14, 21, 30];

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [lastExplainedTopic, setLastExplainedTopic] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<{ q: string; opts: string[]; ans: number }[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [stressPanelOpen, setStressPanelOpen] = useState(false);
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [planResultFullScreen, setPlanResultFullScreen] = useState(false);
  const [stressMsg, setStressMsg] = useState("");
  const [motivationMsg, setMotivationMsg] = useState("");
  const [breathMsg, setBreathMsg] = useState("");
  const [studyMsg, setStudyMsg] = useState("");

  // Planner state
  const [planSubject, setPlanSubject] = useState("");
  const [planDays, setPlanDays] = useState(7);
  const [planWeak, setPlanWeak] = useState("");
  const [planStress, setPlanStress] = useState(5);
  const [planResult, setPlanResult] = useState<string[]>([]);
  const [planGenerating, setPlanGenerating] = useState(false);

  const quizRef = useRef<HTMLDivElement>(null);
  const explanRef = useRef<HTMLDivElement>(null);
  const planResultRef = useRef<HTMLDivElement>(null);
  const planScrollRef = useRef<HTMLDivElement>(null);

  const tx = t[lang];

  // When language changes, re-generate explanation in new language if one exists
  useEffect(() => {
    if (lastExplainedTopic) {
      setIsExplaining(true);
      setExplanation("");
      const timer = setTimeout(() => {
        const data = getTopicContent(lastExplainedTopic, lang);
        setExplanation(data.explain);
        setIsExplaining(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // When language changes, re-generate quiz in new language if one exists
  useEffect(() => {
    if (lastExplainedTopic && quizQuestions.length > 0) {
      setQuizQuestions([]);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setIsGeneratingQuiz(true);
      const timer = setTimeout(() => {
        const data = getTopicContent(lastExplainedTopic, lang);
        setQuizQuestions(data.mcqs);
        setIsGeneratingQuiz(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (stressPanelOpen || plannerOpen || planResultFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [stressPanelOpen, plannerOpen, planResultFullScreen]);

  function toggleLang() {
    setLang((l) => (l === "en" ? "hi" : "en"));
  }

  async function handleExplain() {
    if (!topic.trim()) return;
    const trimmed = topic.trim();
    const key = trimmed.toLowerCase();
    setIsExplaining(true);
    setExplanation("");
    setLastExplainedTopic(trimmed);

    if (topicData[key]) {
      const data = topicData[key][lang];
      setExplanation(data.explain);
      setIsExplaining(false);
      setTimeout(() => explanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      try {
        const res = await fetch("/api/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: trimmed, lang }),
        });
        const json = await res.json() as { explanation?: string; error?: string };
        setExplanation(json.explanation ?? "Could not generate explanation. Please try again.");
      } catch {
        setExplanation("Network error. Please try again.");
      }
      setIsExplaining(false);
      setTimeout(() => explanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }

  function handleGenerateQuiz() {
    if (!topic.trim()) return;
    setIsGeneratingQuiz(true);
    setQuizQuestions([]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setLastExplainedTopic(topic.trim());
    setTimeout(() => {
      const data = getTopicContent(topic.trim(), lang);
      setQuizQuestions(data.mcqs);
      setIsGeneratingQuiz(false);
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }, 1200);
  }

  function handleSelectAnswer(qIdx: number, oIdx: number) {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  }

  function handleSubmitQuiz() {
    setQuizSubmitted(true);
  }

  function handleRetryQuiz() {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  }

  function handleClear() {
    setTopic("");
    setExplanation("");
    setLastExplainedTopic("");
    setQuizQuestions([]);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setStressMsg("");
    setMotivationMsg("");
    setBreathMsg("");
    setStudyMsg("");
    setPlanResult([]);
  }

  function handleGeneratePlan() {
    setPlanGenerating(true);
    setPlanResult([]);
    setPlanResultFullScreen(false);
    setTimeout(() => {
      const result = generatePlan(planSubject, planDays, planWeak, planStress, lang);
      setPlanResult(result);
      setPlanGenerating(false);
      setTimeout(() => setPlanResultFullScreen(true), 200);
    }, 1000);
  }

  const score = quizSubmitted
    ? quizQuestions.filter((q, i) => selectedAnswers[i] === q.ans).length
    : 0;

  const scoreLabel = () => {
    const pct = (score / quizQuestions.length) * 100;
    if (pct >= 90) return tx.excellent;
    if (pct >= 70) return tx.great;
    if (pct >= 50) return tx.good;
    return tx.keep;
  };

  function randomFrom<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return (
    <div className="min-h-screen hero-gradient relative">
      {/* ── Lang Toggle ─────────────────────────────────────────── */}
      <button
        onClick={toggleLang}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all shadow-md"
      >
        <span className="text-xs opacity-70">{lang === "en" ? "IN" : "EN"}</span>
        <span>{tx.langToggle}</span>
      </button>

      {/* ── Stress Toggle Button ─────────────────────────────────── */}
      {!stressPanelOpen && (
        <button
          onClick={() => setStressPanelOpen(true)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white border border-purple-400/40 bg-purple-600/50 hover:bg-purple-600/70 backdrop-blur-sm transition-all shadow-lg"
        >
          😌 <span>{tx.stressOpen}</span>
        </button>
      )}

      {/* ── Stress Side Panel ───────────────────────────────────── */}
      <div
        className={`stress-panel fixed top-0 right-0 z-40 flex flex-col ${stressPanelOpen ? "open" : "closed"}`}
        style={{ width: "340px", maxWidth: "92vw", height: "100dvh", background: "rgba(18,12,42,0.98)", borderLeft: "1px solid rgba(139,92,246,0.25)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="font-bold text-white text-lg">{tx.stressTitle}</h2>
            <p className="text-xs text-purple-300 mt-0.5">{tx.stressTip}</p>
          </div>
          <button onClick={() => setStressPanelOpen(false)} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
        </div>

        <div className="stress-panel-content p-4 pb-10 flex flex-col gap-4">
          {/* Tip banner */}
          <div className="rounded-xl p-3 text-sm text-white/80 leading-relaxed" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}>
            {stressMsg || tx.initialTip}
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setMotivationMsg(randomFrom(motivations[lang]))}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
            >
              {tx.motivateBtn}
            </button>
            {motivationMsg && (
              <div className="animate-fade-in-up rounded-xl p-3 text-sm text-white/90 leading-relaxed" style={{ background: "rgba(109,40,217,0.2)", border: "1px solid rgba(139,92,246,0.3)" }}>
                {motivationMsg}
              </div>
            )}

            <button
              onClick={() => setBreathMsg(randomFrom(breathingTips[lang]))}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)" }}
            >
              {tx.breathBtn}
            </button>
            {breathMsg && (
              <div className="animate-fade-in-up rounded-xl p-3 text-sm text-white/90 leading-relaxed" style={{ background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)" }}>
                {breathMsg}
              </div>
            )}

            <button
              onClick={() => { const tip = randomFrom(studyTips[lang]); setStudyMsg(tip); setStressMsg(tip); }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg,#059669,#047857)" }}
            >
              {tx.studyBtn}
            </button>
            {studyMsg && (
              <div className="animate-fade-in-up rounded-xl p-3 text-sm text-white/90 leading-relaxed" style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)" }}>
                {studyMsg}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── 7-Day Planner Floating Button ───────────────────────── */}
      {!plannerOpen && (
        <button
          onClick={() => setPlannerOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", boxShadow: "0 4px 24px rgba(124,58,237,0.5)" }}
        >
          🗓 <span>{lang === "en" ? "Study Planner" : "स्टडी प्लानर"}</span>
        </button>
      )}

      {/* ── 7-Day Planner Panel (bottom sheet) ──────────────────── */}
      {plannerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setPlannerOpen(false)}>
          <div
            className="w-full max-w-lg rounded-t-3xl flex flex-col animate-slide-up"
            style={{ background: "rgba(18,12,42,0.99)", border: "1px solid rgba(139,92,246,0.3)", borderBottom: "none", height: "90dvh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div>
                <p className="font-bold text-white">{tx.plannerTitle}</p>
                <p className="text-xs text-purple-300 mt-0.5">{tx.plannerSub}</p>
              </div>
              <button onClick={() => setPlannerOpen(false)} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
            </div>

            {/* Stats row */}
            <div className="flex-shrink-0 grid grid-cols-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { val: "73%", label: lang === "en" ? "face anxiety" : "तनाव महसूस" },
                { val: "2x", label: lang === "en" ? "better results" : "बेहतर परिणाम" },
                { val: `${planDays}d`, label: lang === "en" ? "your goal" : "आपका लक्ष्य" },
              ].map((s, i) => (
                <div key={i} className="text-center py-3 px-1" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : undefined }}>
                  <p className="text-base font-black gradient-text">{s.val}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Scrollable content */}
            <div ref={planScrollRef} className="stress-panel-content p-5 pb-10 flex flex-col gap-4">
              {/* Subject */}
              <div>
                <label className="text-xs text-white/50 mb-1 block">{tx.subjectLabel}</label>
                <input
                  type="text"
                  value={planSubject}
                  onChange={(e) => setPlanSubject(e.target.value)}
                  placeholder={tx.subjectPlaceholder}
                  className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500/50"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* Days */}
              <div>
                <label className="text-xs text-white/50 mb-1 block">{tx.daysLabel}</label>
                <select
                  value={planDays}
                  onChange={(e) => setPlanDays(Number(e.target.value))}
                  className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500/50 appearance-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {dayOptions.map((d) => (
                    <option key={d} value={d} style={{ background: "#1a1040" }}>
                      {d} {lang === "en" ? "days" : "दिन"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Weak area */}
              <div>
                <label className="text-xs text-white/50 mb-1 block">{tx.weakLabel}</label>
                <input
                  type="text"
                  value={planWeak}
                  onChange={(e) => setPlanWeak(e.target.value)}
                  placeholder={tx.weakPlaceholder}
                  className="w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-purple-500/50"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>

              {/* Stress slider */}
              <div>
                <label className="text-xs text-white/50 mb-1 block">{tx.stressLevelLabel}</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40">{tx.stressLow}</span>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={planStress}
                    onChange={(e) => setPlanStress(Number(e.target.value))}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-xs text-white/40">{tx.stressHigh}</span>
                  <span className="text-sm font-bold text-purple-300 w-4">{planStress}</span>
                </div>
              </div>

              {/* Generate button */}
              <button
                onClick={handleGeneratePlan}
                disabled={planGenerating}
                className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}
              >
                {planGenerating ? (lang === "en" ? "⏳ Generating..." : "⏳ बन रही है...") : tx.generatePlanBtn}
              </button>

              {/* Plan Result */}
              {planResult.length > 0 && (
                <div ref={planResultRef} className="animate-fade-in-up rounded-xl overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.3)" }}>
                  <div className="px-4 py-2.5" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(37,99,235,0.3))" }}>
                    <p className="font-bold text-white text-sm">🗓 {tx.planReady}</p>
                  </div>
                  <div className="p-3 flex flex-col gap-2">
                    {planResult.map((day, i) => (
                      <div key={i} className="rounded-lg p-3 text-xs text-white/80 leading-relaxed" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Plan Result Full-Screen Overlay ─────────────────────── */}
      {planResultFullScreen && planResult.length > 0 && (
        <div className="fixed inset-0 flex flex-col animate-slide-up" style={{ zIndex: 60, background: "rgba(12,8,32,0.98)", backdropFilter: "blur(20px)" }}>
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/10" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(37,99,235,0.25))" }}>
            <div>
              <p className="font-black text-white text-lg">🗓 {tx.planReady}</p>
              <p className="text-xs text-purple-300 mt-0.5">{planSubject || (lang === "en" ? "Your Study Plan" : "आपकी पढ़ाई योजना")} · {planDays} {lang === "en" ? "days" : "दिन"}</p>
            </div>
            <button
              onClick={() => setPlanResultFullScreen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all"
            >
              ← {lang === "en" ? "Back" : "वापस"}
            </button>
          </div>

          {/* Scrollable days */}
          <div className="stress-panel-content p-4 pb-10 flex flex-col gap-3">
            {planResult.map((day, i) => (
              <div key={i} className="rounded-2xl p-4 text-sm text-white/85 leading-relaxed" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <span className="block font-bold text-purple-300 mb-1 text-xs uppercase tracking-wider">Day {i + 1}</span>
                {day.replace(/^Day \d+:?\s*/i, "")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overlay */}
      {stressPanelOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]" onClick={() => setStressPanelOpen(false)} />
      )}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-20 pb-12 px-4">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }} />
        <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />

        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg mb-4" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
          🎓
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{tx.appTitle}</h1>
        <h2 className="text-xl md:text-2xl font-bold mt-1 gradient-text">{tx.appSubtitle}</h2>
        <p className="mt-3 text-white/60 text-sm md:text-base">{tx.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {[tx.badge1, tx.badge2, tx.badge3].map((b) => (
            <span key={b} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/15 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.06)" }}>
              {b}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center text-white/30 text-xs gap-1">
          <span className="text-lg">⬇</span>
          <span>{tx.scroll}</span>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-20 flex flex-col gap-5">

        {/* Topic Learning Card */}
        <div className="rounded-2xl p-5 glass-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
              🔍
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{tx.topicTitle}</h3>
              <p className="text-xs text-white/50">{tx.topicSub}</p>
            </div>
          </div>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleExplain()}
            placeholder={tx.topicPlaceholder}
            className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 mb-4"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          />

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleExplain}
              disabled={!topic.trim() || isExplaining}
              className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
            >
              {isExplaining ? "⏳" : tx.explainBtn}
            </button>
            <button
              onClick={handleGenerateQuiz}
              disabled={!topic.trim() || isGeneratingQuiz}
              className="flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#0284c7)" }}
            >
              {isGeneratingQuiz ? "⏳" : tx.quizBtn}
            </button>
            <button
              onClick={handleClear}
              className="py-2.5 px-4 rounded-xl text-sm font-bold text-white/70 hover:text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {tx.clearBtn}
            </button>
          </div>

          <div>
            <p className="text-xs text-white/40 mb-2">{tx.recentTopics}</p>
            <div className="flex flex-wrap gap-1.5">
              {recentTopicsList.map((t2) => (
                <button
                  key={t2}
                  onClick={() => setTopic(t2)}
                  className="px-3 py-1 rounded-full text-xs text-white/70 hover:text-white transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  {t2}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading - Explaining */}
        {isExplaining && (
          <div className="rounded-2xl p-6 glass-card animate-fade-in-up flex items-center gap-3 text-white/60">
            <div className="w-5 h-5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
            <span className="text-sm">{tx.explaining}</span>
          </div>
        )}

        {/* Explanation Card */}
        {explanation && !isExplaining && (
          <div ref={explanRef} className="rounded-2xl p-5 glass-card animate-fade-in-up">
            <h3 className="font-bold text-white mb-3">{tx.explanationTitle}</h3>
            <div className="text-base text-white/85 leading-loose space-y-1" style={{ whiteSpace: "pre-wrap" }}>{explanation}</div>
          </div>
        )}

        {/* Loading - Quiz */}
        {isGeneratingQuiz && (
          <div className="rounded-2xl p-6 glass-card animate-fade-in-up flex items-center gap-3 text-white/60">
            <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
            <span className="text-sm">{tx.generatingQuiz}</span>
          </div>
        )}

        {/* Quiz Card */}
        {quizQuestions.length > 0 && !isGeneratingQuiz && (
          <div ref={quizRef} className="rounded-2xl p-5 glass-card animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white">{tx.quizTitle}</h3>
                <p className="text-xs text-white/50 mt-0.5">{tx.quizSub}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                {Object.keys(selectedAnswers).length}/{quizQuestions.length}
              </span>
            </div>

            {quizSubmitted && (
              <div className="mb-5 rounded-xl p-4 text-center animate-fade-in-up" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))", border: "1px solid rgba(139,92,246,0.4)" }}>
                <p className="text-sm text-white/70 mb-1">{tx.scoreTitle}</p>
                <p className="text-4xl font-black text-white mb-1">{score}<span className="text-xl text-white/50">/{quizQuestions.length}</span></p>
                <p className="text-sm font-semibold text-purple-300">{scoreLabel()}</p>
                <button
                  onClick={handleRetryQuiz}
                  className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  {tx.retryQuiz}
                </button>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {quizQuestions.map((q, qi) => (
                <div key={qi} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-sm font-semibold text-white mb-3">
                    <span className="text-purple-400 mr-1">{tx.question} {qi + 1}.</span>
                    {q.q}
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.opts.map((opt, oi) => {
                      const selected = selectedAnswers[qi] === oi;
                      const isCorrect = oi === q.ans;
                      const isWrong = quizSubmitted && selected && !isCorrect;
                      const revealCorrect = quizSubmitted && isCorrect && !selected;
                      return (
                        <button
                          key={oi}
                          onClick={() => handleSelectAnswer(qi, oi)}
                          className={`option-btn text-left px-3 py-2.5 rounded-lg text-sm border transition-all ${
                            isWrong ? "wrong" :
                            (quizSubmitted && selected && isCorrect) ? "correct" :
                            revealCorrect ? "reveal-correct" :
                            selected ? "border-purple-500 bg-purple-500/20 text-white" :
                            "border-white/10 text-white/70 hover:border-white/25 hover:bg-white/5"
                          }`}
                        >
                          <span className="font-bold mr-2 text-white/40">{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {quizSubmitted && isCorrect && <span className="ml-2 text-green-400">✓</span>}
                          {isWrong && <span className="ml-2 text-red-400">✗</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted && Object.keys(selectedAnswers).length > 0 && (
              <button
                onClick={handleSubmitQuiz}
                className="mt-4 w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}
              >
                {lang === "en" ? `Submit Quiz (${Object.keys(selectedAnswers).length}/${quizQuestions.length} answered)` : `क्विज़ जमा करें (${Object.keys(selectedAnswers).length}/${quizQuestions.length} जवाब दिए)`}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <div className="relative z-10 text-center pb-8 text-xs text-white/30">
        {tx.footer}
      </div>
    </div>
  );
}
