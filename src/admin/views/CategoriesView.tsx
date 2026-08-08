import React, { useState } from 'react';
import { Tags, Plus, Edit3, Trash2, Eye, Check, Image as ImageIcon, Upload } from 'lucide-react';
import { CategoryCMS } from '../types';

interface CategoriesViewProps {
  categoriesList: CategoryCMS[];
  onAddCategory: (cat: CategoryCMS) => void;
  onUpdateCategory: (cat: CategoryCMS) => void;
  onDeleteCategory: (id: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categoriesList,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryCMS | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('Curated ancient artifacts preserved across centuries.');
    setImage('https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800');
    setSlug('');
    setIsModalOpen(true);
  };

  const openEditModal = (cat: CategoryCMS) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setImage(cat.image);
    setSlug(cat.slug);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!name) return;
    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategory) {
      onUpdateCategory({
        ...editingCategory,
        name: name as any,
        description,
        image,
        slug: generatedSlug
      });
    } else {
      onAddCategory({
        id: `cat-${Date.now()}`,
        name: name as any,
        description,
        image,
        slug: generatedSlug,
        itemCount: 0,
        status: 'Active'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Tags className="w-6 h-6 text-[#B68D40]" />
            Antique Classification Categories
          </h1>
          <p className="text-xs text-[#6A6158]">
            Structure catalog taxonomy across animal statues, bronzes, vases, metal sculptures, and copper relics.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#FFFDF8] rounded-[24px] border border-[#B68D40]/20 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-[#B68D40] transition-all"
          >
            <div>
              <div className="relative h-44 w-full bg-[#1F2328] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1F2328]/80 text-[#B68D40] text-[10px] font-mono font-bold border border-[#B68D40]/30">
                  {cat.itemCount} Items
                </span>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">{cat.name}</h3>
                  <span className="text-[10px] text-[#D9C7AE] font-mono">/{cat.slug}</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-[#6A6158] leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-[#B68D40]/15 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-[#2F855A]/15 text-[#2F855A] text-[10px] font-bold uppercase">
                {cat.status}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(cat)}
                  className="p-2 rounded-lg bg-[#F8F5EF] text-[#2B2622] hover:bg-[#B68D40] hover:text-white transition-colors"
                  title="Edit Category"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteCategory(cat.id)}
                  className="p-2 rounded-lg bg-[#F8F5EF] text-[#B83A3A] hover:bg-[#B83A3A] hover:text-white transition-colors"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] border border-[#B68D40]/30 rounded-[28px] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h2 className="font-serif text-xl font-bold text-[#2B2622]">
              {editingCategory ? 'Edit Classification Category' : 'Create Classification Category'}
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#2B2622]">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bronze Statues"
                  className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3 py-2 text-xs text-[#2B2622]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-[#2B2622] flex items-center justify-between">
                  <span>Category Image</span>
                  <span className="text-[9px] text-[#B68D40] font-normal normal-case">Select Image File</span>
                </label>

                <div className="flex items-center gap-3 p-3 bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl">
                  {image ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#B68D40]/40 shrink-0 bg-black/10">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg border border-dashed border-[#B68D40]/40 flex flex-col items-center justify-center text-[#B68D40] bg-white shrink-0">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-[8px] mt-0.5">No File</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-1.5">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors shadow-xs w-full text-center">
                      <Upload className="w-4 h-4" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                setImage(event.target.result as string);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <div className="text-[9px] text-[#6A6158]">
                      Pick any image file from your computer (PNG, JPG, WEBP).
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#2B2622]">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="bronze-statues"
                  className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3 py-2 text-xs text-[#2B2622] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-[#2B2622]">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-xs text-[#2B2622]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B68D40]/20">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-full border border-[#B68D40]/30 text-xs text-[#6A6158]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
