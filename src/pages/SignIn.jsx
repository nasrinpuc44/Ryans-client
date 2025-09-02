import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to sign in. Check credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2"
            />
            <button
              type="button"
              className="absolute right-3 top-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Sign In</button>
        </form>
        <div className="my-4 text-center text-gray-500">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-2 border py-2 rounded-md"
        >
          Continue with Google
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
