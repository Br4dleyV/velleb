import { useState, useEffect, useRef } from "react"; // For state and effects
import { motion } from "framer-motion"; // For animations

export default function App() {
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

  return (
    <nav className="bg-gray-900">
      <div className="sm:px-6 px-4 lg:px-8">
        <div className="relative flex h-16 items-center">

          {/* Hamburger Button */}
          <button type="button" className="sm:hidden absolute text-gray-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.svg
              className="size-6" strokeWidth="1.5" stroke="currentColor" key={menuOpen ? "close" : "menu"} // Ensures reanimation on state change
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}> {/* Initial state and animation */}
              {/* If menu is open show X icon, otherwise show hamburger icon */}
              {menuOpen ? (<motion.path d="M6 18L18 6M6 6l12 12" />) : (<motion.path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />)}
            </motion.svg>
          </button>

          {/* Logo & Normal Menu */}
          <div className="flex flex-1 justify-center sm:justify-start items-center">
            {/* Height max of parent container */}
            <img className="h-10 object-contain" src="/BV.png" alt="BradleyV" />
            {/* Normal Menu (hidden when on smaller screens) */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Dashboard</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Team</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Projects</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">Calendar</a>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="absolute right-0 flex items-center ">
            <div className="relative ml-3">
              {/* Profile Image */}
              <button className="flex" onClick={() => setProfileOpen(!profileOpen)} type="button" ref={profileMenuRef}>
                <img className="h-8 object-contain rounded-full" src="/BV.png" alt="Profile Image" />
              </button>

              {/* Profile dropdown with Framer Motion animation */}
              {profileOpen && (
                <motion.div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 ring-1 shadow-lg ring-black/10" initial={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} ref={profileDropdownRef}>
                  <a href="#" className="block px-4 py-2 text-sm">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm">Sign out</a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu with Framer Motion animation */}
      <motion.div className="sm:hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}>
        <motion.div className="space-y-1 px-2 pt-2 pb-3" initial={{ opacity: 0 }} animate={{ opacity: menuOpen ? 1 : 0 }} transition={{ duration: menuOpen ? 0.3 : 0.1, delay: menuOpen ? 0.15 : 0 }}>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Dashboard</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Team</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Projects</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white">Calendar</a>
        </motion.div>
      </motion.div>
    </nav>
  );
}
