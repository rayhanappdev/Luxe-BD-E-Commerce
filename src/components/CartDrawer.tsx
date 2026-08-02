import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateCartQuantity, removeFromCart, showToast } = useStore();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.floor(subtotal * appliedDiscount);
  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'LUXE10') {
      setAppliedDiscount(0.1);
      showToast('Promo Code Applied!', '10% discount applied to your order.', 'success');
    } else {
      showToast('Invalid Coupon', 'Try using coupon code "LUXE10"', 'error');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#09090b] text-slate-200 border-l border-slate-800 shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold tracking-tight text-white">Your Shopping Bag</h2>
                <span className="text-xs bg-indigo-600 text-white px-2.5 py-0.5 rounded-full font-semibold">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 divide-y divide-slate-800/80">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                    <ShoppingBag className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="font-semibold text-white text-base">Your shopping bag is empty</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Explore our curated collections of quiet luxury fashion, watches, and electronics.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="py-4 flex gap-4 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-white truncate">{item.product.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor} </span>}
                        {item.selectedSize && <span>| Size: {item.selectedSize}</span>}
                      </p>
                      <div className="text-sm font-bold text-emerald-400 mt-1">
                        ৳{item.product.price.toLocaleString()}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 hover:bg-slate-800 text-slate-300 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedColor,
                                item.selectedSize
                              )
                            }
                            className="p-1 hover:bg-slate-800 text-slate-300 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-4">
                {/* Coupon Code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LUXE10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 bg-slate-950 text-slate-200 font-medium placeholder-slate-600"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Subtotal & Discount Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount (10%)</span>
                      <span className="font-semibold">-৳{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>Estimated Total</span>
                    <span className="text-emerald-400">৳{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-indigo-600 text-white text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
