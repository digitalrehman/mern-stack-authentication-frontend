import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import EmailVerification from '../pages/EmailVerification'
import ResetPassword from '../pages/ResetPassword'
import Home from '../pages/Home'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import LoadingSpinner from '../components/LoadingSpinner'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to='/email-verification' replace />;
  }

  return children;
};


const RedirectAuthenticatedUser = ({ children }) => {
  let { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user && user.isVerified) {
    return <Navigate to='/' replace />;
  }

  return children;
}

function Routers() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={
        <RedirectAuthenticatedUser>
          <SignUp />
        </RedirectAuthenticatedUser>
      } />
      <Route path="/login" element={
        <RedirectAuthenticatedUser>
          <Login />
        </RedirectAuthenticatedUser>
      } />
      <Route path="/forgot-password" element={
        <RedirectAuthenticatedUser>
          <ForgotPassword />
        </RedirectAuthenticatedUser>
      } />
      <Route path="/email-verification" element={
        <RedirectAuthenticatedUser>
          <EmailVerification />
        </RedirectAuthenticatedUser>
      } />
      <Route path="/rest-password/:token" element={
        <RedirectAuthenticatedUser>
          <ResetPassword />
        </RedirectAuthenticatedUser>
      } />
    </Routes>
  );
};

export default Routers;
