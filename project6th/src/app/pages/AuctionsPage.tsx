import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Bell, User, Gavel, Clock, Heart, SlidersHorizontal } from 'lucide-react';
import { addToWatchlist, getCurrentUserId, listAuctions, type AuctionSummary } from '../lib/bidmaster-store';

export default function AuctionsPage() {
  const [auctions, setAuctions] = useState<AuctionSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setAuctions(listAuctions());
  }, []);

  const categories = ['All', ...new Set(auctions.map((auction) => auction.category))];

  const filteredAuctions =
    selectedCategory === 'All'
      ? auctions
      : auctions.filter((auction) => auction.category === selectedCategory);

  const searchedAuctions = searchTerm
    ? filteredAuctions.filter((auction) =>
        auction.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : filteredAuctions;

  const handleWatch = (productId: number) => {
    const userId = getCurrentUserId();

    if (!userId) {
      alert('Please login first ❌');
      return;
    }

    const result = addToWatchlist(productId, userId);
    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);
  };

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search auctions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <Link to="/auctions" className="text-indigo-600 font-medium">
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
              <Link to="/profile" className="p-2 text-gray-700 hover:text-indigo-600 transition">
                <User className="w-6 h-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Auctions</h1>
            <p className="text-gray-600">{searchedAuctions.length} active auctions</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-indigo-500 transition"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>All Conditions</option>
                  <option>New</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ending Soon</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Any Time</option>
                  <option>Within 1 hour</option>
                  <option>Within 6 hours</option>
                  <option>Within 24 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                  <option>Ending Soon</option>
                  <option>Newly Listed</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Bids</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchedAuctions.map((auction) => (
            <Link
              key={auction.id}
              to={`/auctions/${auction.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={auction.image}
                  alt={auction.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWatch(auction.id);
                  }}
                >
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
                <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
                  {auction.category}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-white text-xs rounded">
                  {auction.condition}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{auction.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="text-lg font-bold text-indigo-600">${auction.currentBid.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Time Left</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      <p className="text-sm font-medium text-red-500">{auction.endTime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500">{auction.bids} bids</span>
                  <button className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition">
                    Bid Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium">
            Load More Auctions
          </button>
        </div>
      </main>
    </div>
  );
}
