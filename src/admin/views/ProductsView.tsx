import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Copy, 
  Archive, 
  Eye, 
  Filter, 
  Check, 
  X, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Tag, 
  Globe, 
  DollarSign, 
  Layers,
  Star
} from 'lucide-react';
import { Artifact, CategoryType } from '../../types';

interface ProductsViewProps {
  artifacts: Artifact[];
  categories: CategoryType[];
  onAddArtifact: (newArtifact: Artifact) => void;
  onUpdateArtifact: (updatedArtifact: Artifact) => void;
  onDeleteArtifact: (id: string) => void;
  onSelectArtifactToPreview: (artifact: Artifact) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  artifacts,
  categories,
  onAddArtifact,
  onUpdateArtifact,
  onDeleteArtifact,
  onSelectArtifactToPreview
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtifact, setEditingArtifact] = useState<Artifact | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Animal Statues' as CategoryType,
    era: '',
    origin: '',
    periodYear: '',
    price: 15000,
    priceFormatted: '$15,000',
    salePrice: '',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
    secondaryImages: ['https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800'],
    dimensions: '35cm x 22cm x 18cm',
    weight: '4.8 kg',
    material: 'Bronze & Gold Gilding',
    condition: 'Museum Restored',
    certificateNumber: 'HA-CERT-2026-99',
    description: '',
    shortDescription: '',
    curatorNotes: '',
    sku: 'SKU-ANT-001',
    stockQuantity: 1,
    featured: false,
    status: 'Published' as 'Published' | 'Draft' | 'Archived',
    tags: 'ancient, bronze, museum',
    slug: '',
    seoTitle: '',
    seoDescription: '',
    provenanceYear1: '1920',
    provenanceEvent1: 'Acquired in Paris Salon',
    provenanceLocation1: 'Paris, France'
  });

  const filteredArtifacts = artifacts.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setEditingArtifact(null);
    setFormData({
      id: `art-${Date.now()}`,
      title: '',
      category: 'Animal Statues',
      era: 'Ming Dynasty',
      origin: 'China',
      periodYear: 'c. 15th Century',
      price: 22000,
      priceFormatted: '$22,000',
      salePrice: '$19,500',
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800',
      secondaryImages: [
        'https://images.unsplash.com/photo-1561839561-b13bcfe95249?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
      ],
      dimensions: '40cm x 25cm x 20cm',
      weight: '6.2 kg',
      material: 'Gilded Bronze',
      condition: 'Excellent Historical State',
      certificateNumber: `HA-CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
      description: 'A masterpiece from the collection, exhibiting refined craftsmanship and pristine patina.',
      shortDescription: 'Museum-grade bronze artifact with complete authentication documents.',
      curatorNotes: 'Verified carbon dating and metal alloy spectrum analysis available.',
      sku: `SKU-HA-${Math.floor(1000 + Math.random() * 9000)}`,
      stockQuantity: 1,
      featured: true,
      status: 'Published',
      tags: 'imperial, bronze, china',
      slug: 'imperial-bronze-statue',
      seoTitle: 'Imperial Bronze Statue | Heritage Antiques',
      seoDescription: 'Authenticated Ming dynasty bronze statue with certified museum provenance.',
      provenanceYear1: '1908',
      provenanceEvent1: 'Catalogued in Mayfair Private Sale',
      provenanceLocation1: 'London, UK'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (artifact: Artifact) => {
    setEditingArtifact(artifact);
    setFormData({
      id: artifact.id,
      title: artifact.title,
      category: artifact.category,
      era: artifact.era,
      origin: artifact.origin,
      periodYear: artifact.periodYear,
      price: artifact.price,
      priceFormatted: artifact.priceFormatted,
      salePrice: '',
      image: artifact.image,
      secondaryImages: artifact.secondaryImages || [],
      dimensions: artifact.dimensions,
      weight: artifact.weight,
      material: artifact.material,
      condition: artifact.condition,
      certificateNumber: artifact.certificateNumber,
      description: artifact.description,
      shortDescription: artifact.curatorNotes.slice(0, 80),
      curatorNotes: artifact.curatorNotes,
      sku: `SKU-${artifact.id.toUpperCase()}`,
      stockQuantity: 1,
      featured: artifact.featured || false,
      status: 'Published',
      tags: `${artifact.category.toLowerCase()}, ${artifact.origin.toLowerCase()}`,
      slug: artifact.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      seoTitle: `${artifact.title} | Heritage Antiques`,
      seoDescription: artifact.description.slice(0, 120),
      provenanceYear1: artifact.provenance[0]?.year || '1920',
      provenanceEvent1: artifact.provenance[0]?.event || 'Private Collection Acquisition',
      provenanceLocation1: artifact.provenance[0]?.location || 'Europe'
    });
    setIsModalOpen(true);
  };

  const handleDuplicate = (artifact: Artifact) => {
    const duplicated: Artifact = {
      ...artifact,
      id: `art-${Date.now()}`,
      title: `${artifact.title} (Copy)`,
      certificateNumber: `HA-CERT-COPY-${Math.floor(100 + Math.random() * 900)}`
    };
    onAddArtifact(duplicated);
  };

  const handleSaveForm = (statusAction: 'Published' | 'Draft' | 'Archived') => {
    if (!formData.title) return;

    const formattedPrice = `$${Number(formData.price).toLocaleString()}`;

    const artifactObject: Artifact = {
      id: formData.id || `art-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      era: formData.era || 'Historic Era',
      origin: formData.origin || 'International Vault',
      periodYear: formData.periodYear || 'c. 18th Century',
      price: Number(formData.price),
      priceFormatted: formattedPrice,
      image: formData.image,
      secondaryImages: formData.secondaryImages,
      dimensions: formData.dimensions,
      weight: formData.weight,
      material: formData.material,
      condition: formData.condition,
      certificateNumber: formData.certificateNumber,
      description: formData.description,
      curatorNotes: formData.curatorNotes || formData.shortDescription,
      featured: formData.featured,
      provenance: [
        {
          year: formData.provenanceYear1,
          event: formData.provenanceEvent1,
          location: formData.provenanceLocation1
        }
      ]
    };

    if (editingArtifact) {
      onUpdateArtifact(artifactObject);
    } else {
      onAddArtifact(artifactObject);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Header */}
      <div className="bg-[#FFFDF8] p-6 rounded-[24px] border border-[#B68D40]/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2B2622] flex items-center gap-2">
            <Package className="w-6 h-6 text-[#B68D40]" />
            Catalog Master Inventory
          </h1>
          <p className="text-xs text-[#6A6158]">
            Manage, authenticate, publish, and track pricing for all museum artifacts ({artifacts.length} items)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Artifact</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFDF8] p-4 rounded-[20px] border border-[#B68D40]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#B68D40] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, origin, material..."
            className="w-full bg-[#F8F5EF] border border-[#B68D40]/20 rounded-full pl-10 pr-4 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#1F2328] text-white'
                : 'bg-[#F8F5EF] text-[#6A6158] hover:bg-[#B68D40]/10'
            }`}
          >
            All Categories
          </button>
          {categories.filter(c => c !== 'All').map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1F2328] text-white'
                  : 'bg-[#F8F5EF] text-[#6A6158] hover:bg-[#B68D40]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Master Table */}
      <div className="bg-[#FFFDF8] rounded-[24px] border border-[#B68D40]/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1F2328] text-[#D9C7AE] font-mono text-[10px] uppercase tracking-wider border-b border-[#B68D40]/20">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Artifact</th>
                <th className="py-3.5 px-4 font-semibold">Category & Era</th>
                <th className="py-3.5 px-4 font-semibold">Certificate</th>
                <th className="py-3.5 px-4 font-semibold">Valuation</th>
                <th className="py-3.5 px-4 font-semibold">Featured</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B68D40]/10 text-[#2B2622]">
              {filteredArtifacts.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8F5EF] transition-colors group">
                  {/* Title & Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-[#B68D40]/20 shrink-0"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-sm text-[#2B2622] group-hover:text-[#B68D40] transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-[#6A6158] font-mono">{item.material}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category & Era */}
                  <td className="py-3 px-4">
                    <span className="font-semibold block text-[#2B2622]">{item.category}</span>
                    <span className="text-[10px] text-[#6A6158] font-mono">{item.periodYear} ({item.origin})</span>
                  </td>

                  {/* Certificate Number */}
                  <td className="py-3 px-4 font-mono text-[11px] text-[#B68D40]">
                    {item.certificateNumber}
                  </td>

                  {/* Valuation */}
                  <td className="py-3 px-4 font-mono font-bold text-[#A76B3F] text-sm">
                    {item.priceFormatted}
                  </td>

                  {/* Featured Toggle Tag */}
                  <td className="py-3 px-4">
                    {item.featured ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#B68D40]/15 text-[#B68D40] text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#B68D40]" /> Featured
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#6A6158] font-mono">Standard</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-[#2F855A]/15 text-[#2F855A] text-[10px] font-bold uppercase tracking-wider">
                      Published
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onSelectArtifactToPreview(item)}
                        className="p-1.5 rounded-lg bg-[#F8F5EF] text-[#2B2622] hover:bg-[#B68D40] hover:text-white transition-colors"
                        title="Preview Public Card"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-[#F8F5EF] text-[#2B2622] hover:bg-[#B68D40] hover:text-white transition-colors"
                        title="Edit Artifact"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(item)}
                        className="p-1.5 rounded-lg bg-[#F8F5EF] text-[#2B2622] hover:bg-[#B68D40] hover:text-white transition-colors"
                        title="Duplicate Artifact"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteArtifact(item.id)}
                        className="p-1.5 rounded-lg bg-[#F8F5EF] text-[#B83A3A] hover:bg-[#B83A3A] hover:text-white transition-colors"
                        title="Delete Artifact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFDF8] border border-[#B68D40]/30 rounded-[28px] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#B68D40]/20">
              <div>
                <span className="text-[10px] text-[#B68D40] font-mono uppercase tracking-widest block">
                  Curator Product Specification
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#2B2622]">
                  {editingArtifact ? 'Edit Artifact Catalog Record' : 'Add New Museum Artifact'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1F2328] text-white flex items-center justify-center hover:bg-[#B68D40] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Inputs Grid */}
            <div className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Artifact Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Imperial Ming Dynasty Celadon Vase"
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  >
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Valuation Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-[#2B2622] font-mono focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Sale Price / Discounted ($)
                  </label>
                  <input
                    type="text"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="Optional sale price"
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-[#2B2622] font-mono focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Certificate Serial No.
                  </label>
                  <input
                    type="text"
                    value={formData.certificateNumber}
                    onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl px-3.5 py-2 text-xs text-[#B68D40] font-mono font-bold focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              {/* Physical Specs & Material */}
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#B68D40]/20 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B68D40] block">
                  Material & Provenance Specifications
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Material</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Condition</label>
                    <input
                      type="text"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Origin Country</label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Era / Dynasty</label>
                    <input
                      type="text"
                      value={formData.era}
                      onChange={(e) => setFormData({ ...formData, era: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">Period / Century</label>
                    <input
                      type="text"
                      value={formData.periodYear}
                      onChange={(e) => setFormData({ ...formData, periodYear: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#6A6158] font-bold uppercase">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full bg-white border border-[#B68D40]/30 rounded-lg px-3 py-1.5 text-xs text-[#2B2622] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload File Picker */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-[#B68D40]" />
                    Artifact Primary Image *
                  </span>
                  <span className="text-[9px] text-[#B68D40] font-normal normal-case">Select Image File</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 bg-[#F8F5EF] border border-[#B68D40]/30 rounded-2xl">
                  {formData.image ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#B68D40]/40 shrink-0 bg-black/10">
                      <img src={formData.image} alt="Artifact Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-[#B68D40]/40 flex flex-col items-center justify-center text-[#B68D40] bg-white shrink-0">
                      <Upload className="w-6 h-6" />
                      <span className="text-[9px] mt-1">No Image</span>
                    </div>
                  )}

                  <div className="flex-1 w-full space-y-2">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-xs w-full text-center">
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
                                setFormData(prev => ({ ...prev, image: event.target!.result as string }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <p className="text-[10px] text-[#6A6158]">
                      Choose an image file from your device. It will be stored directly with the artifact record in the database.
                    </p>
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Full Narrative Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#2B2622] uppercase tracking-wider">
                    Curator Inspection Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.curatorNotes}
                    onChange={(e) => setFormData({ ...formData, curatorNotes: e.target.value })}
                    className="w-full bg-[#F8F5EF] border border-[#B68D40]/30 rounded-xl p-3 text-xs text-[#2B2622] focus:outline-none focus:border-[#B68D40]"
                  />
                </div>
              </div>

              {/* Toggles & SEO */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-[#1F2328] text-white gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featuredToggle"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#B68D40] rounded"
                  />
                  <label htmlFor="featuredToggle" className="text-xs font-semibold cursor-pointer">
                    Feature on Homepage Spotlight
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#D9C7AE]">Status:</span>
                  <span className="px-3 py-1 rounded-full bg-[#2F855A] text-white text-[10px] font-bold uppercase">
                    Ready to Publish
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B68D40]/20">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-[#B68D40]/30 text-[#6A6158] hover:text-[#2B2622] text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveForm('Draft')}
                className="px-5 py-2.5 rounded-full bg-[#2A3036] hover:bg-[#1F2328] text-[#D9C7AE] text-xs font-bold uppercase tracking-wider border border-[#B68D40]/30"
              >
                Save Draft
              </button>
              <button
                onClick={() => handleSaveForm('Published')}
                className="px-6 py-2.5 rounded-full bg-[#B68D40] hover:bg-[#A76B3F] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Publish Artifact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
