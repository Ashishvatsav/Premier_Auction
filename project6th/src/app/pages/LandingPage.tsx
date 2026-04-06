import { Link } from 'react-router-dom';
import { Gavel, TrendingUp, Shield, Clock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Gavel className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BidMaster</span>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Win Amazing Items at
            <span className="text-indigo-600"> Unbeatable Prices</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of bidders in the most exciting online auction platform.
            Discover rare collectibles, luxury items, and everyday essentials.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg">
              Start Bidding Now
            </Link>
            <Link to="/auctions" className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-50 transition text-lg border-2 border-indigo-600">
              Browse Auctions
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Bidding</h3>
            <p className="text-gray-600">Watch auctions unfold live and place bids in real-time</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">Your transactions are protected with bank-level security</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Best Deals</h3>
            <p className="text-gray-600">Get premium items at prices up to 70% below retail</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Gavel className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">Simple interface makes bidding quick and effortless</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 mt-20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">100K+</div>
              <div className="text-gray-600">Items Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">$2M+</div>
              <div className="text-gray-600">Total Savings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
