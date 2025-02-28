import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/slices/authSlice';
import { Navigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const dispatch = useDispatch();
    const { token, loading, error } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signupUser({ email, password }));
    };

    if (token) return <Navigate to="/tasks" />;
    if (loading) return <p className="flex items-center justify-center h-screen">Loading...</p>;

    return (
        <div className="max-w-md mx-auto p-4 mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-gray-900 text-white p-2 rounded">
                    Signup
                </button>
            </form>
            <p className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-gray-500 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignupPage;
