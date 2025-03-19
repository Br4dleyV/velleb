// src/components/header/Header.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { avatars } from "../../config/Appwrite";
import { useAuth } from "../../context/AuthContext"; // Import the useAuth hook
import './Header.css';

export default function Header() {
    const { user, logout } = useAuth(); // Access user and logout function from AuthContext
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
    const profileMenuRef = useRef(null);
    const profileDropdownRef = useRef(null);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640) {
                setMenuOpen(false);
            }
        }

        function handleClickOutside(e) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target) && !profileMenuRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }

        function getProfilePicture() {
            if (user) {
                const defaultAvatar = avatars.getInitials(user.name, 100, 100);
                setProfilePictureUrl(defaultAvatar);
            }
        }

        getProfilePicture();
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, [user]);

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
                        <img src="/BV.png" alt="BradleyV" />
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