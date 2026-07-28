import React from 'react';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Award, Percent } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export const AnalyticsView: React.FC = () => {
  const salesHistory = [
    { month: 'Jan', revenue: 35000, orders: 6, avgValue: 5833 },
    { month: 'Feb', revenue: 42000, orders: 8, avgValue: 5250 },
    { month: 'Mar', revenue: 68000, orders: 12, avgValue: 5666 },
    { month: 'Apr', revenue: 54000, orders: 9, avgValue: 6000 },
    { month: 'May', revenue: 89000, orders: 15, avgValue: 5933 },
    { month: 'Jun', revenue: 112000, orders: 19, avgValue: 5894 },
    { month: 'Jul', revenue: 148500, orders: 24, avgValue: 6187 },
  ];

  const categoryRevenue = [
    { name: 'Bronze Statues', total: 68000 },
    { name: 'Antique Vases', total: 42500 },
    { name: 'Animal Statues', total: 26000 },
    { name: 'Copper Artifacts', total: 12000 },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Month,Revenue,Orders\n" + 
      salesHistory.map(e => `${e.month},${e.revenue},${e.orders}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "heritage_analytics_report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#B68D40]" />
            Valuation & Acquisition Intelligence
          </h1>
          <p className="text-xs text-[#6A6158]">
            Market growth, average order value, category demand, and valuation trajectory
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1F2328] hover:bg-[#B68D40] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV Executive Report</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm">
          <span className="text-[10px] text-[#6A6158] uppercase font-semibold">Total Revenue (2026)</span>
          <div className="text-2xl font-serif font-bold text-[#A76B3F] mt-1">$548,500</div>
          <p className="text-[10px] text-[#2F855A] mt-1">+24.8% vs previous period</p>
        </div>

        <div className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm">
          <span className="text-[10px] text-[#6A6158] uppercase font-semibold">Average Order Valuation</span>
          <div className="text-2xl font-serif font-bold text-[#2B2622] mt-1">$5,897</div>
          <p className="text-[10px] text-[#B68D40] mt-1">High-end private transactions</p>
        </div>

        <div className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm">
          <span className="text-[10px] text-[#6A6158] uppercase font-semibold">Private Inquiries Conversion</span>
          <div className="text-2xl font-serif font-bold text-[#2B2622] mt-1">68.4%</div>
          <p className="text-[10px] text-[#2F855A] mt-1">High private viewing conversion</p>
        </div>

        <div className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 shadow-sm">
          <span className="text-[10px] text-[#6A6158] uppercase font-semibold">Repeat Collector Rate</span>
          <div className="text-2xl font-serif font-bold text-[#2B2622] mt-1">82.1%</div>
          <p className="text-[10px] text-[#B68D40] mt-1">Royal & Museum Trust Patrons</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#2B2622] mb-1">Monthly Valuation Growth ($)</h2>
          <p className="text-xs text-[#6A6158] mb-6">Aggregate transaction velocity across all catalog categories</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistory}>
                <XAxis dataKey="month" stroke="#6A6158" fontSize={11} />
                <YAxis stroke="#6A6158" fontSize={11} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2328', color: '#fff', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#B68D40" fill="#B68D40" fillOpacity={0.2} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm">
          <h2 className="font-serif text-lg font-bold text-[#2B2622] mb-1">Revenue by Antique Category ($)</h2>
          <p className="text-xs text-[#6A6158] mb-6">Valuation contribution by historical material class</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRevenue}>
                <XAxis dataKey="name" stroke="#6A6158" fontSize={11} />
                <YAxis stroke="#6A6158" fontSize={11} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2328', color: '#fff', borderRadius: '12px' }} />
                <Bar dataKey="total" fill="#A76B3F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
