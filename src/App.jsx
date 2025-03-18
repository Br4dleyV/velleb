import { useState, useEffect, useRef } from "react"; // For state and effects
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true); // Testing purposes only

  // State for the mobile menu and profile dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Keeps the state of the menus across renders
  const profileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    // Close the mobile menu when resizing to desktop
    function handleResize() {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };
    // Close the profile menu when clicking outside
    function handleClickOutside(e) {
      // Close the profile menu if clicked outside
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target) && !profileMenuRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    // Remove event listener when the component is unmounted (for performance reasons, otherwise multiple event listeners are added)
    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return <>
    <nav>
      <div className="nav-container">
        <div className="logo-hamburger">
          {/* Hamburger Button */}
          <button type="button" className="hamburger sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.svg className="size-6" strokeWidth="1.5" stroke="currentColor" key={menuOpen ? "close" : "menu"} initial={{ opacity: 0, rotate: -90, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}>
              {/* If menu is open show X icon, otherwise show hamburger icon */}
              {menuOpen ? (<motion.path d="M6 18L18 6M6 6l12 12" />) : (<motion.path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />)}
            </motion.svg>
          </button>
          {/* Height max of parent container */}
          <img className="logo" src="/BV.png" alt="BradleyV" />
        </div>
        {/* Normal Menu (hidden when on smaller screens) */}
        <div className="hidden sm:block">
          <div className="normal-menu space-x-4">
            <a href="#">Dashboard</a>
            <a href="#">Team</a>
            <a href="#">Projects</a>
            <a href="#">Calendar</a>
          </div>
        </div>
        {/* Profile Dropdown */}
        <div>
          {/* If user is logged in, show /BV.png, else show Login/register button */}
          {loggedIn ? (
            <div className="relative ml-3">
              <button className="flex" onClick={() => setProfileOpen(!profileOpen)} type="button" ref={profileMenuRef}>
                {/* Profile Image */}
                <img className="profile-picture" src="/BV.png" alt="Profile Image" />
              </button>
              {/* Profile dropdown with Framer Motion animation */}
              {profileOpen && (
                <motion.div className="dropdown-menu" initial={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} ref={profileDropdownRef}>
                  <a href="#">Your Profile</a>
                  <a href="#">Settings</a>
                  <a href="#">Sign out</a>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="login-register-btns sm:space-x-2 sm:flex-nowrap">
              <a className="button button-green" href="/login">Login</a>
              <a className="button button-white" href="/register">Register</a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu with Framer Motion animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="sm:hidden overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}> {/* Add overflow-hidden to prevent content from being visible during animation*/}
            <motion.div className="space-y-1 px-2 pt-2 pb-3" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0 }}>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Dashboard</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Team</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Projects</a>
              <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Calendar</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    {/* Router */}
    <main className="p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </main>
  </>;
}