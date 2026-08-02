import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useSearchParams } from 'react-router-dom';
import { OrderStatusType } from '../types';
import {
  User, Package, Truck, MapPin, CreditCard, Shield, Award, CheckCircle2, Search, Plus, Trash2, Printer, ChevronRight, Clock, AlertCircle
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { customer, orders, addresses, deleteAddress, addAddress, savedPayments, deleteSavedPayment, addSavedPayment, setActiveInvoiceOrder, showToast } = useStore();
  const [searchParams] = useSearchParams();

  const initialTab = (searchParams.get('tab') as any) || 'overview';
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'track' | 'addresses' | 'payments' | 'settings'>(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams]);

  // Track order query state
  const [trackQuery, setTrackQuery] = useState('LX-9942');
  const [trackedOrder, setTrackedOrder] = useState(orders[0] || null);

  // Address Modal state
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState<'Home' | 'Office'>('Home');
  const [newAddrName, setNewAddrName] = useState(customer.name);
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrDistrict, setNewAddrDistrict] = useState('Dhaka');
  const [newAddrThana, setNewAddrThana] = useState('Banani');
  const [newAddrPhone, setNewAddrPhone] = useState(customer.phone);

  // Payment Modal state
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPayType, setNewPayType] = useState<'bkash' | 'card'>('bkash');
  const [newPayAccount, setNewPayAccount] = useState('');

  const handleSearchTrackOrder = () => {
    const found = orders.find(
      (o) => o.id.toLowerCase() === trackQuery.toLowerCase().trim() || o.customerPhone.includes(trackQuery.trim())
    );
    if (found) {
      setTrackedOrder(found);
      showToast('Order Found', `Tracking updates for Order #${found.id}`, 'success');
    } else {
      showToast('Order Not Found', 'Check your Order ID or mobile phone number.', 'error');
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLine) return;
    addAddress({
      label: newAddrLabel,
      isDefault: addresses.length === 0,
      recipientName: newAddrName,
      addressLine: newAddrLine,
      district: newAddrDistrict,
      thana: newAddrThana,
      phone: newAddrPhone
    });
    setShowAddAddressModal(false);
    setNewAddrLine('');
  };

  const handleSavePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayAccount) return;
    addSavedPayment({
      type: newPayType,
      title: newPayType === 'bkash' ? 'bKash Wallet' : 'Credit Card',
      accountNumber: newPayAccount,
      isDefault: false
    });
    setShowAddPaymentModal(false);
    setNewPayAccount('');
  };

  const activeOrder = orders[0];

  // Visual 5-Step Order Stepper Progress Calculator
  const getStepIndex = (status: OrderStatusType) => {
    switch (status) {
      case 'Order Placed': return 1;
      case 'Processing': return 2;
      case 'Handed over to Courier': return 3;
      case 'Out for Delivery': return 4;
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = getStepIndex(activeOrder?.status || 'Processing');

  const stepsList = [
    { num: 1, label: 'Order Placed', desc: 'Payment Confirmed' },
    { num: 2, label: 'Processing', desc: 'Warehouse Packing' },
    { num: 3, label: 'Handed to Courier', desc: activeOrder?.courierPartner?.toUpperCase() || 'RedX / Pathao' },
    { num: 4, label: 'Out for Delivery', desc: 'Rider In-Transit' },
    { num: 5, label: 'Delivered', desc: 'Doorstep Received' }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-8 text-slate-200">
      {/* Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-5 z-10">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{customer.name}</h1>
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                {customer.tier}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">{customer.email} | {customer.phone}</p>
          </div>
        </div>

        {/* Loyalty Reward Cards */}
        <div className="flex gap-4 z-10 shrink-0">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center min-w-[110px]">
            <span className="text-xs text-slate-400 block font-bold">Reward Points</span>
            <span className="text-lg font-extrabold text-indigo-400 flex items-center justify-center gap-1 mt-0.5">
              <Award className="w-4 h-4" />
              {customer.rewardPoints}
            </span>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-center min-w-[110px]">
            <span className="text-xs text-slate-400 block font-bold">Cashback Earned</span>
            <span className="text-lg font-extrabold text-white mt-0.5 block">
              ৳{customer.cashbackEarned}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Active View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation (3 Cols) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-xs space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4 text-indigo-200" />
              Active Order Tracker
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4 text-indigo-200" />
              My Orders ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'track' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4 text-indigo-200" />
              Track Any Order
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'addresses' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <MapPin className="w-4 h-4 text-indigo-200" />
              Saved Addresses ({addresses.length})
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'payments' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4 text-indigo-200" />
              Payment Methods ({savedPayments.length})
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-indigo-200" />
              Account Settings
            </button>
          </div>
        </div>

        {/* Right Content Panel (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW & ACTIVE STEPPER ORDER TRACKER */}
          {activeTab === 'overview' && activeOrder && (
            <div className="space-y-6">
              {/* Visual 5-Step Order Progress Bar */}
              <div className="p-6 sm:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase">
                      Live Delivery Tracker
                    </span>
                    <h2 className="text-xl font-extrabold text-white mt-1">
                      Active Order #{activeOrder.id}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveInvoiceOrder(activeOrder)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
                  >
                    <Printer className="w-4 h-4" />
                    View Printable Invoice
                  </button>
                </div>

                {/* 5-Step Visual Stepper */}
                <div className="py-4">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 z-0" />
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-700"
                      style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                    />

                    {stepsList.map((step) => {
                      const isCompleted = step.num <= currentStep;
                      const isCurrent = step.num === currentStep;

                      return (
                        <div key={step.num} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                              isCompleted
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                : 'bg-slate-950 border-2 border-slate-700 text-slate-500'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                          </div>
                          <span className={`text-[11px] font-bold mt-2 text-center ${isCurrent ? 'text-indigo-400' : 'text-slate-400'}`}>
                            {step.label}
                          </span>
                          <span className="text-[10px] text-slate-500 text-center hidden sm:block">
                            {step.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courier Logistics Info */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Logistics Partner</span>
                    <span className="font-bold text-white uppercase">{activeOrder.courierPartner || 'RedX Logistics'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Consignment Tracking ID</span>
                    <span className="font-mono font-bold text-indigo-400">{activeOrder.courierTrackingId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Est. Doorstep Arrival</span>
                    <span className="font-bold text-slate-200">{activeOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Order Item Details Card */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xs space-y-4">
                <h3 className="text-base font-bold text-white">Order Contents</h3>
                <div className="divide-y divide-slate-800">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={item.productImage} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-800 bg-slate-950" />
                        <div>
                          <p className="font-bold text-xs text-white">{item.productTitle}</p>
                          <p className="text-[11px] text-slate-400">Qty: {item.quantity} | {item.color || item.size}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-xs text-indigo-400">৳{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS LIST */}
          {activeTab === 'orders' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-lg font-bold text-white">All Orders History</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3 text-right">Total Amount</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-white">#{ord.id}</td>
                        <td className="p-3 text-slate-400">{ord.date}</td>
                        <td className="p-3 font-semibold uppercase text-slate-300">{ord.paymentMethod}</td>
                        <td className="p-3 text-right font-extrabold text-indigo-400">৳{ord.totalAmount.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setActiveInvoiceOrder(ord)}
                            className="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors"
                          >
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TRACK ANY ORDER */}
          {activeTab === 'track' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Direct Order & Consignment Tracker</h3>
                <p className="text-xs text-slate-400">Enter your LUXE Order ID or Mobile Phone Number to check real-time courier updates</p>
              </div>

              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="e.g. LX-9942 or 01712345678"
                  className="flex-1 px-4 py-2.5 text-xs bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  onClick={handleSearchTrackOrder}
                  className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
                >
                  Track Order
                </button>
              </div>

              {trackedOrder && (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-white">Order #{trackedOrder.id}</h4>
                      <p className="text-xs text-slate-400">Placed on {trackedOrder.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                      {trackedOrder.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400">Courier Partner:</span>
                      <p className="font-bold text-slate-200 uppercase">{trackedOrder.courierPartner || 'RedX'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Tracking Code:</span>
                      <p className="font-mono font-bold text-indigo-400">{trackedOrder.courierTrackingId || 'Pending'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Saved Shipping Addresses</h3>
                <button
                  onClick={() => setShowAddAddressModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-indigo-600 text-white">
                        {addr.label} {addr.isDefault ? '(Default)' : ''}
                      </span>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-slate-400 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-bold text-xs text-white">{addr.recipientName}</p>
                    <p className="text-xs text-slate-400">{addr.addressLine}</p>
                    <p className="text-xs text-slate-400">{addr.thana}, {addr.district}</p>
                    <p className="text-xs font-mono text-slate-400 pt-1">{addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PAYMENT METHODS */}
          {activeTab === 'payments' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Saved Mobile Wallets & Cards</h3>
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedPayments.map((pm) => (
                  <div key={pm.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold text-white uppercase ${pm.type === 'bkash' ? 'bg-[#E2136E]' : 'bg-[#1A1F71]'}`}>
                        {pm.type}
                      </span>
                      <button onClick={() => deleteSavedPayment(pm.id)} className="text-slate-400 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="font-bold text-xs text-white">{pm.title}</p>
                    <p className="text-xs font-mono text-slate-400">{pm.accountNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-white">Account Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                  <input type="text" readOnly value={customer.name} className="w-full p-2.5 border border-slate-800 rounded-xl bg-slate-950 text-slate-200" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input type="email" readOnly value={customer.email} className="w-full p-2.5 border border-slate-800 rounded-xl bg-slate-950 text-slate-200" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Mobile Phone Number</label>
                  <input type="text" readOnly value={customer.phone} className="w-full p-2.5 border border-slate-800 rounded-xl bg-slate-950 text-slate-200 font-mono" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Membership Tier</label>
                  <input type="text" readOnly value={`${customer.tier} (${customer.rewardPoints} points)`} className="w-full p-2.5 border border-slate-800 rounded-xl bg-slate-950 font-bold text-indigo-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-white">Save New Address</h3>
            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Address Label</label>
                <select
                  value={newAddrLabel}
                  onChange={(e) => setNewAddrLabel(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-semibold"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Street Address / House / Road *</label>
                <input
                  type="text"
                  required
                  value={newAddrLine}
                  onChange={(e) => setNewAddrLine(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl"
                  placeholder="House 12, Road 5..."
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddAddressModal(false)} className="flex-1 py-2.5 border border-slate-800 text-slate-400 hover:text-white rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-white">Save New Payment Method</h3>
            <form onSubmit={handleSavePayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Method Type</label>
                <select
                  value={newPayType}
                  onChange={(e) => setNewPayType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-semibold"
                >
                  <option value="bkash">bKash Mobile Wallet</option>
                  <option value="card">Visa / Mastercard</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Account Number / Card Last 4 Digits</label>
                <input
                  type="text"
                  required
                  value={newPayAccount}
                  onChange={(e) => setNewPayAccount(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-mono"
                  placeholder="017XXXXXXXX or **** 4421"
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddPaymentModal(false)} className="flex-1 py-2.5 border border-slate-800 text-slate-400 hover:text-white rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500">
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
