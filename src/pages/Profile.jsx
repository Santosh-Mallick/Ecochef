import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Award, Leaf, Heart, Mail, Settings, Save, X, ShieldAlert } from "lucide-react";
import { updateProfileField, toggleArrayPreference } from "../../store/kitchenSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const { profile } = useSelector((state) => state.kitchen);
  
  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Helper to handle field updates
  const handleFieldUpdate = (field, value) => {
    dispatch(updateProfileField({ field, value }));
  };

  // Helper to handle array toggles (Diets, Goals, Allergies)
  const handleToggle = (field, value) => {
    dispatch(toggleArrayPreference({ field, value }));
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 px-6 ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Card */}
        <div className={`p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {profile.name?.charAt(0) || "C"}
          </div>
          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <input 
                className={`text-3xl font-bold bg-transparent border-b-2 border-emerald-500 outline-none w-full`}
                value={profile.name}
                onChange={(e) => handleFieldUpdate("name", e.target.value)}
              />
            ) : (
              <h1 className="text-3xl font-bold">{profile.name}</h1>
            )}
            <p className="text-emerald-500 font-medium capitalize">{profile.experience_level} Cook</p>
            <div className="flex items-center gap-4 mt-4 text-slate-500">
               <div className="flex items-center gap-1 text-sm"><Mail size={16}/> {profile.email}</div>
               <div className="flex items-center gap-1 text-sm"><Award size={16}/> 12 Recipes Cooked</div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`p-3 rounded-xl transition-all ${isEditing ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-700"}`}
          >
            {isEditing ? <Save size={20} /> : <Settings size={20} className="text-white" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dietary Preferences Section */}
          <SectionWrapper title="Dietary Preferences" icon={<Leaf size={20} className="text-emerald-500" />} isDarkMode={isDarkMode}>
            <div className="flex flex-wrap gap-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"].map((diet) => (
                <PreferencePill 
                  key={diet} 
                  label={diet} 
                  isActive={profile.dietary_preferences.includes(diet)}
                  onClick={() => isEditing && handleToggle("dietary_preferences", diet)}
                  isEditing={isEditing}
                  color="emerald"
                />
              ))}
            </div>
          </SectionWrapper>

          {/* Health Goals Section */}
          <SectionWrapper title="Health Goals" icon={<Heart size={20} className="text-red-500" />} isDarkMode={isDarkMode}>
            <div className="flex flex-wrap gap-2">
              {["low-carb", "high-protein", "low-sodium", "energy-boost"].map((goal) => (
                <PreferencePill 
                  key={goal} 
                  label={goal.replace("-", " ")} 
                  isActive={profile.health_goals.includes(goal)}
                  onClick={() => isEditing && handleToggle("health_goals", goal)}
                  isEditing={isEditing}
                  color="red"
                />
              ))}
            </div>
          </SectionWrapper>

          {/* Allergies Section (Added from Signup Details) */}
          <SectionWrapper title="Allergies" icon={<ShieldAlert size={20} className="text-orange-500" />} isDarkMode={isDarkMode}>
             <div className="flex flex-wrap gap-2">
              {profile.allergies.length > 0 ? (
                profile.allergies.map((allergy) => (
                  <span key={allergy} className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl text-sm font-bold flex items-center gap-2">
                    {allergy}
                    {isEditing && <X size={14} className="cursor-pointer" onClick={() => handleToggle("allergies", allergy)} />}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No allergies listed.</p>
              )}
            </div>
          </SectionWrapper>

          {/* Experience Level Selector */}
          <SectionWrapper title="Cooking Level" icon={<Award size={20} className="text-blue-500" />} isDarkMode={isDarkMode}>
            <div className="grid grid-cols-3 gap-2">
              {["beginner", "intermediate", "advanced"].map((lvl) => (
                <button
                  key={lvl}
                  disabled={!isEditing}
                  onClick={() => handleFieldUpdate("experience_level", lvl)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                    profile.experience_level === lvl 
                    ? "bg-blue-500 text-white" 
                    : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  } ${!isEditing && "opacity-80"}`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const SectionWrapper = ({ title, icon, children, isDarkMode }) => (
  <div className={`p-6 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const PreferencePill = ({ label, isActive, onClick, isEditing, color }) => {
  const activeStyles = {
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 border-emerald-500",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 border-red-500",
  };
  
  return (
    <button
      onClick={onClick}
      disabled={!isEditing}
      className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all capitalize ${
        isActive 
          ? activeStyles[color] 
          : "bg-transparent border-transparent text-slate-400"
      } ${isEditing && !isActive ? "hover:border-slate-300 border-dashed" : ""}`}
    >
      {label}
    </button>
  );
};

export default Profile;