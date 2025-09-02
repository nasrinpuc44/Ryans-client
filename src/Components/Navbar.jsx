import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { logout } from '../firebase';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Define navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/upcoming-events', label: 'Upcoming Events' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About Us' },
    { path: '/faq', label: 'FAQ' }
  ];

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully signed out!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to sign out");
      console.error('Failed to log out', error);
    }
  };

  // Apply theme on component mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile dropdown menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h8m-8 6h16" 
              />
            </svg>
          </div>
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    isActive ? 'active font-medium' : ''
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            {/* Dashboard link in mobile menu for authenticated users */}
            {currentUser && (
              <li>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    isActive ? 'active font-medium' : ''
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        
        {/* Brand logo/name */}
        <Link to="/" className="flex items-center">
          <img 
            src="https://i.ibb.co.com/d4gWT662/06497ce678de7f72aca556552a3beb0013072023073822.png" 
            alt="Eventure Logo" 
            className="h-10 w-auto mr-2"
          />
          <span className="text-xl font-bold">Eventure</span>
        </Link>
      </div>

      {/* Desktop navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink 
                to={link.path} 
                className={({ isActive }) =>
                  `mx-2 ${isActive ? 'text-primary font-medium' : ''}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {/* Profile link in desktop menu for authenticated users */}
          {currentUser && (
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) =>
                  `mx-2 ${isActive ? 'text-primary font-medium' : ''}`
                }
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Auth buttons and theme toggle */}
      <div className="navbar-end gap-2">
        {/* Theme toggle */}
        <label className="swap swap-rotate">
          <input 
            type="checkbox" 
            checked={theme === 'dark'}
            onChange={handleThemeToggle}
          />
          
          {/* Sun icon (light mode) */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          
          {/* Moon icon (dark mode) */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>

        {/* Conditional rendering based on auth state */}
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img 
                  alt="User profile" 
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || currentUser.email}&background=random`} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile">
                  Profile
                </Link>
              </li>
              <li><button onClick={handleLogout}>Sign Out</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link 
              to="/signin" 
              className="btn btn-outline btn-sm md:btn-md"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-primary btn-sm md:btn-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;