import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle2, Search, Plus, Minus, Shield } from 'lucide-react';
import { Artifact } from '../../types';

interface InventoryViewProps {
  artifacts: Artifact[];
  onUpdateStock: (artifactId: string, newStock: number) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ artifacts, onUpdateStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockMap, setStockMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    artifacts.forEach((a, idx) => {
      initial[a.id] = idx === 1 ? 1 : idx === 3 ? 1 : 2;
    });
    return initial;
  });

  const handleAdjust = (id: string, delta: number) => {
    const current = stockMap[id] ?? 1;
    const updated = Math.max(0, current + delta);
    setStockMap({ ...stockMap, [id]: updated });
    onUpdateStock(id, updated);
  };

  const filtered = artifacts.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[#B68D40]" />
            Mayfair Vault & Security Inventory
          </h1>
          <p className="text-xs text-[#6A6158]">
            Climate-controlled vault storage monitoring and single-piece availability
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search vault inventory by title or certificate..."
            className="w-full bg-[#F8F5EF] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
          />
        </div>
      </div>

      <div className="bg-[#FFFDF8] rounded-[24px] border border-[#B68D40]/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1F2328] text-[#D9C7AE] font-mono text-[10px] uppercase tracking-wider border-b border-[#B68D40]/20">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Artifact</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Vault Location</th>
                <th className="py-3.5 px-4 font-semibold">Climate Audit</th>
                <th className="py-3.5 px-4 font-semibold text-center">Available Stock</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B68D40]/10 text-[#2B2622]">
              {filtered.map((item, idx) => {
                const stock = stockMap[item.id] ?? 1;
                const vaultLoc = `Vault Tier-${(idx % 3) + 1} / Bay-0${idx + 1}`;

                return (
                  <tr key={item.id} className="hover:bg-[#F8F5EF] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-serif font-bold text-xs text-[#2B2622]">{item.title}</p>
                          <p className="text-[10px] font-mono text-[#B68D40]">{item.certificateNumber}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[#6A6158] font-medium">{item.category}</td>

                    <td className="py-3 px-4 font-mono text-xs text-[#2B2622] flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#B68D40]" />
                      {vaultLoc}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-[#2F855A] bg-[#2F855A]/15 px-2.5 py-1 rounded-full uppercase flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> 21°C / 45% Humidity
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-sm px-3 py-1 rounded-full ${
                          stock <= 1 ? 'bg-[#B83A3A]/15 text-[#B83A3A]' : 'bg-[#2F855A]/15 text-[#2F855A]'
                        }`}
                      >
                        {stock} {stock === 1 ? 'Unique Piece' : 'Items'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleAdjust(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-[#F8F5EF] hover:bg-[#B83A3A] hover:text-white text-[#2B2622] flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleAdjust(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-[#F8F5EF] hover:bg-[#2F855A] hover:text-white text-[#2B2622] flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
