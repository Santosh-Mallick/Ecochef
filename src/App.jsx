// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import "./app.css";
import HowItWorks from "./pages/HowItWorks";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import SignupOnBoarding from "./pages/signupOnBoarding";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 transition-colors duration-300">
        <Navbar />
        <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signupOnBoarding" element={<SignupOnBoarding/>} />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<div className="text-center py-20 ">404 - Page Not Found</div>} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
