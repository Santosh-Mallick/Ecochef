// src/pages/Signup.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react"; // Added Loader2
import { updateProfileField, setLogin } from "../../store/kitchenSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // 🚩 Added Loading State

  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const mockResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // Mock JWT
        user: { email: formData.email, name: formData.name },
      };

      // 1. Update Profile Schema (For the Profile Page)
      dispatch(updateProfileField({ field: "name", value: formData.name }));

      // 2. ✅ Use setLogin to update Auth State
      // This sets isAuthenticated to true and saves the token to localStorage
      dispatch(
        setLogin({
          token: mockResponse.token,
          user: mockResponse.user,
        })
      );

      // 3. Navigate to Onboarding
      setTimeout(() => {
        setIsLoading(false);
        navigate("/onboarding");
      }, 1000);
    } catch (error) {
      console.error("Signup failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-3xl shadow-2xl border transition-all ${
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-100"
        }`}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white mb-4 shadow-lg shadow-emerald-200">
            <User size={32} />
          </div>
          <h2
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Create Account
          </h2>
          <p className="text-slate-500 text-sm">
            Join EcoChef AI and start your zero-waste journey.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-slate-400"
                size={18}
              />
              <input
                type="text"
                required
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all disabled:opacity-50 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-700 text-white focus:border-emerald-500"
                    : "bg-slate-50 border-slate-200 focus:border-emerald-500"
                }`}
                placeholder="John Doe"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-slate-400"
                size={18}
              />
              <input
                type="email"
                required
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all disabled:opacity-50 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-700 text-white focus:border-emerald-500"
                    : "bg-slate-50 border-slate-200 focus:border-emerald-500"
                }`}
                placeholder="chef@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={18}
              />
              <input
                type="password"
                required
                minLength={8}
                disabled={isLoading}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all disabled:opacity-50 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-700 text-white focus:border-emerald-500"
                    : "bg-slate-50 border-slate-200 focus:border-emerald-500"
                }`}
                placeholder="Min. 8 characters"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group disabled:bg-slate-600`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Create Account
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        <p
          className={`mt-6 text-center text-sm ${
            isDarkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-500 font-bold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
