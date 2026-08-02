import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryType } from '../types';
import { ArrowRight, Timer, Filter, Sparkles, Smartphone, Shirt, Home as HomeIcon, Watch, Footprints, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StorefrontPage: React.FC = () => {
  const { products, searchQuery } = useStore();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const flashSaleProducts = products.filter((p) => p.isFlashSale);

  const categories: { label: CategoryType; icon: React.ReactNode; image: string }[] = [
    {
      label: 'Electronics',
      icon: <Smartphone className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Fashion',
      icon: <Shirt className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Home & Living',
      icon: <HomeIcon className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Accessories',
      icon: <Watch className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
    },
    {
      label: 'Footwear',
      icon: <Footprints className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-3xl max-w-[1280px] mx-auto px-4 sm:px-8 mt-4">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
            alt="LUXE BD Luxury Fashion Editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
        </div>

        <div className="relative z-10 h-full max-w-2xl flex flex-col justify-center px-6 sm:px-12 text-white space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Curated Bangladesh Collection
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-white">
            Elevate Your Lifestyle with Quiet Luxury
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
            Discover curated collections of premium fashion, Swiss timepieces, audio gear, and home essentials delivered nationwide across Bangladesh.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-indigo-600 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/checkout')}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 px-6 py-4 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all"
            >
              Express Checkout
            </button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Shop by Category</h2>
            <p className="text-xs text-slate-400 mt-1">Select a category to view bespoke catalog items</p>
          </div>
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1"
          >
            View All ({products.length})
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.label}
              onClick={() => {
                setSelectedCategory(cat.label);
                const el = document.getElementById('catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative h-64 rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                selectedCategory === cat.label
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 backdrop-blur-md flex items-center justify-center text-indigo-400 mb-2">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-base leading-tight text-white">{cat.label}</h3>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3 text-indigo-400" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-slate-900/60 py-12 border-y border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white">Flash Sale</h2>
              <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Timer className="w-3.5 h-3.5" />
                Ends in 04:12:59
              </span>
            </div>
            <p className="text-xs text-slate-400">Limited quantity discounts up to 30% off in BDT (৳)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section id="catalog" className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {selectedCategory === 'All' ? 'All Products Catalog' : `${selectedCategory} Collection`}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Showing {filteredProducts.length} items available in Bangladesh</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                selectedCategory === 'All'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.label}
                onClick={() => setSelectedCategory(c.label)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedCategory === c.label
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-slate-900 rounded-xl border border-slate-800 p-8">
            <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No products match your filter</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting a different category.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Localized Bangladeshi Delivery Banner */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Nationwide Delivery Bangladesh
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Fast Doorstep Delivery to All 64 Districts
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We partner with Pathao, RedX, and Steadfast Logistics to ensure secure, insured delivery with Cash on Delivery (COD) and bKash/Nagad options.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 z-10 shrink-0">
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center min-w-[130px]">
              <p className="text-xl font-bold text-emerald-400">24-48 Hours</p>
              <p className="text-[11px] text-slate-400 mt-1">Inside Dhaka City</p>
            </div>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center min-w-[130px]">
              <p className="text-xl font-bold text-white">2-3 Days</p>
              <p className="text-[11px] text-slate-400 mt-1">Outside Dhaka</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
