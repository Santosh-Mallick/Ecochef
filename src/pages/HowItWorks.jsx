import { useSelector } from "react-redux";
import { 
  Camera, 
  BrainCircuit, 
  Mic, 
  Globe, 
  ChevronRight, 
  ShieldCheck, 
  Database 
} from "lucide-react";

const HowItWorks = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);

  const steps = [
    {
      icon: <Camera className="text-blue-500" />,
      title: "AI Vision Detection",
      tech: "YOLO v11",
      desc: "Our vision engine uses YOLO (You Only Look Once) to instantly identify ingredients from your camera. It doesn't just see 'food'; it recognizes specific items like 'Organic Spinach' or 'Greek Yogurt' and adds them to your virtual fridge."
    },
    {
      icon: <BrainCircuit className="text-purple-500" />,
      title: "Smart Recommendation",
      tech: "TF-IDF & Cosine Similarity",
      desc: "EcoChef calculates the mathematical 'distance' between your pantry and thousands of recipes. It prioritizes meals that use the most of what you already have, reducing waste and saving you money."
    },
    {
      icon: <Mic className="text-emerald-500" />,
      title: "Voice-Controlled Cooking",
      tech: "Web Speech API",
      desc: "Enter 'Immersive Mode' for hands-free cooking. Use voice commands like 'Next', 'Read', or 'Start Timer'. Our NLTK-powered backend extracts time durations automatically from recipe text."
    },
    {
      icon: <Globe className="text-orange-500" />,
      title: "Real-Time Translation",
      tech: "Deep-Translator",
      desc: "Global recipes, local language. Instantly translate any cooking step into Hindi, Spanish, or French while you cook, powered by our FastAPI backend integration."
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6">The Magic Behind <span className="text-emerald-500">EcoChef</span></h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Combining state-of-the-art Computer Vision with Natural Language Processing to revolutionize your kitchen.
          </p>
        </div>

        {/* Timeline/Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start relative">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute left-8 top-16 w-0.5 h-32 bg-slate-200 dark:bg-slate-800" />
              )}
              
              <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-2xl shadow-xl ${isDarkMode ? "bg-slate-800" : "bg-slate-50"}`}>
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                    {step.tech}
                  </span>
                </div>
                <p className={`text-lg leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Footer */}
        <div className={`mt-24 p-10 rounded-3xl text-center ${isDarkMode ? "bg-slate-800" : "bg-slate-50 border border-slate-100"}`}>
          <h2 className="text-2xl font-bold mb-8">Powered by Industry Standards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center gap-2">
              <Database size={32} />
              <span className="font-bold">MongoDB</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={32} />
              <span className="font-bold">JWT Auth</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="font-black text-2xl italic">FastAPI</div>
              <span className="font-bold">Python</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="font-black text-2xl">VITE</div>
              <span className="font-bold">React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;