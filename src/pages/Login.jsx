// src/pages/Login.jsx
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

function Login() {
    const { user, login } = useAuth(); // Access user and login function from AuthContext

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            window.location.href = "/";
        }
    }, [user]);

    // Logs in the user by creating a session
    async function handleLogin(e) {
        e.preventDefault();

        // Collect form data
        const [email, password] = e.target.elements;
        try {
            await login(email.value, password.value); // Use the login function from AuthContext
            window.location.href = "/"; // Redirect to home after successful login
        } catch (error) {
            console.error("Login failed:", error.message); // Log error if login fails
        }
    }

    return <>
        <main>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link to="/reset-password" className="font-semibold text-black hover:text-gray-600">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Sign in</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account yet? {' '}
                        <Link to="/register" className="font-semibold text-black hover:text-gray-600">Register here</Link>
                    </p>
                </div>
            </div>
        </main>
    </>;
}

export default Login;