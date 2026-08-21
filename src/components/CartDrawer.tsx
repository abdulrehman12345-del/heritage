import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artifact } from '../types';
import { X, Trash2, ShoppingBag, Plus, Minus, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export interface CartItem {
  artifact: Artifact;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (artifactId: string, delta: number) => void;
  onRemoveItem: (artifactId: string) => void;
  onCheckout: () => void;
  onSelectArtifact: (artifact: Artifact) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSelectArtifact
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.artifact.price * item.quantity, 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#121417]/80 backdrop-blur-sm"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="w-screen max-w-md bg-[#191D22] border-l border-[#B68D40]/30 shadow-2xl flex flex-col justify-between text-white"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#B68D40]/20 flex items-center justify-between bg-[#15181C]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B68D40]/20 border border-[#B68D40]/40 flex items-center justify-center text-[#FFE270]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-[#F8F5EF]">Shopping Cart</h3>
                  <p className="text-xs text-[#D9C7AE]/70 font-mono">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Items Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#22272E] border border-[#B68D40]/20 flex items-center justify-center text-[#B68D40] mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h4 className="font-serif-heading text-lg font-semibold text-[#F8F5EF] mb-1">Your Cart is Empty</h4>
                  <p className="text-xs text-[#D9C7AE]/60 max-w-xs mb-6">
                    Browse our antique collection and add items to your cart.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-white font-serif-heading text-xs uppercase tracking-wider font-semibold transition-all shadow-md cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map(({ artifact, quantity }) => (
                  <motion.div
                    key={artifact.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl bg-[#22272E] border border-[#B68D40]/25 flex gap-4 items-center relative group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        onClose();
                        onSelectArtifact(artifact);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#15181C] border border-[#B68D40]/30 shrink-0 cursor-pointer"
                    >
                      <img
                        src={artifact.image}
                        alt={artifact.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#FFE270] font-mono uppercase tracking-wider truncate">
                        {artifact.category}
                      </p>
                      <h5
                        onClick={() => {
                          onClose();
                          onSelectArtifact(artifact);
                        }}
                        className="font-serif-heading text-sm font-semibold text-[#F8F5EF] hover:text-[#FFE270] transition-colors truncate cursor-pointer"
                      >
                        {artifact.title}
                      </h5>
                      <p className="font-mono text-sm font-bold text-[#D9C7AE] mt-1">
                        ${(artifact.price * quantity).toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center rounded-lg bg-[#15181C] border border-[#B68D40]/30 overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(artifact.id, -1)}
                            className="p-1 hover:bg-[#B68D40]/20 text-[#D9C7AE] transition-colors cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-semibold text-white">{quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(artifact.id, 1)}
                            className="p-1 hover:bg-[#B68D40]/20 text-[#D9C7AE] transition-colors cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(artifact.id)}
                          className="text-[#D9C7AE]/50 hover:text-red-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-[#15181C] border-t border-[#B68D40]/20 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#D9C7AE]/70">
                    <span>Shipping:</span>
                    <span className="text-[#FFE270] font-semibold">Free Delivery ($0)</span>
                  </div>
                  <div className="flex justify-between text-[#D9C7AE]/70">
                    <span>Authenticity Certificate:</span>
                    <span className="text-[#FFE270] font-semibold">Included Free</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-white/10">
                    <span className="font-serif-heading text-sm text-[#F8F5EF]">Total Amount:</span>
                    <span className="font-mono text-xl font-bold text-[#FFE270]">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B68D40] via-[#C89D4B] to-[#966C2A] text-[#121417] font-serif-heading font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#D9C7AE]/50 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>100% Safe & Secure Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
