import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { AdminTab, Order, Customer, Review, MediaFile, DiscountCode, CustomerInquiryMessage, CategoryCMS, HomepageCMSConfig, WebsiteSettingsConfig, AdminUser } from './types';
import { Artifact, CategoryType } from '../types';

import { DashboardHomeView } from './views/DashboardHomeView';
import { ProductsView } from './views/ProductsView';
import { CategoriesView } from './views/CategoriesView';
import { OrdersView } from './views/OrdersView';
import { CustomersView } from './views/CustomersView';
import { InventoryView } from './views/InventoryView';
import { AnalyticsView } from './views/AnalyticsView';
import { MediaLibraryView } from './views/MediaLibraryView';
import { DiscountsView } from './views/DiscountsView';
import { HomepageCMSView } from './views/HomepageCMSView';
import { WebsiteSettingsView } from './views/WebsiteSettingsView';
import { ReviewsView } from './views/ReviewsView';
import { MessagesView } from './views/MessagesView';
import { AdminsView } from './views/AdminsView';
import { ProfileView } from './views/ProfileView';

interface AdminDashboardLayoutProps {
  artifacts: Artifact[];
  categories: CategoryCMS[];
  orders: Order[];
  customers: Customer[];
  reviews: Review[];
  mediaFiles: MediaFile[];
  discounts: DiscountCode[];
  inquiries: CustomerInquiryMessage[];
  admins: AdminUser[];
  homepageConfig: HomepageCMSConfig;
  websiteSettings: WebsiteSettingsConfig;
  currentUser: AdminUser;

  // Handlers
  onAddArtifact: (art: Artifact) => void;
  onUpdateArtifact: (art: Artifact) => void;
  onDeleteArtifact: (id: string) => void;
  onAddCategory: (cat: CategoryCMS) => void;
  onUpdateCategory: (cat: CategoryCMS) => void;
  onDeleteCategory: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: Order['status'], tracking?: string) => void;
  onUpdateStock: (id: string, stock: number) => void;
  onUploadMedia: (file: MediaFile) => void;
  onDeleteMedia: (id: string) => void;
  onAddDiscount: (disc: DiscountCode) => void;
  onDeleteDiscount: (id: string) => void;
  onSaveHomepageCMS: (cfg: HomepageCMSConfig) => void;
  onSaveWebsiteSettings: (cfg: WebsiteSettingsConfig) => void;
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onMarkInquiryReplied: (id: string) => void;
  onUpdateCurrentUser: (user: AdminUser) => void;
  onExitAdmin: () => void;
  onSelectArtifactToPreviewPublic: (art: Artifact) => void;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  artifacts,
  categories,
  orders,
  customers,
  reviews,
  mediaFiles,
  discounts,
  inquiries,
  admins,
  homepageConfig,
  websiteSettings,
  currentUser,
  onAddArtifact,
  onUpdateArtifact,
  onDeleteArtifact,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onUpdateOrderStatus,
  onUpdateStock,
  onUploadMedia,
  onDeleteMedia,
  onAddDiscount,
  onDeleteDiscount,
  onSaveHomepageCMS,
  onSaveWebsiteSettings,
  onApproveReview,
  onDeleteReview,
  onMarkInquiryReplied,
  onUpdateCurrentUser,
  onExitAdmin,
  onSelectArtifactToPreviewPublic
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOrderFromDash, setSelectedOrderFromDash] = useState<Order | null>(null);

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'Unread').length;
  const recentOrdersCount = orders.filter((o) => o.status === 'Pending').length;

  const categoryTypesList: CategoryType[] = [
    'All',
    'Animal Statues',
    'Bronze Statues',
    'Metal Sculptures',
    'Antique Vases',
    'Copper Artifacts',
    'Decorative Collectibles',
    'Historical Pieces'
  ];

  const handleOpenQuickAdd = () => {
    setActiveTab('products');
  };

  const handleSelectOrderFromDash = (ord: Order) => {
    setSelectedOrderFromDash(ord);
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#2B2622] flex font-sans antialiased selection:bg-[#B68D40]/30">
      {/* Collapsible Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        unreadInquiriesCount={unreadInquiriesCount}
        onExitAdmin={onExitAdmin}
      />

      {/* Main Content Workspace Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16 sm:ml-20' : 'ml-16 sm:ml-64'
        }`}
      >
        {/* Topbar */}
        <AdminTopbar
          currentUser={currentUser}
          onOpenQuickAddProduct={handleOpenQuickAdd}
          onExitAdmin={onExitAdmin}
          onSearchQuery={() => {}}
          unreadInquiriesCount={unreadInquiriesCount}
          recentOrdersCount={recentOrdersCount}
        />

        {/* View Workspace */}
        <main className="flex-1 p-3 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardHomeView
              artifacts={artifacts}
              orders={orders}
              customers={customers}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectOrder={handleSelectOrderFromDash}
              onSelectArtifact={onSelectArtifactToPreviewPublic}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              artifacts={artifacts}
              categories={categoryTypesList}
              onAddArtifact={onAddArtifact}
              onUpdateArtifact={onUpdateArtifact}
              onDeleteArtifact={onDeleteArtifact}
              onSelectArtifactToPreview={onSelectArtifactToPreviewPublic}
            />
          )}

          {activeTab === 'categories' && (
            <CategoriesView
              categoriesList={categories}
              onAddCategory={onAddCategory}
              onUpdateCategory={onUpdateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              onUpdateOrderStatus={onUpdateOrderStatus}
              selectedOrderFromDashboard={selectedOrderFromDash}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView customers={customers} />
          )}

          {activeTab === 'inventory' && (
            <InventoryView artifacts={artifacts} onUpdateStock={onUpdateStock} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'media' && (
            <MediaLibraryView
              mediaFiles={mediaFiles}
              onUploadMedia={onUploadMedia}
              onDeleteMedia={onDeleteMedia}
            />
          )}

          {activeTab === 'discounts' && (
            <DiscountsView
              discounts={discounts}
              onAddDiscount={onAddDiscount}
              onDeleteDiscount={onDeleteDiscount}
            />
          )}

          {activeTab === 'homepage' && (
            <HomepageCMSView config={homepageConfig} onSaveConfig={onSaveHomepageCMS} />
          )}

          {activeTab === 'settings' && (
            <WebsiteSettingsView settings={websiteSettings} onSaveSettings={onSaveWebsiteSettings} />
          )}

          {activeTab === 'reviews' && (
            <ReviewsView
              reviews={reviews}
              onApproveReview={onApproveReview}
              onDeleteReview={onDeleteReview}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesView
              inquiries={inquiries}
              onMarkAsReplied={onMarkInquiryReplied}
            />
          )}

          {activeTab === 'admins' && (
            <AdminsView admins={admins} />
          )}

          {activeTab === 'profile' && (
            <ProfileView currentUser={currentUser} onUpdateUser={onUpdateCurrentUser} />
          )}
        </main>
      </div>
    </div>
  );
};
