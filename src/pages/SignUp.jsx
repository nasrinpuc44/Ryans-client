import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useAuth } from '../contexts/AuthContext';
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isGmailSignup, setIsGmailSignup] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    // Validate if it's a Gmail address when using Gmail signup
    if (isGmailSignup && !formData.email.endsWith('@gmail.com')) {
      return setError("Please use a valid Gmail address");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to create account. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Account created successfully with Google!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.error("Failed to create account with Google.");
    }
  };

  const handleGmailSignupToggle = () => {
    setIsGmailSignup(!isGmailSignup);
    if (!isGmailSignup) {
      // If switching to Gmail signup, validate email format
      if (formData.email && !formData.email.endsWith('@gmail.com')) {
        setError("Please use a Gmail address for Gmail signup");
      } else {
        setError("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-1/2 border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 pr-16"
            />
            {formData.email && (
              <button
                type="button"
                className={`absolute right-3 top-2 text-xs px-2 py-1 rounded ${
                  isGmailSignup 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
                onClick={handleGmailSignupToggle}
                title={isGmailSignup ? "Using Gmail signup" : "Click for Gmail signup"}
              >
                Gmail
              </button>
            )}
          </div>

          {isGmailSignup && formData.email && !formData.email.endsWith('@gmail.com') && (
            <div className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
              Please use a Gmail address (ending with @gmail.com) for Gmail signup
            </div>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            I agree to the Terms & Conditions
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
          >
            {isGmailSignup ? 'Sign Up with Gmail' : 'Create Account'}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">OR</div>
        
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;