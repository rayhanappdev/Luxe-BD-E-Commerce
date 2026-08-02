import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#041627] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6cf8bb] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">100% Authentic</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Directly sourced from verified global luxury brands & authorized distributors.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6cf8bb] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Fast BD Shipping</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                24-48 Hours inside Dhaka; 2-3 Days nationwide via Pathao, RedX & Steadfast.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6cf8bb] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">7-Day Easy Returns</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hassle-free replacement policy with doorstep pickup across Bangladesh.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#6cf8bb] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                24/7 Concierge hotline at +880 9612-LUXEBD and live chat assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-800">
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white">LUXE BD</span>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Curating the finest quiet luxury fashion, timepieces, electronics, and lifestyle essentials for Bangladesh.
            </p>

            {/* Payment Method Badges */}
            <div className="mt-6">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Supported Local Payments
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded bg-[#E2136E] text-white text-[10px] font-bold">
                  bKash
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F7921E] text-white text-[10px] font-bold">
                  Nagad
                </span>
                <span className="px-2.5 py-1 rounded bg-[#8C3494] text-white text-[10px] font-bold">
                  Rocket
                </span>
                <span className="px-2.5 py-1 rounded bg-[#005BAC] text-white text-[10px] font-bold">
                  Upay
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1A1F71] text-white text-[10px] font-bold">
                  VISA
                </span>
                <span className="px-2.5 py-1 rounded bg-[#EB001B] text-white text-[10px] font-bold">
                  Mastercard
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb] mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home Storefront</Link></li>
              <li><Link to="/product/prod-1" className="hover:text-white transition-colors">Product Spotlight</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition-colors">Localized Checkout</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Merchant Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb] mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/account?tab=orders" className="hover:text-white transition-colors">Track Active Order</Link></li>
              <li><Link to="/account?tab=addresses" className="hover:text-white transition-colors">Saved Shipping Addresses</Link></li>
              <li><Link to="/account?tab=payments" className="hover:text-white transition-colors">Saved bKash & Card Methods</Link></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Return & Exchange Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6cf8bb] mb-4">Logistics Partners</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Automated consignment ID generation & real-time tracking integration with local logistics:
            </p>
            <div className="space-y-2 text-xs font-medium text-slate-300">
              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <span>Pathao Courier</span>
                <span className="text-[10px] text-[#6cf8bb] font-bold">API Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <span>RedX Logistics</span>
                <span className="text-[10px] text-[#6cf8bb] font-bold">API Connected</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5">
                <span>Steadfast Express</span>
                <span className="text-[10px] text-slate-400">Integrated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 LUXE BD. All rights reserved. Registered under Trade License BD-882910.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#sitemap" className="hover:text-slate-300 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
