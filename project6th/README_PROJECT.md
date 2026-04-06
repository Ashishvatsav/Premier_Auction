# BidMaster - Complete Bidding Application

## Project Overview
A fully functional bidding application built with React, TypeScript, React Router, and Tailwind CSS.

## Pages Implemented

### 1. Landing Page (/)
- Hero section with call-to-action buttons
- Features showcase
- How it works section
- Popular categories
- Stats display
- Fully responsive design

### 2. Sign Up Page (/signup)
- Registration form with validation
- Password confirmation check
- Social login options (Google, GitHub)
- Redirects to home page on successful signup

### 3. Login Page (/login)
- Email and password authentication
- Remember me checkbox
- Forgot password link
- Social login options
- Redirects to home page on successful login

### 4. Homepage (/home)
- Quick stats dashboard
- Browse by category
- Featured auctions carousel
- Ending soon section
- Trending categories
- Fully functional search bar

### 5. Auctions Page (/auctions)
- Grid view of all auctions
- Category filtering (working)
- Search functionality (working)
- Advanced filters (collapsible)
- Sort options
- Add to watchlist (working alerts)
- Bid now buttons redirect to detail page

### 6. Auction Detail Page (/auctions/:id)
- Image gallery with thumbnails
- Current bid display
- Time remaining countdown display
- Bidding interface with amount input
- Quick bid increment buttons
- Place bid functionality (working with validation)
- Bid history
- Product specifications tabs
- Shipping information
- Seller information
- Add to favorites/watchlist

### 7. Create Auction Page (/create-auction)
- Multi-step form
- Image upload (up to 5 images)
- Item details form
- Category and condition selection
- Pricing and duration settings
- Shipping information
- Form validation
- Redirects to auctions page on submit

### 8. My Bids Page (/my-bids)
- Stats cards (Active, Winning, Outbid, Won)
- Active bids list with status badges
- Won auctions section
- Payment status tracking
- Package tracking
- Quick actions on each bid

### 9. Profile Page (/profile)
- User information display
- Contact details
- Quick stats
- Recent activity feed
- Account settings
- Email/notification preferences toggles
- Sign out functionality (with confirmation)

## Interactive Features

### Working Buttons & Functions:
✅ All navigation links
✅ Sign up form submission → redirects to /home
✅ Login form submission → redirects to /home
✅ Category filtering on auctions page
✅ Search functionality on auctions page
✅ Add to watchlist/favorites (shows alerts)
✅ Place bid with validation
✅ Quick bid increment buttons
✅ Image gallery navigation
✅ Tab switching (Description, Specifications, Shipping)
✅ Create auction form → redirects to /auctions
✅ Image upload simulator
✅ View auction details from any listing
✅ Increase bid from My Bids page
✅ Payment and tracking buttons
✅ Sign out with confirmation
✅ All filter toggles
✅ Social login buttons (UI only)

### Form Validations:
- Required field validation
- Email format validation
- Password confirmation matching
- Minimum bid amount validation
- Phone number format
- Terms and conditions acceptance

## Technical Stack
- **Framework**: React 18 with TypeScript
- **Routing**: React Router v7 (Data Router mode)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State Management**: React useState hooks
- **Images**: Unsplash API (via placeholder URLs)

## Project Structure
```
src/
├── app/
│   ├── App.tsx              # Main app component with RouterProvider
│   ├── routes.ts            # Route configuration
│   └── pages/
│       ├── LandingPage.tsx
│       ├── SignUpPage.tsx
│       ├── LoginPage.tsx
│       ├── HomePage.tsx
│       ├── AuctionsPage.tsx
│       ├── AuctionDetailPage.tsx
│       ├── CreateAuctionPage.tsx
│       ├── MyBidsPage.tsx
│       └── ProfilePage.tsx
└── styles/
    ├── theme.css
    └── fonts.css
```

## How to Test

1. **Start at Landing Page**: Navigate to "/" to see the landing page
2. **Sign Up**: Click "Sign Up" → Fill form → Redirects to home
3. **Browse Auctions**: Click "Auctions" → Use filters and search
4. **View Details**: Click any auction card → See full details
5. **Place Bid**: Enter amount → Click "Place Bid" → See validation
6. **Create Auction**: Click "Sell Item" → Fill form → Upload images
7. **My Bids**: View active bids and won auctions
8. **Profile**: View user info and settings → Try sign out

## Key Features
- Responsive design (mobile, tablet, desktop)
- Real-time filtering and search
- Form validation
- Navigation breadcrumbs
- Status badges (Winning, Outbid, Shipped, etc.)
- Interactive notifications (alerts on actions)
- Smooth transitions and hover effects
- Consistent color scheme (Indigo primary)

## Notes
- All data is mock/sample data
- Authentication is simulated (no backend)
- Images use Unsplash placeholder URLs
- Bidding logic is frontend-only
- All interactive elements have working event handlers
- Project is ready to deploy and host
