import { Link } from "react-router-dom";
import { account } from "../config/appwrite";
import { useEffect } from "react";

export default function Register({ user }) {
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
            // Create a new account
            await account.create('unique()', email.value, password.value, name.value);

            // Automatically log in the user
            await account.createEmailPasswordSession(email.value, password.value);

            // Redirect to home after registration
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <main>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input type="text" name="name" id="name" autoComplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" autoComplete="new-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account? {' '}
                        <Link to="/login" className="font-semibold text-black hover:text-gray-600">Log in here</Link>
                    </p>
                </div>
            </div>
        </main>
    </>
}