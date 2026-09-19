// =========================================================================
// products.js - নিশা ক্রিয়েশনসের সমস্ত শাড়ি, কুর্তি ও গহনার ক্যাটালগ
// নতুন কোনো শাড়ি যোগ বা দাম পরিবর্তন করতে চাইলে শুধু এই ফাইলটি এডিট করবেন।
// =========================================================================

const INITIAL_PRODUCTS = [
      {
        id: "NC-101", binLocation: "র‍্যাক A-01 (জামদানি শাড়ি ব্লক)",
        title: "Pure Dhakai Jamdani Saree (Traditional Red & Zari Weave)",
        category: "jamdani",
        type: "saree",
        price: 799,
        mrp: 1599,
        upiOffer: 749,
        rating: 4.7,
        reviews: 312,
        img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "খাঁটি সুতির নরম জমিন, আভিজাত্যপূর্ণ ঢাকাই নকশা এবং জরির আঁচল। বিয়ে বা পুজোর জন্য সেরা পছন্দ। সাথে ব্লাউজ পিস রয়েছে।"
      },
      {
        id: "NC-102", binLocation: "র‍্যাক A-02 (সফট সিল্ক ও কাতান জোন)",
        title: "Soft Silk Katan Saree with Rich Golden Pallu (Royal Blue)",
        category: "silk",
        type: "saree",
        price: 950,
        mrp: 1899,
        upiOffer: 899,
        rating: 4.8,
        reviews: 480,
        img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "রয়্যাল ব্লু প্রিমিয়াম সফট সিল্ক। শরীরে খুব সুন্দরভাবে বসে এবং পরতে অত্যন্ত আরামদায়ক। বিশেষ পার্টি ও রিসেপশন লুক।"
      },
      {
        id: "NC-103", binLocation: "র‍্যাক B-01 (শান্তিপুরী তাঁত কটন)",
        title: "Bengal Handloom Tant Cotton Saree (Pastel Floral Border)",
        category: "tant",
        type: "saree",
        price: 499,
        mrp: 899,
        upiOffer: 460,
        rating: 4.5,
        reviews: 185,
        img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "শান্তিপুরী 100% পিওর সুতি তাঁত শাড়ি। গরমে ও রোজকার ব্যবহারে অত্যন্ত হালকা এবং টেকসই। সুন্দর কন্ট্রাস্ট পাড়।"
      },
      {
        id: "NC-104", binLocation: "শেলফ J-01 (গোল্ড প্লেটেড ব্রাইডাল জুয়েলারি)",
        title: "Traditional Bengali Gold-Plated Bridal Jewellery Choker Set",
        category: "necklace",
        type: "jewel",
        price: 399,
        mrp: 799,
        upiOffer: 360,
        rating: 4.6,
        reviews: 142,
        img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "1 গ্রাম গোল্ড প্লেটেড রানি নেকলেস ও ম্যাচিং ঝুমকো দুল। খাঁটি সোনার মতো ফিনিশ এবং দীর্ঘদিন রঙ অপরিবর্তিত থাকে।"
      },
      {
        id: "NC-105", binLocation: "শেলফ J-01 (গোল্ড প্লেটেড ব্রাইডাল জুয়েলারি)",
        title: "Antique Silver-Oxidised Choker with Hanging Pearls Set",
        category: "necklace",
        type: "jewel",
        price: 249,
        mrp: 499,
        upiOffer: 220,
        rating: 4.4,
        reviews: 98,
        img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "তাঁত বা বাটিক শাড়ির সাথে পরার জন্য সেরা ট্রেন্ডি অক্সিডাইজড সেট। সাথে মানানসই কানের দুল রয়েছে।"
      },
      {
        id: "NC-106", binLocation: "শেলফ J-02 (ডিজাইনার বালা ও চুড়ি ড্রয়ার)",
        title: "Designer Handcrafted Gold-Plated Churi / Bangles (Pair of 2)",
        category: "bangles",
        type: "jewel",
        price: 299,
        mrp: 599,
        upiOffer: 270,
        rating: 4.7,
        reviews: 120,
        img: "https://images.unsplash.com/photo-1611591475837-7f9999557a66?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "হাতে পরার প্রিমিয়াম ডিজাইনার বালা (2 পিস সেট)। সাইজ: 2.4, 2.6 এবং 2.8 উপলব্ধ। জল বা সাবানে সহজে রঙ নষ্ট হয় না।"
      },
      {
        id: "NC-107", binLocation: "র‍্যাক A-02 (সফট সিল্ক ও কাতান জোন)",
        title: "Semi-Katan Party Saree with Heavy Embroidered Border (Emerald Green)",
        category: "silk",
        type: "saree",
        price: 850,
        mrp: 1699,
        upiOffer: 799,
        rating: 4.8,
        reviews: 210,
        img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "পান্না সবুজ রঙের চোখজুড়ানো কাতান শাড়ি। বড় বর্ডার ও জমকালো কুঁচি ডিজাইন।"
      },
      {
        id: "NC-108", binLocation: "শেলফ J-03 (ঝুমকো ও কানের দুল ড্রয়ার)",
        title: "Royal Kundan Floral Drop Earrings / Jhumka with Red Stones",
        category: "earrings",
        type: "jewel",
        price: 180,
        mrp: 350,
        upiOffer: 160,
        rating: 4.6,
        reviews: 84,
        img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "কুন্দন কারুকাজ ও লাল পাথরের ঝুমকো। ওজনে হালকা এবং কানে পরলে কোনো ব্যথা হয় না।"
      },
      {
        id: "NC-109", binLocation: "র‍্যাক C-01 (কুর্তি ও সালোয়ার হ্যাঙ্গার)",
        title: "Designer Embroidered Anarkali Kurti with Dupatta (Pastel Pink)",
        category: "kurti",
        type: "kurti",
        price: 650,
        mrp: 1299,
        upiOffer: 599,
        rating: 4.6,
        reviews: 142,
        img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 0,
        inStock: true,
        desc: "আকর্ষণীয় জরি ও সুতোর নিখুঁত কাজ করা পার্টি ওয়্যার আনারকলি কুর্তি ও ওড়না সেট। প্রিমিয়াম নরম রেয়ন ফেব্রিক।"
      },
      {
        id: "NC-110", binLocation: "বিন F-01 (ছোটদের ফ্রক ও বেবি লেহেঙ্গা)",
        title: "Little Princess Butterfly Net Party Frock (Baby Pink)",
        category: "princess_frock",
        type: "girls",
        price: 450,
        mrp: 899,
        upiOffer: 410,
        rating: 4.8,
        reviews: 116,
        img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 28,
        inStock: true,
        desc: "ছোট রাজকন্যাদের জন্য আরামদায়ক নরম সুতির আস্তরণ সহ বাটারফ্লাই পার্টি ফ্রক। জন্মদিন ও উৎসবের সেরা পোশাক।"
      },
      {
        id: "NC-111", binLocation: "বিন F-01 (ছোটদের ফ্রক ও বেবি লেহেঙ্গা)",
        title: "Kids Ethnic Floral Baby Lehenga Choli Set (Yellow & Maroon)",
        category: "baby_lehenga",
        type: "girls",
        price: 550,
        mrp: 1099,
        upiOffer: 499,
        rating: 4.7,
        reviews: 92,
        img: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=600&auto=format&fit=crop&q=80",
        stock: 100,
        initialStock: 100,
        sold: 19,
        inStock: true,
        desc: "পুজো ও বিয়ের অনুষ্ঠানের জন্য আকর্ষণীয় বেবি লেহেঙ্গা-চোলি ও ওড়না সেট। ত্বকবান্ধব ও নরম কাপড়।"
      }
    ];

// =========================================================================
// DEFAULT DYNAMIC HOME BANNERS (Flipkart / Amazon স্টাইল স্বয়ংক্রিয় স্লাইডার)
// অ্যাডমিন প্যানেল থেকে যখন ইচ্ছা নতুন ব্যানার যোগ, এডিট বা ডিলিট করা যাবে।
// =========================================================================
const DEFAULT_BANNERS = [
  {
    id: "banner-1",
    title: "শারদীয়া উৎসব মেগা অফার",
    subtitle: "খাঁটি ঢাকাই জামদানি শাড়িতে 40% - 60% ছাড়!",
    badge: "🔥 ফেস্টিভ্যাল ধামাকা",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #701a75, #9333ea, #db2777)",
    targetCategory: "jamdani",
    active: true
  },
  {
    id: "banner-2",
    title: "রয়েল সফট সিল্ক ও বেনারসি",
    subtitle: "জরি বর্ডার ও প্রিমিয়াম ডিজাইনার আঁচল কালেকশন",
    badge: "✨ প্রিমিয়াম কোয়ালিটি",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #831843, #be185d, #f43f5e)",
    targetCategory: "silk",
    active: true
  },
  {
    id: "banner-3",
    title: "শান্তিপুরী ও ফুলিয়া সুতি তাঁত",
    subtitle: "দৈনন্দিন ও উৎসবের সেরা আরামদায়ক হ্যান্ডলুম",
    badge: "🌿 100% খাঁটি সুতি",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #065f46, #059669, #10b981)",
    targetCategory: "tant",
    active: true
  },
  {
    id: "banner-4",
    title: "ট্রেন্ডি কুর্তি ও লং গাউন",
    subtitle: "মাত্র ₹499 থেকে শুরু • আধুনিক ফিটিং ও প্রিমিয়াম ফ্যাব্রিক",
    badge: "⚡ বেস্টসেলার",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #1e3a8a, #2563eb, #38bdf8)",
    targetCategory: "kurti",
    active: true
  },
  {
    id: "banner-5",
    title: "ব্রাইডাল জুয়েলারি ও চোকার সেট",
    subtitle: "কুন্দন নেকলেস ও গোল্ড প্লেটেড নিখুঁত বালা কালেকশন",
    badge: "💎 রয়্যাল ফিনিশিং",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #78350f, #b45309, #f59e0b)",
    targetCategory: "jewel",
    active: true
  },
  {
    id: "banner-6",
    title: "কিউট বেবি ফ্রক ও উৎসব সেট",
    subtitle: "ছোট্ট সোনাদের জন্য আরামদায়ক কালারফুল ডিজাইনার ফ্রক",
    badge: "👧 স্পেশাল কিডস কালেকশন",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80",
    bgGradient: "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
    targetCategory: "girls",
    active: true
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INITIAL_PRODUCTS, DEFAULT_BANNERS };
}

if (typeof window !== 'undefined') {
  window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  window.DEFAULT_BANNERS = DEFAULT_BANNERS;
}
if (typeof globalThis !== 'undefined') {
  globalThis.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
  globalThis.DEFAULT_BANNERS = DEFAULT_BANNERS;
}
