import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Award, Menu, X, LayoutDashboard, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { cart, setIsCartOpen, customer, searchQuery, setSearchQuery, products } = useStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="sticky top-0 w-full z-40 bg-[#09090b]/80 backdrop-blur-md border-b border-slate-800 text-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
        {/* Left: Mobile Menu Trigger + Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors leading-none">
                LUXE BD
              </span>
              <span className="text-[9px] font-semibold text-indigo-400 uppercase tracking-widest hidden sm:inline-block mt-0.5">
                Quiet Luxury
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
          >
            New Arrivals
          </Link>
          <Link
            to="/?category=Fashion"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Fashion
          </Link>
          <Link
            to="/?category=Electronics"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Electronics
          </Link>
          <Link
            to="/?category=Accessories"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Accessories
          </Link>
        </nav>

        {/* Center/Right Search Bar with Dynamic Live Dropdown */}
        <div className="hidden lg:block relative max-w-xs w-full">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products in BDT (৳)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-800 rounded-full bg-slate-900 text-slate-200 focus:bg-slate-950 focus:outline-none focus:border-indigo-500 font-medium transition-all placeholder-slate-600"
            />
          </div>

          {/* Search Results Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-800 p-2 z-50">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-1">
                Products Found
              </div>
              {searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                    setSearchQuery('');
                  }}
                  className="flex items-center gap-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
                >
                  <img src={prod.image} alt={prod.title} className="w-10 h-10 object-cover rounded-md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{prod.title}</p>
                    <p className="text-[11px] font-bold text-emerald-400">৳{prod.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Gold Member Loyalty points badge */}
          <Link
            to="/account"
            className="hidden sm:flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 transition-colors"
          >
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300">
              Gold: {customer.rewardPoints} pts
            </span>
          </Link>

          {/* Admin Switcher */}
          <Link
            to="/admin"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
            title="Merchant Admin Dashboard"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>

          {/* Customer Account */}
          <Link
            to="/account"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
            title="Customer Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Wishlist */}
          <Link
            to="/account?tab=wishlist"
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-800"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            title="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090b] shadow-sm">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 p-6 space-y-4 text-slate-200">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search products in BDT (৳)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-800 rounded-xl bg-slate-950 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-3 font-semibold text-sm">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-white border-b border-slate-800"
            >
              Main Storefront
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 border-b border-slate-800"
            >
              Customer Profile & Orders
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300 border-b border-slate-800"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-indigo-400 font-bold"
            >
              Checkout Page
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
