export type CategoryType = 'Electronics' | 'Fashion' | 'Home & Living' | 'Gadgets' | 'Footwear' | 'Outerwear' | 'Accessories';

export interface Product {
  id: string;
  title: string;
  sku: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export type PaymentMethodType = 'bkash' | 'nagad' | 'rocket' | 'upay' | 'card' | 'cod';

export interface PaymentOptionInfo {
  id: PaymentMethodType;
  name: string;
  color: string;
  bgColor: string;
  logoText: string;
  description: string;
  badge?: string;
}

export type CourierPartnerType = 'pathao' | 'redx' | 'steadfast';

export type OrderStatusType = 'Order Placed' | 'Processing' | 'Handed over to Courier' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productTitle: string;
    productImage: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    district: string;
    thana: string;
    notes?: string;
  };
  deliveryMethod: 'standard' | 'express';
  deliveryFee: number;
  subtotal: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  transactionId?: string;
  status: OrderStatusType;
  courierPartner?: CourierPartnerType;
  courierTrackingId?: string;
  estimatedDelivery: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  tier: string;
  rewardPoints: number;
  cashbackEarned: number;
  avatar: string;
}

export interface SavedAddress {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  isDefault: boolean;
  recipientName: string;
  addressLine: string;
  district: string;
  thana: string;
  phone: string;
}

export interface SavedPaymentMethod {
  id: string;
  type: PaymentMethodType;
  title: string;
  accountNumber: string;
  expiryDate?: string;
  isDefault?: boolean;
}

export interface CourierConfig {
  id: CourierPartnerType;
  name: string;
  code: string;
  color: string;
  logoText: string;
  isConnected: boolean;
  pendingOrdersCount: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}
