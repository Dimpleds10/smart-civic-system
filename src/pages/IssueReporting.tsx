import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Camera, 
  MapPin, 
  Mic, 
  Send, 
  AlertTriangle, 
  QrCode,
  X
} from 'lucide-react';

export default function IssueReporting() {
  const navigate = useNavigate();
  const { addPoints } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    severity: 'medium',
    capturedPhoto: null as string | null
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const categories = [
    { id: 'garbage_overflow', name: 'Garbage Overflow', icon: '🗑️' },
    { id: 'improper_disposal', name: 'Improper Disposal', icon: '🚮' },
    { id: 'failed_segregation', name: 'Failed Segregation', icon: '♻️' },
    { id: 'clogged_drains', name: 'Clogged Drains', icon: '🌊' },
    { id: 'stagnant_water', name: 'Stagnant Water', icon: '💧' },
    { id: 'broken_toilets', name: 'Broken Toilets', icon: '🚽' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);
        
        const photoDataUrl = canvas.toDataURL('image/jpeg');
        setFormData(prev => ({ ...prev, capturedPhoto: photoDataUrl }));
        
        // Stop the camera
        stream.getTracks().forEach(track => track.stop());
        setIsCameraOpen(false);
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({ ...prev, capturedPhoto: null }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
        }
      );
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // In a real app, this would start voice recording
    setTimeout(() => {
      setIsRecording(false);
      setFormData(prev => ({
        ...prev,
        description: prev.description + ' [Voice note: Garbage is overflowing from the bin and creating a mess]'
      }));
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate AI validation
    const aiValidationScore = Math.random() * 100;
    let severity = 'low';
    if (aiValidationScore > 70) severity = 'high';
    else if (aiValidationScore > 40) severity = 'medium';

    // Award points for valid report
    addPoints(5);

    alert(`Report submitted successfully! AI validation score: ${aiValidationScore.toFixed(1)}%. Severity: ${severity}. You earned 5 points!`);
    navigate('/dashboard');
  };

  const scanQRCode = () => {
    // Simulate QR code scanning
    const qrData = {
      location: 'Bus Stop #42, MG Road',
      category: 'garbage_overflow',
      binId: 'BIN-MG-042'
    };
    
    setFormData(prev => ({
      ...prev,
      location: qrData.location,
      category: qrData.category,
      title: `Issue at ${qrData.location}`,
      description: `QR scanned from bin ID: ${qrData.binId}`
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Report Sanitation Issue</h1>
          <p className="text-red-100">Help make your community cleaner and healthier</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Use Current Location
              </button>
              <button
                type="button"
                onClick={scanQRCode}
                className="flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
              </button>
            </div>

            {/* Issue Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Issue Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.category === category.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the issue"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address or coordinates"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Provide detailed description of the issue..."
                />
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  disabled={isRecording}
                  className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                </button>
              </div>
              {isRecording && (
                <p className="text-sm text-red-600 mt-1">Recording voice note...</p>
              )}
            </div>

            {/* Severity */}
            <div>
              <label htmlFor="severity" className="block text-sm font-semibold text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Photo Capture */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Capture Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Take a photo of the issue using your camera
                </p>
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </button>
              </div>

              {/* Photo Preview */}
              {formData.capturedPhoto && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={formData.capturedPhoto}
                      alt="Captured issue"
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Validation Notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold mb-1">AI Validation Enabled</p>
                  <p>Your photos will be automatically validated using AI to detect sanitation issues and assign appropriate severity levels. Fraudulent reports will be flagged.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Report (+5 points)
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}