import React from 'react';
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  Eye, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Artifact } from '../../types';
import { Order, Customer } from '../types';

interface DashboardHomeViewProps {
  artifacts: Artifact[];
  orders: Order[];
  customers: Customer[];
  onNavigateTab: (tab: any) => void;
  onSelectOrder: (order: Order) => void;
  onSelectArtifact: (artifact: Artifact) => void;
}

export const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({
  artifacts,
  orders,
  customers,
  onNavigateTab,
  onSelectOrder,
  onSelectArtifact
}) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const lowStockCount = artifacts.filter((a) => (a as any).stock ? (a as any).stock <= 2 : false).length;

  // Chart data
  const revenueChartData = [
    { month: 'Feb', revenue: 42000, orders: 8 },
    { month: 'Mar', revenue: 68000, orders: 12 },
    { month: 'Apr', revenue: 54000, orders: 9 },
    { month: 'May', revenue: 89000, orders: 15 },
    { month: 'Jun', revenue: 112000, orders: 19 },
    { month: 'Jul', revenue: 148500, orders: 24 },
  ];

  const categoryDistributionData = [
    { name: 'Bronze Statues', value: 38, color: '#B68D40' },
    { name: 'Antique Vases', value: 28, color: '#A76B3F' },
    { name: 'Animal Statues', value: 18, color: '#2B2622' },
    { name: 'Metal Sculptures', value: 16, color: '#6A6158' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[#1F2328] text-white p-8 rounded-[26px] border border-[#B68D40]/25 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#B68D40]/10 to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-[#B68D40] text-xs font-bold tracking-widest uppercase font-mono">
            <Sparkles className="w-4 h-4" />
            <span>Museum Intelligence Executive Overview</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl italic font-light text-white">
            Heritage Vault & CMS <span className="not-italic font-normal text-[#B68D40]">Console</span>
          </h1>
          <p className="text-xs text-[#D9C7AE]/80 max-w-xl leading-relaxed font-light">
            Managing global acquisitions, private collector consultations, and museum provenance verifications.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => onNavigateTab('products')}
            className="px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all shadow-lg"
          >
            Manage Catalog
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-5 py-2.5 bg-[#2A3036] hover:bg-[#B68D40]/20 text-[#D9C7AE] border border-[#B68D40]/30 text-xs uppercase tracking-widest font-bold rounded-full transition-all"
          >
            Dispatch Orders
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">Total Catalog</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B68D40] group-hover:scale-110 transition-transform">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2B2622]">{artifacts.length}</div>
          <p className="text-[10px] text-[#2F855A] flex items-center gap-1 mt-1 font-mono">
            <ArrowUpRight className="w-3 h-3" /> +12% this month
          </p>
        </div>

        {/* Total Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">Acquisition Orders</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B68D40] group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2B2622]">{orders.length}</div>
          <p className="text-[10px] text-[#2F855A] flex items-center gap-1 mt-1 font-mono">
            <ArrowUpRight className="w-3 h-3" /> +18.4% growth
          </p>
        </div>

        {/* Revenue */}
        <div 
          onClick={() => onNavigateTab('analytics')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">Total Revenue</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B68D40] group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-serif font-bold text-[#A76B3F]">${totalRevenue.toLocaleString()}</div>
          <p className="text-[10px] text-[#2F855A] flex items-center gap-1 mt-1 font-mono">
            <TrendingUp className="w-3 h-3" /> All verified paid
          </p>
        </div>

        {/* Collectors */}
        <div 
          onClick={() => onNavigateTab('customers')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">VIP Collectors</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B68D40] group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2B2622]">{customers.length}</div>
          <p className="text-[10px] text-[#B68D40] mt-1 font-mono">100% Verified VIPs</p>
        </div>

        {/* Pending Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">Pending Clearances</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B68D40] group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#2B2622]">{pendingOrdersCount}</div>
          <p className="text-[10px] text-[#A76B3F] mt-1 font-mono">Awaiting dispatch</p>
        </div>

        {/* Low Stock */}
        <div 
          onClick={() => onNavigateTab('inventory')}
          className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-[#6A6158] uppercase tracking-wider font-semibold">Low Vault Stock</span>
            <div className="w-8 h-8 rounded-full bg-[#1F2328] flex items-center justify-center text-[#B83A3A] group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-[#B83A3A]">{lowStockCount || 3}</div>
          <p className="text-[10px] text-[#B83A3A] mt-1 font-mono">Unique single pieces</p>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2B2622]">Acquisition Revenue Velocity</h2>
              <p className="text-xs text-[#6A6158]">Monthly valuation growth and private sale volume ($)</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#B68D40] bg-[#1F2328] text-white px-3 py-1 rounded-full">
              H1 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B68D40" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B68D40" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#6A6158" fontSize={11} tickLine={false} />
                <YAxis stroke="#6A6158" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2328', borderColor: '#B68D40', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#B68D40" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2B2622] mb-1">Catalog Category Shares</h2>
            <p className="text-xs text-[#6A6158] mb-4">Collector demand across antique classification</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2328', borderColor: '#B68D40', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#B68D40]/15">
            {categoryDistributionData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[#2B2622]">{cat.name}</span>
                </div>
                <span className="font-mono font-bold text-[#6A6158]">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Orders & Best Selling Artifacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2B2622]">Recent Private Orders</h2>
              <p className="text-xs text-[#6A6158]">Latest museum-grade acquisitions</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-[#B68D40] hover:text-[#A76B3F] uppercase tracking-wider"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#B68D40]/15 text-[#6A6158] uppercase font-mono text-[10px]">
                  <th className="py-2.5 font-semibold">Order</th>
                  <th className="py-2.5 font-semibold">Collector</th>
                  <th className="py-2.5 font-semibold">Valuation</th>
                  <th className="py-2.5 font-semibold">Status</th>
                  <th className="py-2.5 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#B68D40]/10">
                {orders.slice(0, 4).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F8F5EF] transition-colors">
                    <td className="py-3 font-mono text-[#2B2622] font-medium">{ord.orderNumber}</td>
                    <td className="py-3 text-[#2B2622]">{ord.customerName}</td>
                    <td className="py-3 font-mono font-bold text-[#A76B3F]">${ord.totalAmount.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          ord.status === 'Shipped'
                            ? 'bg-[#2F855A]/15 text-[#2F855A]'
                            : ord.status === 'Pending'
                            ? 'bg-[#B68D40]/15 text-[#B68D40]'
                            : 'bg-[#2A3036]/10 text-[#2B2622]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onSelectOrder(ord)}
                        className="w-7 h-7 rounded-full bg-[#1F2328] text-[#B68D40] hover:bg-[#B68D40] hover:text-white inline-flex items-center justify-center transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Best Sellers */}
        <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2B2622]">Featured Masterpieces</h2>
              <p className="text-xs text-[#6A6158]">Highest inquiries and valuation items</p>
            </div>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-bold text-[#B68D40] hover:text-[#A76B3F] uppercase tracking-wider"
            >
              Catalog
            </button>
          </div>

          <div className="space-y-3">
            {artifacts.slice(0, 4).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArtifact(art)}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F5EF] border border-[#B68D40]/15 hover:border-[#B68D40] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-12 h-12 rounded-xl object-cover border border-[#B68D40]/20"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-xs text-[#2B2622] group-hover:text-[#B68D40] transition-colors line-clamp-1">
                      {art.title}
                    </h3>
                    <p className="text-[10px] text-[#6A6158] font-mono">
                      {art.category} • {art.periodYear}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#A76B3F] block">{art.priceFormatted}</span>
                  <span className="text-[9px] text-[#2F855A] font-medium flex items-center justify-end gap-0.5">
                    <CheckCircle className="w-2.5 h-2.5" /> Authenticated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
