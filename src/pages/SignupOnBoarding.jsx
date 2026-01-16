// src/pages/Signup.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { 
  User, Mail, Lock, ArrowRight, Loader2, 
  ChevronRight, ChevronLeft, Check, Plus, X 
} from "lucide-react";
import { setLogin } from "../../store/kitchenSlice";

const SignupOnBoarding = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience_level: "intermediate",
    dietary_preferences: [],
    allergies: [],
    health_goals: [],
  });
  
  const [currentAllergy, setCurrentAllergy] = useState("");
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePreference = (field, value) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      const index = arr.indexOf(value);
      if (index === -1) arr.push(value);
      else arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const addAllergy = (e) => {
    e.preventDefault();
    if (currentAllergy.trim() && !formData.allergies.includes(currentAllergy.trim())) {
      setFormData({ ...formData, allergies: [...formData.allergies, currentAllergy.trim()] });
      setCurrentAllergy("");
    }
  };

  const removeAllergy = (name) => {
    setFormData({ ...formData, allergies: formData.allergies.filter(a => a !== name) });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log("Submitting form data:", formData);
      
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      console.log("Response OK:", response.ok);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        console.error("Backend error response:", responseData);
        alert(`Signup failed: ${responseData.detail || 'Unknown error'}`);
        return;
      }

      console.log("Login payload:", responseData);
      dispatch(setLogin(responseData));
      navigate("/");
    } catch (error) {
      console.error("Signup failed with exception:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const containerStyle = `min-h-screen flex items-center justify-center px-6 py-12 transition-colors duration-300 ${
    isDarkMode ? "bg-slate-900" : "bg-slate-50"
  }`;

  const cardStyle = `max-w-2xl w-full p-8 rounded-3xl shadow-2xl border transition-all ${
    isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
  }`;

  return (
    <div className={containerStyle}>
      <div className={cardStyle}>
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-10 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? "bg-emerald-500" : "bg-slate-200"}`} />
          ))}
        </div>

        {/* Step 1: Account Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Create Account</h2>
              <p className="text-slate-500 text-sm mt-2">Start your zero-waste journey today.</p>
            </div>
            <div className="space-y-4">
              <InputGroup label="Full Name" icon={<User size={18}/>} isDarkMode={isDarkMode}>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className={inputClass(isDarkMode)} />
              </InputGroup>
              <InputGroup label="Email Address" icon={<Mail size={18}/>} isDarkMode={isDarkMode}>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="chef@example.com" className={inputClass(isDarkMode)} />
              </InputGroup>
              <InputGroup label="Password" icon={<Lock size={18}/>} isDarkMode={isDarkMode}>
                <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="Min. 8 characters" className={inputClass(isDarkMode)} />
              </InputGroup>
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Cooking Experience</h2>
            <div className="grid grid-cols-3 gap-4">
              {["beginner", "intermediate", "advanced"].map((lvl) => (
                <button key={lvl} onClick={() => setFormData({...formData, experience_level: lvl})} className={pillClass(formData.experience_level === lvl, isDarkMode)}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Dietary Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Dietary Preferences</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "None"].map((diet) => (
                <button key={diet} onClick={() => togglePreference("dietary_preferences", diet)} className={selectionClass(formData.dietary_preferences.includes(diet), isDarkMode)}>
                  {diet} {formData.dietary_preferences.includes(diet) && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Allergies (New Step) */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Any Allergies?</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={currentAllergy} 
                onChange={(e) => setCurrentAllergy(e.target.value)}
                placeholder="e.g. Peanuts" 
                className={inputClass(isDarkMode)}
                onKeyPress={(e) => e.key === 'Enter' && addAllergy(e)}
              />
              <button onClick={addAllergy} className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">
                <Plus size={24} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.allergies.map(allergy => (
                <span key={allergy} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                  {allergy} <X size={14} className="cursor-pointer" onClick={() => removeAllergy(allergy)} />
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Health Goals */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Health Goals</h2>
            <div className="grid grid-cols-1 gap-3">
              {["low-carb", "high-protein", "low-sodium", "energy-boost", "None"].map((goal) => (
                <button key={goal} onClick={() => togglePreference("health_goals", goal)} className={selectionClass(formData.health_goals.includes(goal), isDarkMode)}>
                  <span className="capitalize">{goal.replace("-", " ")}</span>
                  {formData.health_goals.includes(goal) && <Check size={18} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex justify-between gap-4">
          <button onClick={prevStep} disabled={step === 1} className={`flex items-center gap-2 px-6 py-3 text-slate-500 disabled:opacity-0`}>
            <ChevronLeft size={20} /> Back
          </button>
          
          {step < 5 ? (
            <button onClick={nextStep} disabled={step === 1 && (!formData.email || !formData.password)} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">
              Next <ChevronRight size={20} />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:bg-slate-600">
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Complete Signup"}
            </button>
          )}
        </div>

        {step === 1 && (
          <p className={`mt-6 text-center text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            Already have an account? <Link to="/login" className="text-emerald-500 font-bold hover:underline">Log In</Link>
          </p>
        )}
      </div>
    </div>
  );
};

// Helper Components & Classes
const InputGroup = ({ label, icon, children, isDarkMode }) => (
  <div>
    <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-3.5 text-slate-400">{icon}</div>
      {children}
    </div>
  </div>
);

const inputClass = (dark) => `w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${dark ? "bg-slate-900 border-slate-700 text-white focus:border-emerald-500" : "bg-slate-50 border-slate-200 focus:border-emerald-500"}`;

const pillClass = (active, dark) => `p-4 rounded-xl border-2 transition-all capitalize ${active ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : dark ? "border-transparent bg-slate-900 text-white" : "border-transparent bg-slate-50 text-slate-900"}`;

const selectionClass = (active, dark) => `p-4 text-left rounded-xl border-2 flex justify-between items-center transition-all ${active ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : dark ? "border-transparent bg-slate-900 text-white" : "border-transparent bg-slate-50 text-slate-900"}`;

export default SignupOnBoarding;