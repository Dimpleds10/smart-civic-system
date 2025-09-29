import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Recycle, 
  Award, 
  MapPin, 
  Clock, 
  User,
  Search,
  Filter,
  Star
} from 'lucide-react';
import { mockWasteOffers } from '../lib/supabase';

export default function WasteExchange() {
  const { addPoints, userPoints } = useAuth();
  const [activeTab, setActiveTab] = useState<'browse' | 'offer' | 'my-offers'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'plastic', name: 'Plastic', icon: '🥤', points: 5 },
    { id: 'paper', name: 'Paper', icon: '📰', points: 3 },
    { id: 'metal', name: 'Metal', icon: '🥫', points: 10 },
    { id: 'glass', name: 'Glass', icon: '🍺', points: 8 },
    { id: 'electronic', name: 'E-Waste', icon: '📱', points: 20 },
    { id: 'organic', name: 'Organic', icon: '🥬', points: 2 }
  ];

  const [newOffer, setNewOffer] = useState({
    title: '',
    category: '',
    quantity: '',
    description: '',
    location: ''
  });

  const filteredOffers = mockWasteOffers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category = categories.find(cat => cat.id === newOffer.category);
    const points = category ? category.points * parseInt(newOffer.quantity.split('kg')[0] || '1') : 50;
    
    addPoints(points);
    alert(`Waste offer submitted! You'll earn ${points} points when claimed.`);
    setNewOffer({ title: '', category: '', quantity: '', description: '', location: '' });
  };

  const claimOffer = (offerId: number) => {
    const offer = mockWasteOffers.find(o => o.id === offerId);
    if (offer) {
      alert(`Offer claimed! Contact ${offer.user_name} to arrange pickup.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Waste Exchange Marketplace</h1>
              <p className="text-green-100 text-lg mb-4">
                Turn your waste into rewards and support circular economy
              </p>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Your Points: {userPoints}</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <h3 className="font-semibold mb-2">Points System</h3>
                <p className="text-sm text-green-100">
                  200 points = Redeemable rewards<br />
                  5 points per report<br />
                  Variable points per kg waste
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'browse', name: 'Browse Offers', icon: Search },
            { id: 'offer', name: 'Create Offer', icon: Plus },
            { id: 'my-offers', name: 'My Offers', icon: User }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-green-600'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search waste offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories Overview */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Waste Categories & Points</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <div key={category.id} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                  <p className="text-xs text-green-600 font-medium">{category.points} pts/kg</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Offers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map(offer => (
              <div key={offer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl">
                        {categories.find(c => c.id === offer.category)?.icon || '♻️'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {offer.category.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      offer.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-medium">{offer.points} points</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      {offer.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2 text-purple-500" />
                      {offer.user_name}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      {new Date(offer.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => claimOffer(offer.id)}
                    disabled={offer.status !== 'available'}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      offer.status === 'available'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {offer.status === 'available' ? 'Claim Waste' : 'Already Claimed'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'offer' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Waste Offer</h2>
          
          <form onSubmit={handleOfferSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waste Type *
                </label>
                <select
                  required
                  value={newOffer.category}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name} ({category.points} pts/kg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={newOffer.quantity}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, quantity: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., 5kg, 20 bottles, 1 TV"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={newOffer.title}
                onChange={(e) => setNewOffer(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of your waste offer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={newOffer.location}
                onChange={(e) => setNewOffer(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Pickup location"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                rows={3}
                value={newOffer.description}
                onChange={(e) => setNewOffer(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Condition, pickup instructions, etc."
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Recycle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-semibold mb-1">Circular Economy Impact</p>
                  <p>Your waste will be upcycled into useful products, reducing landfill waste and supporting local businesses. You'll earn points when someone claims your offer.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Waste Offer
            </button>
          </form>
        </div>
      )}

      {activeTab === 'my-offers' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Waste Offers</h2>
          <div className="text-center py-12">
            <Recycle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No offers yet</h3>
            <p className="text-gray-600 mb-6">Start offering your segregated waste to earn points and help the environment</p>
            <button
              onClick={() => setActiveTab('offer')}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}