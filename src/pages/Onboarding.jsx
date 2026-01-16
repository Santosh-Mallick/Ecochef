// src/pages/Onboarding.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateProfileField,
  toggleArrayPreference,
} from "../../store/kitchenSlice";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.kitchen);
  const isDarkMode = useSelector((state) => state.ui.darkMode);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div
      className={`min-h-screen pt-24 px-6 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-50 text-white"
      }`}
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full mx-1 ${
                step >= i ? "bg-emerald-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Basic Info & Experience */}
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              First, let's get to know you.
            </h2>
            <div>
              <label className="block text-md font-medium mb-2 text-slate-400">
                What's your name?
              </label>
              <input
                type="text"
                placeholder="Guest Cook"
                className="w-full p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={(e) =>
                  dispatch(
                    updateProfileField({ field: "name", value: e.target.value })
                  )
                }
              />
            </div>
            <div>
              <label className="block text-md font-medium mb-4 text-slate-400">
                Cooking Experience
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["beginner", "intermediate", "advanced"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() =>
                      dispatch(
                        updateProfileField({
                          field: "experience_level",
                          value: lvl,
                        })
                      )
                    }
                    className={`p-4 rounded-xl border-2 transition-all capitalize cursor-pointer ${
                      profile.experience_level === lvl
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-white dark:bg-slate-800"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Dietary Preferences (Array-based) */}
        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Any dietary preferences?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", 'None'].map(
                (diet) => (
                  <button
                    key={diet}
                    onClick={() =>
                      dispatch(
                        toggleArrayPreference({
                          field: "dietary_preferences",
                          value: diet,
                        })
                      )
                    }
                    className={`p-4 text-left rounded-xl border-2 flex justify-between items-center cursor-pointer ${
                      profile.dietary_preferences.includes(diet)
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-white dark:bg-slate-800"
                    }`}
                  >
                    {diet}
                    {profile.dietary_preferences.includes(diet) && (
                      <Check size={18} className="text-emerald-500" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Step 3: Health Goals */}
        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <h2 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              What are your health goals?
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {["low-carb", "high-protein", "low-sodium", "energy-boost", 'None'].map(
                (goal) => (
                  <button
                    key={goal}
                    onClick={() =>
                      dispatch(
                        toggleArrayPreference({
                          field: "health_goals",
                          value: goal,
                        })
                      )
                    }
                    className={`p-4 text-left rounded-xl border-2 flex justify-between items-center cursor-pointer ${
                      profile.health_goals.includes(goal)
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-transparent bg-white dark:bg-slate-800"
                    }`}
                  >
                    <span className="capitalize">{goal.replace("-", " ")}</span>
                    {profile.health_goals.includes(goal) && (
                      <Check size={18} className="text-emerald-500" />
                    )}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Step 4: Final Confirmation */}
        {step === 4 && (
          <div className="text-center space-y-6 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2 className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>All set, {profile.name}!</h2>
            <p className="text-slate-400">
              Your {profile.experience_level} profile is configured with{" "}
              {profile.dietary_preferences.length} preferences.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
            >
              Finish Setup
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="mt-12 flex justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 text-slate-500 disabled:opacity-0 cursor-pointer"
            >
              <ChevronLeft size={20} /> Back
            </button>
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 cursor-pointer"
            >
              Next <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
