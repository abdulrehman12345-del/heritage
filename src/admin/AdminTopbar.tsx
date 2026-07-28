import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Calendar, 
  ExternalLink, 
  User, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { AdminUser, Order } from './types';

interface AdminTopbarProps {
  currentUser: AdminUser;
  onOpenQuickAddProduct: () => void;
  onExitAdmin: () => void;
  onSearchQuery: (query: string) => void;
  unreadInquiriesCount: number;
  recentOrdersCount: number;
}

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  currentUser,
  onOpenQuickAddProduct,
  onExitAdmin,
  onSearchQuery,
  unreadInquiriesCount,
  recentOrdersCount
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const todayDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearchQuery(e.target.value);
  };

  return (
    <header className="h-20 bg-[#F8F5EF]/90 backdrop-blur-md border-b border-[#B68D40]/20 sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
      {/* Search & Date */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search catalog, orders, SKU, provenance..."
            className="w-full bg-[#FFFDF8] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] placeholder-[#6A6158]/60 focus:outline-none focus:border-[#B68D40] shadow-inner transition-colors"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-[#6A6158] bg-[#FFFDF8] border border-[#B68D40]/20 px-3 py-2 rounded-full shrink-0">
          <Calendar className="w-3.5 h-3.5 text-[#B68D40]" />
          <span className="font-mono text-[11px]">{todayDate}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Product */}
        <button
          onClick={onOpenQuickAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-[#B68D40] hover:bg-[#A76B3F] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Product</span>
        </button>

        {/* View Live Store */}
        <button
          onClick={onExitAdmin}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-[#FFFDF8] hover:bg-[#2A3036] hover:text-white border border-[#B68D40]/30 text-[#2B2622] rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
          title="Open Public Website"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#B68D40]" />
          <span>Live Store</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-[#FFFDF8] border border-[#B68D40]/30 text-[#2B2622] flex items-center justify-center hover:border-[#B68D40] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-[#B68D40]" />
            {(unreadInquiriesCount > 0 || recentOrdersCount > 0) && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B83A3A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadInquiriesCount + recentOrdersCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-[#1F2328] text-white rounded-2xl border border-[#B68D40]/30 shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-[#B68D40]/20 mb-3">
                <span className="text-xs uppercase tracking-widest font-bold text-[#D9C7AE]">
                  Curator Dispatch
                </span>
                <span className="text-[10px] text-[#B68D40] font-mono">
                  {unreadInquiriesCount + recentOrdersCount} New
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {unreadInquiriesCount > 0 && (
                  <div className="p-2.5 rounded-xl bg-[#2A3036] border border-[#B68D40]/20 flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#B68D40] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-white">
                        {unreadInquiriesCount} Private Viewing Inquiry
                      </p>
                      <p className="text-[10px] text-[#D9C7AE]/70">
                        Collectors requesting private museum access.
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-2.5 rounded-xl bg-[#2A3036] border border-[#B68D40]/20 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F855A] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-white">
                      Vault Inventory Verified
                    </p>
                    <p className="text-[10px] text-[#D9C7AE]/70">
                      All 18 exhibits passed climate audit today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Curator Profile Widget */}
        <div className="flex items-center gap-3 pl-3 border-l border-[#B68D40]/20">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover border-2 border-[#B68D40]"
          />
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-bold text-[#2B2622]">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-[#6A6158] font-mono">
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
