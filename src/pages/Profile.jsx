// src/pages/Profile.jsx
import { useSelector } from "react-redux";
import { User, Award, Leaf, Heart, Mail, Settings } from "lucide-react";

const Profile = () => {
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const { profile } = useSelector((state) => state.kitchen);

  return (
    <div className={`min-h-screen pt-24 pb-12 px-6 ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Card */}
        <div className={`p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-6 ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {profile.name?.charAt(0) || "C"}
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-emerald-500 font-medium capitalize">{profile.experience_level} Cook</p>
            <div className="flex items-center gap-4 mt-4 text-slate-500">
               <div className="flex items-center gap-1 text-sm"><Mail size={16}/> chef@ecochef.ai</div>
               <div className="flex items-center gap-1 text-sm"><Award size={16}/> 12 Recipes Cooked</div>
            </div>
          </div>
<button className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 hover:opacity-80">
            <Settings size={20} className="text-white"/>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dietary Preferences Section */}
          <div className={`p-6 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Leaf size={20} className="text-emerald-500" /> Dietary Preferences
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.dietary_preferences.length > 0 ? (
                profile.dietary_preferences.map((diet) => (
                  <span key={diet} className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl text-sm font-bold">
                    {diet}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No preferences set yet.</p>
              )}
            </div>
          </div>

          {/* Health Goals Section */}
          <div className={`p-6 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Heart size={20} className="text-red-500" /> Health Goals
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.health_goals.length > 0 ? (
                profile.health_goals.map((goal) => (
                  <span key={goal} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl text-sm font-bold capitalize">
                    {goal.replace("-", " ")}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 text-sm italic">No goals set yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Details Table */}
        <div className={`mt-8 p-6 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-white shadow-sm"}`}>
          <h2 className="text-xl font-bold mb-6">Account Information</h2>
          <div className="space-y-4">
            <DetailRow label="Display Name" value={profile.name} isDarkMode={isDarkMode} />
            <DetailRow label="Cooking Skill" value={profile.experience_level} isDarkMode={isDarkMode} />
            <DetailRow label="Account Status" value="Active Professional" isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, isDarkMode }) => (
  <div className={`flex justify-between py-3 border-b ${isDarkMode ? "border-slate-700" : "border-slate-100"}`}>
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="font-bold capitalize">{value}</span>
  </div>
);

export default Profile;