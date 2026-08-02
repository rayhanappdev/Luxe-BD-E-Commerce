import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BANGLADESH_DISTRICTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, Star, Heart, Truck, ShieldCheck, ArrowLeft, Check, Plus, Minus, Zap, MapPin } from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, showToast } = useStore();

  const product = products.find((p) => p.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(product.image || product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'delivery' | 'reviews'>('features');
  const [estimateDistrict, setEstimateDistrict] = useState('Dhaka');

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const deliveryCost = estimateDistrict === 'Dhaka' ? 60 : 120;
  const deliveryDays = estimateDistrict === 'Dhaka' ? '24-48 Hours' : '2-3 Days';

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-12 text-slate-200">
      {/* Back Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-indigo-400 flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Store
        </Link>
        <span>/</span>
        <span className="text-slate-500">{product.category}</span>
        <span>/</span>
        <span className="text-white truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Grid: Gallery + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-[420px] sm:h-[480px] bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-4 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain rounded-xl"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold px-3 py-1 rounded-full">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 p-1 bg-slate-900 ${
                  selectedImage === img ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain rounded-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details & Config (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              {product.title}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-slate-200 ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="text-xs text-slate-400 font-medium">{product.reviewCount} Verified Customer Reviews</span>
              <span className="text-slate-700">|</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                {product.stock > 10 ? `In Stock (${product.stock} units)` : product.stock > 0 ? `Low Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-baseline gap-4">
            <span className="text-3xl font-extrabold text-white">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-base text-slate-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discountPercentage && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded">
                Save ৳{(product.originalPrice! - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Color: <span className="text-indigo-400">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor === c.name
                        ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-slate-700"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Size: <span className="text-indigo-400">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[44px] h-10 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedSize === s
                        ? 'border-indigo-500 bg-indigo-600 text-white shadow-md'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Actions */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-800 rounded-xl overflow-hidden bg-slate-900 h-12">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="px-3 py-2 text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
                disabled={product.stock === 0}
                className="flex-1 h-12 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>

              <button
                onClick={() => showToast('Wishlist', 'Item saved to your wishlist', 'info')}
                className="h-12 w-12 border border-slate-800 bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-400 hover:border-slate-700 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="w-full h-12 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              Buy Now (Express Checkout)
            </button>
          </div>

          {/* Localized Delivery Estimator Widget */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                <MapPin className="w-4 h-4 text-indigo-400" />
                Localized Delivery Estimator (Bangladesh)
              </div>
              <select
                value={estimateDistrict}
                onChange={(e) => setEstimateDistrict(e.target.value)}
                className="text-xs border border-slate-800 rounded-lg bg-slate-950 px-2.5 py-1 text-slate-200 font-semibold focus:outline-none focus:border-indigo-500"
              >
                {BANGLADESH_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 'Dhaka' ? '(Inside Dhaka)' : '(Outside Dhaka)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Shipping Cost:</span>
                <p className="font-bold text-white">৳{deliveryCost} BDT</p>
              </div>
              <div>
                <span className="text-slate-500">Est. Arrival:</span>
                <p className="font-bold text-emerald-400">{deliveryDays}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Features, Shipping */}
      <div className="pt-8 border-t border-slate-800">
        <div className="flex border-b border-slate-800 gap-8">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'features' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Features & Highlights
            {activeTab === 'features' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
          </button>

          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'specs' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Technical Specifications
            {activeTab === 'specs' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === 'reviews' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reviews ({product.reviewCount})
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl divide-y divide-slate-800/80 border border-slate-800 rounded-xl overflow-hidden text-xs bg-slate-950">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex p-3 hover:bg-slate-900/50">
                  <span className="w-1/3 font-semibold text-slate-400">{key}</span>
                  <span className="w-2/3 font-bold text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-white">{product.rating}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Out of 5</p>
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-bold text-white">98% of buyers recommended this item</p>
                  <p className="text-slate-400 mt-0.5">Based on {product.reviewCount} verified purchases in Bangladesh.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">You May Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
