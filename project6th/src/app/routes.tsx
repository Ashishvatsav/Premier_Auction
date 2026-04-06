import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AuctionsPage from "./pages/AuctionsPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import MyBidsPage from "./pages/MyBidsPage";
import ProfilePage from "./pages/ProfilePage";
import WatchlistPage from "./pages/WatchlistPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/auctions",
    element: <AuctionsPage />,
  },
  {
    path: "/auctions/:id",
    element: <AuctionDetailPage />,
  },
  {
    path: "/create-auction",
    element: <CreateAuctionPage />,
  },
  {
    path: "/my-bids",
    element: <MyBidsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/watchlist",
    element: <WatchlistPage />,
  },
]);
