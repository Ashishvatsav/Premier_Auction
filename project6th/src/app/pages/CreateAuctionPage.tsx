import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, Bell, User, Gavel, Upload, X, Plus } from 'lucide-react';
import { createAuction, getCurrentUserId, isLoggedIn } from '../lib/bidmaster-store';

export default function CreateAuctionPage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    startingBid: '',
    bidIncrement: '',
    duration: '3',
    location: '',
    shippingCost: '',
  });

  const handleImageUpload = () => {
    const mockImage = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400';
    if (images.length < 5) {
      setImages([...images, mockImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ownerId = getCurrentUserId();

    if (!isLoggedIn() || !ownerId) {
      alert("Please login first ❌");
      navigate('/login');
      return;
    }

    createAuction({
      title: formData.title,
      category: formData.category,
      condition: formData.condition,
      description: formData.description,
      startingBid: Number(formData.startingBid),
      bidIncrement: Number(formData.bidIncrement),
      durationDays: Number(formData.duration),
      location: formData.location,
      shippingCost: Number(formData.shippingCost),
      image:
        images[0] ||
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      ownerId,
    });

    alert("Product added successfully ✅");
    navigate('/auctions');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center gap-2">
              <Gavel className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BidMaster</span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link to="/auctions" className="text-gray-700 hover:text-indigo-600 transition">
                Auctions
              </Link>
              <Link to="/my-bids" className="text-gray-700 hover:text-indigo-600 transition">
                My Bids
              </Link>
              <button className="relative p-2 text-gray-700 hover:text-indigo-600 transition">
                <Bell className="w-6 h-6" />
              </button>
              <Link to="/profile" className="p-2 text-gray-700 hover:text-indigo-600 transition">
                <User className="w-6 h-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Auction</h1>
          <p className="text-gray-600">List your item and start receiving bids</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images Upload */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Photos</h2>
            <p className="text-sm text-gray-600 mb-4">Add up to 5 photos. First photo will be the cover image.</p>

            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-indigo-600 text-white text-xs rounded">
                      Cover
                    </span>
                  )}
                </div>
              ))}

              {images.length < 5 && (
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition flex flex-col items-center justify-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-500">Upload</span>
                </button>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Item Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Vintage Rolex Submariner Watch"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="watches">Watches</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="art">Art</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="new">New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your item in detail..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Be specific and honest about the item's condition</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Pricing & Duration</h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Bid <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                    <input
                      type="number"
                      value={formData.startingBid}
                      onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bid Increment <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                    <input
                      type="number"
                      value={formData.bidIncrement}
                      onChange={(e) => setFormData({ ...formData, bidIncrement: e.target.value })}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction Duration <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['1', '3', '5', '7'].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setFormData({ ...formData, duration: days })}
                      className={`py-3 rounded-lg font-medium transition ${
                        formData.duration === days
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {days} {days === '1' ? 'day' : 'days'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State/Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Cost <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                  <input
                    type="number"
                    value={formData.shippingCost}
                    onChange={(e) => setFormData({ ...formData, shippingCost: e.target.value })}
                    placeholder="0.00 (enter 0 for free shipping)"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
            <h3 className="font-semibold mb-2">Before you publish:</h3>
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li>• Make sure all photos clearly show the item</li>
              <li>• Double-check your pricing and duration</li>
              <li>• Ensure your description is accurate and complete</li>
              <li>• Review our seller guidelines and policies</li>
            </ul>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-lg"
              >
                Publish Auction
              </button>
              <button
                type="button"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Save Draft
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
