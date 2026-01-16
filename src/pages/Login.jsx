// src/pages/Login.jsx
import { useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // 1. Added Link here
import { Mail, Lock, LogIn } from 'lucide-react';
import { setLogin } from '../../store/kitchenSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useSelector((state) => state.ui.darkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Added for future JWT action dispatch

const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:8010/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      /**
       * ADJUSTMENT:
       * Your kitchenSlice specifically looks for 'access_token' and 'user'.
       * If your /token endpoint returns a full AuthResponse (including user profile),
       * pass 'data' directly. If it only returns the token, structure it as below:
       */
      dispatch(setLogin({ 
        access_token: data.access_token, // Changed from 'token' to 'access_token'
        user: data.user || { email: email } // Ensure user info is passed if available
      }));
      
      navigate('/');
    } else {
      alert(data.detail || "Login failed");
    }
  } catch (error) {
    console.error("Auth Error:", error);
  }
};

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h2>
          <p className="text-slate-500">Sign in to manage your EcoChef kitchen</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="email"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                }`}
                placeholder="chef@ecochef.ai"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input 
                type="password"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white focus:border-emerald-500' : 'bg-slate-50 border-slate-200 focus:border-emerald-500'
                }`}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          {/* ✅ 2. Use Link component to navigate to /signup */}
          <Link 
            to="/signup" 
            className="text-emerald-500 font-bold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;