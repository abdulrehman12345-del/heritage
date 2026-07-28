import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingBag, 
  Users, 
  Star, 
  Boxes, 
  BarChart3, 
  Image as ImageIcon, 
  Percent, 
  Globe, 
  Settings, 
  ShieldCheck, 
  MessageSquare, 
  User, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { AdminTab } from './types';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadInquiriesCount: number;
  onExitAdmin: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  unreadInquiriesCount,
  onExitAdmin
}) => {
  const menuItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'discounts', label: 'Discounts', icon: Percent },
    { id: 'homepage', label: 'Homepage CMS', icon: Globe },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadInquiriesCount },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'admins', label: 'Admins', icon: ShieldCheck },
    { id: 'profile', label: 'Curator Profile', icon: User },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#1F2328] text-white flex flex-col border-r border-[#B68D40]/20 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header Logo & Collapse Toggle */}
      <div className="h-20 px-4 flex items-center justify-between border-b border-[#B68D40]/15">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-[#B68D40] rounded-sm relative bg-[#2A3036]/80">
            <div className="absolute -inset-1 border border-[#B68D40] opacity-30"></div>
            <span className="font-serif italic text-[#B68D40] text-xl font-bold">H</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm font-bold tracking-widest uppercase text-white truncate">
                Heritage
              </span>
              <span className="text-[10px] text-[#B68D40] tracking-widest uppercase font-mono truncate">
                Curator CMS
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 rounded-full bg-[#2A3036] border border-[#B68D40]/30 hover:border-[#B68D40] text-[#D9C7AE] flex items-center justify-center transition-colors shrink-0"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Menu Links */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all relative group ${
                isActive
                  ? 'bg-[#B68D40] text-white font-bold shadow-md shadow-[#B68D40]/20'
                  : 'text-[#D9C7AE]/80 hover:text-white hover:bg-[#2A3036]'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {/* Active Left Indicator Bar when inactive hover or active */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-white rounded-r-full" />
              )}

              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#B68D40] group-hover:scale-110 transition-transform'}`} />

              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {/* Badge for notifications like unread messages */}
              {item.badge && item.badge > 0 ? (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-white text-[#1F2328]' : 'bg-[#B68D40] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Footer Exit & Quick View Shop */}
      <div className="p-3 border-t border-[#B68D40]/15 bg-[#181B1F]">
        <button
          onClick={onExitAdmin}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#2A3036] hover:bg-[#A76B3F] text-white text-xs uppercase tracking-wider font-semibold border border-[#B68D40]/30 transition-all group"
          title="Return to Public Website"
        >
          <LogOut className="w-4 h-4 text-[#B68D40] group-hover:text-white transition-colors" />
          {!collapsed && <span className="truncate">Exit to Website</span>}
        </button>
      </div>
    </aside>
  );
};
