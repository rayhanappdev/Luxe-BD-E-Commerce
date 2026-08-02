import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BANGLADESH_DISTRICTS, BANGLADESH_THANAS } from '../data/mockData';
import { PaymentMethodType } from '../types';
import { ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight, Lock, Phone, CreditCard, Wallet, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage: React.FC = () => {
  const { cart, placeOrder, showToast, addresses, customer } = useStore();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState(customer.name || 'Luxe Customer');
  const [email, setEmail] = useState(customer.email || 'customer@luxe.bd');
  const [phone, setPhone] = useState(customer.phone || '+880 1712 345678');
  
  const [district, setDistrict] = useState('Dhaka');
  const [thana, setThana] = useState('Banani');
  const [addressLine, setAddressLine] = useState('House 12, Road 5, Block C, Banani');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>('bkash');

  // bKash / Payment simulation state
  const [bkashNumber, setBkashNumber] = useState('01712345678');
  const [bkashTrxId, setBkashTrxId] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'express' ? 150 : (district === 'Dhaka' ? 60 : 120);
  const totalAmount = subtotal + deliveryFee;

  const paymentMethodsList: {
    id: PaymentMethodType;
    name: string;
    bg: string;
    text: string;
    badge: string;
    desc: string;
  }[] = [
    {
      id: 'bkash',
      name: 'bKash Mobile Banking',
      bg: 'bg-[#E2136E]',
      text: 'text-white',
      badge: 'Most Popular (Instant 5% Cashback)',
      desc: 'Pay using bKash Online Gateway or Direct Merchant Pay (01712-345678)'
    },
    {
      id: 'nagad',
      name: 'Nagad Mobile Wallet',
      bg: 'bg-[#F7921E]',
      text: 'text-white',
      badge: 'Zero Cash-out Fee',
      desc: 'Pay using Nagad merchant payment gateway'
    },
    {
      id: 'rocket',
      name: 'DBBL Rocket',
      bg: 'bg-[#8C3494]',
      text: 'text-white',
      badge: 'Dutch-Bangla Bank',
      desc: 'Dutch-Bangla Mobile Banking'
    },
    {
      id: 'upay',
      name: 'Upay (UCB)',
      bg: 'bg-[#005BAC]',
      text: 'text-white',
      badge: 'UCB Gateway',
      desc: 'United Commercial Bank Mobile Wallet'
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      bg: 'bg-[#1A1F71]',
      text: 'text-white',
      badge: 'SSLCommerz Secured',
      desc: 'Visa, Mastercard, AMEX or City Bank City Touch'
    },
    {
      id: 'cod',
      name: 'Cash on Delivery (COD)',
      bg: 'bg-slate-800',
      text: 'text-white',
      badge: '64 Districts',
      desc: 'Pay cash to delivery courier upon receiving package'
    }
  ];

  const handleApplySavedAddress = (addrId: string) => {
    const selected = addresses.find((a) => a.id === addrId);
    if (selected) {
      setFullName(selected.recipientName);
      setDistrict(selected.district);
      setThana(selected.thana);
      setAddressLine(selected.addressLine);
      setPhone(selected.phone);
      showToast('Address Loaded', `Applied saved address: ${selected.label}`, 'info');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Cart is Empty', 'Please add products before checking out.', 'error');
      return;
    }

    if (!phone || phone.length < 10) {
      showToast('Phone Required', 'Please enter a valid 11-digit Bangladeshi mobile number.', 'error');
      return;
    }

    const orderObj = placeOrder({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      items: cart.map((i) => ({
        productId: i.product.id,
        productTitle: i.product.title,
        productImage: i.product.image,
        quantity: i.quantity,
        price: i.product.price,
        color: i.selectedColor,
        size: i.selectedSize
      })),
      shippingAddress: {
        fullName,
        phone,
        address: addressLine,
        district,
        thana,
        notes: deliveryNotes
      },
      deliveryMethod,
      deliveryFee,
      subtotal,
      discount: 0,
      totalAmount,
      paymentMethod: selectedPayment,
      paymentStatus: selectedPayment === 'cod' ? 'Pending' : 'Paid',
      transactionId: selectedPayment !== 'cod' ? `TXN-${Math.floor(10000000 + Math.random() * 90000000)}` : undefined,
      courierPartner: 'redx',
      courierTrackingId: `REDX-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: district === 'Dhaka' ? 'Tomorrow' : '3 Days'
    });

    // Navigate to Customer Account dashboard to track order
    navigate('/account?tab=orders');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 text-slate-200">
      {/* Checkout Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Localized Checkout
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order with authentic Bangladeshi payment options & delivery address
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
          <Lock className="w-3.5 h-3.5" />
          256-bit SSL Encrypted
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Information, Address, Delivery, Payment (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Saved Addresses Quick Selector */}
          {addresses.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Quick Apply Saved Address
              </label>
              <div className="flex flex-wrap gap-2">
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    type="button"
                    onClick={() => handleApplySavedAddress(addr.id)}
                    className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 text-xs font-semibold hover:border-indigo-500 hover:text-white transition-colors"
                  >
                    📍 {addr.label} ({addr.district})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 1: Customer Contact Info */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Rahim Uddin"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Mobile Phone Number (+880) *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-mono"
                  placeholder="+880 1712 345678"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-400" />
              2. Shipping Address (Bangladesh)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">District *</label>
                <select
                  value={district}
                  onChange={(e) => {
                    const newD = e.target.value;
                    setDistrict(newD);
                    if (BANGLADESH_THANAS[newD]) {
                      setThana(BANGLADESH_THANAS[newD][0]);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {BANGLADESH_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Thana / Upazila *</label>
                <select
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  {(BANGLADESH_THANAS[district] || ['Sadar']).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Street Address / House / Road *</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. House 42, Road 11, Block D"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-300 mb-1">Delivery Notes (Optional)</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Call before delivery / Leave at security gate"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Speed */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">3. Courier Shipping Method</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryMethod === 'standard'
                    ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/20'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-white">Standard Delivery</span>
                    <span className="text-xs font-extrabold text-indigo-400">
                      ৳{district === 'Dhaka' ? 60 : 120} BDT
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {district === 'Dhaka' ? '24-48 Hours' : '2-3 Days'} via Pathao / RedX Logistics
                  </p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/20'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-white">Express Same-Day Dhaka</span>
                    <span className="text-xs font-extrabold text-indigo-400">৳150 BDT</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Guaranteed delivery within 6-12 hours in Dhaka Metro
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Section 4: Authentic Bangladeshi Payment Options */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-indigo-400" />
              4. Bangladeshi Payment Gateways
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethodsList.map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPayment === pm.id
                      ? 'border-indigo-500 bg-slate-950 text-white shadow-md ring-1 ring-indigo-500/30'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${pm.bg} ${pm.text}`}>
                      {pm.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold opacity-75">{pm.badge}</span>
                  </div>

                  <div className="mt-3">
                    <h4 className="font-bold text-xs">{pm.name}</h4>
                    <p className="text-[11px] opacity-75 mt-0.5">{pm.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-form prompts for bKash or Card */}
            {selectedPayment === 'bkash' && (
              <div className="p-4 rounded-xl bg-[#E2136E]/10 border border-[#E2136E]/30 space-y-3 text-xs">
                <div className="flex items-center justify-between text-[#E2136E] font-bold">
                  <span>bKash Merchant Pay Simulation</span>
                  <span>Merchant: 01712-345678</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Enter your bKash Mobile Number below. You will receive an instant push notification or OTP to authorize payment for ৳{totalAmount.toLocaleString()} BDT.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-800 rounded-lg bg-slate-950 font-mono text-xs font-semibold text-white"
                    placeholder="017XXXXXXXX"
                  />
                  <span className="px-3 py-2 bg-[#E2136E] text-white font-bold rounded-lg shrink-0">
                    Auto-Authorized
                  </span>
                </div>
              </div>
            )}

            {selectedPayment === 'card' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  SSLCommerz Card Gateway (Visa / Mastercard / AMEX)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="px-3 py-2 border border-slate-800 rounded-lg bg-slate-900 text-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Card Number (4421 **** ****)"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="px-3 py-2 border border-slate-800 rounded-lg bg-slate-900 text-slate-200 font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
                Order Summary
              </h3>
              <span className="text-xs text-slate-400">
                {cart.reduce((a, b) => a + b.quantity, 0)} Items
              </span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-800">
              {cart.map((item, idx) => (
                <div key={idx} className="pt-3 first:pt-0 flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-white truncate">{item.product.title}</p>
                    <p className="text-[11px] text-slate-400">
                      Qty: {item.quantity} {item.selectedColor ? `| ${item.selectedColor}` : ''}
                    </p>
                  </div>
                  <div className="text-right text-xs font-bold text-indigo-400">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Calculation */}
            <div className="space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({deliveryMethod === 'express' ? 'Express' : district})</span>
                <span className="font-semibold text-white">৳{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-indigo-400">৳{totalAmount.toLocaleString()} BDT</span>
              </div>
            </div>

            {/* Submit Order CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-98"
            >
              Confirm & Place Order
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              By confirming your order, you agree to LUXE BD's Terms of Service and 7-Day Easy Replacement Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
