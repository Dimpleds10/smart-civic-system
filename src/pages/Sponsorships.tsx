import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Award, 
  Gift, 
  Star, 
  ShoppingBag, 
  Coffee, 
  Smartphone,
  Car,
  Home,
  Utensils,
  Gamepad2,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function Sponsorships() {
  const { userPoints, addPoints } = useAuth();
  const [redeemedItems, setRedeemedItems] = useState<number[]>([]);

  const sponsorships = [
    {
      id: 1,
      title: 'Starbucks Coffee Voucher',
      description: 'Get a free coffee at any Starbucks outlet',
      points: 50,
      category: 'Food & Beverage',
      icon: <Coffee className="w-8 h-8" />,
      color: 'bg-green-500',
      sponsor: 'Starbucks',
      validUntil: '2024-12-31'
    },
    {
      id: 2,
      title: 'Amazon Gift Card - ₹100',
      description: 'Shop anything on Amazon with this gift card',
      points: 100,
      category: 'Shopping',
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'bg-orange-500',
      sponsor: 'Amazon',
      validUntil: '2024-12-31'
    },
    {
      id: 3,
      title: 'Swiggy Food Discount - 20%',
      description: 'Get 20% off on your next food order',
      points: 75,
      category: 'Food & Beverage',
      icon: <Utensils className="w-8 h-8" />,
      color: 'bg-red-500',
      sponsor: 'Swiggy',
      validUntil: '2024-11-30'
    },
    {
      id: 4,
      title: 'Flipkart Electronics Voucher',
      description: '₹200 off on electronics purchase above ₹1000',
      points: 150,
      category: 'Electronics',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'bg-blue-500',
      sponsor: 'Flipkart',
      validUntil: '2024-12-15'
    },
    {
      id: 5,
      title: 'Ola Ride Credits - ₹50',
      description: 'Free ride credits for your next trip',
      points: 60,
      category: 'Transportation',
      icon: <Car className="w-8 h-8" />,
      color: 'bg-yellow-500',
      sponsor: 'Ola',
      validUntil: '2024-11-25'
    },
    {
      id: 6,
      title: 'BookMyShow Movie Ticket',
      description: 'Free movie ticket at participating theaters',
      points: 120,
      category: 'Entertainment',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'bg-purple-500',
      sponsor: 'BookMyShow',
      validUntil: '2024-12-20'
    },
    {
      id: 7,
      title: 'Zomato Gold Membership - 1 Month',
      description: 'Enjoy exclusive discounts and free delivery',
      points: 200,
      category: 'Food & Beverage',
      icon: <Star className="w-8 h-8" />,
      color: 'bg-pink-500',
      sponsor: 'Zomato',
      validUntil: '2024-12-31'
    },
    {
      id: 8,
      title: 'Urban Company Service Discount',
      description: '30% off on home cleaning services',
      points: 90,
      category: 'Home Services',
      icon: <Home className="w-8 h-8" />,
      color: 'bg-indigo-500',
      sponsor: 'Urban Company',
      validUntil: '2024-11-30'
    }
  ];

  const categories = ['All', 'Food & Beverage', 'Shopping', 'Electronics', 'Transportation', 'Entertainment', 'Home Services'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSponsorships = selectedCategory === 'All' 
    ? sponsorships 
    : sponsorships.filter(item => item.category === selectedCategory);

  const handleRedeem = (sponsorship: any) => {
    if (userPoints >= sponsorship.points) {
      addPoints(-sponsorship.points);
      setRedeemedItems(prev => [...prev, sponsorship.id]);
      alert(`Successfully redeemed ${sponsorship.title}! Check your email for the voucher code.`);
    } else {
      alert(`You need ${sponsorship.points - userPoints} more points to redeem this item.`);
    }
  };

  const canRedeem = (points: number) => userPoints >= points;
  const isRedeemed = (id: number) => redeemedItems.includes(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Rewards & Sponsorships</h1>
              <p className="text-purple-100 text-lg">
                Redeem your points for amazing rewards from our partner brands
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Award className="w-6 h-6" />
                  <span className="text-2xl font-bold">{userPoints}</span>
                </div>
                <p className="text-sm text-purple-100">Available Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-100 text-purple-700 border border-purple-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Sponsorship Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSponsorships.map(sponsorship => (
          <div key={sponsorship.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${sponsorship.color} p-3 rounded-lg text-white`}>
                  {sponsorship.icon}
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-lg">{sponsorship.points}</span>
                  </div>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{sponsorship.title}</h3>
              <p className="text-gray-600 mb-4">{sponsorship.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Sponsor:</span>
                  <span className="font-medium text-gray-900">{sponsorship.sponsor}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Valid Until:</span>
                  <span className="font-medium text-gray-900">{sponsorship.validUntil}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {sponsorship.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleRedeem(sponsorship)}
                disabled={!canRedeem(sponsorship.points) || isRedeemed(sponsorship.id)}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isRedeemed(sponsorship.id)
                    ? 'bg-green-100 text-green-800 cursor-not-allowed'
                    : canRedeem(sponsorship.points)
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRedeemed(sponsorship.id) ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Redeemed
                  </span>
                ) : canRedeem(sponsorship.points) ? (
                  <span className="flex items-center justify-center">
                    <Gift className="w-4 h-4 mr-2" />
                    Redeem Now
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Need {sponsorship.points - userPoints} more points
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* How it Works */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How Rewards Work</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Earn Points</h3>
            <p className="text-gray-600 text-sm">Report issues, participate in community activities, and exchange waste to earn points</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Choose Rewards</h3>
            <p className="text-gray-600 text-sm">Browse through various rewards from our partner brands and select what you like</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Redeem & Enjoy</h3>
            <p className="text-gray-600 text-sm">Redeem your points instantly and receive voucher codes via email</p>
          </div>
        </div>
      </div>
    </div>
  );
}