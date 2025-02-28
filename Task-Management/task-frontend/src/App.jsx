import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Home = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const TaskFormPage = lazy(() => import('./pages/TaskFormPage'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
          <Route path="/tasks/new" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
          <Route path="/tasks/edit/:id" element={<PrivateRoute><TaskFormPage /></PrivateRoute>} />
        </Routes>
      </Suspense>
      <ToastContainer position='bottom-right' />
    </Router>
  );
}

export default App;
