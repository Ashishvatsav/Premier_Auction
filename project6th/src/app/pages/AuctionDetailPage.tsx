import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Bell, User, Gavel, Clock, Heart, Share2, TrendingUp, Shield, MapPin, Package } from 'lucide-react';
import { addToWatchlist, getAuctionById, getCurrentUserId, placeBid } from '../lib/bidmaster-store';

export default function AuctionDetailPage() {
  const { id } = useParams();
  const auctionId = Number(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [auction, setAuction] = useState(() => (Number.isFinite(auctionId) ? getAuctionById(auctionId) : null));

  useEffect(() => {
    if (!Number.isFinite(auctionId)) {
      setAuction(null);
      return;
    }

    const nextAuction = getAuctionById(auctionId);
    setAuction(nextAuction);

    if (nextAuction) {
      setBidAmount(nextAuction.currentBid + nextAuction.bidIncrement);
      setSelectedImage(0);
    }
  }, [auctionId]);

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm p-10 max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-3">Auction not found</h1>
          <p className="text-gray-600 mb-6">This listing may have been removed or never existed.</p>
          <Link to="/auctions" className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Browse Auctions
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [auction.image];
  const minimumBid = auction.currentBid + auction.bidIncrement;

  const handlePlaceBid = () => {
    const userId = getCurrentUserId();

    if (!userId) {
      alert('Please login first ❌');
      return;
    }

    const result = placeBid({
      productId: auction.id,
      userId,
      amount: bidAmount,
    });

    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);

    if (result.success) {
      const refreshed = getAuctionById(auction.id);
      if (refreshed) {
        setAuction(refreshed);
        setBidAmount(refreshed.currentBid + refreshed.bidIncrement);
      }
    }
  };

  const handleWatch = () => {
    const userId = getCurrentUserId();

    if (!userId) {
      alert('Please login first ❌');
      return;
    }

    const result = addToWatchlist(auction.id, userId);
    alert(result.success ? `${result.message} ✅` : `${result.message} ❌`);
  };

  const specifications = {
    Category: auction.category,
    Condition: auction.condition,
    'Starting Bid': `$${auction.startingBid.toLocaleString()}`,
    'Bid Increment': `$${auction.bidIncrement.toLocaleString()}`,
    Location: auction.location,
    Seller: auction.seller.name,
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
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/home" className="hover:text-indigo-600">Home</Link>
          <span>/</span>
          <Link to="/auctions" className="hover:text-indigo-600">Auctions</Link>
          <span>/</span>
          <span className="text-gray-900">{auction.category}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-100">
                <img
                  src={galleryImages[selectedImage]}
                  alt={auction.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={handleWatch}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition"
                  >
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                  <button
                    onClick={() => alert('Share link copied!')}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 p-4 bg-gray-50">
                {galleryImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
              <div className="flex gap-4 border-b mb-6">
                {['description', 'specifications', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-2 font-medium capitalize transition ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-600 text-indigo-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">About This Item</h3>
                  <p className="text-gray-700 leading-relaxed">{auction.description}</p>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span>Authenticity Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span>Secure Packaging</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span>{auction.bids} active bids</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="font-medium">Ships From</p>
                        <p className="text-gray-600">{auction.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="font-medium">Shipping Cost</p>
                        <p className="text-gray-600">
                          {auction.shippingCost === 0 ? 'Free' : `$${auction.shippingCost.toLocaleString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="font-medium">Estimated Delivery</p>
                        <p className="text-gray-600">3-5 business days after payment</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
              <h3 className="text-xl font-bold mb-4">Seller Information</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{auction.seller.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>⭐ {auction.seller.rating} rating</span>
                    <span>•</span>
                    <span>{auction.seller.totalSales} live sales</span>
                    <span>•</span>
                    <span>Member since {auction.seller.memberSince}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{auction.seller.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{auction.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{auction.bids * 14 + 120} views</span>
                  <span>•</span>
                  <span>{auction.bids} bids</span>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Time Remaining</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{auction.endTime}</p>
                <p className="text-xs text-gray-600 mt-1">Ends {auction.endDateLabel}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Current Bid</p>
                <p className="text-4xl font-bold text-indigo-600 mb-2">
                  ${auction.currentBid.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Starting bid: ${auction.startingBid.toLocaleString()}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Bid (min. ${minimumBid.toLocaleString()})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium">$</span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  onClick={() => setBidAmount(auction.currentBid + auction.bidIncrement)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  +${auction.bidIncrement}
                </button>
                <button
                  onClick={() => setBidAmount(auction.currentBid + auction.bidIncrement * 2)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  +${auction.bidIncrement * 2}
                </button>
                <button
                  onClick={() => setBidAmount(auction.currentBid + auction.bidIncrement * 4)}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                >
                  +${auction.bidIncrement * 4}
                </button>
              </div>

              <button
                onClick={handlePlaceBid}
                className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-lg mb-3"
              >
                Place Bid
              </button>
              <button
                onClick={handleWatch}
                className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Add to Watchlist
              </button>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">Bid History</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {auction.bidHistory.length === 0 ? (
                    <p className="text-sm text-gray-500">No bids yet. Be the first to bid.</p>
                  ) : (
                    auction.bidHistory.map((bid, index) => (
                      <div key={`${bid.bidder}-${index}`} className="flex justify-between text-sm py-2 border-b">
                        <div>
                          <p className="font-medium">{bid.bidder}</p>
                          <p className="text-xs text-gray-500">{bid.time}</p>
                        </div>
                        <p className="font-semibold text-indigo-600">${bid.amount.toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
