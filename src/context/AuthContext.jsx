import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../config/Appwrite";

const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    // State to hold the authenticated user and loading status
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // Check if the user is logged in on component mount
    useEffect(() => {
        async function fetchUser() {
            try {
                // Get the user details if logged in
                const user = await account.get();
                setUser(user); 
            } catch (error) {
                // Set null if not logged in
                setUser(null); 
            } finally {
                // Set loading to false after checking the user
                setLoading(false); 
            }
        };

        fetchUser();
    }, []);

    // Function to log in the user
    async function login(email, password) {
        try {
            // Create a new session using the email and password
            await account.createEmailPasswordSession(email, password);
            const user = await account.get();
            setUser(user);
            return user;
        } catch (error) {
            console.error("Login failed:", error.message);
            throw error;
        }
    };

    // Function to log out the user
    async function logout() {
        try {
            // Delete the current session
            await account.deleteSession("current");
            setUser(null); 
            window.location.href = "/login"; 
        } catch (error) {
            console.error("Logout failed:", error.message);
            throw error;
        }
    };

    // Function to register a new user
    async function register(email, password, name) {
        try {
            // Create a new user account
            const user = await account.create("unique()", email, password, name);
            await login(email, password);
            return user;
        } catch (error) {
            console.error("Registration failed:", error.message);
            throw error;
        }
    };

    // Function to reset the user password
    async function resetpassword(email) {
        try {
            // Request a password reset
            await account.createRecovery(email, "https://velleb.com/update-password");
            return true;
        } catch (error) {
            console.error("Password reset failed:", error.message);
            throw error;
        }
    };
    
    // Value to pass to the context requests
    const value = {
        user,
        loading,
        login,
        logout,
        register,
        resetpassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Only render items when not loading */}
        </AuthContext.Provider>
    );
};