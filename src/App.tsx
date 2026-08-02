import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { InvoiceModal } from './components/InvoiceModal';
import { ToastContainer } from './components/ToastContainer';

import { StorefrontPage } from './pages/StorefrontPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';

export function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#09090b] text-slate-200 selection:bg-indigo-600 selection:text-white font-sans">
          {/* Header */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<StorefrontPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/account" element={<CustomerDashboardPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <InvoiceModal />
          <ToastContainer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
