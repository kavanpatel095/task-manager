import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Welcome to TaskManager
        </h1>
        <p className="mb-8 text-lg md:text-xl text-gray-700 text-center">
            Manage your tasks efficiently!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
            <Link
                to="/login"
                className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
                Login
            </Link>
            <Link
                to="/signup"
                className="bg-gray-900 text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
                Signup
            </Link>
        </div>
    </div>
);

export default Home;
