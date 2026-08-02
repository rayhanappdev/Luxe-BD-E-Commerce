import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { OrderStatusType, CourierPartnerType } from '../types';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, Package, Truck, Wallet, TrendingUp, Users, AlertTriangle, Plus, Search, Download, CheckCircle2, Clock, X, RefreshCw, Layers, Lock, Key, LogOut, ShieldCheck, Sparkles, Image as ImageIcon
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const {
    products, orders, updateOrderStatus, generateCourierTrackingId,
    addProduct, updateProductStock, deleteProduct, courierConfigs,
    toggleCourierConnection, showToast, setActiveInvoiceOrder
  } = useStore();

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('luxe_admin_authenticated') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('123456');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'couriers' | 'payments'>('overview');
  const [chartTimeframe, setChartTimeframe] = useState<'year' | '6months' | 'month'>('year');
  const [productSearch, setProductSearch] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState(4500);
  const [newCategory, setNewCategory] = useState<'Fashion' | 'Electronics' | 'Accessories' | 'Home & Living' | 'Footwear' | 'Outerwear' | 'Gadgets'>('Fashion');
  const [newStock, setNewStock] = useState(40);
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [newSizes, setNewSizes] = useState('Standard, S, M, L, XL');

  // Quick Preset Images for Easy Selection
  const imagePresets = [
    { title: 'Watch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
    { title: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
    { title: 'Leather Jacket', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
    { title: 'Bag', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sneakers', url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80' },
  ];

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = ['admin', 'admin@luxebd.com', 'luxe'];
    const validPasses = ['123456', 'admin123', 'admin'];

    if (validUsers.includes(loginUsername.trim().toLowerCase()) && validPasses.includes(loginPassword.trim())) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('luxe_admin_authenticated', 'true');
      setLoginError('');
      showToast('Login Successful!', 'Welcome to the LUXE BD Merchant Admin Panel.', 'success');
    } else {
      setLoginError('Invalid Login ID or Password. Demo Login ID: admin | Password: rayhan007');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('luxe_admin_authenticated');
    showToast('Logged Out', 'You have logged out of Admin Panel.', 'info');
  };

  const handleFillDemoCredentials = () => {
    setLoginUsername('admin');
    setLoginPassword('rayhan007');
    setLoginError('');
  };

  // KPI calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Processing' || o.status === 'Order Placed');
  const lowStockCount = products.filter((p) => p.stock < 10).length;

  // Chart data
  const chartData = [
    { month: 'Jan', revenue: 180000, orders: 85 },
    { month: 'Feb', revenue: 220000, orders: 110 },
    { month: 'Mar', revenue: 290000, orders: 145 },
    { month: 'Apr', revenue: 340000, orders: 170 },
    { month: 'May', revenue: 310000, orders: 155 },
    { month: 'Jun', revenue: 420000, orders: 210 },
    { month: 'Jul', revenue: 490000, orders: 240 },
    { month: 'Aug', revenue: 530000, orders: 265 },
    { month: 'Sep', revenue: 610000, orders: 300 },
    { month: 'Oct', revenue: 680000, orders: 340 }
  ];

  const handleExportCSV = () => {
    const csvHeader = 'Product ID,SKU,Title,Category,Price(BDT),Stock,Rating\n';
    const csvRows = products
      .map((p) => `"${p.id}","${p.sku}","${p.title}","${p.category}",${p.price},${p.stock},${p.rating}`)
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LUXE_BD_Inventory_${Date.now()}.csv`;
    a.click();
    showToast('Export Successful', 'Inventory CSV downloaded to your device.', 'success');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedSizes = newSizes.split(',').map((s) => s.trim()).filter(Boolean);

    addProduct({
      title: newTitle,
      sku: `LX-${newCategory.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      category: newCategory,
      price: Number(newPrice),
      image: newImage,
      images: [newImage],
      description: newDescription.trim() || `${newTitle} curated for LUXE BD quiet luxury collection.`,
      features: ['100% Authentic Quality Guaranteed', 'LUXE Warranty Included', 'Fast Doorstep Delivery BD'],
      specs: { Category: newCategory, Warranty: '1 Year Full Warranty' },
      colors: [{ name: 'Classic Black', hex: '#000000' }],
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard'],
      stock: Number(newStock),
      rating: 4.9,
      reviewCount: 1
    });

    setShowAddProductModal(false);
    setNewTitle('');
    setNewDescription('');
    showToast('Product Created!', `${newTitle} added to store catalog.`, 'success');
  };

  // IF NOT LOGGED IN -> SHOW ADMIN LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-slate-200">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/10">
              <ShieldCheck className="w-7 h-7 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Merchant Admin Login</h2>
            <p className="text-xs text-slate-400">
              Enter your Login ID and Password to enter the Admin Dashboard.
            </p>
          </div>

          <div className="p-3.5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-indigo-300 block">Default Demo Credentials:</span>
              <p className="font-mono text-[11px] text-slate-300">
                ID: <span className="text-white font-bold">admin</span> | Password: <span className="text-white font-bold">123456</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemoCredentials}
              className="px-2.5 py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg hover:bg-indigo-500 transition-colors shrink-0"
            >
              Auto-Fill
            </button>
          </div>

          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-semibold text-red-300 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" /> Login ID / Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-indigo-500 font-mono text-sm transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" /> Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-indigo-500 font-mono text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Enter Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-8 text-slate-200">
      {/* Dashboard Top Navigation & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full uppercase">
              Merchant Admin Panel
            </span>
            <span className="text-xs text-slate-400">Live Store Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Storefront & Logistics Control
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            Export CSV
          </button>

          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-300 transition-colors shadow-xs"
            title="Logout Admin"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Primary Navigation Subtabs */}
      <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-indigo-200" />
          Overview & Sales Analytics
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'products'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4 text-indigo-200" />
          Inventory & Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('couriers')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'couriers'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Truck className="w-4 h-4 text-indigo-200" />
          Courier Status Generator (Pathao/RedX)
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'payments'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <Wallet className="w-4 h-4 text-indigo-200" />
          Payment Gateways Config
        </button>
      </div>

      {/* TAB 1: OVERVIEW & SALES ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">৳{totalRevenue.toLocaleString()}</h3>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" /> +14.2% from last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
                ৳
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{orders.length}</h3>
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" /> {pendingOrders.length} Pending Courier
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Customers</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">1,240</h3>
                <span className="text-[11px] font-bold text-slate-400 mt-1 block">Across 64 Districts BD</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Alerts</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{lowStockCount} Items</h3>
                <span className="text-[11px] font-bold text-red-400 flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3 h-3" /> Action Required
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Interactive Sales Revenue Chart */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Revenue Growth (BDT ৳)</h3>
                <p className="text-xs text-slate-400">Monthly breakdown of gross e-commerce sales</p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setChartTimeframe('year')}
                  className={`px-3 py-1 rounded-lg transition-all ${chartTimeframe === 'year' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                >
                  This Year
                </button>
                <button
                  onClick={() => setChartTimeframe('6months')}
                  className={`px-3 py-1 rounded-lg transition-all ${chartTimeframe === '6months' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'}`}
                >
                  6 Months
                </button>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `৳${v / 1000}k`} />
                  <Tooltip
                    formatter={(val: any) => [`৳${Number(val).toLocaleString()} BDT`, 'Revenue']}
                    contentStyle={{ backgroundColor: '#09090b', color: '#f8fafc', borderRadius: '12px', border: '1px solid #1e293b', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders Management Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Customer Orders</h3>
                <p className="text-xs text-slate-400">Live order status trigger & courier consignment management</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">District</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3 text-right">Total Amount</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-white">#{ord.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-slate-100">{ord.customerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{ord.customerPhone}</div>
                      </td>
                      <td className="p-3 text-slate-300">{ord.shippingAddress.district}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950 text-slate-300 border border-slate-800">
                          {ord.paymentMethod} ({ord.paymentStatus})
                        </span>
                      </td>
                      <td className="p-3 text-right font-extrabold text-indigo-400">
                        ৳{ord.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatusType)}
                          className="text-[11px] font-bold border border-slate-800 rounded-lg px-2 py-1 bg-slate-950 text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Handed over to Courier">Handed over to Courier</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setActiveInvoiceOrder(ord)}
                          className="px-2.5 py-1 text-[11px] font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
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
        </div>
      )}

      {/* TAB 2: INVENTORY & PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search SKU or Product title..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-800 rounded-xl bg-slate-900 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Showing {products.filter((p) => p.title.toLowerCase().includes(productSearch.toLowerCase())).length} of {products.length} products
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Category</th>
                    <th className="p-3 text-right">Price (BDT)</th>
                    <th className="p-3 text-center">Stock Level</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {products
                    .filter((p) => p.title.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/50">
                        <td className="p-3 flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 object-cover rounded-lg border border-slate-800 bg-slate-950 shrink-0" />
                          <div>
                            <p className="font-bold text-white line-clamp-1">{p.title}</p>
                            <p className="text-[11px] text-slate-400">Rating: {p.rating} ★ ({p.reviewCount})</p>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-slate-400">{p.sku}</td>
                        <td className="p-3 text-slate-300">{p.category}</td>
                        <td className="p-3 text-right font-bold text-white">৳{p.price.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => updateProductStock(p.id, Number(e.target.value))}
                              className="w-16 px-2 py-1 text-center font-bold border border-slate-800 rounded-lg bg-slate-950 text-slate-200 text-xs"
                            />
                            {p.stock === 0 && <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">Out</span>}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="text-red-400 hover:text-red-300 font-bold px-2 py-1 hover:bg-red-500/10 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COURIER STATUS GENERATOR (Pathao / RedX / Steadfast) */}
      {activeTab === 'couriers' && (
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Truck className="w-5 h-5 text-indigo-400" />
              Local Courier Integration Engine (Bangladesh)
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Connect your store to Pathao Courier, RedX Logistics, or Steadfast. Instantly generate official consignment tracking IDs and dispatch updates to customer phones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {courierConfigs.map((cfg) => (
                <div key={cfg.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: cfg.color }}>
                        {cfg.logoText}
                      </span>
                      {cfg.name}
                    </span>
                    <button
                      onClick={() => toggleCourierConnection(cfg.id)}
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                        cfg.isConnected ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {cfg.isConnected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                  <div className="text-xs text-slate-400">
                    Active Consignments: <span className="font-bold text-white">{cfg.pendingOrdersCount} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unassigned Orders Table for Consignment Creation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-white">Generate Consignment Tracking IDs</h3>
            <p className="text-xs text-slate-400">Select pending orders to push directly to courier API gateway</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Recipient Name</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Current Tracking ID</th>
                    <th className="p-3 text-center">Generate Consignment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-white">#{ord.id}</td>
                      <td className="p-3 font-semibold text-slate-200">{ord.customerName} ({ord.customerPhone})</td>
                      <td className="p-3 text-slate-400">{ord.shippingAddress.thana}, {ord.shippingAddress.district}</td>
                      <td className="p-3 font-mono text-indigo-400 font-bold">
                        {ord.courierTrackingId || 'Not Assigned'}
                      </td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <button
                          onClick={() => generateCourierTrackingId(ord.id, 'pathao')}
                          className="px-2.5 py-1 text-[10px] font-bold bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
                        >
                          Pathao ID
                        </button>
                        <button
                          onClick={() => generateCourierTrackingId(ord.id, 'redx')}
                          className="px-2.5 py-1 text-[10px] font-bold bg-amber-600 text-white rounded hover:bg-amber-500 transition-colors"
                        >
                          RedX ID
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PAYMENT GATEWAYS CONFIG */}
      {activeTab === 'payments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#E2136E] text-white font-bold flex items-center justify-center text-xs">
                  bk
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">bKash Merchant API</h4>
                  <p className="text-xs text-slate-400">Instant bKash Tokenized Checkout</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                Active
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <label className="block text-slate-300 font-semibold">Merchant Short Code</label>
              <input type="text" readOnly value="01712-345678" className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-mono" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#F7921E] text-white font-bold flex items-center justify-center text-xs">
                  NG
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">Nagad Payment Gateway</h4>
                  <p className="text-xs text-slate-400">Direct Nagad Checkout</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                Active
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <label className="block text-slate-300 font-semibold">Nagad Merchant ID</label>
              <input type="text" readOnly value="NG-MERCHANT-883910" className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-mono" />
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">Add New Product / নতুন পণ্য যোগ করুন</h3>
              </div>
              <button onClick={() => setShowAddProductModal(false)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Product Title / পণ্যের নাম *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. Italian Leather Oxford Shoes"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category / ক্যাটাগরি</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-semibold"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Gadgets">Gadgets</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Price BDT / দাম (৳) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Initial Stock Level / মজুদ</label>
                  <input
                    type="number"
                    min="1"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Available Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={newSizes}
                    onChange={(e) => setNewSizes(e.target.value)}
                    placeholder="S, M, L, XL"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Image URL / ছবির লিংক *</label>
                <input
                  type="text"
                  required
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-500 text-[11px]"
                />
                
                {/* Preset Quick Image Pickers */}
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold block">Quick Select Preset Image:</span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {imagePresets.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setNewImage(preset.url)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold shrink-0 transition-colors ${
                          newImage === preset.url
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        {preset.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Preview Box */}
              {newImage && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                  <img src={newImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-800" />
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">Image Preview</span>
                    <span className="text-xs text-slate-300 font-semibold line-clamp-1">{newTitle || 'New Product'}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Product Description / বিবরণ</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter details about materials, craftsmanship, luxury features..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-3 border border-slate-800 text-slate-400 hover:text-white font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 text-white font-bold uppercase rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};