import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, User, Gavel, TrendingUp, Clock, Heart } from 'lucide-react';
import {
  addToWatchlist,
  deleteAuction,
  getCurrentUserId,
  getWatchlistCount,
  isLoggedIn,
  listAuctions,
  placeBid,
  type AuctionSummary,
} from '../lib/bidmaster-store';

const featuredAuctions = [
  {
    id: 1,
    title: 'Vintage Rolex Submariner',
    currentBid: 12500,
    endTime: '2h 34m',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Watches',
    bids: 24,
  },
  {
    id: 2,
    title: 'MacBook Pro 16" M3 Max',
    currentBid: 2800,
    endTime: '5h 12m',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'Electronics',
    bids: 18,
  },
  {
    id: 3,
    title: 'Nike Air Jordan 1 Retro',
    currentBid: 450,
    endTime: '1h 45m',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Fashion',
    bids: 31,
  },
  {
    id: 4,
    title: 'Canon EOS R5 Camera',
    currentBid: 3200,
    endTime: '3h 22m',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    category: 'Cameras',
    bids: 15,
  },
];

const categories = [
  { name: 'Electronics', icon: '💻', count: 234 },
  { name: 'Fashion', icon: '👗', count: 189 },
  { name: 'Watches', icon: '⌚', count: 156 },
  { name: 'Art', icon: '🎨', count: 98 },
  { name: 'Collectibles', icon: '🏆', count: 267 },
  { name: 'Jewelry', icon: '💎', count: 145 },
];

export default function HomePage() {
  const [products, setProducts] = useState<AuctionSummary[]>([]);
  const [watchCount, setWatchCount] = useState<number>(0);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    refreshDashboard();
  }, []);

  const refreshDashboard = () => {
    setProducts(listAuctions());
    setWatchCount(currentUserId ? getWatchlistCount(currentUserId) : 0);
  };

  const handleBid = (productId: number) => {
    const userId = getCurrentUserId();

    if (!isLoggedIn() || !userId) {
      alert("Please login first ❌");
      return;
    }

    const amount = prompt("Enter your bid amount:");

    if (!amount || isNaN(Number(amount))) {
      alert("Invalid amount ❌");
      return;
    }

    const result = placeBid({
      productId,
      userId,
      amount: Number(amount),
    });

    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);

    if (result.success) {
      refreshDashboard();
    }
  };

  const handleWatch = (productId: number) => {
    const userId = getCurrentUserId();

    if (!isLoggedIn() || !userId) {
      alert("Please login first ❌");
      return;
    }

    const result = addToWatchlist(productId, userId);
    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);

    if (result.success) {
      refreshDashboard();
    }
  };

  const handleDelete = (productId: number) => {
    const userId = getCurrentUserId();

    if (!isLoggedIn() || !userId) {
      alert("Please login first ❌");
      return;
    }

    const result = deleteAuction(productId, userId);
    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);

    if (result.success) {
      refreshDashboard();
    }
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center gap-2">
              <Gavel className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BidMaster</span>
            </Link>

            {/* Search Bar */}
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

            {/* Navigation */}
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
              <Link to="/profile" className="p-2 text-gray-700 hover:text-indigo-600 transition">
                <User className="w-6 h-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 mb-1">Active Bids</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <TrendingUp className="w-12 h-12 text-indigo-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Won Auctions</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <Gavel className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1">Watchlist</p>
                <p className="text-3xl font-bold">{watchCount}</p>
              </div>
              <Heart className="w-12 h-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium text-sm">{category.name}</span>
                <span className="text-xs text-gray-500">{category.count} items</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Auctions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Auctions</h2>
            <Link to="/auctions" className="text-indigo-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((auction) => (
              <Link
                key={auction.id}
                to={`/auctions/${auction.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={auction.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={auction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition" onClick={(e) => {
                    e.preventDefault();
                    handleWatch(auction.id);
                  }}>
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
                    {auction.category || 'General'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{auction.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Current Bid</p>
                      <p className="text-lg font-bold text-indigo-600">{formatCurrency(auction.currentBid)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Time Left</p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-500" />
                        <p className="text-sm font-medium text-red-500">{auction.endTime || '—'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-gray-500">{auction.bids} bids</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleBid(auction.id);
                        }}
                        className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                      >
                        Bid Now
                      </button>
                      {auction.ownerId === currentUserId && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(auction.id);
                          }}
                          className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ending Soon */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Ending Soon - Don't Miss Out!</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAuctions.slice(0, 3).map((auction) => (
              <Link
                key={auction.id}
                to={`/auctions/${auction.id}`}
                className="bg-white rounded-lg p-4 flex gap-4 hover:shadow-md transition"
              >
                <img src={auction.image} alt={auction.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 line-clamp-1">{auction.title}</h4>
                  <p className="text-lg font-bold text-indigo-600 mb-1">${auction.currentBid.toLocaleString()}</p>
                  <p className="text-xs text-red-600 font-medium">Ends in {auction.endTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
