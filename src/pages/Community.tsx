import React, { useState } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Eye, 
  Clock, 
  Search,
  MapPin,
  ArrowLeft,
  Send
} from 'lucide-react';
import { mockReports } from '../lib/supabase';

export default function Community() {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<{[key: number]: any[]}>({
    1: [
      { id: 1, user: 'Priya S.', comment: 'I saw this too! It\'s been like this for 3 days.', time: '2 hours ago' },
      { id: 2, user: 'Raj K.', comment: 'Reported to local authorities as well.', time: '1 hour ago' }
    ],
    2: [
      { id: 3, user: 'Anita M.', comment: 'This happens every monsoon. Need permanent solution.', time: '3 hours ago' }
    ]
  });

  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleUpvote = (reportId: number) => {
    // In a real app, this would update the database
    alert('Report upvoted! Thank you for your engagement.');
  };

  const handleAddComment = (reportId: number) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: 'You',
      comment: newComment,
      time: 'Just now'
    };
    
    setComments(prev => ({
      ...prev,
      [reportId]: [...(prev[reportId] || []), comment]
    }));
    
    setNewComment('');
  };

  const handleShare = (reportId: number) => {
    navigator.clipboard.writeText(`Check out this community report: Report #${reportId}`);
    alert('Report link copied to clipboard!');
  };

  if (selectedReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedReport(null)}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Public Reports
        </button>

        {/* Report Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedReport.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(selectedReport.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedReport.location}
                  </span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                {selectedReport.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-gray-700 mb-6">{selectedReport.description}</p>

            {selectedReport.image_url && (
              <img
                src={selectedReport.image_url}
                alt="Report"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            {/* Engagement Actions */}
            <div className="flex items-center space-x-6 py-4 border-t border-gray-200">
              <button
                onClick={() => handleUpvote(selectedReport.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">{selectedReport.upvotes}</span>
              </button>
              <button
                onClick={() => handleShare(selectedReport.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comments ({(comments[selectedReport.id] || []).length})
            </h3>

            {/* Add Comment */}
            <div className="mb-6">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={() => handleAddComment(selectedReport.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {(comments[selectedReport.id] || []).map(comment => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.user}</span>
                    <span className="text-sm text-gray-500">{comment.time}</span>
                  </div>
                  <p className="text-gray-700">{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Public Reports</h1>
          <p className="text-purple-100 text-lg mb-6">
            View and engage with community-submitted sanitation issues
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search public reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.map(report => (
          <div key={report.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(report.created_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {report.location}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {report.category.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{report.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleUpvote(report.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{report.upvotes}</span>
                  </button>
                  <span className="flex items-center space-x-2 text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">{report.comments}</span>
                  </span>
                  <button
                    onClick={() => handleShare(report.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}