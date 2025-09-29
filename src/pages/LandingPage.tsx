import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, 
  MapPin, 
  Camera, 
  Users, 
  Award, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-green-600" />,
      title: 'Smart Reporting',
      description: 'Report sanitation issues with AI-powered photo validation and GPS tagging'
    },
    {
      icon: <Recycle className="h-8 w-8 text-blue-600" />,
      title: 'Waste Exchange',
      description: 'Turn your waste into rewards through our circular economy marketplace'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Community Driven',
      description: 'Engage with neighbors, vote on issues, and build cleaner communities'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: 'Data Analytics',
      description: 'Real-time insights and predictive analytics for better city planning'
    }
  ];

  const benefits = [
    'AI-powered issue validation',
    'Real-time GPS tracking',
    'Multi-language support',
    'Blockchain transparency',
    'Gamification & rewards',
    'Open data dashboard'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
                <Recycle className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Smart Civic Sanitation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering communities to build cleaner, healthier cities through technology
            </p>
            <p className="text-lg mb-12 text-white/90 max-w-2xl mx-auto">
              Report issues, exchange waste for rewards, and collaborate with your community 
              to create sustainable urban environments aligned with Clean & Green Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/30">
                <Smartphone className="mr-2 h-5 w-5" />
                Download App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Urban Cleanliness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with community engagement 
              to create sustainable solutions for urban sanitation challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-white p-3 rounded-xl shadow-md w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built for the Future of Smart Cities
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience next-generation civic engagement with features designed 
                for transparency, efficiency, and community empowerment.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join the Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-8 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white p-6 rounded-xl">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="h-8 bg-gradient-to-r from-green-200 to-green-300 rounded"></div>
                    <div className="h-8 bg-gradient-to-r from-blue-200 to-blue-300 rounded"></div>
                    <div className="h-8 bg-gradient-to-r from-purple-200 to-purple-300 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="mt-6 flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-600">Live location tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Globe className="h-16 w-16 text-white mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Community?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of citizens already making a difference in their neighborhoods. 
            Together, we can build cleaner, healthier cities for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Reporting Issues
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/30">
              <Shield className="mr-2 h-5 w-5" />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}