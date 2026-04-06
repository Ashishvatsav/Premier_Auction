import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Heart, Gavel } from 'lucide-react';
import { getCurrentUserId, listWatchlist, type AuctionSummary } from '../lib/bidmaster-store';

export default function WatchlistPage() {
  const [items, setItems] = useState<AuctionSummary[]>([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    if (!userId) {
      setItems([]);
      return;
    }

    setItems(listWatchlist(userId));
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md text-center">
          <Heart className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign in to view your watchlist</h1>
          <p className="text-gray-600 mb-6">Your saved auctions live here once you are logged in.</p>
          <div className="flex justify-center gap-3">
            <Link to="/login" className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Login
            </Link>
            <Link to="/auctions" className="px-5 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
              Browse Auctions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <Gavel className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">BidMaster</span>
          </Link>
          <Link to="/auctions" className="text-indigo-600 hover:underline">
            Back to Auctions
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold">My Watchlist</h1>
            <p className="text-gray-600">{items.length} saved auctions</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Nothing saved yet</h2>
            <p className="text-gray-600 mb-6">Tap the heart icon on any auction to add it here.</p>
            <Link to="/auctions" className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Explore Auctions
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/auctions/${item.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
              >
                <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-red-500 font-medium">{item.endTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-indigo-600 font-bold text-xl mb-3">${item.currentBid.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{item.bids} bids so far</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
