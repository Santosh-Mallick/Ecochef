// src/pages/Home.jsx
import { useSelector } from "react-redux";
import { Leaf, Cpu, Zap, Utensils } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Use selector to get the dark mode state
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const navigate = useNavigate();
  return (
    <main className={`pt-20 transition-colors duration-300 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      {/* Hero Section - Now using a grid to fit the FridgeManager */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Leaf size={16} aria-hidden />
              <span>Sustainable Cooking Powered by AI</span>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Cook Smarter,{" "}
              <span className="text-emerald-500">Waste Less.</span>
            </h1>

            <p className={`text-lg max-w-xl mb-10 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Cook-Mate AI analyzes your fridge, suggests zero-waste recipes, and tracks your
              carbon footprint—all in one intelligent kitchen dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/signupOnBoarding')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-emerald-200"
              >
                Get Started
              </button>
              <button
                type="button"
                onClick={() => navigate('/how-it-works')}
                className={`px-8 py-4 border rounded-xl font-semibold transition-colors ${
                  isDarkMode 
                  ? "bg-slate-800 border-slate-700 text-white hover:border-emerald-500" 
                  : "bg-white border-slate-200 text-slate-700 hover:border-emerald-600"
                }`}
              >
                See How it Works
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Fridge (Redux Component) */}
          <div className="w-full lg:max-w-md mx-auto">
            {/* {isko baad mein} */}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className={`py-20 px-6 transition-colors ${isDarkMode ? "bg-slate-800/50" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            isDark={isDarkMode}
            icon={<Cpu className="text-emerald-500" aria-hidden />}
            title="AI Recipe Engine"
            desc="Instant recipes based on the ingredients you already have."
          />

          <FeatureCard
            isDark={isDarkMode}
            icon={<Zap className="text-emerald-500" aria-hidden />}
            title="Energy Optimizer"
            desc="Suggests cooking methods that use the least amount of electricity or gas."
          />

          <FeatureCard
            isDark={isDarkMode}
            icon={<Utensils className="text-emerald-500" aria-hidden />}
            title="Waste Tracker"
            desc="Visualize your impact with weekly food waste reduction reports."
          />
        </div>
      </section>
    </main>
  );
};

const FeatureCard = ({ icon, title, desc, isDark }) => (
  <div className={`p-8 rounded-2xl border transition-all hover:shadow-xl ${
    isDark 
    ? "bg-slate-900 border-slate-700 text-white" 
    : "bg-slate-50 border-slate-100 text-slate-800"
  }`}>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm mb-6 transition-transform hover:scale-110 ${
      isDark ? "bg-slate-800" : "bg-white"
    }`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className={isDark ? "text-slate-400" : "text-slate-600 leading-relaxed"}>{desc}</p>
  </div>
);

export default Home;