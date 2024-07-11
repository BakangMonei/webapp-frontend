import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                email,
                password,
                displayName,
            });

            if (response.status === 200 || response.status === 201) {
                alert("Sign up successful");
                navigate('/'); // Navigate to home or dashboard page after successful sign-up
            } else {
                console.error("Error signing up:", response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error signing up:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Error signing up");
        }
    };

    useEffect(() => {
        // Any required setup or cleanup
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="display-name" className="sr-only">Display Name</label>
                            <input id="display-name" name="displayName" type="text" autoComplete="display-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Display Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationPage;
