import { Product, Order, CustomerProfile, SavedAddress, SavedPaymentMethod, CourierConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Premium Wireless Headphones',
    sku: 'LUXE-HP-09',
    category: 'Electronics',
    price: 12500,
    originalPrice: 15625,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Active Noise-Canceling over-ear wireless headphones with studio-grade audio drivers, 40-hour battery life, and ultra-soft memory foam cushion in deep slate grey.',
    features: [
      'Active Noise Cancellation (ANC) up to 38dB',
      'Custom 40mm Titanium Drivers for deep bass and crisp highs',
      '40-Hour playtime with USB-C Fast Charging (10 min charge = 4 hrs)',
      'Dual mic environmental noise reduction for crystal clear calls'
    ],
    specs: {
      'Bluetooth': 'v5.3 Low Energy',
      'Battery Life': '40 Hours (ANC ON)',
      'Weight': '250 grams',
      'Warranty': '1 Year Official LUXE BD Warranty'
    },
    colors: [
      { name: 'Slate Grey', hex: '#1E293B' },
      { name: 'Obsidian Black', hex: '#0F172A' },
      { name: 'Silver White', hex: '#E2E8F0' }
    ],
    sizes: ['Standard'],
    stock: 45,
    rating: 4.9,
    reviewCount: 128,
    isFlashSale: true,
    isNewArrival: true
  },
  {
    id: 'prod-2',
    title: 'Classic Automatic Watch',
    sku: 'LUXE-WT-08',
    category: 'Accessories',
    price: 8900,
    originalPrice: 10470,
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An elegant, minimalist automatic mechanical watch with a navy blue sunray dial and solid stainless steel bracelet.',
    features: [
      'Japanese 21-jewel automatic movement with self-winding mechanism',
      'Scratch-resistant Sapphire crystal lens',
      '50m Water resistance for everyday peace of mind',
      'Luminous hands and date calendar at 3 o\'clock'
    ],
    specs: {
      'Movement': 'Automatic Self-Wind',
      'Case Diameter': '40 mm',
      'Band Material': '316L Stainless Steel',
      'Warranty': '2 Years Official Warranty'
    },
    colors: [
      { name: 'Navy & Silver', hex: '#1E3A8A' },
      { name: 'Gold & Black', hex: '#D97706' }
    ],
    sizes: ['40mm'],
    stock: 3,
    rating: 4.8,
    reviewCount: 94,
    isFlashSale: true
  },
  {
    id: 'prod-3',
    title: 'Minimalist Leather Tote Bag',
    sku: 'LUXE-BG-14',
    category: 'Fashion',
    price: 5600,
    originalPrice: 8000,
    discountPercentage: 30,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted full-grain leather tote bag in rich emerald green with spacious compartment, magnetic closure, and laptop sleeve.',
    features: [
      '100% Genuine Full-Grain Cow Leather',
      'Padded compartment fits up to 15.6-inch MacBook / Laptop',
      'Internal zip pockets and quick-access smartphone slot',
      'Reinforced shoulder straps for heavy everyday carry'
    ],
    specs: {
      'Dimensions': '38cm x 30cm x 12cm',
      'Material': 'Full Grain Cowhide Leather',
      'Closure': 'YKK Zipper & Magnetic Snap'
    },
    colors: [
      { name: 'Emerald Green', hex: '#006C49' },
      { name: 'Cognac Brown', hex: '#78350F' },
      { name: 'Midnight Black', hex: '#000000' }
    ],
    sizes: ['One Size'],
    stock: 28,
    rating: 4.7,
    reviewCount: 62,
    isFlashSale: true
  },
  {
    id: 'prod-4',
    title: 'Matte Ceramic Mug Set (4 Pcs)',
    sku: 'LUXE-HM-02',
    category: 'Home & Living',
    price: 2150,
    originalPrice: 2388,
    discountPercentage: 10,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A set of 4 artisanal matte ceramic coffee mugs in complementary navy and cream glaze, designed for luxury morning coffee rituals.',
    features: [
      'Hand-thrown high-fired stoneware ceramic',
      'Microwave and dishwasher safe',
      '350ml capacity per mug',
      'Ergonomic handle for comfortable grip'
    ],
    specs: {
      'Capacity': '350 ml / 12 oz',
      'Set Count': '4 Mugs',
      'Material': 'High Fired Ceramic'
    },
    colors: [
      { name: 'Slate & Cream', hex: '#334155' }
    ],
    sizes: ['350ml'],
    stock: 18,
    rating: 4.9,
    reviewCount: 41,
    isFlashSale: true
  },
  {
    id: 'prod-5',
    title: 'Classic White Poplin Shirt',
    sku: 'LUXE-SH-01',
    category: 'Fashion',
    price: 4500,
    originalPrice: 5500,
    discountPercentage: 18,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Tailored crisp white poplin shirt crafted from 100% Egyptian long-staple cotton with mother-of-pearl buttons.',
    features: [
      '100% Egyptian Long-Staple Cotton',
      'Wrinkle-resistant easy care finish',
      'Slim tailored fit with spread collar',
      'Genuine mother-of-pearl buttons'
    ],
    specs: {
      'Fabric': '100% Cotton Poplin',
      'Fit': 'Slim Tailored',
      'Care': 'Machine Wash Cold / Gentle Cycle'
    },
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Blue', hex: '#BAE6FD' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 145,
    rating: 4.9,
    reviewCount: 210,
    isNewArrival: true
  },
  {
    id: 'prod-6',
    title: 'Tailored Navy Blazer',
    sku: 'LUXE-CT-04',
    category: 'Outerwear',
    price: 14000,
    originalPrice: 17500,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Single-breasted navy blue blazer woven from superfine Italian wool blend with silk lining and horn buttons.',
    features: [
      'Super 120s Italian Merino Wool Blend',
      '100% Bemberg Silk Interior Lining',
      'Notch lapel with dual rear vents',
      'Hand-stitched pick detailing'
    ],
    specs: {
      'Fabric': '70% Wool, 30% Silk',
      'Fit': 'Modern Slim Fit',
      'Dry Clean Only': 'Yes'
    },
    colors: [
      { name: 'Deep Navy', hex: '#0A192F' }
    ],
    sizes: ['M', 'L', 'XL'],
    stock: 0,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prod-7',
    title: 'Leather Oxford Shoes',
    sku: 'LUXE-FW-22',
    category: 'Footwear',
    price: 9200,
    originalPrice: 11500,
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Goodyear welted cap-toe Oxford shoes in burnished dark brown calfskin leather with durable leather sole.',
    features: [
      'Full-Grain European Calfskin Leather',
      'Goodyear Welt construction for re-soling longevity',
      'Cushioned leather footbed with arch support',
      'Hand-burnished toe finish'
    ],
    specs: {
      'Upper': 'European Calfskin',
      'Sole': 'Genuine Leather with Rubber Heel Tap',
      'Construction': 'Goodyear Welt'
    },
    colors: [
      { name: 'Burnished Brown', hex: '#451A03' },
      { name: 'Classic Black', hex: '#000000' }
    ],
    sizes: ['40', '41', '42', '43', '44'],
    stock: 62,
    rating: 4.8,
    reviewCount: 88,
    isNewArrival: true
  },
  {
    id: 'prod-8',
    title: 'Smart Fitness Smartwatch',
    sku: 'LUXE-GD-05',
    category: 'Gadgets',
    price: 11800,
    originalPrice: 13500,
    discountPercentage: 12,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'AMOLED display smartwatch with SpO2 monitoring, continuous HR tracking, GPS, and 14-day battery life.',
    features: [
      '1.43-inch Ultra HD AMOLED Touch Screen',
      'Continuous Blood Oxygen (SpO2) and Heart Rate Monitor',
      'Built-in Dual-Band GPS for outdoor activity tracking',
      '5ATM Water resistance (up to 50 meters)'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466',
      'Battery': '14 Days Typical Usage',
      'Connectivity': 'Bluetooth 5.2 / GPS / GLONASS'
    },
    colors: [
      { name: 'Matte Black', hex: '#18181B' },
      { name: 'Titanium Grey', hex: '#52525B' }
    ],
    sizes: ['46mm'],
    stock: 35,
    rating: 4.7,
    reviewCount: 115,
    isNewArrival: true
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  name: 'Luxe Customer',
  email: 'customer@luxe.bd',
  phone: '+880 1712 345678',
  tier: 'Gold Member',
  rewardPoints: 2450,
  cashbackEarned: 450,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
};

export const INITIAL_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    isDefault: true,
    recipientName: 'Luxe Customer',
    addressLine: 'House 12, Road 5, Block C, Banani',
    district: 'Dhaka',
    thana: 'Banani',
    phone: '+880 1712 345678'
  },
  {
    id: 'addr-2',
    label: 'Office',
    isDefault: false,
    recipientName: 'Luxe Customer',
    addressLine: 'Level 8, Premium Towers, Gulshan Avenue, Gulshan 1',
    district: 'Dhaka',
    thana: 'Gulshan',
    phone: '+880 1812 345678'
  }
];

export const INITIAL_SAVED_PAYMENTS: SavedPaymentMethod[] = [
  {
    id: 'pay-1',
    type: 'bkash',
    title: 'Primary bKash',
    accountNumber: '01712345678',
    isDefault: true
  },
  {
    id: 'pay-2',
    type: 'card',
    title: 'Visa Credit Card',
    accountNumber: '4421',
    expiryDate: '12/26'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'LX-9942',
    date: 'Oct 24, 2023',
    customerName: 'Rahim Uddin',
    customerEmail: 'rahim.uddin@gmail.com',
    customerPhone: '+880 1711 002233',
    items: [
      {
        productId: 'prod-1',
        productTitle: 'Premium Wireless Headphones',
        productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 12500,
        color: 'Slate Grey'
      }
    ],
    shippingAddress: {
      fullName: 'Rahim Uddin',
      phone: '+880 1711 002233',
      address: 'House 42, Road 11, Block D',
      district: 'Dhaka',
      thana: 'Banani',
      notes: 'Please call before arrival'
    },
    deliveryMethod: 'standard',
    deliveryFee: 60,
    subtotal: 12500,
    discount: 0,
    totalAmount: 12560,
    paymentMethod: 'bkash',
    paymentStatus: 'Paid',
    transactionId: 'BK8X92M0291',
    status: 'Handed over to Courier',
    courierPartner: 'redx',
    courierTrackingId: 'REDX-9942810',
    estimatedDelivery: 'Oct 28, 2023'
  },
  {
    id: 'LX-9941',
    date: 'Oct 24, 2023',
    customerName: 'Sadia Islam',
    customerEmail: 'sadia.islam@yahoo.com',
    customerPhone: '+880 1819 887766',
    items: [
      {
        productId: 'prod-2',
        productTitle: 'Classic Automatic Watch',
        productImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 8900,
        color: 'Navy & Silver'
      }
    ],
    shippingAddress: {
      fullName: 'Sadia Islam',
      phone: '+880 1819 887766',
      address: 'Apt 4B, Skyview Tower, Nasirabad',
      district: 'Chattogram',
      thana: 'Panchlaish'
    },
    deliveryMethod: 'standard',
    deliveryFee: 120,
    subtotal: 8900,
    discount: 0,
    totalAmount: 9020,
    paymentMethod: 'cod',
    paymentStatus: 'Pending',
    status: 'Processing',
    courierPartner: 'pathao',
    courierTrackingId: 'PATH-8839210',
    estimatedDelivery: 'Oct 29, 2023'
  },
  {
    id: 'LX-9940',
    date: 'Oct 23, 2023',
    customerName: 'Anwar Hossain',
    customerEmail: 'anwar.h@gmail.com',
    customerPhone: '+880 1912 334455',
    items: [
      {
        productId: 'prod-6',
        productTitle: 'Tailored Navy Blazer',
        productImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 14000,
        size: 'L'
      },
      {
        productId: 'prod-7',
        productTitle: 'Leather Oxford Shoes',
        productImage: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 9200,
        size: '42'
      }
    ],
    shippingAddress: {
      fullName: 'Anwar Hossain',
      phone: '+880 1912 334455',
      address: 'House 15, Road 2, Sector 4, Uttara',
      district: 'Dhaka',
      thana: 'Uttara'
    },
    deliveryMethod: 'express',
    deliveryFee: 150,
    subtotal: 23200,
    discount: 1000,
    totalAmount: 22350,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    transactionId: 'SSL-99382104',
    status: 'Out for Delivery',
    courierPartner: 'steadfast',
    courierTrackingId: 'STF-1192830',
    estimatedDelivery: 'Oct 25, 2023'
  },
  {
    id: 'LX-9831',
    date: 'Oct 12, 2023',
    customerName: 'Luxe Customer',
    customerEmail: 'customer@luxe.bd',
    customerPhone: '+880 1712 345678',
    items: [
      {
        productId: 'prod-5',
        productTitle: 'Classic White Poplin Shirt',
        productImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        quantity: 1,
        price: 4500,
        size: 'L'
      }
    ],
    shippingAddress: {
      fullName: 'Luxe Customer',
      phone: '+880 1712 345678',
      address: 'House 12, Road 5, Block C, Banani',
      district: 'Dhaka',
      thana: 'Banani'
    },
    deliveryMethod: 'standard',
    deliveryFee: 60,
    subtotal: 4500,
    discount: 0,
    totalAmount: 4560,
    paymentMethod: 'cod',
    paymentStatus: 'Paid',
    status: 'Delivered',
    courierPartner: 'redx',
    courierTrackingId: 'REDX-771294',
    estimatedDelivery: 'Oct 15, 2023'
  }
];

export const INITIAL_COURIER_CONFIGS: CourierConfig[] = [
  {
    id: 'pathao',
    name: 'Pathao Courier',
    code: 'P',
    color: '#E53E3E',
    logoText: 'P',
    isConnected: true,
    pendingOrdersCount: 42
  },
  {
    id: 'redx',
    name: 'RedX Logistics',
    code: 'RX',
    color: '#D97706',
    logoText: 'RX',
    isConnected: true,
    pendingOrdersCount: 18
  },
  {
    id: 'steadfast',
    name: 'Steadfast Courier',
    code: 'SF',
    color: '#2563EB',
    logoText: 'SF',
    isConnected: false,
    pendingOrdersCount: 0
  }
];

export const BANGLADESH_DISTRICTS = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Gajipur',
  'Narayanganj',
  'Bogra'
];

export const BANGLADESH_THANAS: Record<string, string[]> = {
  'Dhaka': ['Banani', 'Gulshan', 'Dhanmondi', 'Uttara', 'Mirpur', 'Mohakhali', 'Bashundhara R/A', 'Badda', 'Tejgaon', 'Mohammadpur', 'Lalmatia', 'Old Dhaka'],
  'Chattogram': ['Panchlaish', 'GEC Circle', 'Agrabad', 'Halishahar', 'Chawkbazar', 'Kotwali', 'Khulshi'],
  'Sylhet': ['Zindabazar', 'Upatyaka', 'Ambarkhana', 'Subidbazar', 'Shahjalal Upashahar'],
  'Rajshahi': ['Boalia', 'Rajpara', 'Motihar', 'Chandrima'],
  'Khulna': ['Sonadanga', 'Khulna Sadar', 'Khalishpur', 'Daulatpur'],
  'Barishal': ['Barishal Sadar', 'Kawnia', 'Amanatganj'],
  'Rangpur': ['Kotwali', 'Tajhat', 'Mahiganj'],
  'Mymensingh': ['Sadar', 'Kotwali', 'Akua']
};
