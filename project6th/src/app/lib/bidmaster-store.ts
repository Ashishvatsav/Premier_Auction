export type AuctionProduct = {
  id: number;
  name: string;
  category: string;
  condition: string;
  description: string;
  currentBid: number;
  startingBid: number;
  bidIncrement: number;
  ownerId: number;
  image: string;
  durationDays: number;
  location: string;
  shippingCost: number;
  createdAt: string;
};

type UserRecord = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  memberSince: string;
};

type BidRecord = {
  id: number;
  productId: number;
  userId: number;
  amount: number;
  createdAt: string;
};

type WatchlistRecord = {
  id: number;
  productId: number;
  userId: number;
  createdAt: string;
};

export type AuctionSummary = AuctionProduct & {
  bids: number;
  endTime: string;
  endDateLabel: string;
  isEnded: boolean;
  sellerName: string;
};

export type BidHistoryItem = {
  bidder: string;
  amount: number;
  time: string;
};

export type UserStats = {
  totalBids: number;
  wonAuctions: number;
  activeBids: number;
  totalSpent: number;
  savedItems: number;
};

const STORAGE_KEYS = {
  users: "bidmaster.users",
  products: "bidmaster.products",
  bids: "bidmaster.bids",
  watchlist: "bidmaster.watchlist",
  seeded: "bidmaster.seeded",
  token: "token",
  userId: "userId",
} as const;

const seededUsers: UserRecord[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    password: "password123",
    memberSince: "2023-01-14T09:00:00.000Z",
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Miller",
    email: "sarah@example.com",
    phone: "+1 (555) 444-2100",
    password: "password123",
    memberSince: "2023-05-06T10:30:00.000Z",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Reed",
    email: "michael@example.com",
    phone: "+1 (555) 222-9988",
    password: "password123",
    memberSince: "2024-02-01T14:00:00.000Z",
  },
];

const seededProducts: AuctionProduct[] = [
  {
    id: 101,
    name: "Vintage Rolex Submariner",
    category: "Watches",
    condition: "Excellent",
    description:
      "A rare and highly sought-after vintage Rolex Submariner in excellent condition with original box and papers.",
    currentBid: 12500,
    startingBid: 10000,
    bidIncrement: 250,
    ownerId: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    durationDays: 7,
    location: "New York, USA",
    shippingCost: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'MacBook Pro 16" M3 Max',
    category: "Electronics",
    condition: "New",
    description: "Factory-sealed MacBook Pro with maxed-out specs and AppleCare eligibility.",
    currentBid: 2800,
    startingBid: 2400,
    bidIncrement: 100,
    ownerId: 3,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    durationDays: 5,
    location: "San Francisco, USA",
    shippingCost: 25,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 103,
    name: "Nike Air Jordan 1 Retro",
    category: "Fashion",
    condition: "Good",
    description: "Collector-grade Air Jordan 1 Retro with original laces and box.",
    currentBid: 450,
    startingBid: 300,
    bidIncrement: 25,
    ownerId: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    durationDays: 3,
    location: "Chicago, USA",
    shippingCost: 15,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
  {
    id: 104,
    name: "Canon EOS R5 Camera",
    category: "Cameras",
    condition: "Excellent",
    description: "Professional mirrorless camera kit with low shutter count and extra battery.",
    currentBid: 3200,
    startingBid: 2800,
    bidIncrement: 100,
    ownerId: 3,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    durationDays: 4,
    location: "Austin, USA",
    shippingCost: 20,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 105,
    name: "Sony PlayStation 5",
    category: "Gaming",
    condition: "New",
    description: "Latest slim model with two controllers and a charging dock.",
    currentBid: 425,
    startingBid: 350,
    bidIncrement: 25,
    ownerId: 2,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    durationDays: 2,
    location: "Seattle, USA",
    shippingCost: 18,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
  },
  {
    id: 106,
    name: "Diamond Tennis Bracelet",
    category: "Jewelry",
    condition: "Excellent",
    description: "Elegant diamond tennis bracelet with verified appraisal certificate.",
    currentBid: 8900,
    startingBid: 7500,
    bidIncrement: 250,
    ownerId: 3,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    durationDays: 6,
    location: "Miami, USA",
    shippingCost: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
  },
];

const seededBids: BidRecord[] = [
  { id: 1001, productId: 101, userId: 1, amount: 12250, createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
  { id: 1002, productId: 101, userId: 3, amount: 12500, createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  { id: 1003, productId: 102, userId: 1, amount: 2650, createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString() },
  { id: 1004, productId: 102, userId: 2, amount: 2800, createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 1005, productId: 104, userId: 1, amount: 3200, createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
  { id: 1006, productId: 105, userId: 1, amount: 425, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
];

const seededWatchlist: WatchlistRecord[] = [
  { id: 2001, productId: 101, userId: 1, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() },
  { id: 2002, productId: 106, userId: 1, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function makeId() {
  return Date.now() + Math.floor(Math.random() * 10000);
}

function ensureSeeded() {
  if (!canUseStorage()) {
    return;
  }

  if (window.localStorage.getItem(STORAGE_KEYS.seeded)) {
    return;
  }

  writeJson(STORAGE_KEYS.users, seededUsers);
  writeJson(STORAGE_KEYS.products, seededProducts);
  writeJson(STORAGE_KEYS.bids, seededBids);
  writeJson(STORAGE_KEYS.watchlist, seededWatchlist);
  window.localStorage.setItem(STORAGE_KEYS.seeded, "true");
}

function getUsersInternal() {
  ensureSeeded();
  return readJson<UserRecord[]>(STORAGE_KEYS.users, seededUsers);
}

function getProductsInternal() {
  ensureSeeded();
  return readJson<AuctionProduct[]>(STORAGE_KEYS.products, seededProducts);
}

function getBidsInternal() {
  ensureSeeded();
  return readJson<BidRecord[]>(STORAGE_KEYS.bids, seededBids);
}

function getWatchlistInternal() {
  ensureSeeded();
  return readJson<WatchlistRecord[]>(STORAGE_KEYS.watchlist, seededWatchlist);
}

function saveUsers(users: UserRecord[]) {
  writeJson(STORAGE_KEYS.users, users);
}

function saveProducts(products: AuctionProduct[]) {
  writeJson(STORAGE_KEYS.products, products);
}

function saveBids(bids: BidRecord[]) {
  writeJson(STORAGE_KEYS.bids, bids);
}

function saveWatchlist(items: WatchlistRecord[]) {
  writeJson(STORAGE_KEYS.watchlist, items);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function timeAgoLabel(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.max(1, Math.floor(diff / (1000 * 60)));

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getEndDate(product: AuctionProduct) {
  return new Date(new Date(product.createdAt).getTime() + product.durationDays * 24 * 60 * 60 * 1000);
}

function getTimeLeftLabel(product: AuctionProduct) {
  const diff = getEndDate(product).getTime() - Date.now();

  if (diff <= 0) {
    return "Ended";
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

function isEnded(product: AuctionProduct) {
  return getEndDate(product).getTime() <= Date.now();
}

function getSellerName(ownerId: number) {
  const seller = getUsersInternal().find((user) => user.id === ownerId);
  return seller ? `${seller.firstName} ${seller.lastName}` : "Unknown Seller";
}

function toAuctionSummary(product: AuctionProduct): AuctionSummary {
  const bids = getBidsInternal().filter((bid) => bid.productId === product.id);

  return {
    ...product,
    bids: bids.length,
    endTime: getTimeLeftLabel(product),
    endDateLabel: getEndDate(product).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    isEnded: isEnded(product),
    sellerName: getSellerName(product.ownerId),
  };
}

function getHighestBidderId(productId: number) {
  const bids = getBidsInternal()
    .filter((bid) => bid.productId === productId)
    .sort((a, b) => b.amount - a.amount || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return bids[0]?.userId ?? null;
}

export function getCurrentUserId() {
  if (!canUseStorage()) {
    return null;
  }

  const value = Number(window.localStorage.getItem(STORAGE_KEYS.userId));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function getCurrentUser() {
  const userId = getCurrentUserId();
  if (!userId) {
    return null;
  }

  return getUsersInternal().find((user) => user.id === userId) ?? null;
}

export function isLoggedIn() {
  if (!canUseStorage()) {
    return false;
  }

  return Boolean(window.localStorage.getItem(STORAGE_KEYS.token) && getCurrentUserId());
}

export function registerUser(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const users = getUsersInternal();
  const email = input.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    return { success: false, message: "An account with this email already exists." };
  }

  const user: UserRecord = {
    id: makeId(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    phone: input.phone.trim(),
    password: input.password,
    memberSince: new Date().toISOString(),
  };

  saveUsers([...users, user]);

  return { success: true, message: "Account created successfully." };
}

export function loginUser(email: string, password: string) {
  const user = getUsersInternal().find(
    (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password,
  );

  if (!user) {
    return { success: false, message: "Invalid email or password." };
  }

  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEYS.userId, user.id.toString());
    window.localStorage.setItem(STORAGE_KEYS.token, `mock-token-${user.id}`);
  }

  return {
    success: true,
    message: "Login successful",
    userId: user.id,
    token: `mock-token-${user.id}`,
  };
}

export function logoutUser() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEYS.userId);
  window.localStorage.removeItem(STORAGE_KEYS.token);
}

export function listAuctions() {
  return getProductsInternal()
    .map((product) => toAuctionSummary(product))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAuctionById(id: number) {
  const product = getProductsInternal().find((entry) => entry.id === id);

  if (!product) {
    return null;
  }

  const seller = getUsersInternal().find((user) => user.id === product.ownerId);

  return {
    ...toAuctionSummary(product),
    seller: seller
      ? {
          name: `${seller.firstName} ${seller.lastName}`,
          email: seller.email,
          phone: seller.phone,
          memberSince: new Date(seller.memberSince).getFullYear().toString(),
          rating: 4.8,
          totalSales: listAuctions().filter((auction) => auction.ownerId === seller.id).length,
        }
      : {
          name: "Unknown Seller",
          email: "N/A",
          phone: "N/A",
          memberSince: "2024",
          rating: 4.5,
          totalSales: 0,
        },
    bidHistory: getBidHistory(id),
  };
}

export function getBidHistory(productId: number): BidHistoryItem[] {
  const users = getUsersInternal();

  return getBidsInternal()
    .filter((bid) => bid.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((bid) => {
      const user = users.find((entry) => entry.id === bid.userId);
      const lastInitial = user?.lastName ? ` ${user.lastName[0]}.` : "";

      return {
        bidder: user ? `${user.firstName}${lastInitial}` : "Anonymous",
        amount: bid.amount,
        time: timeAgoLabel(bid.createdAt),
      };
    });
}

export function createAuction(input: {
  title: string;
  category: string;
  condition: string;
  description: string;
  startingBid: number;
  bidIncrement: number;
  durationDays: number;
  location: string;
  shippingCost: number;
  image: string;
  ownerId: number;
}) {
  const products = getProductsInternal();

  const auction: AuctionProduct = {
    id: makeId(),
    name: input.title.trim(),
    category: input.category,
    condition: input.condition,
    description: input.description.trim(),
    currentBid: input.startingBid,
    startingBid: input.startingBid,
    bidIncrement: input.bidIncrement,
    durationDays: input.durationDays,
    location: input.location.trim(),
    shippingCost: input.shippingCost,
    image: input.image,
    ownerId: input.ownerId,
    createdAt: new Date().toISOString(),
  };

  saveProducts([auction, ...products]);

  return auction;
}

export function deleteAuction(productId: number, userId: number) {
  const products = getProductsInternal();
  const target = products.find((product) => product.id === productId);

  if (!target) {
    return { success: false, message: "Auction not found." };
  }

  if (target.ownerId !== userId) {
    return { success: false, message: "Only the seller can delete this auction." };
  }

  saveProducts(products.filter((product) => product.id !== productId));
  saveBids(getBidsInternal().filter((bid) => bid.productId !== productId));
  saveWatchlist(getWatchlistInternal().filter((item) => item.productId !== productId));

  return { success: true, message: "Auction deleted successfully." };
}

export function placeBid(input: { productId: number; userId: number; amount: number }) {
  const products = getProductsInternal();
  const product = products.find((entry) => entry.id === input.productId);

  if (!product) {
    return { success: false, message: "Auction not found." };
  }

  if (product.ownerId === input.userId) {
    return { success: false, message: "You cannot bid on your own auction." };
  }

  if (isEnded(product)) {
    return { success: false, message: "This auction has already ended." };
  }

  const minimumBid = product.currentBid + product.bidIncrement;
  if (input.amount < minimumBid) {
    return {
      success: false,
      message: `Minimum bid is ${formatCurrency(minimumBid)}.`,
    };
  }

  const updatedProducts = products.map((entry) =>
    entry.id === product.id ? { ...entry, currentBid: input.amount } : entry,
  );

  saveProducts(updatedProducts);
  saveBids([
    ...getBidsInternal(),
    {
      id: makeId(),
      productId: product.id,
      userId: input.userId,
      amount: input.amount,
      createdAt: new Date().toISOString(),
    },
  ]);

  return { success: true, message: `Bid placed successfully for ${formatCurrency(input.amount)}.` };
}

export function addToWatchlist(productId: number, userId: number) {
  const items = getWatchlistInternal();

  if (items.some((item) => item.productId === productId && item.userId === userId)) {
    return { success: false, message: "This auction is already in your watchlist." };
  }

  saveWatchlist([
    ...items,
    {
      id: makeId(),
      productId,
      userId,
      createdAt: new Date().toISOString(),
    },
  ]);

  return { success: true, message: "Added to watchlist." };
}

export function getWatchlistCount(userId: number) {
  return getWatchlistInternal().filter((item) => item.userId === userId).length;
}

export function listWatchlist(userId: number) {
  const productIds = new Set(
    getWatchlistInternal()
      .filter((item) => item.userId === userId)
      .map((item) => item.productId),
  );

  return listAuctions().filter((product) => productIds.has(product.id));
}

export function getUserBidSummaries(userId: number) {
  const auctions = listAuctions();
  const latestBidByProduct = new Map<number, BidRecord>();

  getBidsInternal()
    .filter((bid) => bid.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .forEach((bid) => {
      if (!latestBidByProduct.has(bid.productId)) {
        latestBidByProduct.set(bid.productId, bid);
      }
    });

  const activeBids = auctions
    .filter((auction) => latestBidByProduct.has(auction.id) && !auction.isEnded)
    .map((auction) => {
      const myBid = latestBidByProduct.get(auction.id)!;

      return {
        ...auction,
        myBid: myBid.amount,
        status: auction.currentBid === myBid.amount ? "winning" : "outbid",
      };
    });

  const wonAuctions = auctions
    .filter((auction) => auction.isEnded && getHighestBidderId(auction.id) === userId)
    .map((auction) => ({
      ...auction,
      winningBid: auction.currentBid,
      status: "payment_pending" as const,
    }));

  return { activeBids, wonAuctions };
}

export function getUserStats(userId: number): UserStats {
  const bids = getBidsInternal().filter((bid) => bid.userId === userId);
  const { activeBids, wonAuctions } = getUserBidSummaries(userId);

  return {
    totalBids: bids.length,
    wonAuctions: wonAuctions.length,
    activeBids: activeBids.length,
    totalSpent: wonAuctions.reduce((sum, auction) => sum + auction.winningBid, 0),
    savedItems: getWatchlistCount(userId),
  };
}
