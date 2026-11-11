export type CategoryId = 'all' | 'meals' | 'burgers' | 'sides' | 'drinks' | 'desserts';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'meals' | 'burgers' | 'sides' | 'drinks' | 'desserts';
  categoryName: string;
  description: string;
  image: string;
  calories?: number;
  prepTime?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  availableSizes?: { name: string; extraPrice: number }[];
  availableExtras?: ExtraOption[];
}

export interface CartItemOption {
  size?: string;
  sizePrice?: number;
  spiciness?: 'regular' | 'spicy';
  selectedExtras?: ExtraOption[];
  notes?: string;
}

export interface CartItem {
  cartId: string; // unique per combination of product + options
  productId: number;
  product: MenuItem;
  quantity: number;
  unitPrice: number;
  options: CartItemOption;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  address: string;
  branch?: string;
  paymentMethod: 'cash' | 'card' | 'applepay';
  notes?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  estimatedMinutes: number;
  status: 'received' | 'cooking' | 'delivering' | 'delivered';
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  freeDelivery?: boolean;
  minSpend?: number;
  description: string;
}
