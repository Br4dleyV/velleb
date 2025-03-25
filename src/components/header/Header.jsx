import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { avatars } from "../../config/Appwrite";
import { useAuth } from "../../context/AuthContext";
import ThemeToggleButton from "../themeToggleButton/ThemeToggleButton";
import './Header.css';

// Custom hook to detect clicks outside a specified element
function useClickOutside(ref, initialState) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialState);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return [isComponentVisible, setIsComponentVisible];
}

export default function Header() {
    // Request user and logout function from AuthContext
    const { user, logout, updatePref } = useAuth();

    // State to track menu and profile dropdown state
    const [menuOpen, setMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const [profileOpen, setProfileOpen] = useClickOutside(profileMenuRef, false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const [theme, setTheme] = useState(null);

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
        if (user) {
            user.prefs.theme = theme === 'light' ? 'dark' : 'light';
            updatePref(user.prefs);
        }
    };

    useEffect(() => {
        // Close the menu on resize
        function handleResize() {
            if (window.innerWidth >= 720) {
                setMenuOpen(false);
            }
        }

        // Get the user's profile picture
        function getProfilePicture() {
            if (user) {
                const defaultAvatar = avatars.getInitials(user.name, 100, 100);
                setProfilePictureUrl(defaultAvatar);
            }
        }

        function getTheme() {            // If user is logged in, get theme from user preferences
            if (user && user.prefs.theme) {
                return user.prefs.theme;
            }

            // Else get theme from local storage
            if (localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
            }

            // Else get theme from system preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                localStorage.setItem('theme', 'dark');
                return 'dark';
            }
            
            // Default to light theme
            localStorage.setItem('theme', 'light');
            return 'light';
        }

        // Set the theme and save it to local storage
        document.documentElement.setAttribute('data-theme', theme);
        // Get the user's profile picture and theme
        getProfilePicture();
        setTheme(getTheme());
        // Add event listeners
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [user, theme]);

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        {/* Hamburger Button & Logo */}
                        <button type="button" title="Hamburger Button" onClick={() => setMenuOpen(!menuOpen)}>
                            <motion.svg key={menuOpen ? "close" : "menu"} initial={{ opacity: 0, rotate: -90, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}>
                                {menuOpen ? (<motion.path d="M6 18L18 6M6 6l12 12" />) : (<motion.path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />)}
                            </motion.svg>
                        </button>
                        <Link to="/"><img src="/BV.png" alt="BradleyV" /></Link>
                    </li>

                    {/* Normal Nav Bar */}
                    <li>
                        <Link to="/">Dashboard</Link>
                        <Link to="/team">Team</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/calendar">Calendar</Link>
                    </li>

                    {/* Profile Dropdown / Login-Register */}
                    <li>
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                        {user ? (
                            <>
                                <button onClick={() => setProfileOpen(!profileOpen)} type="button" ref={profileMenuRef}>
                                    <img src={profilePictureUrl} alt="Profile Image" />
                                    <AnimatePresence>
                                        {profileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, translateY: -10 }}
                                                animate={{ opacity: 1, translateY: 0 }}
                                                exit={{ opacity: 0, translateY: -10 }}
                                                onClick={(e) => e.stopPropagation()} // Prevents event bubbling
                                            >
                                                <Link to="/profile">Your Profile</Link>
                                                <Link to="/settings">Settings</Link>
                                                <a href="#" onClick={() => {
                                                    logout();
                                                    setProfileOpen(false);
                                                }}>Sign out</a>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="button button-success">Login</Link>
                                <Link to="/register" className="button button-white">Register</Link>
                            </>
                        )}
                    </li>
                </ul>

                {/* Mobile Nav Bar */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0 }}>
                                <Link to="/">Dashboard</Link>
                                <Link to="/team">Team</Link>
                                <Link to="/projects">Projects</Link>
                                <Link to="/calendar">Calendar</Link>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}