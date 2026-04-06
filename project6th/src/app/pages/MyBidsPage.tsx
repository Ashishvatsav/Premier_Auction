import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Bell, User, Gavel, Clock, TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import { getCurrentUserId, getUserBidSummaries } from '../lib/bidmaster-store';

type ActiveBid = ReturnType<typeof getUserBidSummaries>['activeBids'][number];
type WonAuction = ReturnType<typeof getUserBidSummaries>['wonAuctions'][number];

export default function MyBidsPage() {
  const navigate = useNavigate();
  const [activeBids, setActiveBids] = useState<ActiveBid[]>([]);
  const [wonAuctions, setWonAuctions] = useState<WonAuction[]>([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    if (!userId) {
      setActiveBids([]);
      setWonAuctions([]);
      return;
    }

    const nextState = getUserBidSummaries(userId);
    setActiveBids(nextState.activeBids);
    setWonAuctions(nextState.wonAuctions);
  }, [userId]);

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Sign in to track your bids</h1>
          <p className="text-gray-600 mb-6">We’ll show your active auctions, wins, and outbid alerts here.</p>
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
              <Link to="/my-bids" className="text-indigo-600 font-medium">
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
        <h1 className="text-3xl font-bold mb-8">My Bids</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Bids</p>
                <p className="text-2xl font-bold">{activeBids.length}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-indigo-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Winning</p>
                <p className="text-2xl font-bold text-green-600">
                  {activeBids.filter((bid) => bid.status === 'winning').length}
                </p>
              </div>
              <Trophy className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Outbid</p>
                <p className="text-2xl font-bold text-orange-600">
                  {activeBids.filter((bid) => bid.status === 'outbid').length}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Won</p>
                <p className="text-2xl font-bold text-indigo-600">{wonAuctions.length}</p>
              </div>
              <Trophy className="w-10 h-10 text-indigo-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Active Bids</h2>

          {activeBids.length === 0 ? (
            <p className="text-gray-600">You do not have any active bids yet.</p>
          ) : (
            <div className="space-y-4">
              {activeBids.map((bid) => (
                <Link
                  key={bid.id}
                  to={`/auctions/${bid.id}`}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition"
                >
                  <img src={bid.image} alt={bid.name} className="w-24 h-24 object-cover rounded-lg" />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{bid.name}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Your Bid</p>
                        <p className="font-bold text-indigo-600">${bid.myBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Bid</p>
                        <p className="font-bold">${bid.currentBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Time Left</p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-red-500" />
                          <p className="font-medium text-red-500">{bid.endTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    {bid.status === 'winning' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Winning
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        Outbid
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/auctions/${bid.id}`);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                    >
                      {bid.status === 'outbid' ? 'Increase Bid' : 'View Auction'}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">Won Auctions</h2>

          {wonAuctions.length === 0 ? (
            <p className="text-gray-600">No completed wins yet.</p>
          ) : (
            <div className="space-y-4">
              {wonAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <img src={auction.image} alt={auction.name} className="w-24 h-24 object-cover rounded-lg" />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{auction.name}</h3>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Winning Bid</p>
                        <p className="font-bold text-green-600">${auction.winningBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Ended On</p>
                        <p className="font-medium">{auction.endDateLabel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Payment Pending
                    </span>
                    <button
                      onClick={() => alert('Payment flow is not connected in this demo yet.')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                    >
                      Complete Payment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
