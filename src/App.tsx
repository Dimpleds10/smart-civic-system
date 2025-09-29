import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import IssueReporting from './pages/IssueReporting';
import WasteExchange from './pages/WasteExchange';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Sponsorships from './pages/Sponsorships';
import { User } from '@supabase/supabase-js';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route
          path="/dashboard"
          element={user ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user?.user_metadata?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/report"
          element={user ? <IssueReporting /> : <Navigate to="/login" />}
        />
        <Route
          path="/waste-exchange"
          element={user ? <WasteExchange /> : <Navigate to="/login" />}
        />
        <Route
          path="/community"
          element={user ? <Community /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/analytics"
          element={user ? <Analytics /> : <Navigate to="/login" />}
        />
        <Route
          path="/sponsorships"
          element={user ? <Sponsorships /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;