import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Gavel, Edit, MapPin, Mail, Phone, Star, Package, Clock, DollarSign } from 'lucide-react';
import { getCurrentUser, getCurrentUserId, getUserBidSummaries, getUserStats, logoutUser } from '../lib/bidmaster-store';

export default function ProfilePage() {
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const currentUser = getCurrentUser();
  const stats = userId
    ? getUserStats(userId)
    : { totalBids: 0, wonAuctions: 0, activeBids: 0, totalSpent: 0, savedItems: 0 };
  const activityData = userId ? getUserBidSummaries(userId) : { activeBids: [], wonAuctions: [] };

  const recentActivity = [
    ...activityData.activeBids.slice(0, 3).map((bid) => ({
      type: bid.status === 'winning' ? 'bid' : 'outbid',
      item: bid.name,
      amount: bid.currentBid,
      time: bid.endTime,
    })),
    ...activityData.wonAuctions.slice(0, 2).map((auction) => ({
      type: 'won',
      item: auction.name,
      amount: auction.winningBid,
      time: auction.endDateLabel,
    })),
  ].slice(0, 4);

  const handleSignOut = () => {
    const confirmSignOut = window.confirm('Are you sure you want to sign out?');
    if (confirmSignOut) {
      logoutUser();
      navigate('/');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md text-center">
          <User className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your profile</h1>
          <p className="text-gray-600 mb-6">Your account details, stats, and activity will show up here.</p>
          <div className="flex justify-center gap-3">
            <Link to="/login" className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center gap-2">
              <Gavel className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BidMaster</span>
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search auctions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <Link to="/auctions" className="text-gray-700 hover:text-indigo-600 transition">
                Auctions
              </Link>
              <Link to="/my-bids" className="text-gray-700 hover:text-indigo-600 transition">
                My Bids
              </Link>
              <Link to="/create-auction" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Sell Item
              </Link>
              <button className="relative p-2 text-gray-700 hover:text-indigo-600 transition">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link to="/profile" className="p-2 text-indigo-600">
                <User className="w-6 h-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-1">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">4.8 rating</span>
                </div>
                <button className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{currentUser.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">United States</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(currentUser.memberSince).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Bids</span>
                  <span className="font-bold">{stats.totalBids}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Won Auctions</span>
                  <span className="font-bold text-green-600">{stats.wonAuctions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Bids</span>
                  <span className="font-bold text-indigo-600">{stats.activeBids}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saved Items</span>
                  <span className="font-bold">{stats.savedItems}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-bold text-lg text-indigo-600">${stats.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
                <Gavel className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Bids</p>
                <p className="text-3xl font-bold">{stats.totalBids}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                <Package className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Won Items</p>
                <p className="text-3xl font-bold">{stats.wonAuctions}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <Clock className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Active</p>
                <p className="text-3xl font-bold">{stats.activeBids}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <DollarSign className="w-8 h-8 mb-2 opacity-80" />
                <p className="text-sm opacity-90 mb-1">Total Spent</p>
                <p className="text-2xl font-bold">${(stats.totalSpent / 1000).toFixed(1)}K</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-gray-600">Your bidding activity will appear here once you start participating in auctions.</p>
                ) : (
                  recentActivity.map((activity, index) => (
                    <div key={`${activity.item}-${index}`} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        activity.type === 'won' ? 'bg-green-100' :
                        activity.type === 'outbid' ? 'bg-orange-100' : 'bg-indigo-100'
                      }`}>
                        {activity.type === 'won' ? (
                          <Package className="w-6 h-6 text-green-600" />
                        ) : activity.type === 'outbid' ? (
                          <Clock className="w-6 h-6 text-orange-600" />
                        ) : (
                          <Gavel className="w-6 h-6 text-indigo-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.item}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.type === 'won' ? 'Won auction' :
                           activity.type === 'outbid' ? 'Currently outbid' : 'Leading bid'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-indigo-600">${activity.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates about bids and auctions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Bid Reminders</h4>
                    <p className="text-sm text-gray-600">Get notified when auctions are ending soon</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm">
                    Enable
                  </button>
                </div>

                <button
                  onClick={handleSignOut}
                  className="w-full mt-4 px-6 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
