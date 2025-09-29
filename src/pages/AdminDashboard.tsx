import React, { useState } from 'react';
import { BarChart3, Users, AlertTriangle, CheckCircle, Clock, MapPin, Filter, Search, Eye, CreditCard as Edit, Trash2, UserCheck, Building, Bell, TrendingUp, Shield, Download, Settings, Award, Calendar, ArrowUp, ArrowDown, Activity, Target, Zap, FileText, Camera, ExternalLink, ChevronRight, AlertCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { mockReports } from '../lib/supabase';

export default function AdminDashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'analytics' | 'volunteers' | 'transparency'>('overview');
  const [selectedWard, setSelectedWard] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const adminStats = {
    totalReports: 1247,
    pendingReports: 89,
    inProgress: 156,
    resolved: 1002,
    avgResolutionTime: '2.3 days',
    escalations: 23,
    activeVolunteers: 45,
    activeNGOs: 12,
    slaBreaches: 15,
    healthRiskHigh: 8
  };

  const recentNotifications = [
    { id: 1, type: 'escalation', message: 'High priority drainage issue in Ward 15', time: '5 min ago', urgent: true },
    { id: 2, type: 'sla', message: 'SLA breach: Garbage overflow report pending for 3 days', time: '15 min ago', urgent: true },
    { id: 3, type: 'volunteer', message: 'New volunteer registered: Priya Sharma', time: '1 hour ago', urgent: false },
    { id: 4, type: 'resolved', message: 'Toilet repair completed in Koramangala', time: '2 hours ago', urgent: false }
  ];

  const wards = [
    { id: 'ward-1', name: 'Ward 1 - Koramangala', reports: 45, resolved: 38, score: 92 },
    { id: 'ward-2', name: 'Ward 2 - Indiranagar', reports: 52, resolved: 44, score: 89 },
    { id: 'ward-3', name: 'Ward 3 - Whitefield', reports: 38, resolved: 30, score: 85 },
    { id: 'ward-4', name: 'Ward 4 - BTM Layout', reports: 67, resolved: 48, score: 82 }
  ];

  const departments = [
    { id: 'sanitation', name: 'Sanitation Dept', reports: 89, avgTime: '2.1 days', efficiency: 94 },
    { id: 'water', name: 'Water Board', reports: 45, avgTime: '1.8 days', efficiency: 97 },
    { id: 'health', name: 'Public Health', reports: 23, avgTime: '3.2 days', efficiency: 87 }
  ];

  const volunteers = [
    { id: 1, name: 'Rajesh Kumar', tasks: 12, completed: 10, rating: 4.8, area: 'Koramangala' },
    { id: 2, name: 'Priya Sharma', tasks: 8, completed: 8, rating: 5.0, area: 'Indiranagar' },
    { id: 3, name: 'Clean Earth NGO', tasks: 25, completed: 22, rating: 4.6, area: 'Multiple' }
  ];

  const filteredReports = mockReports.filter(report => {
    const matchesFilter = selectedFilter === 'all' || report.status === selectedFilter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleStatusChange = (reportId: number, newStatus: string) => {
    console.log(`Changing report ${reportId} to status ${newStatus}`);
  };

  const assignToVolunteer = (reportId: number) => {
    console.log(`Assigning report ${reportId} to volunteer`);
  };

  const escalateReport = (reportId: number) => {
    console.log(`Escalating report ${reportId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Control Center</h1>
              <p className="text-blue-100 text-lg">
                Comprehensive civic sanitation management dashboard
              </p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </button>
              <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'overview', name: 'Dashboard Overview', icon: BarChart3 },
            { id: 'reports', name: 'Report Management', icon: FileText },
            { id: 'analytics', name: 'Analytics & Insights', icon: TrendingUp },
            { id: 'volunteers', name: 'Volunteer/NGO Hub', icon: Users },
            { id: 'transparency', name: 'Transparency & Trust', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
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

      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-blue-500">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.totalReports}</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-green-500">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+8%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.resolved}</p>
              <p className="text-sm text-gray-600">Resolved Issues</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-orange-500">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">-15%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.avgResolutionTime}</p>
              <p className="text-sm text-gray-600">Avg Resolution Time</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-red-500">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Alert</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.escalations}</p>
              <p className="text-sm text-gray-600">Escalations</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Active</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeVolunteers}</p>
              <p className="text-sm text-gray-600">Active Volunteers</p>
            </div>
          </div>

          {/* Notifications Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Recent Notifications
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.urgent ? 'border-l-red-500 bg-red-50' : 'border-l-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`font-medium ${notification.urgent ? 'text-red-900' : 'text-blue-900'}`}>
                        {notification.message}
                      </p>
                      <p className={`text-sm ${notification.urgent ? 'text-red-600' : 'text-blue-600'}`}>
                        {notification.time}
                      </p>
                    </div>
                    {notification.urgent && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ward Performance */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Ward Performance</h3>
              <div className="space-y-4">
                {wards.map(ward => (
                  <div key={ward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{ward.name}</p>
                      <p className="text-sm text-gray-600">{ward.resolved}/{ward.reports} resolved</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ward.score >= 90 ? 'bg-green-100 text-green-800' :
                        ward.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ward.score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Efficiency */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Department Efficiency</h3>
              <div className="space-y-4">
                {departments.map(dept => (
                  <div key={dept.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{dept.name}</p>
                      <span className="text-sm font-medium text-green-600">{dept.efficiency}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{dept.reports} reports</span>
                      <span>Avg: {dept.avgTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-8">
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="reported">Reported</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Wards</option>
                {wards.map(ward => (
                  <option key={ward.id} value={ward.id}>{ward.name}</option>
                ))}
              </select>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Alerts */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">High Risk Issues</p>
                  <p className="text-sm text-red-700">{adminStats.healthRiskHigh} reports need immediate attention</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-900">SLA Breaches</p>
                  <p className="text-sm text-orange-700">{adminStats.slaBreaches} reports overdue</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Activity className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">Active Reports</p>
                  <p className="text-sm text-blue-700">{adminStats.inProgress} currently in progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Report Management</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      AI Classification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assignment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {report.image_url && (
                              <img
                                src={report.image_url}
                                alt="Report"
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{report.title}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {report.location}
                            </p>
                            <p className="text-xs text-gray-400">{report.category.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            AI Verified
                          </span>
                          <p className="text-xs text-gray-500">Confidence: 94%</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(report.severity)}`}>
                          {report.severity} priority
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={report.status}
                          onChange={(e) => handleStatusChange(report.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full border focus:ring-2 focus:ring-blue-500 ${getStatusColor(report.status)}`}
                        >
                          <option value="reported">Reported</option>
                          <option value="under_review">Under Review</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">Sanitation Dept</p>
                          <p className="text-gray-500">Volunteer: Rajesh K.</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">Sanitation Dept</p>
                          <p className="text-gray-500">Volunteer: </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit Report"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => assignToVolunteer(report.id)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded"
                            title="Assign to Volunteer"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => escalateReport(report.id)}
                            className="text-orange-600 hover:text-orange-900 p-1 rounded"
                            title="Escalate"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Interactive Heatmap Placeholder */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Sanitation Hotspots Heatmap</h2>
            <div className="h-96 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-medium">Interactive Heatmap</p>
                <p className="text-gray-500">Showing drainage issues, waste overflow zones, and health risk areas</p>
              </div>
            </div>
          </div>

          {/* Predictive Analytics */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Predictive Analytics</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                  <p className="text-gray-600">Forecasting recurring issues</p>
                  <p className="text-sm text-gray-500">Based on historical data patterns</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {departments.map(dept => (
                  <div key={dept.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{dept.name}</span>
                      <span className="text-sm font-medium text-green-600">{dept.efficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${dept.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'volunteers' && (
        <div className="space-y-8">
          {/* Volunteer Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+5 this week</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeVolunteers}</p>
              <p className="text-sm text-gray-600">Active Volunteers</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Verified</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{adminStats.activeNGOs}</p>
              <p className="text-sm text-gray-600">Partner NGOs</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">This month</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
          </div>

          {/* Volunteer Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Volunteer & NGO Management</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Add New Volunteer
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Volunteer/NGO</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Area</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Tasks</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map(volunteer => (
                    <tr key={volunteer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 font-semibold">
                              {volunteer.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{volunteer.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{volunteer.area}</td>
                      <td className="py-4 px-4">
                        <span className="text-gray-900">{volunteer.completed}/{volunteer.tasks}</span>
                        <span className="text-gray-500 text-sm ml-1">completed</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="font-medium">{volunteer.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 p-1 rounded">
                            <UserCheck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transparency' && (
        <div className="space-y-8">
          {/* Blockchain Logs */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Tamper-Proof Logs (Blockchain)
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Verify on Blockchain
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 1, action: 'Report Created', hash: '0x1a2b3c...', timestamp: '2024-01-15 10:30:00', verified: true },
                { id: 2, action: 'Status Updated', hash: '0x4d5e6f...', timestamp: '2024-01-15 11:45:00', verified: true },
                { id: 3, action: 'Volunteer Assigned', hash: '0x7g8h9i...', timestamp: '2024-01-15 14:20:00', verified: true }
              ].map(log => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">{log.action}</p>
                      <p className="text-sm text-green-700">Hash: {log.hash}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-800">{log.timestamp}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboards */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Cleanest Wards
              </h3>
              <div className="space-y-3">
                {wards.sort((a, b) => b.score - a.score).map((ward, index) => (
                  <div key={ward.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{ward.name}</span>
                    </div>
                    <span className="font-bold text-green-600">{ward.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Most Efficient Departments
              </h3>
              <div className="space-y-3">
                {departments.sort((a, b) => b.efficiency - a.efficiency).map((dept, index) => (
                  <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{dept.name}</span>
                    </div>
                    <span className="font-bold text-blue-600">{dept.efficiency}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Public Data Dashboard */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Open Data Dashboard</h3>
                <p className="text-blue-700">All sanitation data is publicly accessible for transparency and accountability</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}