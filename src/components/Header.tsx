import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Recycle, 
  User, 
  Bell, 
  Award, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, signOut, userPoints } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user && location.pathname === '/') {
    return null;
  }

  return (
    <header className="bg-white shadow-lg border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">SwachhMitra</span>
          </Link>

          {user && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/report"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/report')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Report Issue
                </Link>
                <Link
                  to="/waste-exchange"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/waste-exchange')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Waste Exchange
                </Link>
                <Link
                  to="/community"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/community')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Community
                </Link>
                <Link
                  to="/analytics"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/analytics')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Analytics
                </Link>
                <Link
                  to="/sponsorships"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/sponsorships')
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Rewards
                </Link>
                {user.user_metadata?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
              </nav>

              {/* User Info & Actions */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Points Display */}
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{userPoints} pts</span>
                </div>

                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors">
                  <Bell className="h-5 w-5" />
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </Link>
                </div>

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-green-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/report')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Report Issue
              </Link>
              <Link
                to="/waste-exchange"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/waste-exchange')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Waste Exchange
              </Link>
              <Link
                to="/community"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/community')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                to="/analytics"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/analytics')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                to="/sponsorships"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/sponsorships')
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </Link>
              {user.user_metadata?.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{userPoints} pts</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}