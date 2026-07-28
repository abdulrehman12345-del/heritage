import React, { useState } from 'react';
import { Percent, Plus, Tag, Calendar, Check, Trash2 } from 'lucide-react';
import { DiscountCode } from '../types';

interface DiscountsViewProps {
  discounts: DiscountCode[];
  onAddDiscount: (disc: DiscountCode) => void;
  onDeleteDiscount: (id: string) => void;
}

export const DiscountsView: React.FC<DiscountsViewProps> = ({
  discounts,
  onAddDiscount,
  onDeleteDiscount
}) => {
  const [code, setCode] = useState('');
  const [value, setValue] = useState(10);
  const [minPurchase, setMinPurchase] = useState(10000);

  const handleCreate = () => {
    if (!code) return;
    const newDisc: DiscountCode = {
      id: `disc-${Date.now()}`,
      code: code.toUpperCase(),
      discountType: 'Percentage',
      value: Number(value),
      minPurchase: Number(minPurchase),
      usageLimit: 20,
      timesUsed: 0,
      validUntil: '2026-12-31',
      status: 'Active'
    };
    onAddDiscount(newDisc);
    setCode('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Percent className="w-6 h-6 text-[#B68D40]" />
            Private Sale & Patron Discounts
          </h1>
          <p className="text-xs text-[#6A6158]">
            Exclusive access promo codes for private auctions and royal patron events
          </p>
        </div>
      </div>

      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 space-y-4">
        <h3 className="font-serif font-bold text-sm text-[#2B2622] uppercase tracking-wider">Generate New Patron Pass</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. MAYFAIR15"
            className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#2B2622] uppercase"
          />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder="Discount %"
            className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs font-mono text-[#2B2622]"
          />
          <input
            type="number"
            value={minPurchase}
            onChange={(e) => setMinPurchase(Number(e.target.value))}
            placeholder="Min Valuation ($)"
            className="bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs font-mono text-[#2B2622]"
          />
          <button
            onClick={handleCreate}
            className="px-5 py-2 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
          >
            Create Discount
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discounts.map((d) => (
          <div key={d.id} className="bg-[#FFFDF8] p-5 rounded-[20px] border border-[#B68D40]/20 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-base text-[#B68D40] bg-[#1F2328] px-3 py-1 rounded-lg">
                {d.code}
              </span>
              <button
                onClick={() => onDeleteDiscount(d.id)}
                className="text-[#B83A3A] hover:text-black"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#6A6158] space-y-1 font-mono">
              <p>Discount Rate: <span className="font-bold text-[#2B2622]">{d.value}% Off</span></p>
              <p>Min Purchase: <span className="font-bold text-[#2B2622]">${d.minPurchase?.toLocaleString()}</span></p>
              <p>Times Claimed: <span className="font-bold text-[#2B2622]">{d.timesUsed} / {d.usageLimit}</span></p>
              <p>Valid Until: <span className="font-bold text-[#2B2622]">{d.validUntil}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
