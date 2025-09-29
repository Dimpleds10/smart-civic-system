import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  Eye
} from 'lucide-react';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('reports');

  const overallStats = {
    totalReports: 1247,
    resolvedIssues: 892,
    averageResponseTime: '2.3 days',
    citizenEngagement: 85,
    cleanlinessScore: 78
  };

  const categoryData = [
    { category: 'Garbage Overflow', count: 325, trend: '+12%', color: 'bg-red-500' },
    { category: 'Clogged Drains', count: 287, trend: '-8%', color: 'bg-blue-500' },
    { category: 'Broken Toilets', count: 198, trend: '+5%', color: 'bg-purple-500' },
    { category: 'Stagnant Water', count: 176, trend: '-15%', color: 'bg-teal-500' },
    { category: 'Improper Disposal', count: 142, trend: '+22%', color: 'bg-orange-500' },
    { category: 'Failed Segregation', count: 119, trend: '-3%', color: 'bg-green-500' }
  ];

  const areaData = [
    { area: 'Koramangala', score: 92, reports: 45, resolved: 41 },
    { area: 'Indiranagar', score: 89, reports: 52, resolved: 44 },
    { area: 'Whitefield', score: 85, reports: 38, resolved: 30 },
    { area: 'BTM Layout', score: 82, reports: 67, resolved: 48 },
    { area: 'Electronic City', score: 78, reports: 43, resolved: 29 },
    { area: 'Marathahalli', score: 74, reports: 71, resolved: 45 }
  ];

  const timeSeriesData = [
    { period: 'Jan 2024', reports: 89, resolved: 67 },
    { period: 'Feb 2024', reports: 95, resolved: 72 },
    { period: 'Mar 2024', reports: 112, resolved: 84 },
    { period: 'Apr 2024', reports: 128, resolved: 95 },
    { period: 'May 2024', reports: 145, resolved: 108 },
    { period: 'Jun 2024', reports: 134, resolved: 118 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
              <p className="text-indigo-100 text-lg">
                Data-driven insights for better city management
              </p>
            </div>
            <div className="mt-6 md:mt-0 flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Time Period:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 3 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            {['reports', 'resolution', 'engagement'].map(metric => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedMetric === metric
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{overallStats.totalReports}</h3>
          <p className="text-sm text-gray-600">Total Reports</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{overallStats.resolvedIssues}</h3>
          <p className="text-sm text-gray-600">Resolved Issues</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">-15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{overallStats.averageResponseTime}</h3>
          <p className="text-sm text-gray-600">Avg Response Time</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-purple-600" />
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">+5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{overallStats.citizenEngagement}%</h3>
          <p className="text-sm text-gray-600">Citizen Engagement</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">+3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{overallStats.cleanlinessScore}%</h3>
          <p className="text-sm text-gray-600">Cleanliness Score</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Issues by Category</h2>
          <div className="space-y-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-900 font-medium">{item.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-bold">{item.count}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.trend.startsWith('+') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Series Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Trend Analysis</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {timeSeriesData.map((data, index) => {
              const maxValue = Math.max(...timeSeriesData.map(d => d.reports));
              const reportHeight = (data.reports / maxValue) * 200;
              const resolvedHeight = (data.resolved / maxValue) * 200;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center items-end space-x-1 mb-2">
                    <div
                      className="bg-indigo-500 rounded-t"
                      style={{ height: `${reportHeight}px`, width: '20px' }}
                      title={`Reports: ${data.reports}`}
                    ></div>
                    <div
                      className="bg-green-500 rounded-t"
                      style={{ height: `${resolvedHeight}px`, width: '20px' }}
                      title={`Resolved: ${data.resolved}`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    {data.period.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded"></div>
              <span className="text-sm text-gray-600">Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Area Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Area-wise Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Cleanliness Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Reports</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Resolved</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Success Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {areaData.map((area, index) => {
                const successRate = Math.round((area.resolved / area.reports) * 100);
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{area.area}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                            style={{ width: `${area.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{area.score}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{area.reports}</td>
                    <td className="py-4 px-4 text-gray-900">{area.resolved}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        successRate >= 80 
                          ? 'bg-green-100 text-green-800'
                          : successRate >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {successRate}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        area.score >= 85
                          ? 'bg-green-100 text-green-800'
                          : area.score >= 70
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {area.score >= 85 ? 'Excellent' : area.score >= 70 ? 'Good' : 'Needs Improvement'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900 mb-2">AI Predictive Insights</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-800 mb-2">
                  <strong>High Risk Areas:</strong> BTM Layout and Marathahalli showing increasing garbage overflow trends. Recommend additional bins placement.
                </p>
                <p className="text-blue-800">
                  <strong>Monsoon Preparation:</strong> Historical data suggests 40% increase in drainage issues during July-September.
                </p>
              </div>
              <div>
                <p className="text-blue-800 mb-2">
                  <strong>Resource Optimization:</strong> Peak reporting hours are 8-10 AM and 6-8 PM. Consider staff scheduling adjustments.
                </p>
                <p className="text-blue-800">
                  <strong>Community Engagement:</strong> Areas with higher citizen participation show 35% faster resolution rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}