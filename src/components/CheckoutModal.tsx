import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact } from '../types';
import { Order, DiscountCode, Customer } from '../admin/types';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Truck, 
  Lock, 
  CheckCircle2, 
  Tag, 
  ArrowRight, 
  FileText,
  Clock,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: { artifact: Artifact; quantity: number }[];
  customerUser: Customer | any | null;
  discounts: DiscountCode[];
  onOrderPlaced: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  customerUser,
  discounts,
  onOrderPlaced,
  onClearCart
}) => {
  if (!isOpen || items.length === 0) return null;

  // Form State
  const [fullName, setFullName] = useState(customerUser?.fullName || '');
  const [email, setEmail] = useState(customerUser?.email || '');
  const [phone, setPhone] = useState(customerUser?.phone || '');
  const [address, setAddress] = useState(customerUser?.address || '');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'cod'>('card');
  const [notes, setNotes] = useState('');

  // Card details (simulated)
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [promoError, setPromoError] = useState('');

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + i.artifact.price * i.quantity, 0);
  
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = (subtotal * appliedDiscount.value) / 100;
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoCode.trim()) return;
    
    const code = promoCode.trim().toUpperCase();
    const found = discounts.find(d => d.code.toUpperCase() === code && d.status === 'Active');
    
    if (found) {
      if (found.minOrder && subtotal < found.minOrder) {
        setPromoError(`Requires minimum order of $${found.minOrder.toLocaleString()}`);
        return;
      }
      setAppliedDiscount(found);
    } else if (code === 'HERITAGE10' || code === 'VIP10') {
      setAppliedDiscount({
        id: 'disc-vip',
        code: code,
        type: 'percentage',
        value: 10,
        status: 'Active',
        usedCount: 1,
        expiresAt: '2027-12-31'
      });
    } else {
      setPromoError('Invalid or expired certificate discount code');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) {
      alert('Please fill out all required shipping and contact fields.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `ord-${Date.now()}`;
      const orderNumber = `HA-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `MUSEUM-TRACK-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newOrder: Order = {
        id: orderId,
        orderNumber,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone || '+1 (555) 019-2834',
        shippingAddress: `${address}, ${city} ${postalCode}, ${country}`,
        items: items.map(i => ({
          artifactId: i.artifact.id,
          title: i.artifact.title,
          price: i.artifact.price,
          quantity: i.quantity,
          image: i.artifact.image
        })),
        totalAmount: finalTotal,
        status: 'Processing',
        paymentStatus: paymentMethod === 'card' ? 'Paid' : 'Pending Verification',
        trackingNumber,
        date: new Date().toISOString(),
        notes: notes ? `${notes} (Payment Method: ${paymentMethod.toUpperCase()})` : `Payment Method: ${paymentMethod.toUpperCase()}`
      };

      onOrderPlaced(newOrder);
      onClearCart();
      setIsProcessing(false);
      setCompletedOrder(newOrder);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isProcessing) onClose();
          }}
          className="fixed inset-0 bg-[#121417]/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl bg-[#191D22] text-white rounded-[28px] border border-[#B68D40]/40 shadow-2xl overflow-hidden my-6 z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#15181C] border-b border-[#B68D40]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#B68D40]/20 flex items-center justify-center text-[#FFE270] border border-[#B68D40]/40">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#FFE270] font-mono uppercase tracking-widest">Safe & Secure Checkout</p>
                <p className="text-xs font-semibold text-[#F8F5EF]">Complete Your Order</p>
              </div>
            </div>

            {!completedOrder && (
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 overflow-y-auto">
            {completedOrder ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6 max-w-lg mx-auto"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-widest">
                    Order Successful
                  </span>
                  <h3 className="font-serif-heading text-2xl md:text-3xl font-bold text-[#F8F5EF] mt-2">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-xs text-[#D9C7AE]/70 mt-1 max-w-md mx-auto">
                    Your order has been received and confirmed. We are packing your item with care and full insurance.
                  </p>
                </div>

                {/* Order Summary Receipt Box */}
                <div className="p-5 rounded-2xl bg-[#15181C] border border-[#B68D40]/30 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#D9C7AE]/60">Order ID:</span>
                    <span className="font-bold text-[#FFE270]">{completedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#D9C7AE]/60">Tracking Number:</span>
                    <span className="text-emerald-400">{completedOrder.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#D9C7AE]/60">Customer Name:</span>
                    <span className="text-white">{completedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-[#D9C7AE]/60">Shipping Address:</span>
                    <span className="text-white text-right max-w-[200px] truncate">{completedOrder.shippingAddress}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-bold">
                    <span className="text-[#FFE270]">Total Paid:</span>
                    <span className="text-[#FFE270]">${completedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-white font-serif-heading font-semibold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Side: Shipping & Payment (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Step 1: Customer & Delivery */}
                  <div>
                    <h4 className="font-serif-heading font-semibold text-sm text-[#FFE270] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>1. Shipping & Contact Details</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 234 567 8900"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">Country *</label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="United States, UK, Pakistan, etc."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#D9C7AE]/70 mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House / Apartment / Street Address"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#D9C7AE]/70 mb-1">Postal / ZIP Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="Postal code"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-white placeholder-[#8C8275] focus:outline-none focus:border-[#FFE270]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Payment Method */}
                  <div>
                    <h4 className="font-serif-heading font-semibold text-sm text-[#FFE270] uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      <span>2. Payment Method</span>
                    </h4>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'bg-[#B68D40]/20 border-[#FFE270] text-[#FFE270]'
                            : 'bg-[#15181C] border-[#B68D40]/30 text-[#D9C7AE]/70 hover:border-[#B68D40]'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-[11px] font-semibold block">Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wire')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'wire'
                            ? 'bg-[#B68D40]/20 border-[#FFE270] text-[#FFE270]'
                            : 'bg-[#15181C] border-[#B68D40]/30 text-[#D9C7AE]/70 hover:border-[#B68D40]'
                        }`}
                      >
                        <Building2 className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-[11px] font-semibold block">Bank Transfer</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'bg-[#B68D40]/20 border-[#FFE270] text-[#FFE270]'
                            : 'bg-[#15181C] border-[#B68D40]/30 text-[#D9C7AE]/70 hover:border-[#B68D40]'
                        }`}
                      >
                        <Truck className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-[11px] font-semibold block">Cash on Delivery</span>
                      </button>
                    </div>

                    {/* Dynamic Method Form */}
                    {paymentMethod === 'card' && (
                      <div className="p-4 rounded-xl bg-[#15181C] border border-[#B68D40]/30 space-y-3 text-xs">
                        <div>
                          <label className="block text-[#D9C7AE]/70 mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            className="w-full px-3 py-2 rounded-lg bg-[#22272E] border border-[#B68D40]/30 text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#D9C7AE]/70 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="12/28"
                              className="w-full px-3 py-2 rounded-lg bg-[#22272E] border border-[#B68D40]/30 text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[#D9C7AE]/70 mb-1">Security Code (CVC)</label>
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="123"
                              className="w-full px-3 py-2 rounded-lg bg-[#22272E] border border-[#B68D40]/30 text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'wire' && (
                      <div className="p-4 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-xs text-[#D9C7AE]/80 space-y-2">
                        <p className="font-semibold text-[#FFE270]">Bank Account Details:</p>
                        <p className="font-mono text-[11px]">Bank: Heritage Antiquities Trust Bank</p>
                        <p className="font-mono text-[11px]">Account Number / IBAN: US89 3704 0044 0532 0130 00</p>
                        <p className="text-[10px] text-[#D9C7AE]/60">
                          Complete bank transfer instructions will also be emailed to you after placing the order.
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="p-4 rounded-xl bg-[#15181C] border border-[#B68D40]/30 text-xs text-[#D9C7AE]/80">
                        <p className="font-semibold text-[#FFE270] mb-1">Cash / Payment on Delivery:</p>
                        <p className="text-[11px] leading-relaxed">
                          Pay directly to our delivery courier when the item arrives at your doorstep.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Order Summary & Review (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="p-5 rounded-2xl bg-[#15181C] border border-[#B68D40]/30 space-y-4">
                    <h4 className="font-serif-heading font-semibold text-sm text-[#F8F5EF] flex items-center justify-between">
                      <span>Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                      <ShoppingBag className="w-4 h-4 text-[#FFE270]" />
                    </h4>

                    {/* Selected Item List */}
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {items.map(({ artifact, quantity }) => (
                        <div key={artifact.id} className="flex items-center gap-3 text-xs border-b border-white/5 pb-2.5">
                          <img
                            src={artifact.image}
                            alt={artifact.title}
                            className="w-12 h-12 rounded-lg object-cover bg-[#22272E] shrink-0 border border-[#B68D40]/30"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{artifact.title}</p>
                            <p className="text-[10px] text-[#D9C7AE]/60 font-mono">Qty: {quantity} • {artifact.certificateNumber}</p>
                          </div>
                          <span className="font-mono font-semibold text-[#FFE270] shrink-0">
                            ${(artifact.price * quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Voucher Code */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (e.g. HERITAGE10)"
                          className="flex-1 px-3 py-2 rounded-lg bg-[#22272E] border border-[#B68D40]/30 text-white text-xs font-mono placeholder-[#8C8275] uppercase focus:outline-none focus:border-[#FFE270]"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-2 rounded-lg bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-semibold font-serif-heading tracking-wider transition-colors cursor-pointer shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedDiscount && (
                        <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Discount code '{appliedDiscount.code}' applied (-${discountAmount.toLocaleString()})</span>
                        </p>
                      )}
                      {promoError && (
                        <p className="text-[11px] text-rose-400 mt-1">{promoError}</p>
                      )}
                    </div>

                    {/* Cost Breakdown */}
                    <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-[#D9C7AE]/80">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-mono">${subtotal.toLocaleString()}</span>
                      </div>
                      {appliedDiscount && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Discount:</span>
                          <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span className="text-[#FFE270] font-semibold">Free ($0)</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-3 border-t border-white/15 text-sm font-bold text-white">
                        <span className="font-serif-heading">Total Amount:</span>
                        <span className="font-mono text-xl text-[#FFE270]">${finalTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#B68D40] via-[#C89D4B] to-[#966C2A] text-[#121417] font-serif-heading font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Processing Order...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order • ${finalTotal.toLocaleString()}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#D9C7AE]/50 font-mono">
                    Includes 30-day money back guarantee and original certificate of authenticity.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
