import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ArtifactGrid } from './components/ArtifactGrid';
import { ArtifactModal } from './components/ArtifactModal';
import { MasterpieceSpotlight } from './components/MasterpieceSpotlight';
import { CertificateVerifier } from './components/CertificateVerifier';
import { HeritageStory } from './components/HeritageStory';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { InquiryModal } from './components/InquiryModal';
import { CustomerAuthModal } from './components/CustomerAuthModal';
import { SavedShortlistModal } from './components/SavedShortlistModal';
import { Footer } from './components/Footer';

import { ARTIFACTS_DATA } from './data/artifacts';
import { Artifact, CategoryType } from './types';
import { authApi, productsApi, categoriesApi, ordersApi } from './lib/api';

import { AdminDashboardLayout } from './admin/AdminDashboardLayout';
import { AdminAuthModal } from './admin/components/AdminAuthModal';
import { 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_CATEGORIES, 
  INITIAL_REVIEWS, 
  INITIAL_MEDIA, 
  INITIAL_DISCOUNTS, 
  INITIAL_INQUIRIES, 
  INITIAL_ADMINS, 
  INITIAL_HOMEPAGE_CMS, 
  INITIAL_WEBSITE_SETTINGS 
} from './admin/mockAdminData';
import { 
  Order, 
  Customer, 
  Review, 
  MediaFile, 
  DiscountCode, 
  CustomerInquiryMessage, 
  CategoryCMS, 
  HomepageCMSConfig, 
  WebsiteSettingsConfig, 
  AdminUser 
} from './admin/types';

export default function App() {
  // Navigation & View Mode State
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const [customerUser, setCustomerUser] = useState<any | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [inquiryArtifact, setInquiryArtifact] = useState<Artifact | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Saved / Bookmarked Shortlist State (persisted in localStorage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ha_saved_artifacts');
      return saved ? JSON.parse(saved) : ['ha-01'];
    } catch {
      return ['ha-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ha_saved_artifacts', JSON.stringify(savedIds));
    } catch {}
  }, [savedIds]);

  const handleToggleSave = (artifactId: string) => {
    setSavedIds(prev => 
      prev.includes(artifactId) 
        ? prev.filter(id => id !== artifactId) 
        : [...prev, artifactId]
    );
  };

  // Fetch initial data from backend API
  useEffect(() => {
    // 1. Fetch products from API
    productsApi.getProducts()
      .then((res) => {
        if (res.success && res.products && res.products.length > 0) {
          const defaultFallbackImage = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=1200';
          const mapped: Artifact[] = res.products.map((p: any) => ({
            id: p._id || p.id,
            title: p.productName || p.title || 'Untitled Masterpiece',
            category: p.categoryName || 'Sculptures',
            era: p.historicalEra || '18th Century',
            origin: p.origin || 'Europe',
            periodYear: p.historicalEra || '18th Century',
            price: p.price || 0,
            priceFormatted: p.price ? `$${Number(p.price).toLocaleString()}` : '$0',
            image: p.thumbnail || p.imageUrl || p.image || defaultFallbackImage,
            secondaryImages: p.images && p.images.length > 0 ? p.images : [defaultFallbackImage],
            dimensions: p.dimensions || '50cm x 30cm x 25cm',
            weight: p.weight || '6.5 kg',
            material: p.material || 'Cast Bronze & Fine Alloy',
            condition: p.condition || 'Museum Conservation Status',
            certificateNumber: p.certificateId || `HA-VAULT-${p._id ? p._id.substring(0, 6).toUpperCase() : '1892'}`,
            description: p.description || 'Rare certified antiquarian artifact from private heritage vault.',
            curatorNotes: p.curatorNotes || p.provenance || 'Verified by Heritage Vault Curators.',
            provenance: Array.isArray(p.provenance) ? p.provenance : [
              { year: '18th Century', event: typeof p.provenance === 'string' && p.provenance ? p.provenance : 'Acquired into private vault collection', location: p.origin || 'London, UK' }
            ],
            featured: p.featured || false,
            stock: p.stock !== undefined ? p.stock : 1,
            sku: p.sku || 'HA-SKU-001'
          }));
          setArtifacts(mapped);
        }
      })
      .catch(() => {
        // Keeps default fallback artifacts
      });

    // 2. Fetch logged in user profile if token present
    authApi.getMe()
      .then((res) => {
        if (res.success && res.user) {
          if (res.user.role === 'Admin') {
            setIsAuthorized(true);
            setCurrentUser({
              id: res.user._id,
              name: res.user.fullName,
              email: res.user.email,
              role: 'Super Admin',
              avatar: res.user.profileImage,
              lastLogin: 'Just now',
              status: 'Active',
            });
          } else {
            setCustomerUser(res.user);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Core CMS Data States
  const [artifacts, setArtifacts] = useState<Artifact[]>(ARTIFACTS_DATA);
  const [categories, setCategories] = useState<CategoryCMS[]>(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(INITIAL_MEDIA);
  const [discounts, setDiscounts] = useState<DiscountCode[]>(INITIAL_DISCOUNTS);
  const [inquiries, setInquiries] = useState<CustomerInquiryMessage[]>(INITIAL_INQUIRIES);
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMINS);
  const [homepageConfig, setHomepageConfig] = useState<HomepageCMSConfig>(INITIAL_HOMEPAGE_CMS);
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettingsConfig>(INITIAL_WEBSITE_SETTINGS);
  const [currentUser, setCurrentUser] = useState<AdminUser>(INITIAL_ADMINS[0]);

  // Handlers for Artifact CRUD
  const handleAddArtifact = (newArt: Artifact) => {
    setArtifacts([newArt, ...artifacts]);
  };

  const handleUpdateArtifact = (updatedArt: Artifact) => {
    setArtifacts(artifacts.map((a) => (a.id === updatedArt.id ? updatedArt : a)));
  };

  const handleDeleteArtifact = (id: string) => {
    setArtifacts(artifacts.filter((a) => a.id !== id));
  };

  // Handlers for Category CRUD
  const handleAddCategory = (newCat: CategoryCMS) => {
    setCategories([...categories, newCat]);
  };

  const handleUpdateCategory = (updatedCat: CategoryCMS) => {
    setCategories(categories.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // Handler for Orders
  const handleUpdateOrderStatus = (orderId: string, status: Order['status'], tracking?: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status, trackingNumber: tracking ?? o.trackingNumber }
          : o
      )
    );
  };

  // Handler for Inventory Stock
  const handleUpdateStock = (artifactId: string, newStock: number) => {
    setArtifacts(
      artifacts.map((a) =>
        a.id === artifactId ? { ...a, stock: newStock } : a
      )
    );
  };

  // Handler for Media
  const handleUploadMedia = (file: MediaFile) => {
    setMediaFiles([file, ...mediaFiles]);
  };

  const handleDeleteMedia = (id: string) => {
    setMediaFiles(mediaFiles.filter((m) => m.id !== id));
  };

  // Handler for Discounts
  const handleAddDiscount = (disc: DiscountCode) => {
    setDiscounts([disc, ...discounts]);
  };

  const handleDeleteDiscount = (id: string) => {
    setDiscounts(discounts.filter((d) => d.id !== id));
  };

  // Handler for Inquiries
  const handleAddInquiry = (inquiry: CustomerInquiryMessage) => {
    setInquiries([inquiry, ...inquiries]);
  };

  const handleMarkInquiryReplied = (id: string) => {
    setInquiries(
      inquiries.map((i) => (i.id === id ? { ...i, status: 'Replied' } : i))
    );
  };

  // Public Navigation Helpers
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    handleNavigateSection('catalog');
  };

  const handleDiscoverClick = () => {
    handleNavigateSection('heritage');
  };

  const handleSelectFeatured = (artifactId: string) => {
    const found = artifacts.find((a) => a.id === artifactId);
    if (found) {
      setSelectedArtifact(found);
    }
  };

  const handleInquireClick = (artifact: Artifact) => {
    setInquiryArtifact(artifact);
    setIsInquiryOpen(true);
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    setIsAuthorized(false);
  };

  const handleSelectArtifactToPreviewPublic = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    handleExitAdmin();
  };

  const handleOpenAdminRequest = () => {
    if (isAuthorized) {
      setIsAdminView(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthorized(true);
    setIsAdminAuthOpen(false);
    setIsAdminView(true);
  };

  // Render Admin Dashboard layout if in admin mode
  if (isAdminView) {
    return (
      <AdminDashboardLayout
        artifacts={artifacts}
        categories={categories}
        orders={orders}
        customers={customers}
        reviews={reviews}
        mediaFiles={mediaFiles}
        discounts={discounts}
        inquiries={inquiries}
        admins={admins}
        homepageConfig={homepageConfig}
        websiteSettings={websiteSettings}
        currentUser={currentUser}
        onAddArtifact={handleAddArtifact}
        onUpdateArtifact={handleUpdateArtifact}
        onDeleteArtifact={handleDeleteArtifact}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateStock={handleUpdateStock}
        onUploadMedia={handleUploadMedia}
        onDeleteMedia={handleDeleteMedia}
        onAddDiscount={handleAddDiscount}
        onDeleteDiscount={handleDeleteDiscount}
        onSaveHomepageCMS={setHomepageConfig}
        onSaveWebsiteSettings={setWebsiteSettings}
        onApproveReview={(id) =>
          setReviews(
            reviews.map((r) => (r.id === id ? { ...r, status: 'Published' } : r))
          )
        }
        onDeleteReview={(id) => setReviews(reviews.filter((r) => r.id !== id))}
        onMarkInquiryReplied={handleMarkInquiryReplied}
        onUpdateCurrentUser={setCurrentUser}
        onExitAdmin={handleExitAdmin}
        onSelectArtifactToPreviewPublic={handleSelectArtifactToPreviewPublic}
      />
    );
  }

  const savedArtifacts = useMemo(() => {
    return artifacts.filter((a) => savedIds.includes(a.id));
  }, [artifacts, savedIds]);

  // Otherwise render Public Storefront with live CMS configuration values
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2B2622] font-sans antialiased selection:bg-[#B68D40]/30 selection:text-[#2B2622]">
      {/* Floating Luxury Glass Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat as CategoryType)}
        onExploreClick={handleExploreClick}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={handleOpenAdminRequest}
        onOpenCustomerAuth={() => setIsCustomerAuthOpen(true)}
        customerUser={customerUser}
        savedCount={savedIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={handleExploreClick}
        onDiscoverClick={handleDiscoverClick}
        onSelectFeaturedArtifact={handleSelectFeatured}
      />

      {/* Main Catalog View */}
      <div className="pt-8" id="catalog">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        <ArtifactGrid
          artifacts={artifacts}
          activeCategory={activeCategory}
          onSelectArtifact={(artifact) => setSelectedArtifact(artifact)}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      </div>

      {/* Masterpiece Spotlight Section */}
      <MasterpieceSpotlight
        onSelectArtifact={(artifact) => setSelectedArtifact(artifact)}
      />

      {/* Certificate Authenticity Verifier */}
      <CertificateVerifier
        onSelectArtifact={(artifact) => setSelectedArtifact(artifact)}
      />

      {/* Heritage Editorial Story */}
      <HeritageStory />

      {/* Why Choose Us / Guarantees */}
      <WhyChooseUs />

      {/* Collector Testimonials */}
      <Testimonials />

      {/* Private Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onSelectCategory={(cat) => setActiveCategory(cat as CategoryType)}
      />

      {/* Museum Artifact Inspection Modal */}
      <ArtifactModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onInquireClick={handleInquireClick}
      />

      {/* Saved Shortlist Drawer / Modal */}
      <SavedShortlistModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArtifacts={savedArtifacts}
        onSelectArtifact={(art) => setSelectedArtifact(art)}
        onRemoveSaved={(id) => handleToggleSave(id)}
        onInquireArtifact={(art) => {
          setInquiryArtifact(art);
          setIsInquiryOpen(true);
        }}
      />

      {/* Private Acquisition Consultation Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        artifact={inquiryArtifact}
        onClose={() => setIsInquiryOpen(false)}
        onAddInquiry={handleAddInquiry}
      />

      {/* Customer / Collector Authentication Modal */}
      <CustomerAuthModal
        isOpen={isCustomerAuthOpen}
        onClose={() => setIsCustomerAuthOpen(false)}
        onAuthSuccess={(u) => setCustomerUser(u)}
      />

      {/* Curator Security Clearance Authentication Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
