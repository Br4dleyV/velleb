import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { avatars } from "../../config/Appwrite";
import { useAuth } from "../../context/AuthContext";
import './Header.css';

export default function Header() {
    // Request user and logout function from AuthContext
    const { user, logout } = useAuth();

    // State to track menu and profile dropdown state
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const profileMenuRef = useRef(null);
    const profileDropdownRef = useRef(null);
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        // Close the menu on resize
        function handleResize() {
            if (window.innerWidth >= 720) {
                setMenuOpen(false);
            }
        }

        // Close the profile dropdown when clicking outside
        function handleClickOutside(e) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target) && !profileMenuRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }

        // Get the user's profile picture
        function getProfilePicture() {
            if (user) {
                const defaultAvatar = avatars.getInitials(user.name, 100, 100);
                setProfilePictureUrl(defaultAvatar);
            }
        }

        // Set the theme and save it to local storage
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Get the user's profile picture
        getProfilePicture();
        // Add event listeners
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
                        <a href="/"><img src="/BV.png" alt="BradleyV" /></a>
                    </li>

                    {/* Normal Nav Bar */}
                    <li>
                        <a href="#">Dashboard</a>
                        <a href="#">Team</a>
                        <a href="#">Projects</a>
                        <a href="#">Calendar</a>
                    </li>

                    {/* Profile Dropdown / Login-Register */}
                    <li>
                        {user ? (
                            <>
                                <button onClick={() => setProfileOpen(!profileOpen)} type="button" ref={profileMenuRef}>
                                    <img src={profilePictureUrl} alt="Profile Image" />
                                    {profileOpen && (
                                        <motion.div initial={{ opacity: 0, translateY: -10 }} animate={{ opacity: 1, translateY: 0 }} ref={profileDropdownRef}>
                                            <a href="#">Your Profile</a>
                                            <a href="#">Settings</a>
                                            <a href="#" onClick={toggleTheme}>Dark Mode</a>
                                            <a href="#" onClick={logout}>Sign out</a>
                                        </motion.div>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <a className="button button-green" href="/login">Login</a>
                                <a className="button button-white" href="/register">Register</a>
                            </>
                        )}
                    </li>
                </ul>

                {/* Mobile Nav Bar */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.15 } }} exit={{ opacity: 0 }}>
                                <a href="#">Dashboard</a>
                                <a href="#">Team</a>
                                <a href="#">Projects</a>
                                <a href="#">Calendar</a>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}