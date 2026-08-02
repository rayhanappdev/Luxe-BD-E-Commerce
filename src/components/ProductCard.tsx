import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Star, Heart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const navigate = useNavigate();

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-slate-700 hover:-translate-y-1 flex flex-col justify-between">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
            -{product.discountPercentage}%
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-all shadow-sm"
        title="Add to Wishlist"
      >
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Container */}
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="relative h-64 overflow-hidden bg-slate-950/60 cursor-pointer flex items-center justify-center p-4"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-700 group-hover:scale-105"
        />

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="px-4 py-2 bg-slate-800 border border-slate-700 text-white text-xs font-bold rounded-lg shadow-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-400" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {product.category}
          </span>
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="font-semibold text-base text-white mt-1 line-clamp-1 cursor-pointer hover:text-indigo-400 transition-colors"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-300">{product.rating}</span>
            <span className="text-[11px] text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-lg text-white">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              product.stock === 0
                ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 active:scale-95'
            }`}
            title={product.stock === 0 ? 'Out of Stock' : 'Quick Add to Cart'}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
