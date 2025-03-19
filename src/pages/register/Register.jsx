import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import './Register.css'

export default function Register() {
    const { user, register } = useAuth(); // Access user and register function from AuthContext

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            window.location.href = "/";
        }
    }, [user]);

    // Registers a new user
    async function handleRegister(e) {
        e.preventDefault();

        // Collect form data
        const [name, email, password] = e.target.elements;

        try {
            await register(email.value, password.value, name.value); // Use the register function from AuthContext
            window.location.href = "/"; // Redirect to home after successful registration
        } catch (error) {
            console.error("Registration failed:", error.message); // Log error if registration fails
        }
    }


    return <main className="register">
        <h2>Create an account</h2>

        <form onSubmit={handleRegister}>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" autoComplete="name" required />

            <label htmlFor="email">Email address</label>
            <input type="email" name="email" id="email" autoComplete="email" required />

            <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="mt-2">
                    <input type="password" name="password" id="password" autoComplete="new-password" required />
                </div>
            </div>

            <div>
                <button type="submit" className="button button-green">Sign up</button>
            </div>
        </form>

        <p>
            Already have an account? {' '}
            <Link to="/login">Log in here</Link>
        </p>
    </main >
}