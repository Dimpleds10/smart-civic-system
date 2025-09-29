import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Award, BarChart3, Settings, Bell, Globe, Shield, CreditCard as Edit, Star, Trophy, Target, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { user, userPoints } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const achievements = [
    { id: 1, name: 'First Report', description: 'Submitted your first issue report', icon: '🎯', earned: true },
    { id: 2, name: 'Community Helper', description: '10 reports submitted', icon: '🤝', earned: true },
    { id: 3, name: 'Waste Warrior', description: 'First waste exchange', icon: '♻️', earned: true },
    { id: 4, name: 'Eco Champion', description: '100 points earned', icon: '🌱', earned: true },
    { id: 5, name: 'Local Leader', description: 'Top 10 in your area', icon: '👑', earned: false },
    { id: 6, name: 'Clean Streak', description: '7 days of activity', icon: '🔥', earned: false }
  ];

  const stats = {
    totalReports: 12,
    resolvedIssues: 8,
    wasteExchanged: 5,
    communityRank: 15,
    impactScore: 85
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <User className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-bold mb-2">{user?.user_metadata?.name}</h1>
            <p className="text-blue-100 mb-4">Community Contributor</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  {userPoints} Points
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="flex items-center">
                  <Trophy className="w-4 h-4 mr-2" />
                  Rank #{stats.communityRank}
                </span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <span className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {stats.impactScore}% Impact
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'profile', name: 'Profile', icon: User },
            { id: 'achievements', name: 'Achievements', icon: Trophy },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={user?.user_metadata?.name}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-900">{user?.user_metadata?.name}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900">{user?.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      defaultValue={user?.user_metadata?.phone}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-900">{user?.user_metadata?.phone || '+91 9876543210'}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue={`${user?.user_metadata?.pincode}, ${user?.user_metadata?.landmark}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-900">{user?.user_metadata?.pincode}, {user?.user_metadata?.landmark}</span>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Activity Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalReports}</div>
                <p className="text-sm text-blue-800">Reports Submitted</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.resolvedIssues}</div>
                <p className="text-sm text-green-800">Issues Resolved</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.wasteExchanged}</div>
                <p className="text-sm text-purple-800">Waste Exchanges</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">{userPoints}</div>
                <p className="text-sm text-orange-800">Points Earned</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${achievement.earned ? 'text-green-900' : 'text-gray-600'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Next Achievements */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h3 className="text-xl font-bold text-purple-900 mb-4">Next Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-purple-700">Local Leader (Rank Top 10)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-purple-600">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-700">Clean Streak (7 days activity)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  <span className="text-sm text-purple-600">5/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
            <div className="space-y-4">
              {[
                { id: 'reports', name: 'Report Updates', description: 'Get notified when your reports are updated' },
                { id: 'community', name: 'Community Activity', description: 'Notifications about community discussions' },
                { id: 'waste', name: 'Waste Exchange', description: 'Alerts about waste exchange opportunities' },
                { id: 'achievements', name: 'Achievements', description: 'Celebrate your milestones and badges' }
              ].map(setting => (
                <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{setting.name}</h3>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Anonymous Reporting</h3>
                    <p className="text-sm text-gray-600">Hide your identity in public reports</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Language & Region</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Language
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Region
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="in">India</option>
                  <option value="in-ka">Karnataka, India</option>
                  <option value="in-mh">Maharashtra, India</option>
                  <option value="in-dl">Delhi, India</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}