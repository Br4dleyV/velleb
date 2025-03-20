import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './Register.css'

export default function Register() {
    // Hook to navigate between routes
    let navigate = useNavigate();

    // Request user and register function from AuthContext
    const { user, register } = useAuth();

    // If user is already logged in, redirect to home
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    // Register a new user
    async function handleRegister(e) {
        e.preventDefault();

        // Collect form data
        const [name, email, password] = e.target.elements;
        try {
            // Register user and redirect to home page
            await register(email.value, password.value, name.value);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error.message);
        }
    }

    return <main className="register">
        <h2>Create an account</h2>

        <form onSubmit={handleRegister}>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" autoComplete="name" required />

            <label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" autoComplete="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" autoComplete="new-password" required />

            <button type="submit" className="button button-green">Sign up</button>
        </form>

        <p>Already have an account? {' '} <Link to="/login">Log in here</Link></p>
    </main >
}