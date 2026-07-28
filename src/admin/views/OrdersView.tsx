import React, { useState } from 'react';
import { ShoppingBag, Eye, Printer, Truck, CheckCircle2, Clock, XCircle, Search, MapPin, User, FileText, X } from 'lucide-react';
import { Order } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status'], tracking?: string) => void;
  selectedOrderFromDashboard?: Order | null;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  onUpdateOrderStatus,
  selectedOrderFromDashboard
}) => {
  const [activeOrderModal, setActiveOrderModal] = useState<Order | null>(selectedOrderFromDashboard || null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [trackingInput, setTrackingInput] = useState<string>('');
  const [showInvoiceView, setShowInvoiceView] = useState<boolean>(false);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = filterStatus === 'All' || ord.status === filterStatus;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (ord: Order) => {
    setActiveOrderModal(ord);
    setTrackingInput(ord.trackingNumber || '');
    setShowInvoiceView(false);
  };

  const handleStatusChange = (newStatus: Order['status']) => {
    if (!activeOrderModal) return;
    onUpdateOrderStatus(activeOrderModal.id, newStatus, trackingInput);
    setActiveOrderModal({
      ...activeOrderModal,
      status: newStatus,
      trackingNumber: trackingInput
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#B68D40]" />
            Acquisitions & Orders Vault
          </h1>
          <p className="text-xs text-[#6A6158]">
            Manage white-glove transport, insurance clearances, and private client invoices
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-[#1F2328] text-white'
                  : 'bg-[#F8F5EF] text-[#6A6158] hover:bg-[#B68D40]/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#FFFDF8] p-4 rounded-[20px] border border-[#B68D40]/20 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order no, customer name or email..."
            className="w-full bg-[#F8F5EF] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
          />
        </div>

        <span className="text-xs text-[#6A6158] font-mono">
          Showing {filteredOrders.length} orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-[#FFFDF8] rounded-[24px] border border-[#B68D40]/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1F2328] text-[#D9C7AE] font-mono text-[10px] uppercase tracking-wider border-b border-[#B68D40]/20">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order No.</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Collector</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Total Valuation</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B68D40]/10 text-[#2B2622]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F8F5EF] transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#2B2622]">{ord.orderNumber}</td>
                  <td className="py-3 px-4 font-mono text-[#6A6158]">{ord.date}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold block text-[#2B2622]">{ord.customerName}</span>
                    <span className="text-[10px] text-[#6A6158]">{ord.customerEmail}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs">{ord.items.length} Artifact(s)</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#A76B3F] text-sm">
                    ${ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === 'Shipped' || ord.status === 'Delivered'
                          ? 'bg-[#2F855A]/15 text-[#2F855A]'
                          : ord.status === 'Pending'
                          ? 'bg-[#B68D40]/15 text-[#B68D40]'
                          : 'bg-[#2A3036]/10 text-[#2B2622]'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenDetail(ord)}
                      className="px-3 py-1.5 rounded-full bg-[#1F2328] text-[#B68D40] hover:bg-[#B68D40] hover:text-white transition-colors text-[11px] font-semibold"
                    >
                      Inspect Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Invoice Drawer Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFDF8] border border-[#B68D40]/30 rounded-[28px] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#B68D40]/20">
              <div>
                <span className="text-[10px] text-[#B68D40] font-mono uppercase tracking-widest block">
                  Private Acquisition Record
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#2B2622]">
                  {activeOrderModal.orderNumber}
                </h2>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="w-8 h-8 rounded-full bg-[#1F2328] text-white flex items-center justify-center hover:bg-[#B68D40]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-2 border-b border-[#B68D40]/15 pb-2">
              <button
                onClick={() => setShowInvoiceView(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  !showInvoiceView ? 'bg-[#1F2328] text-white' : 'text-[#6A6158]'
                }`}
              >
                Order Summary & Tracking
              </button>
              <button
                onClick={() => setShowInvoiceView(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  showInvoiceView ? 'bg-[#1F2328] text-white' : 'text-[#6A6158]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Private Invoice
              </button>
            </div>

            {!showInvoiceView ? (
              <div className="space-y-6">
                {/* Customer Details */}
                <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#B68D40]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-[#6A6158] font-bold uppercase block mb-1">Collector Info</span>
                    <p className="font-bold text-[#2B2622]">{activeOrderModal.customerName}</p>
                    <p className="text-[#6A6158]">{activeOrderModal.customerEmail}</p>
                    <p className="text-[#6A6158]">{activeOrderModal.customerPhone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6A6158] font-bold uppercase block mb-1">Delivery Address</span>
                    <p className="text-[#2B2622] leading-relaxed">{activeOrderModal.shippingAddress}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#2B2622] uppercase tracking-wider block">Acquired Artifacts</span>
                  {activeOrderModal.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F5EF] border border-[#B68D40]/15">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-xs text-[#2B2622]">{item.title}</p>
                          <p className="text-[10px] text-[#6A6158] font-mono">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#A76B3F] text-xs">${item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking & Status Actions */}
                <div className="p-4 rounded-2xl bg-[#1F2328] text-white space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B68D40] block">
                    Courier Dispatch & Status Management
                  </span>

                  <div className="space-y-2">
                    <label className="text-[10px] text-[#D9C7AE] uppercase font-mono">Tracking Number / Courier Code</label>
                    <input
                      type="text"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      placeholder="e.g. DHL-EXPRESS-992014812"
                      className="w-full bg-[#2A3036] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs text-[#D9C7AE] mr-2">Update Status:</span>
                    {['Pending', 'Processing', 'Shipped', 'Delivered'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st as Order['status'])}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                          activeOrderModal.status === st
                            ? 'bg-[#B68D40] text-white shadow-md'
                            : 'bg-[#2A3036] text-[#D9C7AE] hover:bg-[#B68D40]/20'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Printable Private Invoice */
              <div className="p-6 bg-[#F8F5EF] border border-[#B68D40]/30 rounded-2xl space-y-6 font-serif">
                <div className="flex items-center justify-between pb-4 border-b border-[#B68D40]/30">
                  <div>
                    <h3 className="text-xl font-bold italic text-[#2B2622]">HERITAGE ANTIQUES</h3>
                    <p className="text-[10px] font-sans font-mono text-[#6A6158]">Mayfair, London • Est. 1892</p>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <p className="font-bold text-[#B68D40]">INVOICE #{activeOrderModal.orderNumber}</p>
                    <p className="text-[#6A6158]">{activeOrderModal.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono text-[#6A6158] uppercase block">Billed To</span>
                    <p className="font-bold">{activeOrderModal.customerName}</p>
                    <p className="text-[#6A6158]">{activeOrderModal.shippingAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#6A6158] uppercase block">Payment Method</span>
                    <p className="font-bold text-[#2F855A]">Wire Transfer Verified</p>
                  </div>
                </div>

                <table className="w-full text-left text-xs font-sans border-t border-b border-[#B68D40]/20 py-2">
                  <thead>
                    <tr className="text-[#6A6158] font-mono text-[10px]">
                      <th className="py-2">Item Description</th>
                      <th className="py-2 text-right">Valuation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeOrderModal.items.map((it, i) => (
                      <tr key={i} className="border-t border-[#B68D40]/10">
                        <td className="py-2 font-bold">{it.title}</td>
                        <td className="py-2 text-right font-mono">${it.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center text-sm font-sans pt-2">
                  <span className="font-bold uppercase tracking-wider">Total Certified Valuation</span>
                  <span className="text-xl font-bold font-mono text-[#A76B3F]">${activeOrderModal.totalAmount.toLocaleString()}</span>
                </div>

                <div className="pt-4 text-center">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2 bg-[#1F2328] text-white text-xs font-sans uppercase font-bold tracking-widest rounded-full flex items-center gap-2 mx-auto hover:bg-[#B68D40]"
                  >
                    <Printer className="w-4 h-4" /> Print Certified Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
