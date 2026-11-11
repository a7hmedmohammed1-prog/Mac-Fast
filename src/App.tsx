/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecialDeals } from './components/SpecialDeals';
import { MenuSection } from './components/MenuSection';
import { FeaturesSection } from './components/FeaturesSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Toast, ToastMessage } from './components/Toast';
import { MENU_ITEMS, AVAILABLE_COUPONS } from './data/menuData';
import { MenuItem, CartItem, CartItemOption, CategoryId, Coupon, OrderDetails } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart items state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Toast helper
  const showToast = useCallback((text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (customizingItem) setCustomizingItem(null);
        else if (isCheckoutOpen) setIsCheckoutOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customizingItem, isCheckoutOpen, isCartOpen]);

  // Aggregated cart metrics
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const cartItemIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.productId));
  }, [cartItems]);

  // Quick helper to check quantity of a product in cart
  const getProductQuantity = useCallback((productId: number) => {
    return cartItems
      .filter((item) => item.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Add standard product directly to cart
  const handleQuickAdd = useCallback((product: MenuItem) => {
    const standardOptions: CartItemOption = {
      size: product.availableSizes?.[0]?.name,
      sizePrice: product.availableSizes?.[0]?.extraPrice || 0,
      spiciness: product.isSpicy ? 'spicy' : 'regular',
      selectedExtras: [],
    };

    const cartId = `${product.id}-default`;
    const unitPrice = product.price + (standardOptions.sizePrice || 0);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          product,
          quantity: 1,
          unitPrice,
          options: standardOptions,
        },
      ];
    });

    showToast(`تمت إضافة «${product.name}» إلى السلة!`);
  }, [showToast]);

  // Add customized product
  const handleCustomizeConfirm = useCallback((product: MenuItem, options: CartItemOption, quantity: number) => {
    const extrasKey = options.selectedExtras?.map((e) => e.id).sort().join(',') || 'none';
    const cartId = `${product.id}-${options.size || 'std'}-${options.spiciness}-${extrasKey}-${options.notes || ''}`;
    
    const sizePrice = options.sizePrice || 0;
    const extrasPrice = options.selectedExtras?.reduce((sum, e) => sum + e.price, 0) || 0;
    const unitPrice = product.price + sizePrice + extrasPrice;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          product,
          quantity,
          unitPrice,
          options,
        },
      ];
    });

    setCustomizingItem(null);
    showToast(`تمت إضافة «${product.name}» المخصصة إلى السلة!`);
  }, [showToast]);

  // Update item quantity in cart
  const handleUpdateCartQuantity = useCallback((cartId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  }, []);

  // Update product quantity from card stepper
  const handleUpdateProductQuantity = useCallback((productId: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.productId !== productId));
      showToast('تم حذف المنتج من السلة', 'info');
      return;
    }

    setCartItems((prev) => {
      const matches = prev.filter((item) => item.productId === productId);
      if (matches.length === 0) return prev;
      
      // Update first match
      const primary = matches[0];
      return prev.map((item) =>
        item.cartId === primary.cartId ? { ...item, quantity: newQty } : item
      );
    });
  }, [showToast]);

  // Remove single cart item
  const handleRemoveItem = useCallback((cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('تمت إزالة الوجبة من السلة', 'info');
  }, [showToast]);

  // Clear entire cart
  const handleClearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
    showToast('تم تفريغ السلة بنجاح', 'info');
  }, [showToast]);

  // Apply Coupon code
  const handleApplyCoupon = useCallback((code: string) => {
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === code.trim().toLowerCase()
    );

    if (!coupon) {
      return { success: false, message: 'كود الخصم غير صحيح أو منتهي الصلاحية' };
    }

    if (coupon.minSpend && cartTotal < coupon.minSpend) {
      return {
        success: false,
        message: `يتطلب هذا الكود طلباً بقيمة ${coupon.minSpend} ج.م كحد أدنى`,
      };
    }

    setAppliedCoupon(coupon);
    return { success: true, message: `تم تطبيق الكود بنجاح: ${coupon.description}` };
  }, [cartTotal]);

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast('تم إلغاء كود الخصم', 'info');
  }, [showToast]);

  // Navigation handlers
  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToOffers = () => {
    const el = document.getElementById('offers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Checkout flow
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setIsCheckoutOpen(false);
    setCompletedOrder(order);
    setCartItems([]);
    setAppliedCoupon(null);
    showToast('🎉 تم إرسال طلبك بنجاح وجاري تحضيره في المطبخ!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-gray-800 antialiased font-['Cairo',sans-serif]">
      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          onOrderNow={scrollToMenu}
          onExploreOffers={scrollToOffers}
        />

        {/* Special Deals */}
        <SpecialDeals
          onAddToCart={handleQuickAdd}
          cartItemIds={cartItemIds}
        />

        {/* Menu Section */}
        <MenuSection
          items={MENU_ITEMS}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToMenu();
          }}
          searchQuery={searchQuery}
          onQuickAdd={handleQuickAdd}
          onCustomize={setCustomizingItem}
          getCartQuantity={getProductQuantity}
          onUpdateQuantity={handleUpdateProductQuantity}
        />

        {/* Features & Why Us */}
        <FeaturesSection />

        {/* Customer Reviews */}
        <CustomerReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onConfirm={handleCustomizeConfirm}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success / Live Tracker Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
