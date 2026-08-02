import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomerProfile,
  SavedAddress,
  SavedPaymentMethod,
  CourierConfig,
  ToastMessage,
  OrderStatusType,
  CourierPartnerType
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMER,
  INITIAL_SAVED_ADDRESSES,
  INITIAL_SAVED_PAYMENTS,
  INITIAL_ORDERS,
  INITIAL_COURIER_CONFIGS
} from '../data/mockData';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  customer: CustomerProfile;
  addresses: SavedAddress[];
  savedPayments: SavedPaymentMethod[];
  courierConfigs: CourierConfig[];
  toasts: ToastMessage[];
  searchQuery: string;
  isCartOpen: boolean;
  activeInvoiceOrder: Order | null;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  clearCart: () => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatusType) => void;
  generateCourierTrackingId: (orderId: string, courier: CourierPartnerType) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  deleteProduct: (productId: string) => void;
  toggleCourierConnection: (courierId: CourierPartnerType) => void;
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  addSavedPayment: (payment: Omit<SavedPaymentMethod, 'id'>) => void;
  deleteSavedPayment: (id: string) => void;
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  setActiveInvoiceOrder: (order: Order | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const local = localStorage.getItem('luxe_bd_products');
    return local ? JSON.parse(local) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const local = localStorage.getItem('luxe_bd_cart');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const local = localStorage.getItem('luxe_bd_orders');
    return local ? JSON.parse(local) : INITIAL_ORDERS;
  });

  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const local = localStorage.getItem('luxe_bd_customer');
    return local ? JSON.parse(local) : INITIAL_CUSTOMER;
  });

  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    const local = localStorage.getItem('luxe_bd_addresses');
    return local ? JSON.parse(local) : INITIAL_SAVED_ADDRESSES;
  });

  const [savedPayments, setSavedPayments] = useState<SavedPaymentMethod[]>(() => {
    const local = localStorage.getItem('luxe_bd_payments');
    return local ? JSON.parse(local) : INITIAL_SAVED_PAYMENTS;
  });

  const [courierConfigs, setCourierConfigs] = useState<CourierConfig[]>(() => {
    const local = localStorage.getItem('luxe_bd_couriers');
    return local ? JSON.parse(local) : INITIAL_COURIER_CONFIGS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('luxe_bd_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_customer', JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_payments', JSON.stringify(savedPayments));
  }, [savedPayments]);

  useEffect(() => {
    localStorage.setItem('luxe_bd_couriers', JSON.stringify(courierConfigs));
  }, [courierConfigs]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, quantity: number = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors.length > 0 ? product.colors[0].name : undefined);
    const selectedSize = size || (product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    showToast(
      'Added to Cart',
      `${product.title} ${selectedColor ? `(${selectedColor})` : ''} added to your shopping bag.`,
      'success'
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
    showToast('Removed Item', 'Item removed from your cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrderId = `LX-${Math.floor(1000 + Math.random() * 9000)}`;
    const todayStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      ...orderData,
      id: newOrderId,
      date: todayStr,
      status: 'Order Placed'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Reward points boost
    const pointsEarned = Math.floor(newOrder.totalAmount / 100);
    setCustomer((prev) => ({
      ...prev,
      rewardPoints: prev.rewardPoints + pointsEarned,
      cashbackEarned: prev.cashbackEarned + Math.floor(pointsEarned * 0.1)
    }));

    clearCart();
    showToast('Order Confirmed!', `Order ${newOrderId} has been successfully placed.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatusType) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('Order Status Updated', `Order #${orderId} marked as ${status}`, 'info');
  };

  const generateCourierTrackingId = (orderId: string, courier: CourierPartnerType) => {
    const prefix = courier === 'pathao' ? 'PATH' : courier === 'redx' ? 'REDX' : 'STF';
    const randomCode = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            courierPartner: courier,
            courierTrackingId: randomCode,
            status: 'Handed over to Courier'
          };
        }
        return o;
      })
    );

    showToast(
      'Consignment Created',
      `Assigned ${courier.toUpperCase()} tracking ID ${randomCode} to Order #${orderId}`,
      'success'
    );
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: newId
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Created', `${newProduct.title} added to catalog.`, 'success');
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p))
    );
    showToast('Stock Updated', `Stock updated to ${newStock}`, 'info');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product Deleted', 'Item removed from store catalog.', 'warning');
  };

  const toggleCourierConnection = (courierId: CourierPartnerType) => {
    setCourierConfigs((prev) =>
      prev.map((c) =>
        c.id === courierId ? { ...c, isConnected: !c.isConnected } : c
      )
    );
    showToast('Courier Updated', 'Courier integration setting updated', 'info');
  };

  const addAddress = (addressData: Omit<SavedAddress, 'id'>) => {
    const newId = `addr-${Date.now()}`;
    const newAddress: SavedAddress = { ...addressData, id: newId };
    setAddresses((prev) => [...prev, newAddress]);
    showToast('Address Saved', 'New delivery address added.', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address Removed', 'Saved address removed', 'info');
  };

  const addSavedPayment = (paymentData: Omit<SavedPaymentMethod, 'id'>) => {
    const newId = `pay-${Date.now()}`;
    const newPayment = { ...paymentData, id: newId };
    setSavedPayments((prev) => [...prev, newPayment]);
    showToast('Payment Saved', 'Payment method added to your account.', 'success');
  };

  const deleteSavedPayment = (id: string) => {
    setSavedPayments((prev) => prev.filter((p) => p.id !== id));
    showToast('Payment Removed', 'Payment method removed', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        customer,
        addresses,
        savedPayments,
        courierConfigs,
        toasts,
        searchQuery,
        isCartOpen,
        activeInvoiceOrder,

        setSearchQuery,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        generateCourierTrackingId,
        addProduct,
        updateProductStock,
        deleteProduct,
        toggleCourierConnection,
        addAddress,
        deleteAddress,
        addSavedPayment,
        deleteSavedPayment,
        showToast,
        removeToast,
        setActiveInvoiceOrder
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
