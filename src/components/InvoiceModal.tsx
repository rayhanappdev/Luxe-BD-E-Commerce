import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Printer, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InvoiceModal: React.FC = () => {
  const { activeInvoiceOrder, setActiveInvoiceOrder } = useStore();

  if (!activeInvoiceOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-slate-900 text-slate-200 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 print:shadow-none print:m-0 print:w-full"
        >
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#09090b] text-white border-b border-slate-800 print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-lg text-white">LUXE BD</span>
              <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-semibold">
                Official Receipt
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <Printer className="w-4 h-4 text-indigo-400" />
                Print / Save PDF
              </button>
              <button
                onClick={() => setActiveInvoiceOrder(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-8 space-y-6">
            {/* Header / Logo */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-800">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">LUXE BD</h1>
                <p className="text-xs text-slate-400 mt-1">Quiet Luxury E-Commerce & Merchant Logistics</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  House 12, Road 5, Banani, Dhaka-1213, Bangladesh
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  +880 9612-LUXEBD | support@luxe.bd
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                  Invoice #{activeInvoiceOrder.id}
                </div>
                <p className="text-xs text-slate-400">Date: <span className="font-semibold text-white">{activeInvoiceOrder.date}</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Payment: <span className="font-semibold text-white uppercase">{activeInvoiceOrder.paymentMethod}</span></p>
                <p className="text-xs text-slate-400 mt-0.5">Status: <span className="font-semibold text-emerald-400">{activeInvoiceOrder.status}</span></p>
              </div>
            </div>

            {/* Billed To & Courier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Billed & Shipped To</h3>
                <p className="text-sm font-bold text-white">{activeInvoiceOrder.shippingAddress.fullName}</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeInvoiceOrder.shippingAddress.address}</p>
                <p className="text-xs text-slate-300">{activeInvoiceOrder.shippingAddress.thana}, {activeInvoiceOrder.shippingAddress.district}</p>
                <p className="text-xs text-slate-300 mt-1 font-mono">{activeInvoiceOrder.shippingAddress.phone}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">Logistics & Tracking</h3>
                <p className="text-xs text-slate-300">Courier Partner: <span className="font-semibold uppercase text-white">{activeInvoiceOrder.courierPartner || 'Pathao/RedX'}</span></p>
                <p className="text-xs text-slate-300 mt-1">Consignment ID: <span className="font-mono font-bold text-emerald-400">{activeInvoiceOrder.courierTrackingId || 'Pending Assignment'}</span></p>
                <p className="text-xs text-slate-300 mt-1">Est. Delivery: <span className="font-semibold text-white">{activeInvoiceOrder.estimatedDelivery}</span></p>
                {activeInvoiceOrder.transactionId && (
                  <p className="text-xs text-slate-300 mt-1">Txn ID: <span className="font-mono text-indigo-300">{activeInvoiceOrder.transactionId}</span></p>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Item Description</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium">
                  {activeInvoiceOrder.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50">
                      <td className="p-3">
                        <div className="font-bold text-white">{item.productTitle}</div>
                        {(item.color || item.size) && (
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.color && <span>Color: {item.color} </span>}
                            {item.size && <span>Size: {item.size}</span>}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center text-slate-300">{item.quantity}</td>
                      <td className="p-3 text-right text-slate-300">৳{item.price.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Calculation */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-2">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 max-w-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you for shopping with LUXE BD. This invoice is computer generated and valid without signature.</span>
              </div>

              <div className="w-full sm:w-60 space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-white">৳{activeInvoiceOrder.subtotal.toLocaleString()}</span>
                </div>
                {activeInvoiceOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount:</span>
                    <span className="font-semibold">-৳{activeInvoiceOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span className="font-semibold text-white">৳{activeInvoiceOrder.deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-extrabold text-white">
                  <span>Total Paid:</span>
                  <span className="text-emerald-400">৳{activeInvoiceOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
