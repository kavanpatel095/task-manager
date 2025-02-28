import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { setSearchQuery } from '../store/slices/searchSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const { query } = useSelector((state) => state.search);
    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold">TaskManager</Link>
                {token && (
                    <>
                        <div className="hidden md:flex items-center space-x-4">

                            <NavLink to="/" className="">Home</NavLink>
                            <NavLink to="/tasks" className="">My Tasks</NavLink>
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={query}
                                onChange={handleSearchChange}
                                className="px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                                Logout
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    {menuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {token && menuOpen && (
                <div className="md:hidden px-4 py-3 ">
                    <div className="w-full"><NavLink to="/">Home</NavLink></div>
                    <div className="w-full"><NavLink to="/tasks" >My Tasks</NavLink></div>

                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={query}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                        className="mt-3 w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
