var products = [];
if (typeof INITIAL_PRODUCTS !== 'undefined' && Array.isArray(INITIAL_PRODUCTS)) {
  products = [...INITIAL_PRODUCTS];
}
var currentCategoryTab = 'popular';
var orders = [];
try {
  const storedO = localStorage.getItem('nc_orders');
  orders = storedO ? JSON.parse(storedO) : [];
} catch(e) { orders = []; }
var currentCustomer = null;
try {
  const storedCust = localStorage.getItem('nc_customer_profile');
  currentCustomer = storedCust ? JSON.parse(storedCust) : null;
} catch(e) { currentCustomer = null; }

var currentPdpProduct = null;
// =========================================================================
// RUNTIME BRAND SANITIZER & LOCALSTORAGE MIGRATION
// =========================================================================
function sanitizeBoutiqueRuntime() {
  try {
    // 1. Force PDP badge to 'নিশা স্পেশাল'
    const b = document.getElementById('t-pdpReturnSecBadge');
    if (b) b.textContent = 'নিশা স্পেশাল';

    // 2. Clean localStorage nc_orders
    let ords = localStorage.getItem('nc_orders');
    if (ords && (ords.includes('Meesho') || ords.includes('মেসো') || ords.includes('মেশো') || ords.includes('Flipkart'))) {
      ords = ords.replace(/Meesho\s*স্পেশাল|Meesho\s*Special/gi, 'নিশা স্পেশাল');
      ords = ords.replace(/Meesho|মেসো|মেশো/gi, 'নিশা');
      ords = ords.replace(/Flipkart/gi, 'নিশা বুটিক');
      localStorage.setItem('nc_orders', ords);
    }
  } catch(e) {}
}

// =========================================================================
// app.js - নিশা ক্রিয়েশনস অ্যাপের সমস্ত কার্যক্ষমতা ও লজিক
// কার্ট, অর্ডার প্লেস, লাইভ ট্র্যাকিং, সার্চ, ফিল্টার, ভাষা পরিবর্তন ও রিভিউ
// =========================================================================

// ==========================================

    // ==========================================
    // BILINGUAL (BENGALI & ENGLISH) DICTIONARY
    // ==========================================
    let currentLang = localStorage.getItem('nc_lang') || 'bn';
var cart = [];
try {
  const storedC = localStorage.getItem('nc_cart');
  cart = storedC ? JSON.parse(storedC) : [];
} catch(e) { cart = []; }

var wishlist = [];
try {
  const storedW = localStorage.getItem('nc_wishlist');
  wishlist = storedW ? JSON.parse(storedW) : [];
} catch(e) { wishlist = []; }


    const I18N = {
      bn: {
        // Quick Toggle & Header
        quickBadge: "EN",
        brandSub: "এক্সক্লুসিভ বুটিক",
        deliveryLoc: "ডেলিভারি: আমতা, হাওড়া - 711401",
        freeDeliveryBadge: "ফ্রি হোম ডেলিভারি",
        pwaTitle: "নিশা ক্রিয়েশনস অ্যাপ ইনস্টল করুন",
        pwaSub: "ফোনে একদম আসল অ্যাপের মতো চলবে!",
        pwaBtn: "ইনস্টল",
        searchPlaceholder: "শাড়ির নাম, জামদানি বা গহনা খুঁজুন...",
        pdpSearchPlaceholder: "পণ্য খুঁজুন...",
        // Nav Tabs
        navHome: "হোম",
        navCategories: "ক্যাটাগরি",
        navVideos: "রিলস",
        navWishlist: "উইশলিস্ট",
        navOrders: "অর্ডার",
        navAccount: "অ্যাকাউন্ট",
                // OTP Modal & Auth
        authModalTitle: "কাস্টমার ওটিপি লগইন",
        otpPhoneHeading: "মোবাইল নম্বর লিখুন",
        otpPhoneSub: "আপনার ১০ ডিজিটের মোবাইল নম্বরে ৪-সংখ্যার ওটিপি পাঠানো হবে",
        authLblPhone: "মোবাইল নম্বর (১০ ডিজিট) *",
        authPhonePlaceholder: "যেমন: 9832100000",
        btnSendOtpText: "ওটিপি কোড পাঠান",
        otpSecurityNotice: "১০০% নিরাপদ ও কোনো পাসওয়ার্ড মনে রাখার প্রয়োজন নেই",
        otpSmsAlertTitle: "SMS Alert • Nisha Creations",
        otpSmsTime: "সবেমাত্র পাঠানো হয়েছে",
        otpLiveOtpLabel: "আপনার লগইন ওটিপি কোড:",
        otpSentToTextPre: "নম্বরে ওটিপি পাঠানো হয়েছে:",
        btnChangePhone: "← নম্বর পরিবর্তন করুন",
        lblEnterOtp: "৪ ডিজিটের ওটিপি লিখুন *",
        btnAutoFillOtp: "এক-ক্লিকে ওটিপি বসান",
        authLblName: "আপনার পুরো নাম *",
        authNamePlaceholder: "যেমন: Nisha Ghanti",
        authLblAddr: "ডেলিভারি ঠিকানা ও ল্যান্ডমার্ক *",
        authBtnGps: "📍 বর্তমান GPS লোকেশন",
        authAddrPlaceholder: "বাড়ি নং, এলাকা বা গ্রাম (যেমন: আমতা চাঁদনী, হাওড়া - 711401)",
        btnVerifyOtpText: "ওটিপি যাচাই ও লগইন সম্পন্ন করুন",
        btnCancelAuth: "বাতিল",
        drawerLangTitle: "অ্যাপের ভাষা (App Language)",
        drawerGuestTitle: "স্বাগতম অতিথি!",
        drawerGuestSub: "অর্ডার ট্র্যাক ও ছাড় পেতে",
        drawerBtnLogin: "লগইন",
        drawerBtnLogout: "লগআউট",
        drawerAuthItemTitleLogin: "লগইন বা রেজিস্টার",
        drawerAuthItemSubLogin: "মোবাইল নম্বর ও ওটিপি দিয়ে প্রবেশ করুন",
        drawerAuthItemTitleLogout: "লগআউট",
        drawerAuthItemSubLogout: "অ্যাকাউন্ট থেকে প্রস্থান করুন",
        // Unified Categories
        uCatAll: "সব কালেকশন",
        uCatWomen: "👩 Women",
        uCatGirls: "👧 Girls ফ্রক",
        uCatJamdani: "ঢাকাই জামদানি",
        uCatSilk: "সফট সিল্ক",
        uCatTant: "সুতি তাঁত",
        uCatKurti: "কুর্তি ও সেট",
        uCatJewel: "গহনা ও চোকার",
        uCatBangles: "বালা ও চুড়ি",
        // Flash Sale
        flashSaleTitle: "FLASH SALE • স্পেশাল 2 ঘণ্টার মেগা অফার",
        flashSaleBadge: "UPTO 70% ছাড়",
        flashSaleSub: "আমতায় 2 ঘণ্টায় ফ্রি ডেলিভারি • অফার শেষ হতে বাকি:",
        timerHoursLbl: "ঘণ্টা",
        timerMinsLbl: "মিনিট",
        timerSecsLbl: "সেকেন্ড",
        btnFlashOrder: "অর্ডার করুন",
        // Refer Strip
        referTitle: "রেফার করুন ও পান ₹50 ছাড়!",
        referSub: "বান্ধবীদের সাথে শেয়ার করলে আপনি ও বান্ধবী দুজনেই ছাড় পাবেন!",
        // Filter Chips & Search Results
        ncTapToEdit: "ট্যাপ করে পরিবর্তন করুন",
        chipSort: "সর্ট (Sort)",
        chipFilter: "ফিল্টার",
        chipBudget: "₹500 এর নিচে",
        chipSilk: "সিল্ক ও কাতান",
        chipDelivery: "আমতায় ফ্রি ডেলিভারি",
        ncAllProductsLink: "সব প্রোডাক্ট ➔",
        ncTrendingTitle: "🔥 জনপ্রিয় সার্চ (Trending Searches)",
        // Categories Screen
        catPageTitle: "ক্যাটাগরি",
        sidePopular: "জনপ্রিয়",
        sideSaree: "শাড়ি ও কুর্তি",
        sideJewel: "জুয়েলারি",
        sideBags: "ব্যাগ ও পার্স",
        sidePerfume: "পারফিউম",
        sideWestern: "ওয়েস্টার্ন",
        sideLingerie: "নাইটওয়্যার",
        // Subcategories
        subCottonSarees: "সুতি শাড়ি",
        subNetSarees: "নেট ও জর্জেট",
        subBudgetSarees: "বাজেট শাড়ি",
        subSilkSarees: "সফট সিল্ক শাড়ি",
        subJamdani: "ঢাকাই জামদানি",
        subBridalSarees: "বউভাত ও ব্রাইডাল",
        subAllKurtis: "সব কুর্তি",
        subAnarkali: "আনারকলি কুর্তি",
        subRayonKurti: "রেয়ন কুর্তি",
        subCottonKurti: "কটন কুর্তি",
        subStraightKurti: "স্ট্রেট কুর্তি",
        subLongKurti: "লং কুর্তি",
        subAllSets: "সব কুর্তা সেট",
        subPalazzoSets: "প্যালাজো সেট",
        subPantSets: "প্যান্ট সেট",
        subShararaSets: "সারারা সেট",
        // Jewellery
        subAllJewel: "সকল গহনা",
        subJewelSets: "গহনা ও চোকার",
        subEarrings: "কানের দুল ও ঝুমকা",
        subMangalsutra: "মঙ্গলসূত্র",
        subChains: "নেকলেস ও চেইন",
        subBangles: "বালা ও চুড়ি",
        subAnklets: "নুপুর ও নথ",
        subKamarbandh: "কোমরবন্ধ ও টিকলি",
        // PDP Strings
        pdpSelectColorLbl: "🎨 কালার ভেরিয়েন্ট (Select Color):",
        pdpSelectedColorNameBadge: "মূল কালার",
        pdpSelectSizeLbl: "সাইজ নির্বাচন করুন (Select Size):",
        pdpSizeChartBtn: "📏 সাইজ চার্ট দেখুন",
        pdpReturnSecHeader: "রিটার্ন পলিসি ও বিশেষ ছাড় নির্বাচন:",
        pdpReturnSecBadge: "নিশা স্পেশাল",
        pdpReturnAllLabel: "(সব ধরণের রিটার্ন সুবিধা)",
        pdpReturnAllDesc: "পছন্দ না হলে, সাইজ না মিললে বা অন্য যেকোনো কারণে 7 দিনের মধ্যে সহজ রিটার্ন ও পরিবর্তন।",
        pdpReturnDefDesc: "শুধুমাত্র ছেঁড়া বা ভুল শাড়ি এলে রিটার্ন প্রযোজ্য। এতে দোকানদার ও কাস্টমার উভয়ের অতিরিক্ত সাশ্রয় হয়!",
        pdpMatchingTitle: "✨ ম্যাচিং জুয়েলারি কম্বো (ম্যাচিং ব্রাইডাল নেকলেস সেট)",
        pdpMatchingBadge: "কম্বো অফার",
        btnPdpAddCart: "কার্টে রাখুন",
        btnPdpBuyNow: "এখনই কিনুন",
        // Customer Account Hub
        custHeading: "কাস্টমার অ্যাকাউন্ট ও অর্ডার (My Account)",
        custTitle: "গ্রাহক অ্যাকাউন্ট",
        ncCoinLabel: "নিশা রিওয়ার্ডস কয়েন",
        ncCoinSub: "(যেকোনো অর্ডারে সরাসরি ছাড় প্রযোজ্য)",
        langTitle: "ভাষা নির্বাচন (Language)",
        langSub: "পছন্দের ভাষায় সম্পূর্ণ অ্যাপটি ব্যবহার করুন:",
        profileTitle: "আপনার বিবরণ ও ডেলিভারি ঠিকানা",
        profileAddressHeading: "আপনার সেভ করা ডেলিভারি ঠিকানা",
        btnEditAddressToggle: "ঠিকানা পরিবর্তন / এডিট করুন",
        lblCustName: "আপনার নাম:",
        lblCustPhone: "মোবাইল নম্বর:",
        lblCustAddr: "ডেলিভারি ঠিকানা (আমতা, হাওড়া):",
        btnSaveProfile: "তথ্য সেভ করুন",
        quickLinks: "প্রয়োজনীয় সেবা",
        linkOrders: "আমার সমস্ত অর্ডার ও ট্র্যাকিং",
        linkWishlist: "পছন্দের শাড়ি ও গহনা তালিকা",
        linkRefer: "রেফার করুন ও 50 টাকা ছাড় পান",
        supportTitle: "সরাসরি সহায়তা ও অর্ডার বুকিং",
        supportSub: "যেকোনো প্রশ্ন বা পছন্দের শাড়ির জন্য নিশা দিদির সাথে যোগাযোগ করুন:",
        // Cart & Checkout
        cartModalTitle: "আপনার চেকআউট",
        step1Title: "অর্ডার ও ঠিকানা",
        step2Title: "পেমেন্ট ও ছাড়",
        cartOfferRibbonSub: "অনলাইনে পেমেন্ট করলে সাথে সাথে অতিরিক্ত ₹38 ছাড় পাবেন!",
        btnSaveAddrInline: "ঠিকানা সেভ করুন",
        cartDeliveryNote: "আমতায় দ্রুত ফ্রি ডেলিভারি: আজকের মধ্যে পাঠানো হবে",
        cartItemDetailsHeader: "অর্ডার করা পণ্যের বিবরণ",
        coinRedeemTitle: "সুপারকয়েন ব্যবহার করুন (Redeem Coins)",
        coinRedeemSub: "প্রতি 100 কয়েনে ₹1 ছাড়",
        coinApplyLabel: "ছাড় নিন",
        btnApplyCoupon: "প্রয়োগ করুন",
        cartGiftWrapLabel: "গিফট প্যাকিং (বিনামূল্যে)",
        cartPriceDetailsHeader: "বিলিং বিবরণ",
        lblTotalMrp: "মোট পণ্যের দাম (MRP):",
        lblStoreDiscount: "বিশেষ বুটিক ছাড়:",
        lblCoinDiscount: "সুপারকয়েন ছাড়:",
        lblReturnDiscount: "রিটার্ন অপশন ছাড়:",
        lblDeliveryFee: "ডেলিভারি চার্জ:",
        lblTotalPayable: "মোট প্রদেয় টাকা:",
        btnStep1Continue: "পেমেন্ট ধাপে যান ➔",
        cartStep2Header: "পেমেন্ট মাধ্যম নির্বাচন করুন:",
        cartUpiTitle: "অনলাইন পেমেন্ট (UPI / GPay / PhonePe)",
        cartUpiInstructions: "PhonePe, Google Pay, Paytm বা যেকোনো UPI দিয়ে সরাসরি পেমেন্ট করুন:",
        cartUpiOfficialText: "নিশা ক্রিয়েশনসের অফিশিয়াল সুরক্ষিত মার্চেন্ট একাউন্ট:",
        cartUpiOpenBtn: "🚀 PhonePe / GPay সরাসরি খুলুন",
        cartCodTitle: "ক্যাশ অন ডেলিভারি (COD)",
        cartCodSub: "পার্সেল হাতে পেয়ে ক্যাশ টাকা দিন",
        cartCodNoDiscount: "⚠️ কোনো অতিরিক্ত ছাড় প্রযোজ্য নয়",
        // Welcome Gift
        welcomeTitle: "🎉 স্বাগতম উপহার!",
        welcomeSub: "নিশা ক্রিয়েশনসে প্রথম আসার জন্য আপনার বিশেষ লাকি গিফট বক্স:",
        mysteryBoxHeading: "মিস্ট্রি গিফট বক্স",
        mysteryBoxSub: "যেকোনো অর্ডারে সরাসরি ক্যাশ ছাড়ের সুপারকয়েন পান",
        congratsHeader: "অভিনন্দন!",
        giftInstructionText: "আপনার ওয়ালেটে যুক্ত হয়েছে! চেকআউটে যেকোনো অর্ডারে ছাড় হিসেবে ব্যবহার করুন।",
        btnStartShopping: "শপিং শুরু করুন ➔",
        // Wishlist & Orders
        wishlistEmptyTitle: "আপনার পছন্দের তালিকা ফাঁকা!",
        wishlistEmptySub: "হোম পেজে গিয়ে যেকোনো শাড়ি বা পোশাকে লাভ (❤️) চিহ্নে চাপ দিন, সেগুলি এখানে সুন্দরভাবে জমা হবে।",
        btnWishlistShop: "শাড়ি ও কালেকশন দেখুন ➔",
        ordersHeaderTitle: "আমার সমস্ত অর্ডার ও লাইভ ট্র্যাকিং",
        quickBadge: "EN",
        brandSub: "এক্সক্লুসিভ বুটিক",
        deliveryLoc: "ডেলিভারি: আমতা, হাওড়া - 711401",
        freeDeliveryBadge: "ফ্রি হোম ডেলিভারি",
        pwaTitle: "নিশা ক্রিয়েশনস অ্যাপ ইনস্টল করুন",
        pwaSub: "ফোনে একদম আসল অ্যাপের মতো চলবে!",
        pwaBtn: "ইনস্টল",
        searchPlaceholder: "শাড়ির নাম, জামদানি বা গহনা খুঁজুন...",
        // Nav
        navHome: "হোম",
        navCategories: "ক্যাটাগরি",
        navVideos: "রিলস",
        navWishlist: "উইশলিস্ট",
        navOrders: "অর্ডার",
        navAccount: "অ্যাকাউন্ট",
        // Categories Screen
        catPageTitle: "ক্যাটাগরি",
        sidePopular: "জনপ্রিয়",
        sideSaree: "শাড়ি ও কুর্তি",
        sideJewel: "জুয়েলারি",
        sideBags: "ব্যাগ ও পার্স",
        sidePerfume: "পারফিউম",
        sideWestern: "ওয়েস্টার্ন",
        sideLingerie: "নাইটওয়্যার",
        // Subcategories
        subCottonSarees: "সুতি শাড়ি",
        subNetSarees: "নেট ও জর্জেট",
        subBudgetSarees: "বাজেট শাড়ি",
        subSilkSarees: "সফট সিল্ক শাড়ি",
        subJamdani: "ঢাকাই জামদানি",
        subBridalSarees: "বউভাত ও ব্রাইডাল",
        subAllKurtis: "সব কুর্তি",
        subAnarkali: "আনারকলি কুর্তি",
        subRayonKurti: "রেয়ন কুর্তি",
        subCottonKurti: "কটন কুর্তি",
        subStraightKurti: "স্ট্রেট কুর্তি",
        subLongKurti: "লং কুর্তি",
        subAllSets: "সব কুর্তা সেট",
        subPalazzoSets: "প্যালাজো সেট",
        subPantSets: "প্যান্ট সেট",
        subShararaSets: "সারারা সেট",
        // Jewellery
        subAllJewel: "সকল গহনা",
        subJewelSets: "গহনা ও চোকার",
        subEarrings: "কানের দুল ও ঝুমকা",
        subMangalsutra: "মঙ্গলসূত্র",
        subChains: "নেকলেস ও চেইন",
        subBangles: "বালা ও চুড়ি",
        subAnklets: "নুপুর ও নথ",
        subKamarbandh: "কোমরবন্ধ ও টিকলি",
        // Bags
        subHandbags: "লেডিস হ্যান্ডব্যাগ",
        subSlingBags: "স্লিং ব্যাগ",
        subBridalPotli: "ব্রাইডাল বটুয়া",
        subClutches: "পার্টি ক্লাচ",
        subToteBags: "টোট ব্যাগ",
        subOfficeBags: "অফিস ব্যাগ",
        // Perfume
        subFloralPerfume: "ফ্লোরাল সেন্ট",
        subRoyalAttar: "খাঁটি সুগন্ধি আতর",
        subPartyPerfume: "পার্টি পারফিউম",
        subPocketPerfume: "পকেট সেন্ট",
        subBodyMist: "ফ্রেশ বডি মিস্ট",
        subGiftBox: "ব্রাইডাল সেন্ট বক্স",
        // Customer Account
        custHeading: "কাস্টমার অ্যাকাউন্ট ও অর্ডার (My Account)",
        custTitle: "গ্রাহক অ্যাকাউন্ট",
        custCoins: "নিশা রিওয়ার্ডস কয়েন",
        langTitle: "ভাষা নির্বাচন (Language)",
        langSub: "পছন্দের ভাষায় সম্পূর্ণ অ্যাপটি ব্যবহার করুন:",
        profileTitle: "আপনার বিবরণ ও ডেলিভারি ঠিকানা",
        lblCustName: "আপনার নাম:",
        lblCustPhone: "মোবাইল নম্বর:",
        lblCustAddr: "ডেলিভারি ঠিকানা (আমতা, হাওড়া):",
        btnSaveProfile: "তথ্য সেভ করুন",
        quickLinks: "প্রয়োজনীয় সেবা",
        linkOrders: "আমার সমস্ত অর্ডার ও ট্র্যাকিং",
        linkWishlist: "পছন্দের শাড়ি ও গহনা তালিকা",
        linkRefer: "রেফার করুন ও 50 টাকা ছাড় পান",
        supportTitle: "সরাসরি সহায়তা ও অর্ডার বুকিং",
        supportSub: "যেকোনো প্রশ্ন বা পছন্দের শাড়ির জন্য নিশা দিদির সাথে যোগাযোগ করুন:"
      },
      en: {
        // Quick Toggle & Header
        quickBadge: "বাং",
        brandSub: "Exclusive Boutique",
        deliveryLoc: "Delivery: Amta, Howrah - 711401",
        freeDeliveryBadge: "Free Home Delivery",
        pwaTitle: "Install Nisha Creations App",
        pwaSub: "Fast, seamless native app on your phone!",
        pwaBtn: "Install",
        searchPlaceholder: "Search sarees, jewellery or kurtis...",
        pdpSearchPlaceholder: "Search for products",
        // Nav Tabs
        navHome: "Home",
        navCategories: "Categories",
        navVideos: "Reels",
        navWishlist: "Wishlist",
        navOrders: "Orders",
        navAccount: "Account",
                // OTP Modal & Auth
        authModalTitle: "Customer OTP Login",
        otpPhoneHeading: "Enter Mobile Number",
        otpPhoneSub: "A 4-digit OTP will be sent to your 10-digit mobile number",
        authLblPhone: "Mobile Number (10 Digits) *",
        authPhonePlaceholder: "e.g. 9832100000",
        btnSendOtpText: "Send OTP Code",
        otpSecurityNotice: "100% Secure & No Password Needed",
        otpSmsAlertTitle: "SMS Alert • Nisha Creations",
        otpSmsTime: "Just sent",
        otpLiveOtpLabel: "Your Login OTP Code:",
        otpSentToTextPre: "OTP sent to:",
        btnChangePhone: "← Change Number",
        lblEnterOtp: "Enter 4-Digit OTP *",
        btnAutoFillOtp: "Auto-Fill OTP",
        authLblName: "Your Full Name *",
        authNamePlaceholder: "e.g. Nisha Ghanti",
        authLblAddr: "Delivery Address & Landmark *",
        authBtnGps: "📍 Current GPS Location",
        authAddrPlaceholder: "House No, Area or Village (e.g. Amta Chandni, Howrah - 711401)",
        btnVerifyOtpText: "Verify OTP & Complete Login",
        btnCancelAuth: "Cancel",
        drawerLangTitle: "App Language",
        drawerGuestTitle: "Welcome Guest!",
        drawerGuestSub: "Track orders & get rewards",
        drawerBtnLogin: "Login",
        drawerBtnLogout: "Logout",
        drawerAuthItemTitleLogin: "Login / Register",
        drawerAuthItemSubLogin: "Sign in with mobile number & OTP",
        drawerAuthItemTitleLogout: "Logout",
        drawerAuthItemSubLogout: "Sign out of this account",
        // Unified Categories
        uCatAll: "All Collections",
        uCatWomen: "👩 Women",
        uCatGirls: "👧 Girls Frock",
        uCatJamdani: "Dhakai Jamdani",
        uCatSilk: "Soft Silk",
        uCatTant: "Tant Cotton",
        uCatKurti: "Kurtis & Sets",
        uCatJewel: "Jewellery & Choker",
        uCatBangles: "Bangles & Churi",
        // Flash Sale
        flashSaleTitle: "FLASH SALE • Special 2-Hour Mega Offer",
        flashSaleBadge: "UPTO 70% OFF",
        flashSaleSub: "Free 2-Hour Delivery in Amta • Ends in:",
        timerHoursLbl: "Hours",
        timerMinsLbl: "Mins",
        timerSecsLbl: "Secs",
        btnFlashOrder: "Order Now",
        // Refer Strip
        referTitle: "Refer & Get ₹50 OFF!",
        referSub: "Share with friends and both get instant discounts!",
        // Filter Chips & Search Results
        ncTapToEdit: "Tap to edit",
        chipSort: "Sort",
        chipFilter: "Filter",
        chipBudget: "Under ₹500",
        chipSilk: "Silk & Katan",
        chipDelivery: "Free Delivery (Amta)",
        ncAllProductsLink: "All Products ➔",
        ncTrendingTitle: "🔥 Trending Searches",
        // Categories Screen
        catPageTitle: "Categories",
        sidePopular: "Popular",
        sideSaree: "Kurti & Saree",
        sideJewel: "Jewellery",
        sideBags: "Bags & Purses",
        sidePerfume: "Perfumes",
        sideWestern: "Western Wear",
        sideLingerie: "Nightwear",
        // Subcategories
        subCottonSarees: "Cotton Sarees",
        subNetSarees: "Net & Georgette",
        subBudgetSarees: "Budget Sarees",
        subSilkSarees: "Soft Silk Sarees",
        subJamdani: "Dhakai Jamdani",
        subBridalSarees: "Bridal Sarees",
        subAllKurtis: "All Kurtis",
        subAnarkali: "Anarkali Kurtis",
        subRayonKurti: "Rayon Kurtis",
        subCottonKurti: "Cotton Kurtis",
        subStraightKurti: "Straight Kurtis",
        subLongKurti: "Long Kurtis",
        subAllSets: "All Kurta Sets",
        subPalazzoSets: "Palazzo Sets",
        subPantSets: "Pant Sets",
        subShararaSets: "Sharara Sets",
        // Jewellery
        subAllJewel: "All Jewellery",
        subJewelSets: "Necklace Sets",
        subEarrings: "Earrings & Jhumka",
        subMangalsutra: "Mangalsutras",
        subChains: "Chains & Necklaces",
        subBangles: "Bangles & Churi",
        subAnklets: "Anklets & Nosepins",
        subKamarbandh: "Waistbands (Kamarbandh)",
        // PDP Strings
        pdpSelectColorLbl: "🎨 Color Variants (Select Color):",
        pdpSelectedColorNameBadge: "Base Color",
        pdpSelectSizeLbl: "Select Size:",
        pdpSizeChartBtn: "📏 View Size Chart",
        pdpReturnSecHeader: "Return Policy & Savings:",
        pdpReturnSecBadge: "নিশা স্পেশাল",
        pdpReturnAllLabel: "(All Return Options Allowed)",
        pdpReturnAllDesc: "Easy 7-day returns & replacement for any reason if size or fit is not right.",
        pdpReturnDefDesc: "Return only if wrong or defective item delivered. Extra savings for you!",
        pdpMatchingTitle: "✨ Complete Look (Matching Bridal Necklace Set)",
        pdpMatchingBadge: "Combo Offer",
        btnPdpAddCart: "Add to Cart",
        btnPdpBuyNow: "Buy Now",
        // Customer Account Hub
        custHeading: "Customer Account & Orders (My Account)",
        custTitle: "Customer Account",
        ncCoinLabel: "Nisha Rewards Coins",
        ncCoinSub: "(Applicable as instant discount on any order)",
        langTitle: "Language Selection",
        langSub: "Choose your preferred language for the whole app:",
        profileTitle: "Your Details & Delivery Address",
        profileAddressHeading: "Saved Delivery Address",
        btnEditAddressToggle: "Edit / Change Address",
        lblCustName: "Your Name:",
        lblCustPhone: "Phone Number:",
        lblCustAddr: "Delivery Address (Amta, Howrah):",
        btnSaveProfile: "Save Details",
        quickLinks: "Quick Services",
        linkOrders: "My Orders & Live Tracking",
        linkWishlist: "My Wishlist Collection",
        linkRefer: "Refer & Earn ₹50",
        supportTitle: "Direct Support & Booking",
        supportSub: "For any questions or custom orders, contact Nisha directly:",
        // Cart & Checkout
        cartModalTitle: "Your Checkout",
        step1Title: "Order & Address",
        step2Title: "Payment & Offers",
        cartOfferRibbonSub: "₹38 Extra Discount automatically applied on online payments!",
        btnSaveAddrInline: "Save Address",
        cartDeliveryNote: "Fast Free Delivery in Amta: Dispatched today",
        cartItemDetailsHeader: "Ordered Items & Quantity",
        coinRedeemTitle: "Use SuperCoins (Redeem Coins)",
        coinRedeemSub: "100 Coins = ₹1 Discount",
        coinApplyLabel: "Apply",
        btnApplyCoupon: "Apply",
        cartGiftWrapLabel: "Gift Wrapping (Free)",
        cartPriceDetailsHeader: "Price Details",
        lblTotalMrp: "Total MRP:",
        lblStoreDiscount: "Boutique Discount:",
        lblCoinDiscount: "SuperCoins Discount:",
        lblReturnDiscount: "Defective-Only Discount:",
        lblDeliveryFee: "Delivery Fee:",
        lblTotalPayable: "Total Amount:",
        btnStep1Continue: "Proceed to Payment ➔",
        cartStep2Header: "Select Payment Method:",
        cartUpiTitle: "Online Payment (UPI / GPay / PhonePe)",
        cartUpiInstructions: "Pay directly via PhonePe, Google Pay, Paytm or any UPI app:",
        cartUpiOfficialText: "Nisha Creations official verified merchant account:",
        cartUpiOpenBtn: "🚀 Open PhonePe / GPay Directly",
        cartCodTitle: "Cash on Delivery (COD)",
        cartCodSub: "Pay cash when parcel arrives at your door",
        cartCodNoDiscount: "⚠️ No extra online discount applies",
        // Welcome Gift
        welcomeTitle: "🎉 Welcome Gift!",
        welcomeSub: "Your special lucky gift box for visiting Nisha Creations:",
        mysteryBoxHeading: "Mystery Gift Box",
        mysteryBoxSub: "Win cash-discount SuperCoins for any order",
        congratsHeader: "Congratulations!",
        giftInstructionText: "Added to your wallet! Use as instant discount at checkout.",
        btnStartShopping: "Start Shopping ➔",
        // Wishlist & Orders
        wishlistEmptyTitle: "Your Wishlist is Empty!",
        wishlistEmptySub: "Tap the heart (❤️) icon on any saree or jewellery to save it here.",
        btnWishlistShop: "Explore Sarees & Collections ➔",
        ordersHeaderTitle: "My Orders & Live Tracking",
        brandSub: "Exclusive Boutique",
        deliveryLoc: "Delivery: Amta, Howrah - 711401",
        freeDeliveryBadge: "Free Home Delivery",
        pwaTitle: "Install Nisha Creations App",
        pwaSub: "Runs full screen like a native mobile app!",
        pwaBtn: "Install",
        searchPlaceholder: "Search sarees, jewellery or kurtis...",
        // Nav
        navHome: "Home",
        navCategories: "Categories",
        navVideos: "Reels",
        navWishlist: "Wishlist",
        navOrders: "Orders",
        navAccount: "Account",
        // Categories Screen
        catPageTitle: "CATEGORIES",
        sidePopular: "Popular",
        sideSaree: "Kurti & Saree",
        sideJewel: "Jewellery",
        sideBags: "Bags",
        sidePerfume: "Perfumes",
        sideWestern: "Western",
        sideLingerie: "Sleepwear",
        // Subcategories
        subCottonSarees: "Cotton Sarees",
        subNetSarees: "Net Sarees",
        subBudgetSarees: "Under 499",
        subSilkSarees: "Silk Sarees",
        subJamdani: "Dhakai Jamdani",
        subBridalSarees: "Bridal Sarees",
        subAllKurtis: "All Kurtis",
        subAnarkali: "Anarkali Kurtis",
        subRayonKurti: "Rayon Kurtis",
        subCottonKurti: "Cotton Kurtis",
        subStraightKurti: "Straight Kurtis",
        subLongKurti: "Long Kurtis",
        subAllSets: "All Kurta Sets",
        subPalazzoSets: "Palazzo Sets",
        subPantSets: "Pant Sets",
        subShararaSets: "Sharara Sets",
        // Jewellery
        subAllJewel: "All Jewellery",
        subJewelSets: "Jewellery Sets",
        subEarrings: "Earrings",
        subMangalsutra: "Mangalsutra",
        subChains: "Necklaces & Chains",
        subBangles: "Bangles & Bracelets",
        subAnklets: "Anklets & Nosepins",
        subKamarbandh: "Kamarbandh & Maangtika",
        // Bags
        subHandbags: "Handbags",
        subSlingBags: "Sling Bags",
        subBridalPotli: "Bridal Potli",
        subClutches: "Party Clutches",
        subToteBags: "Tote Bags",
        subOfficeBags: "Office Bags",
        // Perfume
        subFloralPerfume: "Floral Perfumes",
        subRoyalAttar: "Royal Attar",
        subPartyPerfume: "Party Perfumes",
        subPocketPerfume: "Pocket Perfumes",
        subBodyMist: "Fresh Body Mist",
        subGiftBox: "Bridal Scent Box",
        // Customer Account
        custHeading: "Customer Account & Orders",
        custTitle: "Customer Account",
        custCoins: "Nisha Rewards Coins",
        langTitle: "Language Selection",
        langSub: "Choose your preferred language across the entire app:",
        profileTitle: "Profile Details & Delivery Address",
        lblCustName: "Your Name:",
        lblCustPhone: "Mobile Number:",
        lblCustAddr: "Delivery Address (Amta, Howrah):",
        btnSaveProfile: "Save Profile",
        quickLinks: "Quick Services",
        linkOrders: "My Orders & Live Tracking",
        linkWishlist: "My Wishlist Items",
        linkRefer: "Refer & Earn ₹50 Discount",
        supportTitle: "Direct Support & Inquiries",
        supportSub: "For any questions or custom designs, connect with Nisha Boutique:"
      }
    };

    function t(key) {
      return (I18N[currentLang] && I18N[currentLang][key]) || (I18N['bn'] && I18N['bn'][key]) || key;
    }

    function setLanguage(lang) {
      currentLang = lang;
      localStorage.setItem('nc_lang', lang);
      applyLanguage();
    }

    function toggleLanguage() {
      setLanguage(currentLang === 'bn' ? 'en' : 'bn');
    }

    
    // ==========================================
    // CUSTOM OFFER BANNER (SYNCED WITH ADMIN)
    // ==========================================
    function renderCustomOfferBanner() {
      const container = document.getElementById('customOfferBannerContainer');
      if (!container) return;

      let bannerData = null;
      try {
        const stored = localStorage.getItem('nc_custom_banner');
        if (stored) bannerData = JSON.parse(stored);
      } catch(e) {}

      if (!bannerData || !bannerData.active || !bannerData.img) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
      }

      container.style.display = 'block';
      container.innerHTML = `
        <div class="custom-promo-banner-card" onclick="handleCustomBannerAction()" style="cursor:pointer; position:relative; border-radius:16px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.15); background:#1e293b; margin:12px 0;">
          <img src="${bannerData.img}" alt="${bannerData.title || 'Special Offer'}" style="width:100%; max-height:420px; object-fit:cover; display:block; border-radius:16px;">
          
          ${(bannerData.title || bannerData.subtitle) ? `
            <div style="position:absolute; bottom:0; inset-x:0; background:linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 60%, transparent 100%); padding:16px 14px; color:#fff;">
              ${bannerData.badge ? `<span style="background:#ea580c; color:#fff; font-size:0.72rem; font-weight:800; padding:3px 8px; border-radius:6px; text-transform:uppercase; margin-bottom:4px; display:inline-block;">${bannerData.badge}</span>` : ''}
              <div style="font-weight:800; font-size:1.1rem; line-height:1.3; text-shadow:0 2px 4px rgba(0,0,0,0.6);">${bannerData.title || ''}</div>
              ${bannerData.subtitle ? `<div style="font-size:0.78rem; color:#cbd5e1; margin-top:3px;">${bannerData.subtitle}</div>` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }

    function handleCustomBannerAction() {
      let bannerData = null;
      try {
        const stored = localStorage.getItem('nc_custom_banner');
        if (stored) bannerData = JSON.parse(stored);
      } catch(e) {}

      if (!bannerData) return;
      if (bannerData.action === 'whatsapp') {
        window.open(`https://wa.me/919239413517?text=নমস্কার,%20আমি%20ব্যানারের%20অফারটি%20(${encodeURIComponent(bannerData.title || 'স্পেশাল অফার')})%20বুকিং%20করতে%20চাই।`, '_blank');
      } else if (bannerData.targetId) {
        openPdp(bannerData.targetId);
      } else {
        const prodSec = document.getElementById('productGridContainer');
        if (prodSec) prodSec.scrollIntoView({ behavior: 'smooth' });
      }
    }


    function applyLanguage() {
      const isEn = currentLang === 'en';

      // 1. Header and Quick Toggle
      const qb = document.getElementById('langQuickBadge');
      if (qb) qb.textContent = t('quickBadge');
      const bs = document.getElementById('t-brandSub');
      if (bs) bs.textContent = t('brandSub');
      const dl = document.getElementById('t-deliveryLoc');
      if (dl) dl.textContent = t('deliveryLoc');
      const fd = document.getElementById('t-freeDeliveryBadge');
      if (fd) fd.textContent = t('freeDeliveryBadge');

      // Top bar language toggle button
      const hFlag = document.getElementById('headerLangFlag');
      const hText = document.getElementById('headerLangText');
      if (hFlag) hFlag.textContent = isEn ? "🇬🇧" : "🇮🇳";
      if (hText) hText.textContent = isEn ? "English" : "বাংলা";

      // PWA Banner
      const pt = document.getElementById('t-pwaTitle');
      if (pt) pt.textContent = t('pwaTitle');
      const ps = document.getElementById('t-pwaSub');
      if (ps) ps.textContent = t('pwaSub');
      const pb = document.getElementById('t-pwaBtn');
      if (pb) pb.textContent = t('pwaBtn');

      // Search Placeholders
      const si = document.getElementById('searchInput');
      if (si) si.placeholder = t('searchPlaceholder');
      const psp = document.getElementById('t-pdpSearchPlaceholder');
      if (psp) psp.textContent = t('pdpSearchPlaceholder');
      const fsi = document.getElementById('ncSearchInput');
      if (fsi) fsi.placeholder = t('searchPlaceholder');

      // 2. Bottom Nav Tabs
      const nh = document.getElementById('nav-t-home');
      if (nh) nh.textContent = t('navHome');
      const nc = document.getElementById('nav-t-categories');
      if (nc) nc.textContent = t('navCategories');
      const nv = document.getElementById('nav-t-videos');
      if (nv) nv.textContent = t('navVideos');
      const nw = document.getElementById('nav-t-wishlist');
      if (nw) nw.textContent = t('navWishlist');
      const no = document.getElementById('nav-t-orders');
      if (no) no.textContent = t('navOrders');
      const na = document.getElementById('nav-t-account');
      if (na) na.textContent = t('navAccount');

      // 3. Home Unified Categories
      const uIds = ['uCatAll', 'uCatWomen', 'uCatGirls', 'uCatJamdani', 'uCatSilk', 'uCatTant', 'uCatKurti', 'uCatJewel', 'uCatBangles'];
      uIds.forEach(k => {
        const el = document.getElementById('t-' + k);
        if (el) el.textContent = t(k);
      });

      // 4. Flash Sale & Countdown on Home
      const fst = document.getElementById('t-flashSaleTitle');
      if (fst) fst.textContent = t('flashSaleTitle');
      const fsb = document.getElementById('t-flashSaleBadge');
      if (fsb) fsb.textContent = t('flashSaleBadge');
      const fss = document.getElementById('t-flashSaleSub');
      if (fss) fss.textContent = t('flashSaleSub');
      const thl = document.getElementById('t-timerHoursLbl');
      if (thl) thl.textContent = t('timerHoursLbl');
      const tml = document.getElementById('t-timerMinsLbl');
      if (tml) tml.textContent = t('timerMinsLbl');
      const tsl = document.getElementById('t-timerSecsLbl');
      if (tsl) tsl.textContent = t('timerSecsLbl');
      const bfo = document.getElementById('t-btnFlashOrder');
      if (bfo) bfo.textContent = t('btnFlashOrder');

      // 5. Refer Strip on Home
      const rt = document.getElementById('t-referTitle');
      if (rt) rt.textContent = t('referTitle');
      const rs = document.getElementById('t-referSub');
      if (rs) rs.textContent = t('referSub');

      // 6. Search Results & Filter Chips
      const fte = document.getElementById('t-ncTapToEdit');
      if (fte) fte.textContent = t('ncTapToEdit');
      const cSort = document.getElementById('t-chipSort');
      if (cSort) cSort.textContent = t('chipSort');
      const cFilt = document.getElementById('t-chipFilter');
      if (cFilt) cFilt.textContent = t('chipFilter');
      const cBud = document.getElementById('ncChipBudget');
      if (cBud) cBud.textContent = t('chipBudget');
      const cSlk = document.getElementById('ncChipSilk');
      if (cSlk) cSlk.textContent = t('chipSilk');
      const cDel = document.getElementById('ncChipDelivery');
      if (cDel) cDel.textContent = t('chipDelivery');
      const apLink = document.getElementById('t-ncAllProductsLink');
      if (apLink) apLink.textContent = t('ncAllProductsLink');
      const trTitle = document.getElementById('t-ncTrendingTitle');
      if (trTitle) trTitle.textContent = t('ncTrendingTitle');

      // Update Search Results count notice if currently shown
      const countMsgEl = document.getElementById('ncResultsCountMsg');
      if (countMsgEl && typeof currentSearchQuery !== 'undefined') {
        const qDisplay = currentSearchQuery || (isEn ? "All Products" : "সকল প্রোডাক্ট");
        countMsgEl.innerHTML = isEn 
          ? `Showing results for <strong>"${qDisplay}"</strong>`
          : `<strong>"${qDisplay}"</strong>-এর জন্য ফলাফল দেখানো হচ্ছে`;
      }

      // 7. Categories Sidebar
      const cpt = document.getElementById('t-catPageTitle');
      if (cpt) cpt.textContent = t('catPageTitle');
      const sp = document.getElementById('side-t-popular');
      if (sp) sp.textContent = t('sidePopular');
      const ss = document.getElementById('side-t-saree');
      if (ss) ss.textContent = t('sideSaree');
      const sj = document.getElementById('side-t-jewel');
      if (sj) sj.textContent = t('sideJewel');
      const sb = document.getElementById('side-t-bags');
      if (sb) sb.textContent = t('sideBags');
      const spf = document.getElementById('side-t-perfume');
      if (spf) spf.textContent = t('sidePerfume');
      const sw = document.getElementById('side-t-western');
      if (sw) sw.textContent = t('sideWestern');
      const sl = document.getElementById('side-t-lingerie');
      if (sl) sl.textContent = t('sideLingerie');

      // 8. Product Detail Page (PDP)
      const pColorLbl = document.getElementById('t-pdpSelectColorLbl');
      if (pColorLbl) pColorLbl.textContent = t('pdpSelectColorLbl');
      const pColorBadge = document.getElementById('pdpSelectedColorNameBadge');
      if (pColorBadge && pColorBadge.textContent.includes('কালার')) pColorBadge.textContent = t('pdpSelectedColorNameBadge');
      const pSizeLbl = document.getElementById('t-pdpSelectSizeLbl');
      if (pSizeLbl) pSizeLbl.textContent = t('pdpSelectSizeLbl');
      const pSizeChartBtn = document.getElementById('t-pdpSizeChartBtn');
      if (pSizeChartBtn) pSizeChartBtn.textContent = t('pdpSizeChartBtn');
      const pRetHead = document.getElementById('t-pdpReturnSecHeader');
      if (pRetHead) pRetHead.textContent = t('pdpReturnSecHeader');
      const pRetBadge = document.getElementById('t-pdpReturnSecBadge');
      if (pRetBadge) pRetBadge.textContent = t('pdpReturnSecBadge');
      const pRetAllLbl = document.getElementById('t-pdpReturnAllLabel');
      if (pRetAllLbl) pRetAllLbl.textContent = t('pdpReturnAllLabel');
      const pRetAllDesc = document.getElementById('t-pdpReturnAllDesc');
      if (pRetAllDesc) pRetAllDesc.textContent = t('pdpReturnAllDesc');
      const pRetDefDesc = document.getElementById('t-pdpReturnDefDesc');
      if (pRetDefDesc) pRetDefDesc.textContent = t('pdpReturnDefDesc');
      const pAddCart = document.getElementById('t-btnPdpAddCart');
      if (pAddCart) pAddCart.textContent = t('btnPdpAddCart');
      const pBuyNow = document.getElementById('t-btnPdpBuyNow');
      if (pBuyNow) pBuyNow.textContent = t('btnPdpBuyNow');

      // 9. Customer Account Page Strings
      const csh = document.getElementById('t-custSettingsHeading');
      if (csh) csh.textContent = t('custHeading');
      const cdt = document.getElementById('custDisplayTitle');
      if (cdt) cdt.textContent = currentCustomer ? currentCustomer.name : t('custTitle');
      const cCoinLbl = document.getElementById('t-ncCoinLabel');
      if (cCoinLbl) cCoinLbl.textContent = t('ncCoinLabel');
      const cCoinSub = document.getElementById('t-ncCoinSub');
      if (cCoinSub) cCoinSub.textContent = t('ncCoinSub');
      const pLangTitle = document.getElementById('t-profileLangTitle');
      if (pLangTitle) pLangTitle.textContent = t('langTitle');
      const pLangSub = document.getElementById('t-profileLangSub');
      if (pLangSub) pLangSub.textContent = t('langSub');
      const pAddrHead = document.getElementById('t-profileAddressHeading');
      if (pAddrHead) pAddrHead.textContent = t('profileAddressHeading');
      const btnEditAddr = document.getElementById('t-btnEditAddressToggle');
      if (btnEditAddr) btnEditAddr.textContent = t('btnEditAddressToggle');

      const lst = document.getElementById('t-langSettingTitle');
      if (lst) lst.textContent = t('langTitle');
      const lss = document.getElementById('t-langSettingSub');
      if (lss) lss.textContent = t('langSub');
      const pst = document.getElementById('t-profileSettingTitle');
      if (pst) pst.textContent = t('profileTitle');
      const lcn = document.getElementById('t-lblCustName');
      if (lcn) lcn.textContent = t('lblCustName');
      const lcp = document.getElementById('t-lblCustPhone');
      if (lcp) lcp.textContent = t('lblCustPhone');
      const lca = document.getElementById('t-lblCustAddr');
      if (lca) lca.textContent = t('lblCustAddr');
      const bsp = document.getElementById('t-btnSaveProfile');
      if (bsp) bsp.textContent = t('btnSaveProfile');
      const qlt = document.getElementById('t-quickLinksTitle');
      if (qlt) qlt.textContent = t('quickLinks');
      const lko = document.getElementById('t-linkOrders');
      if (lko) lko.textContent = t('linkOrders');
      const lkw = document.getElementById('t-linkWishlist');
      if (lkw) lkw.textContent = t('linkWishlist');
      const lkr = document.getElementById('t-linkRefer');
      if (lkr) lkr.textContent = t('linkRefer');
      const spt = document.getElementById('t-supportTitle');
      if (spt) spt.textContent = t('supportTitle');
      const sps = document.getElementById('t-supportSub');
      if (sps) sps.textContent = t('supportSub');

      // 10. Drawer Menu Strings
      const dTitle = document.getElementById('drawerBrandTitle');
      if (dTitle) dTitle.textContent = "Nisha Creations";
      const dSub = document.getElementById('drawerBrandSub');
      if (dSub) dSub.textContent = isEn ? "Boutique Menu & Settings" : "বুটিক মেনু ও সেটিংস";
      const dProf = document.getElementById('drawerItemProfile');
      if (dProf) dProf.textContent = isEn ? "Profile & Address" : "প্রোফাইল ও ঠিকানা";
      const dProfSub = document.getElementById('drawerItemProfileSub');
      if (dProfSub) dProfSub.textContent = isEn ? "Your name & delivery details" : "আপনার নাম ও ডেলিভারি তথ্য";
      const dOrd = document.getElementById('drawerItemOrders');
      if (dOrd) dOrd.textContent = isEn ? "Orders & Tracking" : "অর্ডার ও ট্র্যাকিং";
      const dOrdSub = document.getElementById('drawerItemOrdersSub');
      if (dOrdSub) dOrdSub.textContent = isEn ? "Order history & live updates" : "অর্ডার হিস্ট্রি ও ডেলিভারি আপডেট";
      const dWish = document.getElementById('drawerItemWishlist');
      if (dWish) dWish.textContent = isEn ? "My Wishlist" : "পছন্দের তালিকা (Wishlist)";
      const dWishSub = document.getElementById('drawerItemWishlistSub');
      if (dWishSub) dWishSub.textContent = isEn ? "Your saved sarees & jewellery" : "আপনার সেভ করা শাড়ি ও গহনা";
      const dRef = document.getElementById('drawerItemRefer');
      if (dRef) dRef.textContent = isEn ? "Refer a Friend (Get ₹50)" : "রেফার করুন ও 50 টাকা পান";
      const dRefSub = document.getElementById('drawerItemReferSub');
      if (dRefSub) dRefSub.textContent = isEn ? "Share boutique with friends" : "বন্ধুদের সাথে অ্যাপ শেয়ার করুন";
      const dSupp = document.getElementById('drawerItemSupport');
      if (dSupp) dSupp.textContent = isEn ? "Help & Support" : "সহায়তা ও যোগাযোগ";
      const dSuppSub = document.getElementById('drawerItemSupportSub');
      if (dSuppSub) dSuppSub.textContent = isEn ? "Chat directly with Nisha Didi" : "নিশা দিদির সাথে সরাসরি চ্যাট করুন";
      const dInst = document.getElementById('drawerItemInstall');
      if (dInst) dInst.textContent = isEn ? "Install App on Home Screen" : "হোমস্ক্রিনে ইনস্টল করুন";
      const dInstSub = document.getElementById('drawerItemInstallSub');
      if (dInstSub) dInstSub.textContent = isEn ? "Fast 1-tap app experience" : "এক ক্লিকে অ্যাপের মতো খুলবে";
      const dItemAdm = document.getElementById('drawerItemAdmin');
      if (dItemAdm) dItemAdm.textContent = isEn ? "Owner Admin Portal" : "মালিকের অ্যাডমিন কন্ট্রোল (Owner Hub)";
      const dLangTitle = document.getElementById('drawerLangTitle');
      if (dLangTitle) dLangTitle.textContent = isEn ? "App Language" : "অ্যাপের ভাষা (Language)";

      // 11. Cart Modal Strings
      const cModalTitle = document.getElementById('t-cartModalTitle');
      if (cModalTitle) cModalTitle.textContent = t('cartModalTitle');
      const cStep1T = document.getElementById('t-step1Title');
      if (cStep1T) cStep1T.textContent = t('step1Title');
      const cStep2T = document.getElementById('t-step2Title');
      if (cStep2T) cStep2T.textContent = t('step2Title');
      const cOffRib = document.getElementById('t-cartOfferRibbonSub');
      if (cOffRib) cOffRib.textContent = t('cartOfferRibbonSub');
      const bSaveAddr = document.getElementById('t-btnSaveAddrInline');
      if (bSaveAddr) bSaveAddr.textContent = t('btnSaveAddrInline');
      const cDelNote = document.getElementById('t-cartDeliveryNote');
      if (cDelNote) cDelNote.textContent = t('cartDeliveryNote');
      const cItmHead = document.getElementById('t-cartItemDetailsHeader');
      if (cItmHead) cItmHead.textContent = t('cartItemDetailsHeader');
      const cRedTitle = document.getElementById('t-coinRedeemTitle');
      if (cRedTitle) cRedTitle.textContent = t('coinRedeemTitle');
      const cRedSub = document.getElementById('t-coinRedeemSub');
      if (cRedSub) cRedSub.textContent = t('coinRedeemSub');
      const cApplyLbl = document.getElementById('t-coinApplyLabel');
      if (cApplyLbl) cApplyLbl.textContent = t('coinApplyLabel');
      const bAppCpn = document.getElementById('t-btnApplyCoupon');
      if (bAppCpn) bAppCpn.textContent = t('btnApplyCoupon');
      const cGiftLbl = document.getElementById('t-cartGiftWrapLabel');
      if (cGiftLbl) cGiftLbl.textContent = t('cartGiftWrapLabel');
      const cPrHead = document.getElementById('t-cartPriceDetailsHeader');
      if (cPrHead) cPrHead.textContent = t('cartPriceDetailsHeader');
      const lMrp = document.getElementById('t-lblTotalMrp');
      if (lMrp) lMrp.textContent = t('lblTotalMrp');
      const lStrDisc = document.getElementById('t-lblStoreDiscount');
      if (lStrDisc) lStrDisc.textContent = t('lblStoreDiscount');
      const lCoinDisc = document.getElementById('t-lblCoinDiscount');
      if (lCoinDisc) lCoinDisc.textContent = t('lblCoinDiscount');
      const lRetDisc = document.getElementById('t-lblReturnDiscount');
      if (lRetDisc) lRetDisc.textContent = t('lblReturnDiscount');
      const lDelFee = document.getElementById('t-lblDeliveryFee');
      if (lDelFee) lDelFee.textContent = t('lblDeliveryFee');
      const lTotPay = document.getElementById('t-lblTotalPayable');
      if (lTotPay) lTotPay.textContent = t('lblTotalPayable');
      const bSt1Cont = document.getElementById('t-btnStep1Continue');
      if (bSt1Cont) bSt1Cont.textContent = t('btnStep1Continue');
      const cSt2Head = document.getElementById('t-cartStep2Header');
      if (cSt2Head) cSt2Head.textContent = t('cartStep2Header');
      const cUpiTitle = document.getElementById('t-cartUpiTitle');
      if (cUpiTitle) cUpiTitle.textContent = t('cartUpiTitle');
      const cUpiInst = document.getElementById('t-cartUpiInstructions');
      if (cUpiInst) cUpiInst.textContent = t('cartUpiInstructions');
      const cUpiOff = document.getElementById('t-cartUpiOfficialText');
      if (cUpiOff) cUpiOff.textContent = t('cartUpiOfficialText');
      const cUpiBtn = document.getElementById('t-cartUpiOpenBtn');
      if (cUpiBtn) cUpiBtn.textContent = t('cartUpiOpenBtn');
      const cCodTitle = document.getElementById('t-cartCodTitle');
      if (cCodTitle) cCodTitle.textContent = t('cartCodTitle');
      const cCodSub = document.getElementById('t-cartCodSub');
      if (cCodSub) cCodSub.textContent = t('cartCodSub');
      const cCodNoDisc = document.getElementById('t-cartCodNoDiscount');
      if (cCodNoDisc) cCodNoDisc.textContent = t('cartCodNoDiscount');

      // 12. Welcome Gift Modal
      const wTitle = document.getElementById('t-welcomeTitle');
      if (wTitle) wTitle.textContent = t('welcomeTitle');
      const wSub = document.getElementById('t-welcomeSub');
      if (wSub) wSub.textContent = t('welcomeSub');
      const mBoxHead = document.getElementById('t-mysteryBoxHeading');
      if (mBoxHead) mBoxHead.textContent = t('mysteryBoxHeading');
      const mBoxSub = document.getElementById('t-mysteryBoxSub');
      if (mBoxSub) mBoxSub.textContent = t('mysteryBoxSub');
      const cHeader = document.getElementById('t-congratsHeader');
      if (cHeader) cHeader.textContent = t('congratsHeader');
      const gInst = document.getElementById('t-giftInstructionText');
      if (gInst) gInst.textContent = t('giftInstructionText');
      const btnShop = document.getElementById('t-btnStartShopping');
      if (btnShop) btnShop.textContent = t('btnStartShopping');

      // 13. Wishlist & Orders Screen
      const wEmptyT = document.getElementById('t-wishlistEmptyTitle');
      if (wEmptyT) wEmptyT.textContent = t('wishlistEmptyTitle');
      const bWishShop = document.getElementById('t-btnWishlistShop');
      if (bWishShop) bWishShop.textContent = t('btnWishlistShop');
      const ordHeadT = document.getElementById('t-ordersHeaderTitle');
      if (ordHeadT) ordHeadT.textContent = t('ordersHeaderTitle');

      // 14. Update Active Buttons
      updateDrawerActiveStates();

      // Profile settings lang buttons styling
      const pBn = document.getElementById('btnProfileLangBn');
      const pEn = document.getElementById('btnProfileLangEn');
      const chkPBn = document.getElementById('checkProfileLangBn');
      const chkPEn = document.getElementById('checkProfileLangEn');
      if (pBn && pEn) {
        if (!isEn) {
          pBn.style.border = '2px solid var(--primary)';
          pBn.style.background = '#fdf4ff';
          pBn.style.color = 'var(--primary)';
          if (chkPBn) chkPBn.style.display = 'inline';
          pEn.style.border = '1.5px solid #cbd5e1';
          pEn.style.background = '#fff';
          pEn.style.color = '#475569';
          if (chkPEn) chkPEn.style.display = 'none';
        } else {
          pEn.style.border = '2px solid var(--primary)';
          pEn.style.background = '#fdf4ff';
          pEn.style.color = 'var(--primary)';
          if (chkPEn) chkPEn.style.display = 'inline';
          pBn.style.border = '1.5px solid #cbd5e1';
          pBn.style.background = '#fff';
          pBn.style.color = '#475569';
          if (chkPBn) chkPBn.style.display = 'none';
        }
      }

      // Drawer lang buttons styling
      const dBn = document.getElementById('drawerBtnLangBn');
      const dEn = document.getElementById('drawerBtnLangEn');
      const chkDBn = document.getElementById('drawerCheckBn');
      const chkDEn = document.getElementById('drawerCheckEn');
      if (dBn && dEn) {
        if (!isEn) {
          dBn.style.border = '2px solid var(--primary)';
          dBn.style.background = '#fdf4ff';
          dBn.style.color = 'var(--primary)';
          if (chkDBn) chkDBn.style.display = 'inline';
          dEn.style.border = '1.5px solid #cbd5e1';
          dEn.style.background = '#fff';
          dEn.style.color = '#475569';
          if (chkDEn) chkDEn.style.display = 'none';
        } else {
          dEn.style.border = '2px solid var(--primary)';
          dEn.style.background = '#fdf4ff';
          dEn.style.color = 'var(--primary)';
          if (chkDEn) chkDEn.style.display = 'inline';
          dBn.style.border = '1.5px solid #cbd5e1';
          dBn.style.background = '#fff';
          dBn.style.color = '#475569';
          if (chkDBn) chkDBn.style.display = 'none';
        }
      }

      // 15. Account Screen Specials & Recently Viewed
      const fFinT = document.getElementById('t-ncFinanceTitle');
      if (fFinT) fFinT.textContent = isEn ? "Finance & Boutique Specials" : "স্পেশাল সুযোগ-সুবিধা";
      const fO1T = document.getElementById('t-ncOpt1Title');
      if (fO1T) fO1T.textContent = isEn ? "Refer & Earn" : "রেফার ও আর্ন (Refer & Earn)";
      const fO1D = document.getElementById('t-ncOpt1Desc');
      if (fO1D) fO1D.textContent = isEn ? "Get ₹50 cashback | Share with friends and get discounts" : "পান ₹50 ক্যাশব্যাক | বান্ধবীদের সাথে শেয়ার করে ছাড় পান";
      const fO2T = document.getElementById('t-ncOpt2Title');
      if (fO2T) fO2T.textContent = isEn ? "Free 2-Hour Home Delivery in Amta" : "আমতায় 2 ঘণ্টায় ফ্রি হোম ডেলিভারি";
      const fO2D = document.getElementById('t-ncOpt2Desc');
      if (fO2D) fO2D.textContent = isEn ? "100% Cash on Delivery (COD) & fast delivery guaranteed" : "100% ক্যাশ অন ডেলিভারি (COD) ও দ্রুত ডেলিভারি গ্যারান্টি";
      const fO3T = document.getElementById('t-ncOpt3Title');
      if (fO3T) fO3T.textContent = isEn ? "7 Days Easy Return & Exchange" : "7 দিনের ইজি রিটার্ন ও এক্সচেঞ্জ";
      const fO3D = document.getElementById('t-ncOpt3Desc');
      if (fO3D) fO3D.textContent = isEn ? "100% genuine fabric guarantee | Hassle-free" : "খাঁটি ও জেনুইন ফেব্রিক গ্যারান্টি | কোনো ঝামেলা নেই";

      const fRecT = document.getElementById('t-ncRecentTitle');
      if (fRecT) fRecT.textContent = isEn ? "Recently Viewed Collections" : "সম্প্রতি দেখা কালেকশন";
      const fR1 = document.getElementById('t-ncRecent1');
      if (fR1) fR1.textContent = isEn ? "Women Sarees" : "মহিলাদের শাড়ি";
      const fR2 = document.getElementById('t-ncRecent2');
      if (fR2) fR2.textContent = isEn ? "Kurtis & Sets" : "কুর্তি ও সেট";
      const fR3 = document.getElementById('t-ncRecent3');
      if (fR3) fR3.textContent = isEn ? "Girls Frocks" : "মেয়েদের ফ্রক";
      const fR4 = document.getElementById('t-ncRecent4');
      if (fR4) fR4.textContent = isEn ? "Jewellery & Chokers" : "গহনা ও চোকার";
      const fR5 = document.getElementById('t-ncRecent5');
      if (fR5) fR5.textContent = isEn ? "Cotton Tant" : "সুতি তাঁত";

      const fCpnT = document.getElementById('t-ncCouponsTitle');
      if (fCpnT) fCpnT.textContent = isEn ? "Coupons & Offers" : "কুপন ও আকর্ষণীয় অফার";
      const fCpnSub = document.getElementById('t-ncCouponCardSub');
      if (fCpnSub) fCpnSub.textContent = isEn ? "Explore coupon codes and attractive offers" : "কুপন কোড ও আকর্ষণীয় অফার এক্সপ্লোর করুন";

      const fSavA = document.getElementById('t-ncSavedAddrHeading');
      if (fSavA) fSavA.textContent = isEn ? "Saved Delivery Address" : "আমার স্থায়ী ডেলিভারি ঠিকানা";
      const fBtnEd = document.getElementById('t-ncBtnEditAddrTxt');
      if (fBtnEd) fBtnEd.textContent = isEn ? "Edit" : "এডিট";
      const fBtnSv = document.getElementById('t-ncBtnSaveAddrTxt');
      if (fBtnSv) fBtnSv.textContent = isEn ? "Save Address" : "সেভ করুন";
      const fOwnT = document.getElementById('t-ncOwnerLoginTxt');
      if (fOwnT) fOwnT.textContent = isEn ? "Owner Admin Portal (Owner Login)" : "দোকান মালিকের অ্যাডমিন কন্ট্রোল (Owner Login)";

      // Wishlist & Orders headers
      const wHead = document.getElementById('t-wishlistHeaderTitle');
      if (wHead) wHead.textContent = isEn ? "MY WISHLIST" : "MY WISHLIST (পছন্দের তালিকা)";
      const oHead = document.getElementById('t-ordersHeaderTitleTxt');
      if (oHead) oHead.textContent = isEn ? "MY ORDERS" : "MY ORDERS";
      const oHelp = document.getElementById('t-ordersHelpTxt');
      if (oHelp) oHelp.textContent = isEn ? "HELP" : "HELP";

      if (typeof renderWishlistScreen === 'function') {
        renderWishlistScreen();
      }
      if (typeof renderOrders === 'function') {
        renderOrders();
      }
      if (typeof renderPdpCustomerWall === 'function' && currentPdpProduct) {
        renderPdpCustomerWall(currentPdpProduct);
      }

      // 16. Re-render dynamic elements so cards reflect the selected language immediately
      if (typeof selectCategoryTab === 'function') {
        selectCategoryTab(currentCategoryTab || 'saree_kurti');
      }
      if (typeof updateAllSuperCoinsDisplays === 'function') {
        updateAllSuperCoinsDisplays();
      }
      if (typeof renderProducts === 'function' && Array.isArray(products)) {
        renderProducts(products);
      }
      
      // ==========================================
      // BILINGUAL UPDATES FOR OTP MODAL & DRAWER
      // ==========================================
      const amt = document.getElementById('t-authModalTitle');
      if (amt) amt.textContent = t('authModalTitle');
      const oph = document.getElementById('t-otpPhoneHeading');
      if (oph) oph.textContent = t('otpPhoneHeading');
      const ops = document.getElementById('t-otpPhoneSub');
      if (ops) ops.textContent = t('otpPhoneSub');
      const alp = document.getElementById('t-authLblPhone');
      if (alp) alp.textContent = t('authLblPhone');
      const apInp = document.getElementById('auth_phone');
      if (apInp) apInp.placeholder = t('authPhonePlaceholder');
      const bsot = document.getElementById('t-btnSendOtpText');
      if (bsot) bsot.textContent = t('btnSendOtpText');
      const osn = document.getElementById('t-otpSecurityNotice');
      if (osn) osn.textContent = t('otpSecurityNotice');

      const osat = document.getElementById('t-otpSmsAlertTitle');
      if (osat) osat.textContent = t('otpSmsAlertTitle');
      const ost = document.getElementById('t-otpSmsTime');
      if (ost) ost.textContent = t('otpSmsTime');
      const lol = document.getElementById('t-otpLiveOtpLabel');
      if (lol) lol.textContent = t('otpLiveOtpLabel');
      const ostp = document.getElementById('t-otpSentToTextPre');
      if (ostp) ostp.textContent = t('otpSentToTextPre');
      const bcp = document.getElementById('t-btnChangePhone');
      if (bcp) bcp.textContent = t('btnChangePhone');

      const leo = document.getElementById('t-lblEnterOtp');
      if (leo) leo.textContent = t('lblEnterOtp');
      const bafo = document.getElementById('t-btnAutoFillOtp');
      if (bafo) bafo.textContent = t('btnAutoFillOtp');

      const aln = document.getElementById('t-authLblName');
      if (aln) aln.textContent = t('authLblName');
      const anInp = document.getElementById('auth_name');
      if (anInp) anInp.placeholder = t('authNamePlaceholder');
      const ala = document.getElementById('t-authLblAddr');
      if (ala) ala.textContent = t('authLblAddr');
      const abg = document.getElementById('t-authBtnGps');
      if (abg) abg.textContent = t('authBtnGps');
      const aaInp = document.getElementById('auth_addr');
      if (aaInp) aaInp.placeholder = t('authAddrPlaceholder');

      const bvot = document.getElementById('t-btnVerifyOtpText');
      if (bvot) bvot.textContent = t('btnVerifyOtpText');
      const bca = document.getElementById('t-btnCancelAuth');
      if (bca) bca.textContent = t('btnCancelAuth');

      const dlt = document.getElementById('drawerLangTitle');
      if (dlt) dlt.textContent = t('drawerLangTitle');

      const headerAuthTxt = document.getElementById('headerUserAuthText');
      if (headerAuthTxt) {
        headerAuthTxt.textContent = (currentCustomer && currentCustomer.phone)
          ? (currentCustomer.name ? currentCustomer.name.split(' ')[0] : (isEn ? 'Account' : 'প্রোফাইল'))
          : (isEn ? 'Login' : 'লগইন');
      }

      // Update drawer login/logout state and language buttons
      updateDrawerActiveStates();

      const resScreen = document.getElementById('screen-search-results');
      if (typeof renderBoutiqueSearchResults === 'function' && resScreen && resScreen.classList && typeof resScreen.classList.contains === 'function' && resScreen.classList.contains('active')) {
        executeBoutiqueSearch(currentSearchQuery);
      }
    }

    function initBrandLogo() {
      const customLogo = localStorage.getItem('nc_boutique_logo');
      const logoImg = document.getElementById('mainBrandLogoImg');
      const logoIcon = document.getElementById('mainBrandLogoIcon');
      if (!logoImg || !logoIcon) return;

      if (customLogo) {
        logoImg.src = customLogo;
        logoImg.style.display = 'block';
        logoIcon.style.display = 'none';
      } else {
        // Probe logo.png with cache-busting timestamp
        const probe = new Image();
        probe.onload = function() {
          logoImg.src = probe.src;
          logoImg.style.display = 'block';
          logoIcon.style.display = 'none';
        };
        probe.onerror = function() {
          logoImg.style.display = 'none';
          logoIcon.style.display = 'flex';
        };
        probe.src = 'logo.png?v=' + Date.now();
      }
    }

    function resetToGitHubLogo() {
      localStorage.removeItem('nc_boutique_logo');
      sanitizeBoutiqueRuntime();
    initBrandLogo();
      checkAndShowWelcomeGift();
      alert(currentLang === 'bn' ? "লোগো রিসেট হয়েছে! গিটহাবের logo.png লোড করা হচ্ছে।" : "Logo reset to GitHub logo.png!");
    }

    // ==========================================
    // CUSTOMER SETTINGS HANDLING
    // ==========================================
    
    // ==========================================
    // INTEGRATED OWNER ADMIN & SLOTS
    // ==========================================
    let uploadedSlotImages = ["", "", "", ""];

    function openOwnerPinModal() {
      document.getElementById('ownerPinInput').value = '';
      document.getElementById('ownerPinModal').style.display = 'flex';
    }

    function closeOwnerPinModal() {
      document.getElementById('ownerPinModal').style.display = 'none';
    }

    function checkOwnerPin() {
      const pin = document.getElementById('ownerPinInput').value.trim();
      if (pin === "1234") {
        closeOwnerPinModal();
        renderAdminDashboardLive();
        showScreen('admin');
      } else {
        alert("ভুল পিন কোড! সঠিক পিন দিন (Default: 1234)।");
      }
    }

    function handleDirectSlotFile(input, slotIdx) {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          compressImage(e.target.result, 800, 0.8, function(compressed) {
            uploadedSlotImages[slotIdx] = compressed;
            document.getElementById(`slot-img-${slotIdx}`).src = compressed;
            document.getElementById(`slot-img-${slotIdx}`).style.display = 'block';
            document.getElementById(`slot-del-${slotIdx}`).style.display = 'flex';
            document.getElementById(`slot-placeholder-${slotIdx}`).style.display = 'none';
          });
        };
        reader.readAsDataURL(file);
      }
    }

    function removeSlotPhoto(idx) {
      uploadedSlotImages[idx] = "";
      document.getElementById(`slot-img-${idx}`).style.display = 'none';
      document.getElementById(`slot-del-${idx}`).style.display = 'none';
      document.getElementById(`slot-placeholder-${idx}`).style.display = 'block';
    }

    function compressImage(src, maxDim, quality, callback) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) { h *= maxDim / w; w = maxDim; }
        } else {
          if (h > maxDim) { w *= maxDim / h; h = maxDim; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        callback(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = src;
    }

    
    function filterAdminCategoryOptions(query, selectId) {
      const q = query.toLowerCase().trim();
      const select = document.getElementById(selectId);
      if (!select) return;

      const options = select.querySelectorAll('option');
      let firstMatch = null;

      options.forEach(opt => {
        const text = opt.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          opt.style.display = 'block';
          if (!firstMatch && q) firstMatch = opt;
        } else {
          opt.style.display = 'none';
        }
      });

      if (firstMatch) {
        select.value = firstMatch.value;
      }
    }

    function submitProductFromAdmin() {
      const title = document.getElementById('admin_new_title').value.trim();
      const cat = document.getElementById('admin_new_cat').value;
      const price = parseFloat(document.getElementById('admin_new_price').value);
      const mrp = parseFloat(document.getElementById('admin_new_mrp').value) || price * 1.5;
      const stock = parseInt(document.getElementById('admin_new_stock').value) || 100;
      const desc = document.getElementById('admin_new_desc').value.trim() || "100% প্রিমিয়াম বুটিক কালেকশন।";
      const rawChart = document.getElementById('admin_new_size_chart') ? document.getElementById('admin_new_size_chart').value : 'auto';
      const sizeNote = document.getElementById('admin_new_size_note') ? document.getElementById('admin_new_size_note').value.trim() : '';
      const videoUrl = document.getElementById('admin_new_video_url') ? document.getElementById('admin_new_video_url').value.trim() : '';

      // Collect Available Sizes
      const checkedSizes = [];
      document.querySelectorAll('input[name="admin_size_chk"]:checked').forEach(cb => checkedSizes.push(cb.value));
      const customSizesVal = document.getElementById('admin_custom_sizes_input') ? document.getElementById('admin_custom_sizes_input').value.trim() : '';
      if (customSizesVal) {
        customSizesVal.split(',').forEach(s => {
          const st = s.trim();
          if (st && !checkedSizes.includes(st)) checkedSizes.push(st);
        });
      }

      // Collect Color Variants with Photos
      const colorVariants = [];
      for (let i = 0; i < 4; i++) {
        if (uploadedSlotImages[i]) {
          const cInput = document.getElementById(`slot-color-${i}`);
          const cName = cInput && cInput.value.trim() ? cInput.value.trim() : (i === 0 ? 'মূল কালার' : `রং ${i+1}`);
          colorVariants.push({
            img: uploadedSlotImages[i],
            colorName: cName
          });
        }
      }

      let finalSizeChart = rawChart;
      if (finalSizeChart === 'auto') {
        const catLower = (cat + ' ' + title).toLowerCase();
        if (catLower.includes('frock') || catLower.includes('girl') || catLower.includes('baby') || catLower.includes('kids') || catLower.includes('ফ্রক')) {
          finalSizeChart = 'kids_frock';
        } else if (catLower.includes('kurti') || catLower.includes('kurta') || catLower.includes('suit') || catLower.includes('top') || catLower.includes('কুর্তি') || catLower.includes('স্যুট')) {
          finalSizeChart = 'kurti';
        } else if (catLower.includes('palazzo') || catLower.includes('leggings') || catLower.includes('pant') || catLower.includes('প্লাজো') || catLower.includes('প্যান্ট')) {
          finalSizeChart = 'palazzo';
        } else if (catLower.includes('jewel') || catLower.includes('necklace') || catLower.includes('earrings') || catLower.includes('bangles') || catLower.includes('bag') || catLower.includes('perfume')) {
          finalSizeChart = 'none';
        } else {
          finalSizeChart = 'saree_blouse';
        }
      }

      if (!title || !price) {
        alert("দয়া করে প্রোডাক্টের নাম ও বিক্রয় মূল্য লিখুন!");
        return;
      }
      if (!uploadedSlotImages[0]) {
        alert("দয়া করে 1 নম্বর বক্সে চাপ দিয়ে শাড়ির মূল ছবিটি সিলেক্ট করুন!");
        return;
      }

      const pType = ['necklace', 'earrings', 'bangles'].includes(cat) ? 'jewel' : (cat === 'kurti' ? 'kurti' : (cat === 'bag' ? 'bag' : (cat === 'perfume' ? 'perfume' : 'saree')));
      const newProd = {
        id: "NC-" + Math.floor(100 + Math.random() * 900),
        title: title,
        category: cat,
        type: pType,
        price: price,
        mrp: mrp,
        upiOffer: Math.round(price * 0.95),
        stock: stock,
        initialStock: stock,
        sold: 0,
        inStock: stock > 0,
        img: uploadedSlotImages[0],
        subImages: uploadedSlotImages.filter((im, i) => i > 0 && im !== ""),
        desc: desc,
        sizeChartType: finalSizeChart,
        sizeNote: sizeNote,
        videoUrl: videoUrl,
        availableSizes: checkedSizes.length > 0 ? checkedSizes : ['Free Size'],
        colorVariants: colorVariants.length > 0 ? colorVariants : [{ img: uploadedSlotImages[0], colorName: 'মূল কালার' }],
        date: new Date().toLocaleDateString('bn-IN')
      };

      products.unshift(newProd);
      localStorage.setItem('nc_products', JSON.stringify(products));
      const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
      localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));

      alert("🎉 অভিনন্দন! নতুন শাড়িটি সফলভাবে শপে লাইভ যুক্ত হয়েছে।");

      document.getElementById('admin_new_title').value = '';
      document.getElementById('admin_new_price').value = '';
      document.getElementById('admin_new_mrp').value = '';
      document.getElementById('admin_new_desc').value = '';
      if (document.getElementById('admin_new_size_note')) document.getElementById('admin_new_size_note').value = '';
      if (document.getElementById('admin_new_video_url')) document.getElementById('admin_new_video_url').value = '';
      if (document.getElementById('admin_new_size_chart')) document.getElementById('admin_new_size_chart').value = 'auto';
      for (let i = 0; i < 4; i++) removeSlotPhoto(i);

      renderAdminDashboardLive();
      renderProducts(products);

      // Realtime Cloud Firestore Sync for Products & Banner
      if (typeof CloudSync !== 'undefined' && CloudSync.isReady()) {
        CloudSync.syncProducts((liveProds) => {
          if (liveProds && liveProds.length > 0) {
            products = liveProds;
            renderProducts(products);
          }
        });
        CloudSync.syncBanner(() => {
          renderCustomOfferBanner();
        });
      }
    }

        // ADMIN TOP NAVIGATION TABS CONTROLLER
    let currentAdminMainTab = 'orders';
    let currentAdminOrderFilter = 'processing'; // Default to active processing orders

    function switchAdminMainTab(tabId) {
      currentAdminMainTab = tabId;
      const tabs = ['orders', 'upload', 'inventory', 'promo'];
      tabs.forEach(t => {
        const btn = document.getElementById('admNavBtn-' + t);
        const pane = document.getElementById('admTabContent-' + t);
        if (btn && pane) {
          if (t === tabId) {
            btn.style.background = 'var(--primary)';
            btn.style.color = '#fff';
            btn.style.borderColor = 'var(--primary)';
            btn.style.boxShadow = '0 2px 6px rgba(156,39,176,0.25)';
            pane.style.display = 'block';
          } else {
            btn.style.background = '#fff';
            btn.style.color = '#475569';
            btn.style.borderColor = '#cbd5e1';
            btn.style.boxShadow = 'none';
            pane.style.display = 'none';
          }
        }
      });
      renderAdminDashboardLive();
    }

    function filterAdminOrders(filterType) {
      currentAdminOrderFilter = filterType;

      // Update Card Visuals for the 4 core option cards
      const cards = ['processing', 'return', 'cancelled', 'delivered'];
      cards.forEach(c => {
        const el = document.getElementById('admCard-' + c);
        if (el) {
          if (c === filterType) {
            const activeColor = (c === 'processing' ? '#ca8a04' : (c === 'return' ? '#ea580c' : (c === 'cancelled' ? '#dc2626' : '#16a34a')));
            el.style.border = '2px solid ' + activeColor;
            el.style.boxShadow = '0 2px 8px ' + activeColor + '33';
            el.style.transform = 'translateY(-2px)';
          } else {
            el.style.border = '1.5px solid #e2e8f0';
            el.style.boxShadow = 'none';
            el.style.transform = 'none';
          }
        }
      });

      renderAdminDashboardLive();
    }

    function renderAdminDashboardLive() {
      const allOrders = JSON.parse(localStorage.getItem('nc_orders') || '[]');

      // 1. Dynamic Calculations:
      // Active / Processing: Order Placed, Packed, Out for Delivery
      const pendingOrders = allOrders.filter(o => (o.status === 'Order Placed' || o.status === 'Packed' || o.status === 'Out for Delivery') && o.status !== 'Cancelled');
      // Return: orders with return requested
      const returnOrders = allOrders.filter(o => o.returnStatus === 'Requested' || o.status === 'Returned & Refunded');
      // Cancelled: cancelled orders (subtracted from active!)
      const cancelledOrders = allOrders.filter(o => o.status === 'Cancelled');
      // Delivered: completed orders
      const deliveredOrders = allOrders.filter(o => o.status === 'Delivered');

      const pendingCount = pendingOrders.length;
      const returnCount = returnOrders.length;
      const cancelCount = cancelledOrders.length;
      const deliveredCount = deliveredOrders.length;

      // Update Top Stat Numbers
      if (document.getElementById('admStatPending')) document.getElementById('admStatPending').textContent = pendingCount;
      if (document.getElementById('admStatReturn')) document.getElementById('admStatReturn').textContent = returnCount;
      if (document.getElementById('admStatCancel')) document.getElementById('admStatCancel').textContent = cancelCount;
      if (document.getElementById('admStatDelivered')) document.getElementById('admStatDelivered').textContent = deliveredCount;

      // Notification Banner
      const notifBanner = document.getElementById('adminNotificationBanner');
      const notifText = document.getElementById('adminNotificationText');
      if (notifBanner) {
        if (returnCount > 0) {
          notifBanner.style.display = 'flex';
          notifBanner.style.background = '#fff7ed';
          notifBanner.style.borderColor = '#fb923c';
          notifText.innerHTML = `<strong>🔔 জরুরি অ্যালার্ট:</strong> ${returnCount}টি নতুন রিটার্ন/এক্সচেঞ্জ আবেদন এসেছে! <strong>[🔄 রিটার্ন]</strong> কার্ডে চাপ দিয়ে ব্যাংক ডিটেলস দেখুন।`;
        } else if (pendingCount > 0) {
          notifBanner.style.display = 'flex';
          notifBanner.style.background = '#ecfdf5';
          notifBanner.style.borderColor = '#10b981';
          notifText.innerHTML = `<strong>📦 নতুন অর্ডার:</strong> ${pendingCount}টি নতুন অর্ডার প্রসেসিংয়ের অপেক্ষায় রয়েছে!`;
        } else {
          notifBanner.style.display = 'none';
        }
      }

      // Update Section Heading and Count Badge based on active filter
      const headingEl = document.getElementById('admOrdersHeading');
      const badgeEl = document.getElementById('admOrdersCountBadge');
      let currentFilteredList = [];

      if (currentAdminOrderFilter === 'processing') {
        currentFilteredList = pendingOrders;
        if (headingEl) headingEl.textContent = '📦 গ্রাহকদের চলতি অর্ডার তালিকা (Processing)';
        if (badgeEl) badgeEl.textContent = `${pendingCount}টি অর্ডার`;
      } else if (currentAdminOrderFilter === 'return') {
        currentFilteredList = returnOrders;
        if (headingEl) headingEl.textContent = '🔄 কাস্টমারের রিটার্ন ও এক্সচেঞ্জ আবেদন (Bank Details)';
        if (badgeEl) badgeEl.textContent = `${returnCount}টি রিটার্ন`;
      } else if (currentAdminOrderFilter === 'cancelled') {
        currentFilteredList = cancelledOrders;
        if (headingEl) headingEl.textContent = '✕ কাস্টমারের বাতিলকৃত অর্ডার (Cancelled)';
        if (badgeEl) badgeEl.textContent = `${cancelCount}টি বাতিল`;
      } else if (currentAdminOrderFilter === 'delivered') {
        currentFilteredList = deliveredOrders;
        if (headingEl) headingEl.textContent = '✓ সফলভাবে সম্পন্ন হওয়া অর্ডার (Delivered)';
        if (badgeEl) badgeEl.textContent = `${deliveredCount}টি সম্পন্ন`;
      } else {
        currentFilteredList = allOrders;
        if (headingEl) headingEl.textContent = '📦 সমস্ত অর্ডার তালিকা';
        if (badgeEl) badgeEl.textContent = `${allOrders.length}টি অর্ডার`;
      }

      // Render Orders List
      const ordContainer = document.getElementById('adminLiveOrders');
      if (ordContainer) {
        if (currentFilteredList.length === 0) {
          let emptyText = 'বর্তমানে কোনো অর্ডার নেই।';
          if (currentAdminOrderFilter === 'processing') emptyText = 'বর্তমানে কোনো চলতি প্রসেসিং অর্ডার নেই।';
          else if (currentAdminOrderFilter === 'return') emptyText = 'বর্তমানে কোনো রিটার্ন আবেদন জমা পড়েনি।';
          else if (currentAdminOrderFilter === 'cancelled') emptyText = 'বর্তমানে কোনো বাতিলকৃত অর্ডার নেই।';
          else if (currentAdminOrderFilter === 'delivered') emptyText = 'বর্তমানে কোনো সম্পন্ন ডেলিভারি অর্ডার নেই।';

          ordContainer.innerHTML = `
            <div style="text-align:center; padding:36px 14px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:12px; color:#64748b; font-size:0.82rem;">
              <i class="fa-solid fa-folder-open" style="font-size:2rem; color:#cbd5e1; margin-bottom:8px; display:block;"></i>
              <div style="font-weight:700;">${emptyText}</div>
            </div>
          `;
        } else {
          ordContainer.innerHTML = '';
          currentFilteredList.forEach(o => {
            const isCanc = o.status === 'Cancelled';
            const isRet = o.returnStatus === 'Requested';
            const isDeliv = o.status === 'Delivered';
            const cleanPhone = (o.phone || '').replace(/[^0-9]/g, '');

            ordContainer.innerHTML += `
              <div style="background:#ffffff; border:1.5px solid ${isCanc ? '#fca5a5' : (isRet ? '#fdba74' : (isDeliv ? '#bbf7d0' : '#e2e8f0'))}; border-radius:12px; padding:12px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                <!-- Header Row -->
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:8px; margin-bottom:8px;">
                  <div>
                    <span style="font-weight:800; color:#0f172a; font-size:0.85rem;">#${o.id} • ${o.name}</span>
                    <div style="font-size:0.68rem; color:#64748b;">📅 ${o.date || 'আজকের অর্ডার'}</div>
                    ${isCanc ? `<span style="background:#fee2e2; color:#991b1b; font-size:0.65rem; font-weight:800; padding:1px 6px; border-radius:4px;">✕ বাতিল (Cancelled)</span>` : ''}
                    ${isRet ? `<span style="background:#fff7ed; color:#c2410c; font-size:0.65rem; font-weight:800; padding:1px 6px; border-radius:4px;">🔄 রিটার্ন আবেদন</span>` : ''}
                    ${isDeliv ? `<span style="background:#dcfce7; color:#15803d; font-size:0.65rem; font-weight:800; padding:1px 6px; border-radius:4px;">✓ সম্পন্ন (Delivered)</span>` : ''}
                  </div>
                  <span style="color:var(--primary); font-weight:800; font-size:0.95rem;">₹${o.total}</span>
                </div>

                <!-- Customer Details -->
                <div style="font-size:0.75rem; color:#475569; margin-bottom:10px; line-height:1.4;">
                  <div>📞 <strong>${o.phone}</strong></div>
                  <div>📍 ${o.address}</div>
                </div>

                <!-- Cancelled Details Banner (If Cancelled) -->
                ${isCanc ? `
                  <div style="background:#fef2f2; border:1.5px solid #fca5a5; border-radius:8px; padding:10px; margin-bottom:10px; font-size:0.75rem; color:#991b1b;">
                    <div style="font-weight:800; display:flex; align-items:center; gap:6px;">
                      <i class="fa-solid fa-ban"></i> কাস্টমার অর্ডারটি বাতিল করেছেন
                    </div>
                    <div style="margin-top:4px; font-size:0.72rem; line-height:1.4;">
                      • <strong>বাতিলের কারণ:</strong> ${o.cancelReason || 'ভুলবশত অর্ডার'}<br>
                      ${o.cancelDetails ? `• <strong>মন্তব্য:</strong> ${o.cancelDetails}<br>` : ''}
                      • <strong>তারিখ:</strong> ${o.cancelledDate || o.date || 'আজ'}<br>
                      <span style="font-size:0.68rem; color:#15803d; font-weight:700;">✓ পণ্যের স্টক স্বয়ংক্রিয়ভাবে ইনভেন্টরিতে ফেরত দেওয়া হয়েছে।</span>
                    </div>
                  </div>
                ` : ''}

                <!-- Return & Bank Details Banner (If Return Requested) -->
                ${isRet ? `
                  <div style="background:#fff7ed; border:1.5px solid #fb923c; border-radius:8px; padding:10px; margin-bottom:10px; font-size:0.75rem;">
                    <div style="font-weight:800; color:#ea580c; display:flex; justify-content:space-between; align-items:center;">
                      <span><i class="fa-solid fa-rotate-left"></i> কাস্টমার রিটার্ন / এক্সচেঞ্জ চেয়েছেন!</span>
                      <span style="background:#fed7aa; color:#9a3412; padding:1px 6px; border-radius:4px; font-weight:800;">${o.returnType === 'Exchange' ? 'সাইজ বদল' : 'টাকা রিফান্ড'}</span>
                    </div>
                    <div style="margin:6px 0; color:#7c2d12; line-height:1.4;">
                      • <strong>রিটার্নের কারণ:</strong> ${o.returnReason}<br>
                      ${o.returnType === 'Exchange' ? `• <strong>নতুন সাইজ চাওয়া হয়েছে:</strong> <span style="background:#ffedd5; padding:1px 5px; border-radius:3px; font-weight:800;">${o.returnExchangeSize}</span><br>` : ''}
                      • <strong>গ্রাহকের মন্তব্য:</strong> ${o.returnDetails || 'কোনো মন্তব্য নেই'}
                    </div>

                    ${(o.bankDetails && o.returnType === 'Refund') ? `
                      <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:8px 10px; margin-top:6px; font-size:0.72rem; color:#166534;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                          <span style="font-weight:800;"><i class="fa-solid fa-building-columns"></i> কাস্টমারের রিফান্ড ব্যাংক বিবরণ:</span>
                          <button type="button" onclick="copyBankDetails('${o.bankDetails.acc || ''}', '${o.bankDetails.ifsc || ''}', '${o.bankDetails.holder || ''}', '${o.bankDetails.upi || ''}')" style="background:#dcfce7; border:1px solid #86efac; color:#15803d; padding:3px 8px; border-radius:4px; font-size:0.68rem; font-weight:800; cursor:pointer;">
                            📋 ব্যাংক ডিটেলস কপি
                          </button>
                        </div>
                        <div>• একাউন্ট নং: <strong>${o.bankDetails.acc || 'নেই'}</strong></div>
                        <div>• IFSC কোড: <strong>${o.bankDetails.ifsc || 'নেই'}</strong></div>
                        <div>• একাউন্ট হোল্ডার: <strong>${o.bankDetails.holder || 'নেই'}</strong></div>
                        ${o.bankDetails.upi ? `<div>• UPI ID: <strong style="color:#059669;">${o.bankDetails.upi}</strong></div>` : ''}
                      </div>
                    ` : ''}

                    <div style="display:flex; gap:6px; margin-top:8px;">
                      <button onclick="adminApproveReturn('${o.id}')" style="background:#ea580c; color:#fff; border:none; padding:5px 12px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                        ✓ রিটার্ন অনুমোদন করুন
                      </button>
                    </div>
                  </div>
                ` : ''}

                <!-- ORDERED ITEMS WITH PHOTO & SIZES -->
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px; margin-bottom:10px;">
                  <div style="font-size:0.7rem; font-weight:800; color:#334155; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">
                    📦 অর্ডার করা পণ্য (${(o.items && o.items.length) || 1}টি):
                  </div>
                  ${(o.items && o.items.length > 0) ? o.items.map(item => `
                    <div style="display:flex; align-items:center; gap:10px; padding:6px 0; border-bottom:1px dashed #e2e8f0;">
                      <img src="${item.img || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120'}" style="width:52px; height:52px; object-fit:cover; border-radius:8px; border:1.5px solid #cbd5e1; flex-shrink:0;">
                      <div style="flex:1; min-width:0;">
                        <div style="font-weight:800; color:#0f172a; font-size:0.8rem; line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.title}</div>
                        <div style="font-size:0.7rem; margin-top:3px; display:flex; flex-wrap:wrap; gap:4px; align-items:center;">
                          <span style="background:#fdf4ff; border:1px solid #f0abfc; color:#7e22ce; padding:1px 6px; border-radius:4px; font-weight:800;">
                            📏 সাইজ: ${item.selectedSize || 'Free Size'}
                          </span>
                          ${item.selectedColor ? `<span style="background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; padding:1px 6px; border-radius:4px; font-weight:800;">🎨 ${item.selectedColor}</span>` : ''}
                          <span style="color:#b45309; font-weight:700;">• পরিমাণ: ${item.qty || 1}</span>
                        </div>
                        <div style="font-weight:800; color:var(--primary); font-size:0.75rem; margin-top:2px;">₹${item.price}</div>
                      </div>
                    </div>
                  `).join('') : `
                    <div style="display:flex; align-items:center; gap:10px; padding:4px 0;">
                      <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120" style="width:48px; height:48px; object-fit:cover; border-radius:6px;">
                      <div>
                        <div style="font-weight:700; font-size:0.78rem;">বুটিক পোশাক / শাড়ি অর্ডার</div>
                        <div style="font-size:0.7rem; color:#64748b;">স্ট্যান্ডার্ড সাইজ • ক্যাশ অন ডেলিভারি</div>
                      </div>
                    </div>
                  `}
                </div>

                <!-- Actions: Status Update & Customer WhatsApp -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-weight:800; font-size:0.72rem; color:#334155;">ডেলিভারি স্ট্যাটাস:</span>
                    <select onchange="updateLiveOrderStatus('${o.id}', this.value)" style="padding:4px 8px; font-size:0.72rem; font-weight:800; border-radius:6px; border:1.5px solid #cbd5e1; background:#fff;">
                      <option value="Order Placed" ${o.status === 'Order Placed' ? 'selected' : ''}>Order Placed (অর্ডার গৃহীত)</option>
                      <option value="Packed" ${o.status === 'Packed' ? 'selected' : ''}>Packed (প্যাকিং সম্পন্ন)</option>
                      <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery (ডেলিভারিতে বেরিয়েছে)</option>
                      <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered (ডেলিভারি সম্পূর্ণ)</option>
                      <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>✕ Cancelled (বাতিল)</option>
                      <option value="Returned & Refunded" ${o.status === 'Returned & Refunded' ? 'selected' : ''}>🔄 Returned (রিটার্ন সম্পন্ন)</option>
                    </select>
                  </div>
                  <a href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`নমস্কার ${o.name}, নিশা ক্রিয়েশনস (আমতা) থেকে আপনার #${o.id} নম্বর অর্ডার সংক্রান্ত তথ্য জানাতে যোগাযোগ করা হলো।`)}" target="_blank" style="background:#22c55e; color:#fff; text-decoration:none; padding:5px 10px; border-radius:6px; font-size:0.7rem; font-weight:800; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fa-brands fa-whatsapp"></i> হোয়াটসঅ্যাপ
                  </a>
                </div>
              </div>
            `;
          });
        }
      }

      // 2. Inventory Render
      const invContainer = document.getElementById('adminLiveInventory');
      if (invContainer) {
        invContainer.innerHTML = '';
        products.forEach((p, idx) => {
          const curStock = (p.stock !== undefined) ? p.stock : (p.inStock !== false ? 100 : 0);
          const isOut = curStock <= 0 || p.inStock === false;
          invContainer.innerHTML += `
            <div style="display:flex; flex-direction:column; gap:6px; padding:10px; border-bottom:1px solid #f1f5f9; background:#fff; border-radius:8px; margin-bottom:6px;">
              <div style="display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:8px; flex:1;">
                  <img src="${p.img}" style="width:45px; height:45px; border-radius:6px; object-fit:cover;">
                  <div>
                    <div style="font-size:0.82rem; font-weight:800; color:#0f172a;">${p.title}</div>
                    <div style="font-size:0.7rem; color:var(--primary); font-weight:700;">
                      ₹${p.price} • স্টক: <strong>${curStock}</strong> পিস ${isOut ? '<span style="color:#ef4444;">(স্টক শেষ)</span>' : ''}
                    </div>
                  </div>
                </div>
                <button onclick="adminQuickRestock(${idx})" style="background:#dcfce7; border:1px solid #86efac; color:#15803d; padding:4px 8px; border-radius:6px; font-size:0.68rem; font-weight:800; cursor:pointer; flex-shrink:0;">
                  +রিস্টক
                </button>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; background:#f8fafc; padding:6px 8px; border-radius:6px; font-size:0.7rem;">
                <div style="display:flex; align-items:center; gap:4px;">
                  <span style="font-weight:700; color:#475569;">📏 চার্ট:</span>
                  <select onchange="adminChangeSizeChart(${idx}, this.value)" style="padding:2px 4px; font-size:0.68rem; font-weight:700; border-radius:4px; border:1px solid #cbd5e1;">
                    <option value="kids_frock" ${p.sizeChartType === 'kids_frock' ? 'selected' : ''}>👧 ফ্রক</option>
                    <option value="kurti" ${p.sizeChartType === 'kurti' ? 'selected' : ''}>👗 কুর্তি</option>
                    <option value="palazzo" ${p.sizeChartType === 'palazzo' ? 'selected' : ''}>👖 প্লাজো</option>
                    <option value="saree_blouse" ${(!p.sizeChartType || p.sizeChartType === 'saree_blouse' || p.sizeChartType === 'auto') ? 'selected' : ''}>🥻 শাড়ি</option>
                    <option value="none" ${p.sizeChartType === 'none' ? 'selected' : ''}>🚫 নেই</option>
                  </select>
                  <button onclick="adminQuickEditSizes(${idx})" style="background:#ede9fe; border:1px solid #c4b5fd; color:#6d28d9; padding:2px 6px; border-radius:4px; font-size:0.65rem; font-weight:800; cursor:pointer;">
                    📏 ${(p.availableSizes || []).join(', ') || 'সাইজ'} ✎
                  </button>
                </div>
                <button onclick="adminEditVideoUrl(${idx})" style="background:${p.videoUrl ? '#fee2e2' : '#f1f5f9'}; border:1px solid ${p.videoUrl ? '#fca5a5' : '#cbd5e1'}; color:${p.videoUrl ? '#dc2626' : '#475569'}; padding:2px 8px; border-radius:4px; font-size:0.68rem; font-weight:700; cursor:pointer;">
                  ${p.videoUrl ? '🎥 ভিডিও ✎' : '+ ভিডিও'}
                </button>
              </div>
            </div>
          `;
        });
      }

      // 3. Render Promo Codes
      const promoListEl = document.getElementById('adminPromoCodesList');
      if (promoListEl) {
        const coupons = JSON.parse(localStorage.getItem('nc_coupons') || '[{"code":"NISHA50","discount":50,"active":true},{"code":"PUJA100","discount":100,"active":true}]');
        promoListEl.innerHTML = '';
        coupons.forEach(c => {
          promoListEl.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:8px 12px; font-size:0.78rem;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="background:#f3e8ff; border:1px solid #d8b4fe; color:var(--primary); font-weight:800; padding:2px 8px; border-radius:4px; font-family:monospace;">${c.code}</span>
                <span style="font-weight:700; color:#15803d;">₹${c.discount} ফ্ল্যাট ছাড়</span>
              </div>
              <button onclick="adminDeletePromoCode('${c.code}')" style="background:#fee2e2; border:1px solid #fca5a5; color:#dc2626; padding:3px 8px; border-radius:4px; font-size:0.68rem; font-weight:800; cursor:pointer;">
                মুছুন
              </button>
            </div>
          `;
        });
      }
    }

function adminQuickRestock(idx) {
      const added = prompt("কত পিস নতুন শাড়ি স্টকে যোগ করতে চান? (যেমন: 50):", "50");
      if (added !== null) {
        const num = parseInt(added);
        if (!isNaN(num) && num > 0) {
          products[idx].stock = (products[idx].stock || 0) + num;
          products[idx].inStock = true;
          localStorage.setItem('nc_products', JSON.stringify(products));
          const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
          localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));
          alert(`✅ +${num} পিস স্টক যুক্ত হয়েছে!`);
          renderAdminDashboardLive();
          renderProducts(products);
        }
      }
    }

    function updateLiveOrderStatus(id, newStatus) {
      let orders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      orders = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
      localStorage.setItem('nc_orders', JSON.stringify(orders));

      // Sync order status to Google Cloud Firestore
      if (typeof CloudSync !== 'undefined' && CloudSync.isReady()) {
        try {
          CloudSync.updateOrderStatus(id, newStatus);
          console.log('☁️ Order status updated in Cloud Firestore successfully!');
        } catch(e) {
          console.warn('Notice during cloud order status dispatch:', e);
        }
      }
      alert("✅ অর্ডার স্ট্যাটাস আপডেট হয়েছে!");
      renderCustomerAccountOrders();
    }

    function openCustomerSettings() {
      showScreen('customer-settings');
      loadCustomerSettingsData();
    }

    function loadCustomerSettingsData() {
      const stored = localStorage.getItem('nc_customer_profile');
      if (stored) {
        try { currentCustomer = JSON.parse(stored); } catch(e) {}
      }
      if (currentCustomer) {
        const sName = document.getElementById('settings_cust_name') || document.getElementById('nc_edit_name');
        const sPhone = document.getElementById('settings_cust_phone') || document.getElementById('nc_edit_phone');
        const sAddr = document.getElementById('settings_cust_addr') || document.getElementById('nc_edit_addr');
        if (sName) sName.value = currentCustomer.name || '';
        if (sPhone) sPhone.value = currentCustomer.phone || '';
        if (sAddr) sAddr.value = currentCustomer.address || '';
        
        const cTitle = document.getElementById('custDisplayTitle');
        if (cTitle) cTitle.textContent = currentCustomer.name || t('custTitle');
        const cPhone = document.getElementById('custDisplayPhone');
        if (cPhone) cPhone.textContent = currentCustomer.phone || '';
        const cCoins = document.getElementById('custDisplayCoins');
        if (cCoins) cCoins.textContent = currentCustomer.coins || 150;
        const cAvatar = document.getElementById('custAvatarChar');
        if (cAvatar) cAvatar.textContent = (currentCustomer.name || 'U').charAt(0).toUpperCase();
      }
      if (typeof loadCustomerAccountHub === 'function') {
        loadCustomerAccountHub();
      syncCheckoutWithProfile();
      }
    }


    function saveCustomerSettings() {
      const name = document.getElementById('settings_cust_name').value.trim();
      const phone = document.getElementById('settings_cust_phone').value.trim();
      const addr = document.getElementById('settings_cust_addr').value.trim();

      if (!name || !phone) {
        alert(currentLang === 'bn' ? "দয়া করে নাম ও মোবাইল নম্বর লিখুন!" : "Please provide name and phone number!");
        return;
      }

      currentCustomer = currentCustomer || {};
      currentCustomer.name = name;
      currentCustomer.phone = phone;
      currentCustomer.address = addr;
      currentCustomer.coins = currentCustomer.coins || 150;

      localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
      loadCustomerSettingsData();
      alert(currentLang === 'bn' ? "✅ প্রোফাইল ও ঠিকানা সফলভাবে সেভ হয়েছে!" : "✅ Profile and address saved successfully!");
    }


    // ==========================================
    // REAL-TIME CLOUD & INVENTORY SYNC
    // ==========================================
    const CLOUD_DB_KEY = 'nc_cloud_db_url';

    function loadAllProducts() {
      let stored = null;
      try {
        stored = localStorage.getItem('nc_products');
      } catch(e) {}

      if (stored !== null) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            products = parsed.map(p => {
              if (!p.upiOffer && p.price) p.upiOffer = Math.round(p.price * 0.95);
              return p;
            });
            renderProducts(products);
            return;
          }
        } catch(e) {}
      }

      // Check custom products
      let cust = [];
      try { cust = JSON.parse(localStorage.getItem('nc_custom_products') || '[]'); } catch(e) {}
      if (Array.isArray(cust) && cust.length > 0) {
        products = cust;
      } else if (typeof INITIAL_PRODUCTS !== 'undefined' && Array.isArray(INITIAL_PRODUCTS) && INITIAL_PRODUCTS.length > 0) {
        products = [...INITIAL_PRODUCTS];
      } else {
        products = [];
      }
      try { localStorage.setItem('nc_products', JSON.stringify(products)); } catch(e) {}
      renderProducts(products);
    }

    function renderProducts(list) {
      const grid = document.getElementById('productGridContainer');
      if (!grid) return;
      grid.innerHTML = '';

      if (!list || list.length === 0) {
        if (products && products.length > 0) {
          grid.innerHTML = `
            <div style="grid-column:span 2; text-align:center; padding:20px 10px; background:#f8fafc; border-radius:14px; border:1px dashed #cbd5e1; margin-bottom:14px;">
              <div style="font-size:0.9rem; font-weight:800; color:#0f172a;">${currentLang === 'bn' ? '✨ এই ক্যাটাগরিতে নতুন স্টক দ্রুত আসছে!' : '✨ New stock arriving soon for this category!'}</div>
              <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">${currentLang === 'bn' ? 'আমাদের অন্যান্য জনপ্রিয় শাড়ি ও কুর্তি কালেকশন দেখুন:' : 'Check out our other popular collections below:'}</div>
            </div>
          `;
          list = products; // Render all available products so user can keep shopping!
        } else {
          grid.innerHTML = `<div style="grid-column:span 2; text-align:center; padding:40px; color:#94a3b8;">${currentLang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি!' : 'No products found!'}</div>`;
          return;
        }
      }

      list.forEach(p => {
        const offPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
        const isWished = wishlist.includes(p.id);

        const curStock = (p.stock !== undefined) ? parseInt(p.stock) : (p.inStock !== false ? 100 : 0);
        const isOutOfStock = (curStock <= 0 || p.inStock === false);
        const isUrgent = (curStock > 0 && curStock <= 10);

        const card = document.createElement('div');
        card.className = `product-card ${isOutOfStock ? 'is-out-of-stock' : ''}`;
        card.onclick = () => openPdp(p.id);

        card.innerHTML = `
          <div class="product-img-wrap" style="position:relative;">
            <img src="${p.img || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600';" style="${isOutOfStock ? 'filter: grayscale(80%) opacity(0.6);' : ''}">
            
            ${isOutOfStock ? `
              <div class="card-out-of-stock-overlay" style="position:absolute; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(2px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; z-index:2; border-radius:12px;">
                <i class="fa-solid fa-circle-xmark" style="color:#ef4444; font-size:1.8rem;"></i>
                <span style="color:#ffffff; font-weight:800; font-size:0.85rem; letter-spacing:0.5px;">${currentLang === 'bn' ? 'স্টক শেষ' : 'OUT OF STOCK'}</span>
                <span style="color:#cbd5e1; font-size:0.68rem;">${currentLang === 'bn' ? 'শীঘ্রই পুনরায় আসবে' : 'Restocking Soon'}</span>
              </div>
            ` : ''}

            <button class="wish-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}')">
              <i class="fa-${isWished ? 'solid' : 'regular'} fa-heart"></i>
            </button>
          </div>

          <div class="product-info">
            <div>
              <div class="p-cat-tag">${p.category}</div>
              <div class="p-title">${p.title}</div>
            </div>

            ${isUrgent ? `
              <!-- FIRE URGENCY BADGE (LIMITED STOCK) -->
              <div class="p-fire-urgency-strip" style="background:linear-gradient(135deg, #ea580c, #dc2626); color:#ffffff; padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:800; display:inline-flex; align-items:center; gap:6px; margin:4px 0; box-shadow:0 2px 8px rgba(234,88,12,0.35); animation:pulse 2s infinite;">
                <i class="fa-solid fa-fire" style="color:#fef08a; font-size:0.95rem; animation:fireFlicker 1s infinite alternate;"></i>
                <span>${currentLang === 'bn' ? `আর মাত্র ${curStock}টি বাকি! তাড়াতাড়ি করুন!` : `Hurry! Only ${curStock} left!`}</span>
              </div>
            ` : ''}

            ${isOutOfStock ? `
              <!-- OUT OF STOCK NOTICE -->
              <div style="background:#fee2e2; border:1px solid #f87171; color:#991b1b; padding:3px 8px; border-radius:6px; font-size:0.72rem; font-weight:800; display:inline-flex; align-items:center; gap:5px; margin:4px 0;">
                <i class="fa-solid fa-ban"></i> ${currentLang === 'bn' ? 'স্টক শেষ (Out of Stock)' : 'Out of Stock'}
              </div>
            ` : ''}

            <div>
              <div class="p-price-row">
                ${(p.sizeVariants && Array.isArray(p.sizeVariants) && p.sizeVariants.length > 1 && Math.min(...p.sizeVariants.map(v => v.price)) !== Math.max(...p.sizeVariants.map(v => v.price))) ? `
                  <span class="p-price" style="font-size:0.92rem;">₹${Math.min(...p.sizeVariants.map(v => v.price))} - ₹${Math.max(...p.sizeVariants.map(v => v.price))}</span>
                ` : `
                  <span class="p-price">₹${p.price}</span>
                `}
                <span class="p-mrp">₹${p.mrp}</span>
                <span class="p-off">${offPct}% off</span>
              </div>
              ${(p.sizeVariants && Array.isArray(p.sizeVariants) && p.sizeVariants.length > 1 && Math.min(...p.sizeVariants.map(v => v.price)) !== Math.max(...p.sizeVariants.map(v => v.price))) ? `
                <div style="font-size:0.66rem; color:#7e22ce; font-weight:800; margin-top:2px;">
                  <i class="fa-solid fa-ruler-combined"></i> সাইজ অনুযায়ী রেট
                </div>
              ` : ''}
              <div class="upi-badge">
                <i class="fa-solid fa-tag"></i> <span>₹${p.upiOffer || Math.round((p.price || 0) * 0.95)} with UPI</span>
              </div>
              <div class="cod-tag">₹${p.price} with COD</div>
              <div class="p-rating-strip">
                <div class="rating-badge">${p.rating || 4.8} <i class="fa-solid fa-star"></i></div>
                <div class="rating-count">(${p.reviews || 120})</div>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function filterByUnifiedCat(catKey, element) {
  document.querySelectorAll('.unified-cat-item').forEach(el => el.classList.remove('active'));
  if (element && element.classList) element.classList.add('active');
  const targetBubble = document.getElementById('ucat-' + catKey);
  if (targetBubble && targetBubble.classList) targetBubble.classList.add('active');

  let filtered = [...products];
  if (catKey === 'all') {
    filtered = [...products];
  } else if (catKey === 'women') {
    filtered = products.filter(p => p.type !== 'girls' && p.type !== 'jewel' && p.type !== 'jewellery' && p.category !== 'jewel' && p.category !== 'bangles' && !(p.category || '').includes('frock'));
  } else if (catKey === 'girls') {
    filtered = products.filter(p => p.type === 'girls' || (p.category || '').includes('frock') || (p.category || '').includes('girl') || (p.title || '').includes('ফ্রক') || (p.title || '').toLowerCase().includes('frock'));
  } else if (catKey === 'jamdani') {
    filtered = products.filter(p => p.category === 'jamdani' || (p.title || '').includes('জামদানি'));
  } else if (catKey === 'silk') {
    filtered = products.filter(p => p.category === 'silk' || p.category === 'katan' || (p.title || '').includes('সিল্ক'));
  } else if (catKey === 'tant') {
    filtered = products.filter(p => p.category === 'tant' || p.category === 'phulia' || (p.title || '').includes('তাঁত'));
  } else if (catKey === 'kurti') {
    filtered = products.filter(p => p.type === 'kurti' || p.category === 'kurti' || (p.title || '').includes('কুর্তি') || (p.title || '').includes('গাউন'));
  } else if (catKey === 'jewel') {
    filtered = products.filter(p => p.type === 'jewel' || p.type === 'jewellery' || ['jewel', 'jewellery', 'necklace', 'choker'].includes(p.category) || (p.title || '').includes('গহনা') || (p.title || '').includes('চোকার'));
  } else if (catKey === 'bangles') {
    filtered = products.filter(p => p.category === 'bangles' || (p.title || '').includes('চুড়ি') || (p.title || '').includes('বালা'));
  } else {
    filtered = products.filter(p => p.category === catKey || p.type === catKey);
  }

  renderProducts(filtered);
}

function filterByCategory(cat) {
      document.querySelectorAll('.unified-cat-item').forEach(el => el.classList.remove('active'));
      const targetBubble = document.getElementById(`ucat-${cat}`);
      if (targetBubble) targetBubble.classList.add('active');
      if (cat === 'all') {
        sanitizeBoutiqueRuntime();
    initBrandLogo();
    applyLanguage();
    loadAllProducts();
      renderCustomOfferBanner();
    renderReels();
    loadCustomerAccountHub();
      syncCheckoutWithProfile();
        document.querySelectorAll('.cat-item')[0].classList.add('active');
      } else if (cat === 'saree') {
        renderProducts(products.filter(p => p.type === 'saree'));
      } else if (cat === 'jewel') {
        renderProducts(products.filter(p => p.type === 'jewel'));
      } else {
        renderProducts(products.filter(p => p.category === cat));
      }
    }

        
    // =========================================================
    // NISHA BOUTIQUE SEARCH EXPERIENCE CONTROLLER (ছবি 1 ও 2 হুবহু)
    // =========================================================
    let currentSearchQuery = "";
    let ncActiveQuickChip = null;

    function openBoutiqueSearch(initialQuery) {
      const overlay = document.getElementById('ncSearchOverlay');
      const input = document.getElementById('ncSearchInput');
      if (!overlay || !input) return;
      
      overlay.style.display = 'flex';
      input.value = initialQuery !== undefined ? initialQuery : (currentSearchQuery || '');
      renderFkSearchSuggestions(input.value);
      setTimeout(() => { if (input && typeof input.focus === 'function') input.focus(); }, 50);
    }

    function closeBoutiqueSearch() {
      const overlay = document.getElementById('ncSearchOverlay');
      if (overlay) overlay.style.display = 'none';
    }

    function clearBoutiqueSearchInput() {
      const input = document.getElementById('ncSearchInput');
      if (input) {
        input.value = '';
        renderFkSearchSuggestions('');
        if (typeof input.focus === 'function') input.focus();
      }
    }

    function onBoutiqueSearchInput(val) {
      const clearBtn = document.getElementById('ncSearchClearBtn');
      if (clearBtn) clearBtn.style.display = val && val.trim() ? 'block' : 'none';
      renderFkSearchSuggestions(val);
    }

    function renderFkSearchSuggestions(query) {
      const list = document.getElementById('ncSearchSuggestionsList');
      if (!list) return;
      const q = (query || '').toLowerCase().trim();

      // Get matching products & categories with thumbnails
      let suggestions = [];

      // Base predefined searchable queries with thumbnails
      const defaultSuggestions = [
        { title: "Pure Dhakai Jamdani Saree", cat: "Women's Sarees", tag: "jamdani", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100" },
        { title: "Soft Silk Katan Saree", cat: "Women's Sarees", tag: "silk", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=100" },
        { title: "Bengal Handloom Tant Cotton", cat: "Women's Sarees", tag: "tant", img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=100" },
        { title: "Semi-Katan Party Saree", cat: "Women's Sarees", tag: "silk", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100" },
        { title: "Gold-Plated Bridal Jewellery Choker", cat: "Jewellery & Sets", tag: "jewel", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100" },
        { title: "Antique Silver Oxidised Choker Set", cat: "Jewellery & Sets", tag: "jewel", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100" },
        { title: "Handcrafted Gold-Plated Bangles / Churi", cat: "Jewellery & Bangles", tag: "bangles", img: "https://images.unsplash.com/photo-1611591475836-e822e1b12b5f?w=100" },
        { title: "Kundan Floral Drop Earrings / Jhumka", cat: "Jewellery & Earrings", tag: "earrings", img: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=100" },
        { title: "Designer Embroidered Anarkali Kurti", cat: "Women's Kurtis", tag: "kurti", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=100" },
        { title: "Princess Butterfly Party Frock", cat: "Kids & Girls", tag: "frock", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=100" }
      ];

      if (!q) {
        // Show default popular suggestions with images (ছবি 1 হুবহু)
        suggestions = defaultSuggestions.slice(0, 7);
      } else {
        // Filter by matching query
        suggestions = defaultSuggestions.filter(s => 
          s.title.toLowerCase().includes(q) || 
          s.cat.toLowerCase().includes(q) || 
          s.tag.toLowerCase().includes(q)
        );

        // Also check loaded products
        products.forEach(p => {
          if ((p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) && !suggestions.some(s => s.title === p.title)) {
            suggestions.push({
              title: p.title,
              cat: p.type === 'saree' ? "Women's Sarees" : (p.type === 'jewel' ? "Jewellery" : p.category),
              tag: p.category,
              img: p.img
            });
          }
        });
      }

      if (suggestions.length === 0) {
        list.innerHTML = `
          <div onclick="executeBoutiqueSearch('${q}')" style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #f1f5f9; cursor:pointer;">
            <div style="display:flex; align-items:center; gap:12px;">
              <i class="fa-solid fa-magnifying-glass" style="color:#94a3b8; font-size:1rem;"></i>
              <span style="font-size:0.88rem; font-weight:700; color:#0f172a;">"${q}" অনুসন্ধান করুন</span>
            </div>
            <i class="fa-solid fa-arrow-right" style="color:#94a3b8; font-size:0.85rem;"></i>
          </div>
        `;
        return;
      }

      let htmlRows = '';
      suggestions.slice(0, 8).forEach(s => {
        // Highlight query in title
        let displayTitle = s.title;
        if (q) {
          const reg = new RegExp('(' + q.replace(/[-\/\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'gi');
          displayTitle = s.title.replace(reg, '<strong style="color:var(--primary); font-weight:800;">$1</strong>');
        }

        htmlRows += `
          <div onclick="executeBoutiqueSearch('${s.title.replace(/'/g, "\\'")}')" style="display:flex; align-items:center; justify-content:space-between; padding:10px 16px; border-bottom:1px solid #f8fafc; cursor:pointer; transition:background 0.15s;">
            <div style="display:flex; align-items:center; gap:12px; flex:1; overflow:hidden;">
              <img src="${s.img}" alt="" style="width:38px; height:38px; border-radius:6px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0;">
              <div style="display:flex; flex-direction:column; overflow:hidden;">
                <div style="font-size:0.84rem; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${displayTitle}</div>
                <div style="font-size:0.68rem; color:#64748b; font-weight:600;">in ${s.cat}</div>
              </div>
            </div>
            <i class="fa-solid fa-arrow-trend-up" style="color:#94a3b8; font-size:0.85rem; padding-left:10px;"></i>
          </div>
        `;
      });

      list.innerHTML = htmlRows;
    }

    function executeBoutiqueSearch(query) {
      currentSearchQuery = (query || '').trim();
      closeBoutiqueSearch();

      // 1. Filter products strictly using our smart categorical engine
      const q = currentSearchQuery.toLowerCase();
      let matched = [];

      const sareeKeywords = ['শাড়ি', 'শাড়ী', 'শাড়ি', 'saree', 'sari', 'sharee', 'shari'];
      const isSareeQuery = !q || sareeKeywords.some(k => q === k || q.startsWith(k + ' ') || q.endsWith(' ' + k));
      const jamdaniKeys = ['জামদানি', 'ঢাকাই', 'jamdani', 'dhakai'];
      const silkKeys = ['সিল্ক', 'কাতান', 'silk', 'katan'];
      const tantKeys = ['তাঁত', 'সুতি', 'কটন শাড়ি', 'tant', 'cotton saree', 'handloom'];
      const jewelKeywords = ['গহনা', 'গয়না', 'অলঙ্কার', 'জুয়েলারি', 'jewel', 'jewellery', 'jewelry'];
      const isJewelQuery = jewelKeywords.some(k => q === k || q.startsWith(k + ' ') || q.endsWith(' ' + k));
      const necklaceKeys = ['নেকলেস', 'চোকার', 'হার', 'মালা', 'necklace', 'choker'];
      const earringsKeys = ['দুল', 'ঝুমকো', 'ঝুমকা', 'কানপাশা', 'earrings', 'jhumka'];
      const banglesKeys = ['বালা', 'চুড়ি', 'চুড়ী', 'শাখা', 'পলা', 'bangles', 'churi'];
      const kurtiKeywords = ['কুর্তি', 'কুর্তা', 'আনারকলি', 'kurti', 'kurta', 'anarkali'];
      const girlsKeywords = ['ফ্রক', 'লেহেঙ্গা', 'বাচ্চা', 'মেয়ে', 'frock', 'lehenga', 'baby', 'kids', 'girl'];

      if (!q || isSareeQuery) {
        matched = products.filter(p => p.type === 'saree');
      } else if (jamdaniKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'saree' && (p.category === 'jamdani' || p.title.toLowerCase().includes('jamdani')));
      } else if (silkKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'saree' && (p.category === 'silk' || p.title.toLowerCase().includes('silk') || p.title.toLowerCase().includes('katan')));
      } else if (tantKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'saree' && (p.category === 'tant' || p.title.toLowerCase().includes('tant')));
      } else if (isJewelQuery) {
        matched = products.filter(p => p.type === 'jewel');
      } else if (necklaceKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'jewel' && (p.category === 'necklace' || p.title.toLowerCase().includes('necklace') || p.title.toLowerCase().includes('choker')));
      } else if (earringsKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'jewel' && (p.category === 'earrings' || p.title.toLowerCase().includes('earrings') || p.title.toLowerCase().includes('jhumka')));
      } else if (banglesKeys.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'jewel' && (p.category === 'bangles' || p.title.toLowerCase().includes('bangles') || p.title.toLowerCase().includes('churi')));
      } else if (kurtiKeywords.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'kurti' || p.category === 'kurti' || p.title.toLowerCase().includes('kurti'));
      } else if (girlsKeywords.some(k => q.includes(k))) {
        matched = products.filter(p => p.type === 'girls' || p.category.includes('frock') || p.category.includes('lehenga') || p.title.toLowerCase().includes('frock'));
      } else {
        matched = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        if (matched.length === 0) {
          matched = products.filter(p => p.desc && p.desc.toLowerCase().includes(q));
        }
      }

      // Update Results Header Title & Notice Strip
      const titleEl = document.getElementById('ncResultsQueryTitle');
      if (titleEl) titleEl.textContent = currentSearchQuery || (currentLang === 'bn' ? "সকল শাড়ি ও প্রোডাক্ট" : "All Products");

      const countMsgEl = document.getElementById('ncResultsCountMsg');
      if (countMsgEl) {
        countMsgEl.innerHTML = `<strong>"${currentSearchQuery || 'সকল প্রোডাক্ট'}"</strong>-এর জন্য <strong>${matched.length}</strong>টি ফলাফল দেখানো হচ্ছে`;
      }

      // Render 2-Column Product Grid in Search Results (ছবি 2 হুবহু)
      renderBoutiqueSearchResults(matched);

      // Show the search results screen
      showScreen('search-results');
      window.scrollTo(0, 0);
    }

    function renderBoutiqueSearchResults(list) {
      const grid = document.getElementById('ncSearchResultsGrid');
      if (!grid) return;
      grid.innerHTML = '';

      if (!list || list.length === 0) {
        grid.innerHTML = `
          <div style="grid-column:span 2; text-align:center; padding:50px 16px; background:#fff; border-radius:14px; border:1px solid #e2e8f0; margin-top:10px;">
            <i class="fa-solid fa-magnifying-glass" style="font-size:3rem; color:#cbd5e1; margin-bottom:12px;"></i>
            <div style="font-size:1rem; font-weight:800; color:#334155;">দুঃখিত! কোনো প্রোডাক্ট পাওয়া যায়নি।</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin:6px 0 16px 0;">বানান পরীক্ষা করুন অথবা অন্য কোনো শাড়ি বা গহনা খুঁজুন।</div>
            <button type="button" onclick="openBoutiqueSearch('')" style="background:var(--primary); color:#fff; border:none; padding:10px 20px; border-radius:20px; font-weight:800; font-size:0.85rem; cursor:pointer;">
              নতুন অনুসন্ধান করুন ➔
            </button>
          </div>
        `;
        return;
      }

      list.forEach(p => {
        const offPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
        const isWished = wishlist.includes(p.id);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.position = 'relative';
        card.onclick = () => openPdp(p.id);

        card.innerHTML = `
          <div class="product-img-wrap" style="position:relative;">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <!-- Floating Wishlist Heart Button (ছবি 2 হুবহু) -->
            <button class="wish-btn ${isWished ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}'); this.classList.toggle('active');" style="position:absolute; top:8px; right:8px; width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,0.92); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.12); z-index:5;">
              <i class="fa-${isWished ? 'solid' : 'regular'} fa-heart" style="${isWished ? 'color:#e11d48;' : 'color:#64748b;'} font-size:1rem;"></i>
            </button>
            <!-- Rating Badge at Bottom Left (ছবি 2) -->
            <div style="position:absolute; bottom:6px; left:6px; background:rgba(21,128,61,0.92); color:#fff; font-size:0.65rem; font-weight:800; padding:2px 6px; border-radius:4px; display:flex; align-items:center; gap:2px; box-shadow:0 1px 4px rgba(0,0,0,0.2);">
              ★ 4.2 <span style="font-weight:600; opacity:0.85;">| 85</span>
            </div>
          </div>
          <div class="product-info">
            <div>
              <div class="p-cat-tag">${p.category.toUpperCase()}</div>
              <div class="p-title" style="font-size:0.82rem; line-height:1.25; margin-top:2px;">${p.title}</div>
            </div>
            <div style="margin-top:6px;">
              <!-- Price Row: ↓ Discount %, MRP Strikethrough, Selling Price (ছবি 2) -->
              <div class="p-price-row" style="align-items:baseline; gap:6px;">
                <span style="font-size:0.75rem; font-weight:800; color:#16a34a;">↓${offPct}%</span>
                <span class="p-mrp" style="font-size:0.78rem;">₹${p.mrp}</span>
                <span class="p-price" style="font-size:1.05rem;">₹${p.price}</span>
              </div>
              <!-- Delivery tag (ছবি 2: 20th Sep মধ্যে ডেলিভারি) -->
              <div style="font-size:0.68rem; color:#15803d; font-weight:700; margin-top:4px; display:flex; align-items:center; gap:4px;">
                <i class="fa-solid fa-truck-fast"></i> আমতায় ফ্রি হোম ডেলিভারি
              </div>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function toggleBoutiqueQuickChip(chipType) {
      const chipBudget = document.getElementById('ncChipBudget');
      const chipSilk = document.getElementById('ncChipSilk');
      const chipDelivery = document.getElementById('ncChipDelivery');

      if (ncActiveQuickChip === chipType) {
        // Toggle OFF
        ncActiveQuickChip = null;
        [chipBudget, chipSilk, chipDelivery].forEach(btn => {
          if (btn) {
            btn.style.background = '#fff';
            btn.style.borderColor = '#cbd5e1';
            btn.style.color = '#334155';
          }
        });
        executeBoutiqueSearch(currentSearchQuery);
        return;
      }

      ncActiveQuickChip = chipType;
      [chipBudget, chipSilk, chipDelivery].forEach(btn => {
        if (btn) {
          btn.style.background = '#fff';
          btn.style.borderColor = '#cbd5e1';
          btn.style.color = '#334155';
        }
      });

      let targetBtn = null;
      let filtered = products;

      if (chipType === 'budget') {
        targetBtn = chipBudget;
        filtered = products.filter(p => p.price <= 500);
      } else if (chipType === 'silk') {
        targetBtn = chipSilk;
        filtered = products.filter(p => p.category === 'silk' || p.title.toLowerCase().includes('silk') || p.title.toLowerCase().includes('katan'));
      } else if (chipType === 'delivery') {
        targetBtn = chipDelivery;
        filtered = products; // All products in Amta have free home delivery!
      }

      if (targetBtn) {
        targetBtn.style.background = '#fdf4ff';
        targetBtn.style.borderColor = 'var(--primary)';
        targetBtn.style.color = 'var(--primary)';
      }

      renderBoutiqueSearchResults(filtered);
    }


    function handleSearch(query) {
      const q = (query || '').toLowerCase().trim();
      if (!q) {
        renderProducts(products);
        return;
      }

      // 1. Strict Saree search: If query matches saree keywords
      const sareeKeywords = ['শাড়ি', 'শাড়ী', 'শাড়ি', 'saree', 'sari', 'sharee', 'shari'];
      const isSareeQuery = sareeKeywords.some(k => q === k || q.startsWith(k + ' ') || q.endsWith(' ' + k));

      // Specific saree varieties
      const jamdaniKeys = ['জামদানি', 'ঢাকাই', 'jamdani', 'dhakai'];
      const silkKeys = ['সিল্ক', 'কাতান', 'silk', 'katan'];
      const tantKeys = ['তাঁত', 'সুতি', 'কটন শাড়ি', 'tant', 'cotton saree', 'handloom'];

      // 2. Strict Jewellery search
      const jewelKeywords = ['গহনা', 'গয়না', 'অলঙ্কার', 'জুয়েলারি', 'jewel', 'jewellery', 'jewelry'];
      const isJewelQuery = jewelKeywords.some(k => q === k || q.startsWith(k + ' ') || q.endsWith(' ' + k));
      const necklaceKeys = ['নেকলেস', 'চোকার', 'হার', 'মালা', 'necklace', 'choker'];
      const earringsKeys = ['দুল', 'ঝুমকো', 'ঝুমকা', 'কানপাশা', 'earrings', 'jhumka'];
      const banglesKeys = ['বালা', 'চুড়ি', 'চুড়ী', 'শাখা', 'পলা', 'bangles', 'churi'];

      // 3. Strict Kurti search
      const kurtiKeywords = ['কুর্তি', 'কুর্তা', 'আনারকলি', 'kurti', 'kurta', 'anarkali'];
      const isKurtiQuery = kurtiKeywords.some(k => q.includes(k));

      // 4. Strict Kids / Girls search
      const girlsKeywords = ['ফ্রক', 'লেহেঙ্গা', 'বাচ্চা', 'মেয়ে', 'frock', 'lehenga', 'baby', 'kids', 'girl'];
      const isGirlsQuery = girlsKeywords.some(k => q.includes(k));

      let filtered = [];

      if (isSareeQuery) {
        // STRICTLY only saree products, NO jewellery, NO other items
        filtered = products.filter(p => p.type === 'saree');
      } else if (jamdaniKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'saree' && (p.category === 'jamdani' || p.title.toLowerCase().includes('jamdani')));
      } else if (silkKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'saree' && (p.category === 'silk' || p.title.toLowerCase().includes('silk') || p.title.toLowerCase().includes('katan')));
      } else if (tantKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'saree' && (p.category === 'tant' || p.title.toLowerCase().includes('tant')));
      } else if (isJewelQuery) {
        // STRICTLY only jewellery products, NO sarees
        filtered = products.filter(p => p.type === 'jewel');
      } else if (necklaceKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'jewel' && (p.category === 'necklace' || p.title.toLowerCase().includes('necklace') || p.title.toLowerCase().includes('choker')));
      } else if (earringsKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'jewel' && (p.category === 'earrings' || p.title.toLowerCase().includes('earrings') || p.title.toLowerCase().includes('jhumka')));
      } else if (banglesKeys.some(k => q.includes(k))) {
        filtered = products.filter(p => p.type === 'jewel' && (p.category === 'bangles' || p.title.toLowerCase().includes('bangles') || p.title.toLowerCase().includes('churi')));
      } else if (isKurtiQuery) {
        filtered = products.filter(p => p.type === 'kurti' || p.category === 'kurti' || p.title.toLowerCase().includes('kurti'));
      } else if (isGirlsQuery) {
        filtered = products.filter(p => p.type === 'girls' || p.category.includes('frock') || p.category.includes('lehenga') || p.title.toLowerCase().includes('frock'));
      } else {
        // Generic search: Match title first, or category. Do NOT cross-match descriptions that merely mention "শাড়ির সাথে"
        filtered = products.filter(p => {
          const tMatch = p.title.toLowerCase().includes(q);
          const cMatch = p.category.toLowerCase().includes(q);
          return tMatch || cMatch;
        });
        if (filtered.length === 0) {
          // Fallback to description ONLY if no title/category match
          filtered = products.filter(p => p.desc && p.desc.toLowerCase().includes(q));
        }
      }

      renderProducts(filtered);
    }

    
    // =========================================================
    // NISHA BOUTIQUE ACCOUNT SCREEN & WISHLIST LOGIC (ছবি 1 হুবহু)
    // =========================================================
    function openWishlistScreen() {
      showScreen('wishlist');
      renderWishlistScreen();
    }

    function formatOrderDate(dateStr) {
      if (!dateStr) return '';
      const bnToEnMap = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
      if (currentLang === 'en') {
        return dateStr.replace(/[০-৯]/g, d => bnToEnMap[d] || d);
      }
      return dateStr;
    }

    function formatDeliveryEst(estStr) {
      if (!estStr) return currentLang === 'en' ? 'Delivery: within 2 days (Express)' : 'আমতায় 2 দিনের মধ্যে এক্সপ্রেস ডেলিভারি';
      if (currentLang === 'en') {
        const bnDays = {'রবিবার':'Friday','সোমবার':'Monday','মঙ্গলবার':'Tuesday','বুধবার':'Wednesday','বৃহস্পতিবার':'Thursday','শুক্রবার':'Friday','শনিবার':'Saturday'};
        const bnMonths = {'জানুয়ারি':'Jan','ফেব্রুয়ারি':'Feb','মার্চ':'Mar','এপ্রিল':'Apr','মে':'May','জুন':'Jun','জুলাই':'Jul','আগস্ট':'Aug','সেপ্টেম্বর':'Sep','অক্টোবর':'Oct','নভেম্বর':'Nov','ডিসেম্বর':'Dec'};
        let s = estStr;
        const bnToEnMap = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
        s = s.replace(/[০-৯]/g, d => bnToEnMap[d] || d);
        s = s.replace(/ডেলিভারি:\s*/g, 'Delivery: ');
        s = s.replace(/ই সেপ্টেম্বর/g, ' Sep');
        s = s.replace(/(\d+)ই\s*([^\s]+)/g, '$1 $2');
        for (const [bnD, enD] of Object.entries(bnDays)) { s = s.replace(bnD, enD); }
        for (const [bnM, enM] of Object.entries(bnMonths)) { s = s.replace(bnM, enM); }
        s = s.replace(/\(2 দিনের মধ্যে\)/g, '(within 2 days)');
        s = s.replace(/আমতায় 2 দিনের মধ্যে এক্সপ্রেস ডেলিভারি/g, 'Express 2-day delivery in Amta');
        return s;
      }
      return estStr;
    }

    function renderWishlistScreen() {
      const container = document.getElementById('wishlistGridContainer');
      if (!container) return;

      const stored = localStorage.getItem('nc_wishlist');
      wishlist = stored ? JSON.parse(stored) : [];

      const badgeHeader = document.getElementById('wishlistCountHeaderBadge');
      const badgeAccount = document.getElementById('ncWishlistCountBadge');
      if (badgeHeader) badgeHeader.textContent = `❤️ ${wishlist.length}`;
      if (badgeAccount) badgeAccount.textContent = wishlist.length;

      const isEn = currentLang === 'en';
      const wHead = document.getElementById('t-wishlistHeaderTitle');
      if (wHead) wHead.textContent = isEn ? "MY WISHLIST" : "MY WISHLIST (পছন্দের তালিকা)";

      if (wishlist.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; background:#fff; border-radius:14px; border:1px solid #e2e8f0; margin-top:10px;">
            <i class="fa-solid fa-heart" style="font-size:3.5rem; color:#f43f5e; margin-bottom:14px; opacity:0.85;"></i>
            <div style="font-size:1.05rem; font-weight:800; color:#334155;" id="t-wishlistEmptyTitle">${isEn ? "Your Wishlist is Empty!" : "আপনার পছন্দের তালিকা ফাঁকা!"}</div>
            <div style="font-size:0.78rem; color:#94a3b8; margin:6px 0 16px 0; line-height:1.4;" id="t-wishlistEmptySub">
              ${isEn ? "Tap the heart icon (❤️) on any saree or outfit on the home page to save them here." : "হোম পেজে গিয়ে যেকোনো শাড়ি বা পোশাকে লাভ (❤️) চিহ্নে চাপ দিন, সেগুলি এখানে সুন্দরভাবে জমা হবে।"}
            </div>
            <button onclick="showScreen('home')" id="t-btnWishlistShop" style="background:var(--primary); color:#fff; border:none; padding:10px 24px; border-radius:20px; font-size:0.85rem; font-weight:800; cursor:pointer; box-shadow:0 4px 12px rgba(156,39,176,0.3);">
              ${isEn ? "Explore Sarees & Collections ➔" : "শাড়ি ও কালেকশন দেখুন ➔"}
            </button>
          </div>
        `;
        return;
      }

      const wishlistedProducts = products.filter(p => wishlist.includes(p.id));
      
      container.innerHTML = '<div class="product-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;"></div>';
      const grid = container.querySelector('.product-grid');

      wishlistedProducts.forEach(p => {
        const offPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openPdp(p.id);

        card.innerHTML = `
          <div class="product-img-wrap">
            <img src="${p.img}" alt="${p.title}" loading="lazy">
            <button class="wish-btn active" onclick="event.stopPropagation(); removeWishlistItem('${p.id}')" title="${isEn ? 'Remove' : 'সরিয়ে দিন'}">
              <i class="fa-solid fa-heart" style="color:#e11d48;"></i>
            </button>
          </div>
          <div class="product-info">
            <div>
              <div class="p-cat-tag">${p.category}</div>
              <div class="p-title">${p.title}</div>
            </div>
            <div>
              <div class="p-price-row">
                ${(p.sizeVariants && Array.isArray(p.sizeVariants) && p.sizeVariants.length > 1 && Math.min(...p.sizeVariants.map(v => v.price)) !== Math.max(...p.sizeVariants.map(v => v.price))) ? `
                  <span class="p-price" style="font-size:0.92rem;">₹${Math.min(...p.sizeVariants.map(v => v.price))} - ₹${Math.max(...p.sizeVariants.map(v => v.price))}</span>
                ` : `
                  <span class="p-price">₹${p.price}</span>
                `}
                <span class="p-mrp">₹${p.mrp}</span>
                <span class="p-off">${offPct}% off</span>
              </div>
              ${(p.sizeVariants && Array.isArray(p.sizeVariants) && p.sizeVariants.length > 1 && Math.min(...p.sizeVariants.map(v => v.price)) !== Math.max(...p.sizeVariants.map(v => v.price))) ? `
                <div style="font-size:0.66rem; color:#7e22ce; font-weight:800; margin-top:2px;">
                  <i class="fa-solid fa-ruler-combined"></i> সাইজ অনুযায়ী রেট
                </div>
              ` : ''}
              <button onclick="event.stopPropagation(); addWishlistToCart('${p.id}')" style="width:100%; background:var(--primary); color:#fff; border:none; padding:8px 0; border-radius:6px; font-size:0.75rem; font-weight:800; margin-top:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:4px;">
                <i class="fa-solid fa-bag-shopping"></i> ${isEn ? 'Move to Bag' : 'ব্যাগে নিন'}
              </button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function removeWishlistItem(id) {
      wishlist = wishlist.filter(x => x !== id);
      localStorage.setItem('nc_wishlist', JSON.stringify(wishlist));
      renderWishlistScreen();
      updateWishlistBadgesGlobal();
    }

    function addWishlistToCart(id) {
      const prod = products.find(p => p.id === id);
      if (!prod) return;
      cart.push({
        ...prod,
        selectedSize: 'Free Size',
        qty: 1
      });
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      alert(`✨ "${prod.title}" শপিং ব্যাগে যোগ করা হয়েছে!`);
    }

    function updateWishlistBadgesGlobal() {
      const stored = localStorage.getItem('nc_wishlist');
      const wList = stored ? JSON.parse(stored) : [];
      const badgeAccount = document.getElementById('ncWishlistCountBadge');
      const badgeHeader = document.getElementById('wishlistCountHeaderBadge');
      if (badgeAccount) badgeAccount.textContent = wList.length;
      if (badgeHeader) badgeHeader.textContent = `❤️ ${wList.length}`;
    }

    function toggleEditAccountAddress() {
      const form = document.getElementById('ncEditAddressForm');
      if (form) {
        form.style.display = (form.style.display === 'none' || !form.style.display) ? 'block' : 'none';
      }
    }

    function saveAccountAddressQuick() {
      const name = document.getElementById('nc_edit_name').value.trim();
      const phone = document.getElementById('nc_edit_phone').value.trim();
      const addr = document.getElementById('nc_edit_addr').value.trim();

      if (!name || !phone || !addr) {
        alert("নাম, ফোন নম্বর ও আমতার ঠিকানা দিন!");
        return;
      }

      currentCustomer = currentCustomer || {};
      currentCustomer.name = name;
      currentCustomer.phone = phone;
      currentCustomer.address = addr;
      localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));

      checkoutAddress.name = name;
      checkoutAddress.phone = phone;
      checkoutAddress.address = addr;

      const nameEl = document.getElementById('ncAccountCustName');
      const phoneEl = document.getElementById('ncAccountCustPhone');
      const addrEl = document.getElementById('ncAccountCustAddr');
      const greetEl = document.getElementById('ncGreetingName');

      if (nameEl) nameEl.textContent = name;
      if (phoneEl) phoneEl.textContent = "📞 " + phone;
      if (addrEl) addrEl.textContent = addr;
      if (greetEl) greetEl.textContent = "Hey, " + name;

      const form = document.getElementById('ncEditAddressForm');
      if (form) form.style.display = 'none';
      alert("✅ প্রোফাইল ও ঠিকানা সফলভাবে সেভ হয়েছে!");
    }

    function toggleWishlist(id) {
  if (!id) return;
  const idx = wishlist.indexOf(id);
  const isAdding = (idx === -1);
  if (isAdding) {
    wishlist.push(id);
  } else {
    wishlist.splice(idx, 1);
  }

  try {
    localStorage.setItem('nc_wishlist', JSON.stringify(wishlist));
  } catch(e) {}

  // 1. Update all heart buttons for this product in the DOM immediately
  const wishButtons = document.querySelectorAll(`button[onclick*="${id}"].wish-btn, .wish-btn[onclick*="${id}"], .wishlist-btn-circle[onclick*="${id}"]`);
  wishButtons.forEach(btn => {
    btn.classList.toggle('active', isAdding);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isAdding ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      icon.style.color = isAdding ? '#ef4444' : '';
    }
  });

  // Also check product cards
  const allCards = document.querySelectorAll('.product-card');
  allCards.forEach(card => {
    if (card.getAttribute('onclick')?.includes(id)) {
      const btn = card.querySelector('.wish-btn, .wishlist-btn-circle');
      if (btn) {
        btn.classList.toggle('active', isAdding);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = isAdding ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
          icon.style.color = isAdding ? '#ef4444' : '';
        }
      }
    }
  });

  // 2. Update PDP button if current product matches
  if (typeof currentPdpProduct !== 'undefined' && currentPdpProduct && currentPdpProduct.id === id) {
    updatePdpWishBtnState();
  }

  // 3. Update global badges
  updateWishlistBadgesGlobal();

  // 4. Update wishlist screen if currently visible
  try {
    const wishScreen = document.getElementById('screen-wishlist');
    if (wishScreen && wishScreen.classList.contains('active') && typeof renderWishlistScreen === 'function') {
      renderWishlistScreen();
    }
  } catch(e) {}
}

    // Open PDP
        // PDP Wishlist Sync & Toggle
    function togglePdpWishlist() {
      if (!currentPdpProduct) return;
      toggleWishlist(currentPdpProduct.id);
      updatePdpWishBtnState();
      
    }

    function updatePdpWishBtnState() {
      if (!currentPdpProduct) return;
      const btn = document.getElementById('pdpWishBtn');
      const icon = document.getElementById('pdpWishIcon');
      if (!btn || !icon) return;
      const isWished = wishlist.includes(currentPdpProduct.id);
      if (isWished) {
        btn.style.color = '#e11d48';
        btn.style.borderColor = '#fda4af';
        btn.style.background = '#fff1f2';
        btn.style.boxShadow = '0 2px 6px rgba(225,29,72,0.15)';
        icon.className = 'fa-solid fa-heart';
      } else {
        btn.style.color = '#64748b';
        btn.style.borderColor = '#e2e8f0';
        btn.style.background = '#ffffff';
        btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)';
        icon.className = 'fa-regular fa-heart';
      }
    }

    function openPdpReviewModalDirect() {
      if (!currentPdpProduct) return;
      openDeliveryReviewModal('', currentPdpProduct.title, currentPdpProduct.id);
    }

    function renderPdpCustomerWall(prod) {
      if (!prod) return;
      const isEn = currentLang === 'en';

      const wallTitle = document.getElementById('t-pdpReviewWallTitle');
      if (wallTitle) wallTitle.textContent = isEn ? "Customer Reviews & Real Photos (Customer Wall)" : "গ্রাহকদের রিভিউ ও আসল ছবি (Customer Wall)";
      const btnWrite = document.getElementById('t-btnPdpWriteReview');
      if (btnWrite) btnWrite.textContent = isEn ? "Write Review" : "রিভিউ লিখুন";

      const photoStrip = document.getElementById('pdpReviewPhotoStrip');
      const listContainer = document.getElementById('pdpCustomerReviewsContainer');
      const summaryEl = document.getElementById('pdpReviewCountSummary');
      if (!photoStrip || !listContainer) return;

      const stored = localStorage.getItem('nc_user_reviews');
      let allReviews = stored ? JSON.parse(stored) : [];

      // Seed with initial authentic reviews if empty
      if (!stored || allReviews.length === 0) {
        allReviews = [
          {
            id: 101,
            productId: prod.id,
            product: prod.title,
            name: 'সোমা দাস (আমতা)',
            nameEn: 'Soma Das (Amta)',
            rating: 5,
            ratingLabel: 'অসাধারণ সুন্দর কাপড়!',
            ratingLabelEn: 'Extremely beautiful fabric!',
            comment: 'আমতায় মাত্র 3 ঘণ্টায় শাড়িটি হাতে পেলাম। কাপড় খুব নরম আর জেনুইন জরির কাজ। নিশা দিদির ব্যবহারও খুব ভালো।',
            commentEn: 'Received the saree in Amta within 3 hours. Fabric is very soft with genuine zari work. Highly recommended!',
            photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
            date: '15/09/2026'
          },
          {
            id: 102,
            productId: prod.id,
            product: prod.title,
            name: 'রূপা মণ্ডল (রানীহাটি)',
            nameEn: 'Rupa Mondal (Ranihati)',
            rating: 5,
            ratingLabel: 'একদম ছবির মতোই সুন্দর!',
            ratingLabelEn: 'Just like the photo, stunning!',
            comment: 'পুজোর জন্য ক্যাটালগ দেখে অর্ডার করেছিলাম। হুবহু ছবির মতোই সুন্দর আর উজ্জ্বল রং। ক্যাশ অন ডেলিভারিতে পেয়েছি।',
            commentEn: 'Ordered for Puja from catalog. Exact match with picture, vibrant colors. Got it with COD.',
            photo: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400',
            date: '14/09/2026'
          }
        ];
        localStorage.setItem('nc_user_reviews', JSON.stringify(allReviews));
      }

      // Filter reviews for this product or general boutique
      const prodReviews = allReviews.filter(r => 
        !r.productId || r.productId === prod.id || r.productId === 'all' ||
        (r.product && prod.title && (r.product.toLowerCase().includes(prod.title.toLowerCase()) || prod.title.toLowerCase().includes(r.product.toLowerCase())))
      );

      // Photo strip: Collect all photos from reviews + default photos
      photoStrip.innerHTML = '';
      const photoUrls = [];
      prodReviews.forEach(r => {
        if (r.photo && !photoUrls.includes(r.photo)) photoUrls.push(r.photo);
      });
      const defaultPhotos = [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200',
        'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=200'
      ];
      defaultPhotos.forEach(dp => {
        if (!photoUrls.includes(dp)) photoUrls.push(dp);
      });

      photoUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.cssText = 'width:64px; height:64px; border-radius:10px; object-fit:cover; border:1.5px solid #e2e8f0; flex-shrink:0; cursor:pointer; box-shadow:0 1px 4px rgba(0,0,0,0.05);';
        img.onclick = () => {
          window.open(url, '_blank');
        };
        photoStrip.appendChild(img);
      });

      if (summaryEl) {
        summaryEl.textContent = isEn ? `4.9 ★ (${photoUrls.length}+ Customer Photos)` : `4.9 ★ (${photoUrls.length}+ গ্রাহকের ছবি ও রেটিং)`;
      }

      // Render Review Cards
      listContainer.innerHTML = '';
      if (prodReviews.length === 0) {
        listContainer.innerHTML = `
          <div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; padding:12px; text-align:center; font-size:0.75rem; color:#64748b;">
            ${isEn ? 'No reviews yet for this saree. Be the first to share your review!' : 'এই শাড়ির জন্য এখনও কোনো রিভিউ নেই। প্রথম রিভিউ দিয়ে 20 কয়েন পান!'}
          </div>
        `;
        return;
      }

      prodReviews.forEach(r => {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
          starsHtml += `<i class="fa-solid fa-star" style="color:${i <= r.rating ? '#f59e0b' : '#cbd5e1'}; font-size:0.82rem;"></i> `;
        }
        const displayName = isEn ? (r.nameEn || r.name) : r.name;
        const displayLabel = isEn ? (r.ratingLabelEn || r.ratingLabel || 'Excellent Product') : (r.ratingLabel || 'অসাধারণ সুন্দর!');
        const displayComment = isEn ? (r.commentEn || r.comment) : r.comment;
        const displayDate = formatOrderDate(r.date);

        const card = document.createElement('div');
        card.style.cssText = 'background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; font-size:0.75rem; color:#334155;';

        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-weight:800; color:#0f172a;">${displayName}</span>
              <span style="background:#dcfce7; color:#15803d; font-size:0.65rem; font-weight:700; padding:1px 6px; border-radius:10px; display:inline-flex; align-items:center; gap:3px;">
                <i class="fa-solid fa-circle-check"></i> ${isEn ? 'Verified' : 'ভেরিফাইড'}
              </span>
            </div>
            <span style="font-size:0.68rem; color:#94a3b8;">${displayDate}</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
            <div>${starsHtml}</div>
            <span style="font-weight:700; color:#15803d; font-size:0.72rem;">${displayLabel}</span>
          </div>
          <div style="color:#475569; line-height:1.4; margin-bottom:${r.photo ? '8px' : '0'};">
            "${displayComment}"
          </div>
          ${r.photo ? `
            <div style="margin-top:6px;">
              <img src="${r.photo}" alt="Customer photo" style="width:60px; height:60px; border-radius:8px; object-fit:cover; border:1px solid #cbd5e1; cursor:pointer;" onclick="window.open('${r.photo}', '_blank')">
            </div>
          ` : ''}
        `;
        listContainer.appendChild(card);
      });
    }

        // Screen History Tracker for PDP
    let previousScreenBeforePdp = 'home';

    function closePdpScreen() {
      showScreen(previousScreenBeforePdp || 'home');
    }

    let selectedReturnOption = 'all';

function selectReturnChoice(type) {
  selectedReturnOption = type;
  const cardAll = document.getElementById('returnCardAll');
  const cardDef = document.getElementById('returnCardDefective');
  if (cardAll) {
    if (type === 'all') cardAll.classList.add('active');
    else cardAll.classList.remove('active');
  }
  if (cardDef) {
    if (type === 'defective' || type === 'wrong') cardDef.classList.add('active');
    else cardDef.classList.remove('active');
  }
}


// =========================================================================
// PDP SIZE SELECTION & DYNAMIC PRICE SWITCHER
// =========================================================================
let currentPdpSelectedPrice = 0;
let currentPdpSelectedMrp = 0;

function selectPdpSize(sz) {
  selectedPdpSize = sz;
  document.querySelectorAll('#pdpSizeBtnGroup .size-pill-btn').forEach(btn => {
    if (btn.getAttribute('data-size') === sz) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (currentPdpProduct && Array.isArray(currentPdpProduct.sizeVariants) && currentPdpProduct.sizeVariants.length > 0) {
    const variant = currentPdpProduct.sizeVariants.find(v => v.size === sz);
    if (variant && variant.price) {
      currentPdpSelectedPrice = variant.price;
      currentPdpSelectedMrp = variant.mrp || (variant.price * 2);

      const priceEl = document.getElementById('pdpPrice');
      const mrpEl = document.getElementById('pdpMrp');
      const discEl = document.getElementById('pdpDiscount');
      const upiEl = document.getElementById('pdpUpiOffer');
      const rPriceAll = document.getElementById('returnPriceAll');
      const rPriceDef = document.getElementById('returnPriceDefective');

      if (priceEl) priceEl.textContent = `₹${variant.price}`;
      if (mrpEl) mrpEl.textContent = `₹${currentPdpSelectedMrp}`;
      if (discEl) {
        const offPct = Math.round(((currentPdpSelectedMrp - variant.price) / currentPdpSelectedMrp) * 100);
        discEl.textContent = `${offPct}% off`;
      }
      if (upiEl) {
        const upiOff = Math.round(variant.price * 0.95);
        upiEl.textContent = `UPI দিয়ে পেমেন্ট করলে মাত্র ₹${upiOff}`;
      }
      if (rPriceAll) rPriceAll.textContent = `₹${variant.price}`;
      if (rPriceDef) rPriceDef.textContent = `₹${Math.max(0, variant.price - 10)}`;
    }
  }
}

    function openPdp(id) {
      // Record current active screen before navigating to PDP
      const curActive = document.querySelector('.screen-view.active');
      if (curActive && curActive.id && curActive.id !== 'screen-pdp') {
        previousScreenBeforePdp = curActive.id.replace('screen-', '');
      }
      const p = products.find(x => x.id === id);
      if (!p) return;
      currentPdpProduct = p;

      document.getElementById('pdpMainImg').src = p.img;
      document.getElementById('pdpCategory').textContent = p.category.toUpperCase();
      document.getElementById('pdpTitle').textContent = p.title;
      document.getElementById('pdpPrice').textContent = `₹${p.price}`;
      document.getElementById('pdpMrp').textContent = `₹${p.mrp}`;
      const offPct = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      document.getElementById('pdpDiscount').textContent = `${offPct}% off`;
      document.getElementById('pdpUpiOffer').textContent = `UPI দিয়ে পেমেন্ট করলে মাত্র ₹${p.upiOffer || Math.round((p.price || 0) * 0.95)}`

      // Multi-Images Thumbnails Strip
      const subStrip = document.getElementById('pdpSubImagesStrip');
      if (subStrip) {
        subStrip.innerHTML = '';
        const allImgs = [p.img, ...(p.subImages || [])];
        if (allImgs.length > 1) {
          allImgs.forEach((imgSrc, i) => {
            subStrip.innerHTML += `
              <img src="${imgSrc}" onclick="document.getElementById('pdpMainImg').src='${imgSrc}'" style="width:55px; height:55px; object-fit:cover; border-radius:6px; border:1.5px solid var(--primary); cursor:pointer;">
            `;
          });
          subStrip.style.display = 'flex';
        } else {
          subStrip.style.display = 'none';
        }
      }

            // Out of Stock Handling
      const buyBtn = document.querySelector('.btn-buy-now');
      const addCartBtn = document.querySelector('.btn-add-cart');
      const curStock = (p.stock !== undefined) ? parseInt(p.stock) : (p.inStock !== false ? 100 : 0);
      const isOutOfStock = (curStock <= 0 || p.inStock === false);
      const isUrgent = (curStock > 0 && curStock <= 10);

      if (isOutOfStock) {
        if (buyBtn) {
          buyBtn.disabled = true;
          buyBtn.style.background = '#64748b';
          buyBtn.style.cursor = 'not-allowed';
          buyBtn.innerHTML = `<i class="fa-solid fa-ban"></i> ${currentLang === 'bn' ? 'স্টক শেষ (Out of Stock)' : 'Out of Stock'}`;
        }
        if (addCartBtn) {
          addCartBtn.disabled = true;
          addCartBtn.style.opacity = '0.4';
          addCartBtn.style.cursor = 'not-allowed';
        }
      } else {
        if (buyBtn) {
          buyBtn.disabled = false;
          buyBtn.style.background = '';
          buyBtn.style.cursor = 'pointer';
          buyBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> ${currentLang === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}`;
          buyBtn.onclick = buyCurrentNow;
        }
        if (addCartBtn) {
          addCartBtn.disabled = false;
          addCartBtn.style.opacity = '1';
          addCartBtn.style.cursor = 'pointer';
          addCartBtn.onclick = addCurrentToCart;
        }
      }

      // Live Stock Urgency & Out of Stock Notification in PDP
      const stockMsgBox = document.getElementById('pdpStockAlertBox') || document.createElement('div');
      stockMsgBox.id = 'pdpStockAlertBox';

      if (isOutOfStock) {
        stockMsgBox.innerHTML = `
          <div style="background:#fee2e2; border:1.5px solid #f87171; color:#991b1b; padding:12px; border-radius:12px; font-size:0.85rem; font-weight:800; margin:10px 0;">
            <div style="display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-circle-xmark" style="color:#dc2626; font-size:1.3rem;"></i>
              <div>${currentLang === 'bn' ? 'দুঃখিত! এই শাড়িটির স্টক সম্পূর্ণ শেষ (Out of Stock)।' : 'Sorry! This item is currently out of stock.'}</div>
            </div>
            <a href="https://wa.me/919239413517?text=নমস্কার%20নিশা%20দিদি,%20"${encodeURIComponent(p.title)}"%20শাড়িটি%20স্টক%20শেষ%20দেখাচ্ছে।%20এটি%20পুনরায়%20কবে%20আসবে?" target="_blank" style="margin-top:8px; display:inline-flex; align-items:center; gap:6px; background:#16a34a; color:#fff; text-decoration:none; padding:8px 12px; border-radius:8px; font-size:0.78rem; font-weight:800;">
              <i class="fa-brands fa-whatsapp"></i> ${currentLang === 'bn' ? 'স্টক এলে জানান (WhatsApp এ জিজ্ঞাসা করুন)' : 'Ask on WhatsApp for Restock'}
            </a>
          </div>
        `;
      } else if (isUrgent) {
        stockMsgBox.innerHTML = `
          <div style="background:#fef3c7; border:1.5px solid #f59e0b; color:#92400e; padding:12px; border-radius:12px; font-size:0.85rem; font-weight:800; margin:10px 0; display:flex; align-items:center; gap:10px; animation:pulse 2s infinite;">
            <i class="fa-solid fa-fire" style="color:#ea580c; font-size:1.6rem; animation:fireFlicker 1s infinite alternate;"></i>
            <div>
              <div>${currentLang === 'bn' ? `তাড়াতাড়ি করুন! স্টকে আর মাত্র <strong>${curStock}</strong> টি শাড়ি অবশিষ্ট আছে!` : `Hurry! Only <strong>${curStock}</strong> items remaining in stock!`}</div>
              <div style="font-size:0.72rem; font-weight:600; color:#78350f; margin-top:2px;">${currentLang === 'bn' ? 'সীমিত স্টক • দেরি করলে অফার শেষ হয়ে যাবে!' : 'High demand, order before it sells out!'}</div>
            </div>
          </div>
        `;
      } else {
        stockMsgBox.innerHTML = `
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; padding:8px 12px; border-radius:10px; font-size:0.78rem; font-weight:700; margin:8px 0; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-circle-check"></i> ${currentLang === 'bn' ? `স্টক উপলব্ধ (${curStock} পিস স্টকে রয়েছে)` : `In Stock (${curStock} pieces available)`}
          </div>
        `;
      }

      const pdpDetailsBox = document.querySelector('.pdp-details-box');
      if (pdpDetailsBox && !document.getElementById('pdpStockAlertBox')) {
        pdpDetailsBox.insertBefore(stockMsgBox, (pdpDetailsBox.children && pdpDetailsBox.children[3]) || null);
      }

      // Complete Look Recommendation
      const matchBox = document.getElementById('pdpMatchingBox');
      if (p.type === 'saree') matchBox.style.display = 'block';
      else matchBox.style.display = 'none';

      // Auto Detect or Apply Assigned Size Chart
      const catTitle = ((p.category || '') + ' ' + (p.title || '') + ' ' + (p.type || '')).toLowerCase();
      let effectiveChart = p.sizeChartType;
      if (!effectiveChart || effectiveChart === 'auto') {
        if (catTitle.includes('frock') || catTitle.includes('girl') || catTitle.includes('baby') || catTitle.includes('kids') || catTitle.includes('ফ্রক')) {
          effectiveChart = 'kids_frock';
        } else if (catTitle.includes('kurti') || catTitle.includes('kurta') || catTitle.includes('suit') || catTitle.includes('top') || catTitle.includes('কুর্তি') || catTitle.includes('স্যুট')) {
          effectiveChart = 'kurti';
        } else if (catTitle.includes('palazzo') || catTitle.includes('leggings') || catTitle.includes('pant') || catTitle.includes('প্লাজো') || catTitle.includes('প্যান্ট')) {
          effectiveChart = 'palazzo';
        } else if (catTitle.includes('jewel') || catTitle.includes('necklace') || catTitle.includes('earrings') || catTitle.includes('bangles') || catTitle.includes('bag') || catTitle.includes('perfume')) {
          effectiveChart = 'none';
        } else {
          effectiveChart = 'saree_blouse';
        }
      }
      p.effectiveSizeChart = effectiveChart;

      // Handle Video Button
      const vidBox = document.getElementById('pdpVideoBox');
      if (vidBox) {
        if (p.videoUrl && p.videoUrl.trim() !== '') {
          vidBox.style.display = 'block';
        } else {
          vidBox.style.display = 'none';
        }
      }

      // Handle Size Chart Trigger Button
      const btnSizeGuide = document.getElementById('btnPdpSizeGuide');
      if (btnSizeGuide) {
        if (effectiveChart === 'none') {
          btnSizeGuide.style.display = 'none';
        } else {
          btnSizeGuide.style.display = 'inline-flex';
        }
      }

      // Handle Custom Size Note
      const noteBox = document.getElementById('pdpCustomSizeNote');
      if (noteBox) {
        if (p.sizeNote && p.sizeNote.trim() !== '') {
          noteBox.innerHTML = `📌 <strong>মাপের বিশেষ নোট:</strong> ${p.sizeNote}`;
          noteBox.style.display = 'block';
        } else {
          noteBox.style.display = 'none';
        }
      }

      // 1. Color Variants Display & Selector
      selectedPdpColor = 'মূল কালার';
      selectedPdpColorImg = p.img;
      const cvStrip = document.getElementById('pdpColorVariantsStrip');
      const cvSection = document.getElementById('pdpColorSection');
      const cvBadge = document.getElementById('pdpSelectedColorNameBadge');

      const variants = (p.colorVariants && p.colorVariants.length > 0) ? p.colorVariants : [
        { img: p.img, colorName: 'মূল কালার' },
        ...(p.subImages || []).map((img, idx) => ({ img, colorName: `কালার ${idx + 2}` }))
      ];

      if (cvStrip && variants.length > 1) {
        cvStrip.innerHTML = '';
        variants.forEach((v, idx) => {
          const isAct = (idx === 0);
          const vImg = v.img || p.img;
          const vName = v.colorName || v.name || `কালার ${idx + 1}`;
          cvStrip.innerHTML += `
            <div class="pdp-color-card ${isAct ? 'active' : ''}" 
                 onclick="selectPdpColorVariant('${vImg}', '${vName}', this)" 
                 style="display:flex; flex-direction:column; align-items:center; cursor:pointer; flex-shrink:0; width:58px; height:82px; border-radius:10px; border:${isAct ? '2px solid #0f172a' : '1.5px solid #cbd5e1'}; overflow:hidden; box-shadow:${isAct ? '0 2px 8px rgba(0,0,0,0.18)' : 'none'}; background:#ffffff; transition:all 0.2s;">
              <img src="${vImg}" alt="${vName}" style="width:100%; height:100%; object-fit:cover; display:block;">
            </div>
          `;
        });
        const firstColorName = variants[0].colorName || variants[0].name || 'Chiku';
        if (cvBadge) cvBadge.textContent = firstColorName;
        selectedPdpColor = firstColorName;
        selectedPdpColorImg = variants[0].img || p.img;
        if (cvSection) cvSection.style.display = 'block';
      } else if (cvSection) {
        cvSection.style.display = 'none';
      }

      // 2. Render Size Selection: Size-Wise Pricing & MRP Support
      selectedReturnChoice = 'all';
      const sizeGroup = document.getElementById('pdpSizeBtnGroup');
      if (sizeGroup) {
        sizeGroup.innerHTML = '';
        
        if (p.sizeVariants && Array.isArray(p.sizeVariants) && p.sizeVariants.length > 0) {
          // Product has custom size-wise pricing!
          selectedPdpSize = p.sizeVariants[0].size;
          currentPdpSelectedPrice = p.sizeVariants[0].price || p.price;
          currentPdpSelectedMrp = p.sizeVariants[0].mrp || p.mrp || (currentPdpSelectedPrice * 2);

          // Update initial PDP price with first size's price
          document.getElementById('pdpPrice').textContent = `₹${currentPdpSelectedPrice}`;
          document.getElementById('pdpMrp').textContent = `₹${currentPdpSelectedMrp}`;
          const offPct = Math.round(((currentPdpSelectedMrp - currentPdpSelectedPrice) / currentPdpSelectedMrp) * 100);
          document.getElementById('pdpDiscount').textContent = `${offPct}% off`;
          document.getElementById('pdpUpiOffer').textContent = `UPI দিয়ে পেমেন্ট করলে মাত্র ₹${Math.round(currentPdpSelectedPrice * 0.95)}`;

          p.sizeVariants.forEach((v, idx) => {
            const act = idx === 0 ? 'active' : '';
            const rateTxt = v.price ? ` (₹${v.price})` : '';
            sizeGroup.innerHTML += `<button type="button" class="size-pill-btn ${act}" data-size="${v.size}" onclick="selectPdpSize('${v.size}')" style="display:inline-flex; align-items:center; gap:4px;">
              <span>${v.size}</span>
              <span style="font-weight:800; color:#10b981; font-size:0.75rem;">${rateTxt}</span>
            </button>`;
          });
        } else {
          // Default Standard sizes
          let sizesToRender = [];
          if (p.availableSizes && Array.isArray(p.availableSizes) && p.availableSizes.length > 0) {
            sizesToRender = p.availableSizes;
          } else if (p.sizes && Array.isArray(p.sizes) && p.sizes.length > 0) {
            sizesToRender = p.sizes;
          } else if (effectiveChart === 'kids_frock') {
            sizesToRender = ['1-2 Yrs', '3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs'];
          } else if (effectiveChart === 'kurti') {
            sizesToRender = ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'];
          } else if (effectiveChart === 'palazzo') {
            sizesToRender = ['Free Size (28-38)', 'Plus Size (38-46)'];
          } else if (effectiveChart === 'none') {
            sizesToRender = ['Standard Size'];
          } else {
            sizesToRender = ['Free Size (শাড়ি)'];
          }

          selectedPdpSize = sizesToRender[0];
          currentPdpSelectedPrice = p.price;
          currentPdpSelectedMrp = p.mrp || (p.price * 2);

          sizesToRender.forEach((sz, idx) => {
            const act = idx === 0 ? 'active' : '';
            sizeGroup.innerHTML += `<button type="button" class="size-pill-btn ${act}" data-size="${sz}" onclick="selectPdpSize('${sz}')">${sz}</button>`;
          });
        }
      }

      // Configure Return Choice Cards (ছবি 4)
      const rPriceAll = document.getElementById('returnPriceAll');
      const rPriceDef = document.getElementById('returnPriceDefective');
      if (rPriceAll) rPriceAll.textContent = `₹${p.price}`;
      if (rPriceDef) rPriceDef.textContent = `₹${Math.max(0, p.price - 10)}`;
      selectReturnChoice('all');

      showScreen('pdp');
      updatePdpWishBtnState();
      renderPdpCustomerWall(p);
      
      // Welcome Gift & SuperCoins translations
      const wTitle = document.getElementById('t-welcomeTitle');
      if (wTitle) wTitle.textContent = t('welcomeTitle');
      const wSub = document.getElementById('t-welcomeSub');
      if (wSub) wSub.textContent = t('welcomeSub');
      const mBoxHead = document.getElementById('t-mysteryBoxHeading');
      if (mBoxHead) mBoxHead.textContent = t('mysteryBoxHeading');
      const mBoxSub = document.getElementById('t-mysteryBoxSub');
      if (mBoxSub) mBoxSub.textContent = t('mysteryBoxSub');
      const cHeader = document.getElementById('t-congratsHeader');
      if (cHeader) cHeader.textContent = t('congratsHeader');
      const gInst = document.getElementById('t-giftInstructionText');
      if (gInst) gInst.textContent = t('giftInstructionText');
      const btnShop = document.getElementById('t-btnStartShopping');
      if (btnShop) btnShop.textContent = t('btnStartShopping');

      const cRedeemTitle = document.getElementById('t-coinRedeemTitle');
      if (cRedeemTitle) cRedeemTitle.textContent = t('coinRedeemTitle');
      const cApplyLbl = document.getElementById('t-coinApplyLabel');
      if (cApplyLbl) cApplyLbl.textContent = t('coinApplyLabel');
      const lblCoinDisc = document.getElementById('t-lblCoinDiscount');
      if (lblCoinDisc) lblCoinDisc.textContent = t('lblCoinDiscount');

      if (typeof updateAllSuperCoinsDisplays === 'function') updateAllSuperCoinsDisplays();

      window.scrollTo(0, 0);
    }

    function addMatchingJewelCombo() {
      const matchingJewel = products.find(x => x.id === 'NC-104') || products[3];
      cart.push(currentPdpProduct);
      cart.push(matchingJewel);
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      alert("✨ শাড়ি ও ম্যাচিং গহনার কম্বো ব্যাগে যোগ হয়েছে (₹50 ছাড় প্রযোজ্য)!");
      openCartModal();
    }

    function addCurrentToCart() {
      if (!currentPdpProduct) return;
      const basePrice = (typeof currentPdpSelectedPrice !== 'undefined' && currentPdpSelectedPrice > 0)
        ? currentPdpSelectedPrice
        : (currentPdpProduct.price || 0);
      const baseMrp = (typeof currentPdpSelectedMrp !== 'undefined' && currentPdpSelectedMrp > 0)
        ? currentPdpSelectedMrp
        : (currentPdpProduct.mrp || (basePrice * 2));
      const effectivePrice = selectedReturnChoice === 'defective' ? Math.max(0, basePrice - 10) : basePrice;
      const itemToPush = {
        ...currentPdpProduct,
        price: effectivePrice,
        mrp: baseMrp,
        originalPrice: basePrice,
        selectedSize: selectedPdpSize || 'Free Size',
        selectedColor: selectedPdpColor || 'মূল কালার',
        img: selectedPdpColorImg || currentPdpProduct.img,
        returnChoice: selectedReturnChoice,
        qty: 1
      };
      cart.push(itemToPush);
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      alert("✅ শপিং ব্যাগে যুক্ত হয়েছে!");
    }

    function buyCurrentNow() {
      if (!currentPdpProduct) return;
      const basePrice = (typeof currentPdpSelectedPrice !== 'undefined' && currentPdpSelectedPrice > 0)
        ? currentPdpSelectedPrice
        : (currentPdpProduct.price || 0);
      const baseMrp = (typeof currentPdpSelectedMrp !== 'undefined' && currentPdpSelectedMrp > 0)
        ? currentPdpSelectedMrp
        : (currentPdpProduct.mrp || (basePrice * 2));
      const effectivePrice = selectedReturnChoice === 'defective' ? Math.max(0, basePrice - 10) : basePrice;
      const itemToPush = {
        ...currentPdpProduct,
        price: effectivePrice,
        mrp: baseMrp,
        originalPrice: basePrice,
        selectedSize: selectedPdpSize || 'Free Size',
        selectedColor: selectedPdpColor || 'মূল কালার',
        img: selectedPdpColorImg || currentPdpProduct.img,
        returnChoice: selectedReturnChoice,
        qty: 1
      };
      cart = [itemToPush];
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      openCartModal();
    }

    function updateCartBadge() {
      const b = document.getElementById('cartCountBadge');
      if (b) b.textContent = cart.length;
    }

    // Cart Modal

    // ==========================================
    // SYNC WITH ADMIN: REELS, MULTI-IMAGES, COUPONS & STOCK
    // ==========================================
    let appliedCouponDiscount = 0;
    let appliedCouponCode = "";

    function renderReels() { return; // Reels permanently removed as requested
      const container = document.getElementById('reelsFeedContainer');
      if (!container) return;

      const customReels = JSON.parse(localStorage.getItem('nc_reels') || '[]');
      const defaultReels = [
        {
          id: "NC-101",
          title: "ঢাকাই জামদানি শাড়ির আঁচল ও কুঁচির কাজ",
          badge: "★ পুজো স্পেশাল ভিডিও",
          price: 799,
          mrp: 1599,
          coverImg: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600"
        },
        {
          id: "NC-102",
          title: "রয়্যাল ব্লু সফট সিল্ক কাতান শাড়ি ডেমো",
          badge: "★ বিয়ে ও পার্টি রিলস",
          price: 950,
          mrp: 1899,
          coverImg: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600"
        }
      ];

      const allReels = [...customReels, ...defaultReels];
      container.innerHTML = '';
      allReels.forEach(r => {
        container.innerHTML += `
          <div class="video-reel-card">
            <img src="${r.coverImg}" class="video-reel-media">
            <div class="reel-overlay">
              <div>
                <span style="background:rgba(255,255,255,0.25); padding:2px 6px; border-radius:4px; font-size:0.68rem; font-weight:700;">${r.badge || '★ এক্সক্লুসিভ কালেকশন'}</span>
                <div style="font-size:1rem; font-weight:800; margin:4px 0;">${r.title}</div>
                <div style="font-size:1.1rem; font-weight:800; color:#fef08a;">মাত্র ₹${r.price} <span style="font-size:0.75rem; text-decoration:line-through; opacity:0.8;">₹${r.mrp || r.price * 1.5}</span></div>
              </div>
              <button onclick="handleReelOrder('${r.id || ''}', '${(r.productTitle || r.title || '').replace(/'/g, "\\'")}', ${r.price})" style="background:var(--primary); color:#fff; border:none; padding:10px 16px; border-radius:10px; font-weight:800; font-size:0.85rem; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.3);">
                ⚡ অর্ডার করুন
              </button>
            </div>
          </div>
        `;
      });
    }

    function handleReelOrder(prodId, prodTitle, price) {
      const found = products.find(p => p.id === prodId || p.title.toLowerCase().includes(prodTitle.toLowerCase()));
      if (found) {
        openPdp(found.id);
      } else {
        const text = `নমস্কার নিশা দিদি, আমি রিলসে দেখা এই শাড়িটি অর্ডার করতে চাই:%0A*${prodTitle}*%0Aদাম: ₹${price}%0Aআমতায় ডেলিভারির জন্য কনফার্ম করুন।`;
        window.open(`https://wa.me/${BOUTIQUE_PHONE}?text=${text}`, '_blank');
      }
    }

    // Coupon Code Application
    
    // Coupon & Return Action Aliases for 100% Reliability
    function applyCouponCode() {
      if (typeof applyCartCoupon === 'function') {
        applyCartCoupon();
      }
    }

    function adminApproveReturn(orderId) {
      const ord = orders.find(o => o.id === orderId);
      if (ord) {
        ord.status = 'Return Approved';
        localStorage.setItem('nc_orders', JSON.stringify(orders));
        alert(currentLang === 'en' ? `Order #${orderId} return approved!` : `অর্ডার #${orderId} এর রিটার্ন আবেদন অনুমোদিত হয়েছে!`);
        if (typeof renderAdminDashboardLive === 'function') renderAdminDashboardLive();
      }
    }

    function applyCartCoupon() {
      const inp = document.getElementById('cartCouponInput').value.trim().toUpperCase();
      const msg = document.getElementById('couponAppliedMsg');
      if (!inp) {
        alert(currentLang === 'bn' ? "দয়া করে কুপন কোড লিখুন!" : "Please enter coupon code!");
        return;
      }

      const coupons = JSON.parse(localStorage.getItem('nc_coupons') || '[{"code":"NISHA50","discount":50,"active":true},{"code":"PUJA100","discount":100,"active":true}]');
      const validCoupon = coupons.find(c => c.code === inp && c.active !== false);

      if (validCoupon) {
        appliedCouponDiscount = validCoupon.discount;
        appliedCouponCode = validCoupon.code;
        msg.style.display = 'block';
        msg.textContent = currentLang === 'bn' ? `✓ কুপন ${inp} প্রয়োগ হয়েছে! ₹${validCoupon.discount} ছাড় প্রযোজ্য।` : `✓ Coupon ${inp} applied! ₹${validCoupon.discount} discount.`;
        updateCartModalTotal();
      } else {
        alert(currentLang === 'bn' ? "ভুল বা মেয়াদোত্তীর্ণ কুপন কোড!" : "Invalid or expired coupon code!");
      }
    }

    function updateCartModalTotal() {
      const totalAmountEl = document.getElementById('cartTotalAmount');
      if (!totalAmountEl) return;
      const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
      const finalTotal = Math.max(0, subtotal - appliedCouponDiscount);
      totalAmountEl.textContent = `₹${finalTotal}`;
      if (appliedCouponDiscount > 0) {
        totalAmountEl.innerHTML = `<span style="text-decoration:line-through; font-size:0.8rem; color:#94a3b8;">₹${subtotal}</span> ₹${finalTotal}`;
      }
    }

    function openCartModal() {
      syncCheckoutWithProfile();
      const modal = document.getElementById('cartModal');
      goToCheckoutStep1();
      renderCheckoutStep1();
      modal.style.display = 'flex';
      return;
      const list = document.getElementById('cartItemsList');
      const countSpan = document.getElementById('cartModalCount');
      const totalSpan = document.getElementById('cartTotalAmount');

      countSpan.textContent = cart.length;
      list.innerHTML = '';

      if (cart.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8;">আপনার ব্যাগ ফাঁকা আছে!</div>`;
        totalSpan.textContent = '₹0';
      } else {
        let total = 0;
        cart.forEach((item, idx) => {
          total += item.price;
          list.innerHTML += `
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; border-bottom:1px solid #f1f5f9; padding-bottom:10px;">
              <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; border-radius:8px;">
              <div style="flex:1;">
                <div style="font-size:0.8rem; font-weight:700; color:#0f172a;">${item.title}</div>
                <div style="font-size:0.85rem; font-weight:800; color:var(--primary);">₹${item.price}</div>
              </div>
              <button onclick="removeCartItem(${idx})" style="background:transparent; border:none; color:#ef4444; font-size:1rem; cursor:pointer;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          `;
        });
        totalSpan.textContent = `₹${total}`;
      }

      // Auto-fill saved customer details if logged in
      if (currentCustomer) {
        const cName = document.getElementById('cust_name');
        const cPhone = document.getElementById('cust_phone');
        const cAddr = document.getElementById('cust_addr');
        if (cName && !cName.value) cName.value = currentCustomer.name || '';
        if (cPhone && !cPhone.value) cPhone.value = currentCustomer.phone || '';
        if (cAddr && !cAddr.value) cAddr.value = currentCustomer.address || '';
      }

      modal.style.display = 'flex';
    }

    function closeCartModal() {
      document.getElementById('cartModal').style.display = 'none';
    }

    function removeCartItem(idx) {
      cart.splice(idx, 1);
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      openCartModal();
    }

    // Submit Order

    // ==========================================
    // CUSTOMER ACCOUNT, ORDERS & REVIEW LOGIC
    // ==========================================
    let currentStarRating = 5;


    // ==========================================
    // 5-STAR DELIVERED RATING & PHOTO REVIEW
    // ==========================================
    let currentDelivStar = 5;
    let currentDelivReviewPhoto = "";
    let currentDelivOrderId = "";
    let currentDelivProdTitle = "";

    const RATING_DESCRIPTIONS = {
      bn: {
        1: "⭐ এক - খুব খারাপ",
        2: "⭐⭐ দুই - খারাপ",
        3: "⭐⭐⭐ তিন - মোটামুটি ভালো",
        4: "⭐⭐⭐⭐ চার - ভালো",
        5: "⭐⭐⭐⭐⭐ পাঁচ - খুব ভালো"
      },
      en: {
        1: "⭐ One - Very Bad",
        2: "⭐⭐ Two - Poor",
        3: "⭐⭐⭐ Three - Average",
        4: "⭐⭐⭐⭐ Four - Good",
        5: "⭐⭐⭐⭐⭐ Five - Very Good"
      }
    };

    function setDelivStar(rating) {
      currentDelivStar = rating;
      const stars = document.querySelectorAll('#delivStarGroup i');
      stars.forEach((s, idx) => {
        if (idx < rating) {
          s.style.color = '#f59e0b';
        } else {
          s.style.color = '#cbd5e1';
        }
      });
      const dict = RATING_DESCRIPTIONS[currentLang] || RATING_DESCRIPTIONS['bn'];
      document.getElementById('delivRatingLabel').textContent = dict[rating] || "";
    }

    function handleDelivReviewPhoto(input) {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            const MAX = 600;
            let w = img.width;
            let h = img.height;
            if (w > h) {
              if (w > MAX) { h *= MAX / w; w = MAX; }
            } else {
              if (h > MAX) { w *= MAX / h; h = MAX; }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            currentDelivReviewPhoto = canvas.toDataURL('image/jpeg', 0.82);
            document.getElementById('delivPhotoPreviewImg').src = currentDelivReviewPhoto;
            document.getElementById('delivPhotoPrompt').style.display = 'none';
            document.getElementById('delivPhotoPreviewBox').style.display = 'block';
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }

    function clearDelivReviewPhoto() {
      currentDelivReviewPhoto = "";
      const inp = document.getElementById('delivPhotoInput');
      if (inp) inp.value = "";
      document.getElementById('delivPhotoPreviewBox').style.display = 'none';
      document.getElementById('delivPhotoPrompt').style.display = 'block';
    }

    let currentDelivProdId = '';
    function openDeliveryReviewModal(orderId, prodTitle, prodId) {
      currentDelivOrderId = orderId || '';
      currentDelivProdTitle = prodTitle || (currentLang === 'bn' ? "নিশা ক্রিয়েশনস শাড়ি" : "Nisha Creations Saree");
      currentDelivProdId = prodId || (currentPdpProduct ? currentPdpProduct.id : '');
      document.getElementById('delivReviewProdTitle').textContent = currentDelivProdTitle;
      setDelivStar(5);
      clearDelivReviewPhoto();
      document.getElementById('delivReviewText').value = '';
      document.getElementById('deliveryReviewModal').style.display = 'flex';
    }

    function closeDeliveryReviewModal() {
      document.getElementById('deliveryReviewModal').style.display = 'none';
    }

    function submitDelivReviewModal() {
      const comment = document.getElementById('delivReviewText').value.trim();
      if (!comment) {
        alert(currentLang === 'bn' ? "দয়া করে আপনার মন্তব্য বা রিভিউটি লিখুন!" : "Please write your review feedback!");
        return;
      }

      const custName = (currentCustomer && currentCustomer.name) ? currentCustomer.name : (currentLang === 'bn' ? "আমতার গ্রাহক" : "Amta Customer");
      const dict = RATING_DESCRIPTIONS[currentLang] || RATING_DESCRIPTIONS['bn'];
      const ratingLabel = dict[currentDelivStar] || "";

      const newReview = {
        id: Date.now(),
        orderId: currentDelivOrderId,
        productId: currentDelivProdId || (currentPdpProduct ? currentPdpProduct.id : ''),
        product: currentDelivProdTitle,
        name: custName,
        rating: currentDelivStar,
        ratingLabel: ratingLabel,
        comment: comment,
        photo: currentDelivReviewPhoto || "",
        date: new Date().toLocaleDateString(currentLang === 'bn' ? 'bn-IN' : 'en-US')
      };

      // 1. Save in Reviews
      const allReviews = JSON.parse(localStorage.getItem('nc_user_reviews') || '[]');
      allReviews.unshift(newReview);
      localStorage.setItem('nc_user_reviews', JSON.stringify(allReviews));

      // 2. Mark order as reviewed in nc_orders
      let orders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      orders = orders.map(o => o.id === currentDelivOrderId ? { ...o, reviewed: true, reviewData: newReview } : o);
      localStorage.setItem('nc_orders', JSON.stringify(orders));

      // 3. Reward Coins for Review (100 to 1,000 Coins)
      // - Rating only: 100 Coins
      // - Rating + comment: 500 Coins
      // - Rating + comment + photo: 1,000 Coins!
      let rewardCoins = 100;
      if (currentDelivReviewPhoto && currentDelivReviewPhoto.length > 50) {
        rewardCoins = 1000;
      } else if (comment && comment.length >= 5) {
        rewardCoins = 500;
      }

      if (currentCustomer) {
        currentCustomer.coins = (currentCustomer.coins || 1000) + rewardCoins;
        localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
        loadCustomerAccountHub();
        syncCheckoutWithProfile();
      }
      let curCoins = parseInt(localStorage.getItem('nc_super_coins') || '1000');
      curCoins += rewardCoins;
      localStorage.setItem('nc_super_coins', String(curCoins));
      updateAllSuperCoinsDisplays();

      alert(currentLang === 'bn' 
        ? `🎉 অনেক ধন্যবাদ! আপনার মূল্যবান রিভিউ সফলভাবে জমা হয়েছে।\n🎁 নিশা ক্রিয়েশনসের পক্ষ থেকে আপনি ${rewardCoins} নিশা কয়েন (নগদ ₹${Math.floor(rewardCoins/100)} ছাড় সমতুল্য) রিওয়ার্ড পেলেন!` 
        : `🎉 Thank you! Your review has been submitted. You earned ${rewardCoins} Coins (worth ₹${Math.floor(rewardCoins/100)})!`);

      closeDeliveryReviewModal();
      orders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      renderOrders();
      renderCustomerAccountOrders();
      if (typeof renderPdpCustomerWall === 'function' && currentPdpProduct) {
        renderPdpCustomerWall(currentPdpProduct);
      }
      renderCustomerReviewsList();
    }

    function setStarRating(rating) {
      currentStarRating = rating;
      const stars = document.querySelectorAll('#starRatingGroup i');
      stars.forEach((s, idx) => {
        if (idx < rating) {
          s.style.color = '#f59e0b';
        } else {
          s.style.color = '#cbd5e1';
        }
      });
      document.getElementById('selectedRatingText').textContent = `${rating}.0 ★`;
    }

    function renderCustomerAccountOrders() {
      const container = document.getElementById('custFullOrdersContainer');
      const countBadge = document.getElementById('custOrdersCountBadge');
      if (!container) return;

      const orderList = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      if (countBadge) countBadge.textContent = `${orderList.length} ${currentLang === 'bn' ? 'অর্ডার' : 'Orders'}`;

      if (orderList.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:24px 10px; color:#94a3b8; font-size:0.82rem;">
            <i class="fa-solid fa-bag-shopping" style="font-size:2rem; margin-bottom:8px; opacity:0.6;"></i>
            <div>${currentLang === 'bn' ? 'আপনার কোনো পূর্ববর্তী অর্ডার নেই।' : 'You have no past orders yet.'}</div>
            <button onclick="showScreen('home')" style="margin-top:10px; background:var(--primary); color:#fff; border:none; padding:7px 14px; border-radius:8px; font-size:0.75rem; font-weight:700; cursor:pointer;">
              ${currentLang === 'bn' ? 'শাড়ি কালেকশন দেখুন &rarr;' : 'Browse Sarees &rarr;'}
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = '';
      orderList.forEach((ord) => {
        const isDelivered = ord.status === "Delivered";
        const statusClass = isDelivered ? "color: #16a34a; font-weight: 800;" : "color: var(--primary); font-weight: 800;";
        const statusLabel = isDelivered 
          ? (currentLang === 'bn' ? "✓ ডেলিভারি সম্পূর্ণ হয়েছে" : "✓ Delivered") 
          : (currentLang === 'bn' ? `চলমান: ${ord.status}` : `Active: ${ord.status}`);

        const firstProdTitle = (ord.items && ord.items[0] ? ord.items[0].title : 'শাড়ি কালেকশন').replace(/'/g, "\\'");
        const itemsSummary = (ord.items || []).map(it => it.title).join(', ');

        let reviewBlock = '';
        if (isDelivered) {
          if (ord.reviewed && ord.reviewData) {
            const rd = ord.reviewData;
            const photoThumb = rd.photo ? `<img src="${rd.photo}" style="width:45px; height:45px; object-fit:cover; border-radius:6px; border:1px solid #cbd5e1; margin-top:4px;">` : '';
            reviewBlock = `
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:10px; margin-top:10px;">
                <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.75rem; color:#166534;">
                  <span>✓ আপনার দেওয়া রিভিউ:</span>
                  <span style="color:#d97706;">${rd.ratingLabel || `${rd.rating}★`}</span>
                </div>
                <div style="font-size:0.75rem; color:#334155; margin:4px 0;">"${rd.comment}"</div>
                ${photoThumb}
              </div>
            `;
          } else {
            reviewBlock = `
              <div style="margin-top:10px; background:#fef3c7; border:1.5px dashed #f59e0b; border-radius:12px; padding:12px; text-align:center;">
                <div style="font-size:0.82rem; font-weight:800; color:#92400e; margin-bottom:4px;">
                  🎉 ডেলিভারি সম্পূর্ণ হয়েছে! কেমন লাগলো?
                </div>
                <div style="font-size:0.72rem; color:#78350f; margin-bottom:8px;">
                  5-স্টার রেটিং, মতামত ও শাড়ির ছবি শেয়ার করুন
                </div>
                <button onclick="openDeliveryReviewModal('${ord.id}', '${firstProdTitle}')" style="width:100%; background:linear-gradient(135deg, #f59e0b, #d97706); color:#fff; border:none; padding:9px 14px; border-radius:8px; font-weight:800; font-size:0.82rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:0 2px 8px rgba(245,158,11,0.3);">
                  <i class="fa-solid fa-star"></i> ⭐ রিভিউ দিন ও ছবি আপলোড করুন
                </button>
              </div>
            `;
          }
        }

        container.innerHTML += `
          <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; margin-bottom: 12px; background: #ffffff; box-shadow:0 1px 4px rgba(0,0,0,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:6px; margin-bottom:8px;">
              <div>
                <span style="font-size:0.78rem; font-weight:800; color:var(--primary);">ORDER #${ord.id}</span>
                <div style="font-size:0.68rem; color:#64748b;">${ord.date}</div>
              </div>
              <span style="font-size:0.75rem; ${statusClass}; background:#f8fafc; border:1px solid #cbd5e1; padding:2px 8px; border-radius:12px;">
                ${statusLabel}
              </span>
            </div>

            <div style="font-size:0.78rem; color:#334155; margin-bottom:6px;">
              <strong>${currentLang === 'bn' ? 'আইটেমসমূহ:' : 'Items:'}</strong> ${itemsSummary}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
              <span style="font-size:0.85rem; font-weight:800; color:#0f172a;">${currentLang === 'bn' ? 'মোট বিল:' : 'Total:'} ₹${ord.total}</span>
              <button onclick="window.open('https://wa.me/919239413517?text=Hello, Order ${ord.id} status enquiry', '_blank')" style="background:#25d366; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:0.72rem; font-weight:700; cursor:pointer;">
                <i class="fa-brands fa-whatsapp"></i> ${currentLang === 'bn' ? 'ট্র্যাক' : 'Track'}
              </button>
            </div>

            ${reviewBlock}
          </div>
        `;
      });
    }

    function prefillReview(prodName) {
      if (prodName) {
        const rpn = document.getElementById('review_product_name'); if (rpn) rpn.value = prodName;
      }
      const revBox = document.getElementById('review_comment_text');
      if (revBox) {
        revBox.scrollIntoView({ behavior: 'smooth' });
        revBox.focus();
      }
    }

    function submitCustomerReview() {
      const prod = document.getElementById('review_product_name').value.trim();
      const comment = document.getElementById('review_comment_text').value.trim();
      const reviewerName = (currentCustomer && currentCustomer.name) ? currentCustomer.name : "আমতার গ্রাহক";

      if (!prod || !comment) {
        alert(currentLang === 'bn' ? "দয়া করে প্রোডাক্টের নাম ও আপনার রিভিউ লিখুন!" : "Please provide product name and review comments!");
        return;
      }

      const reviews = JSON.parse(localStorage.getItem('nc_user_reviews') || '[]');
      const newReview = {
        id: Date.now(),
        product: prod,
        name: reviewerName,
        rating: currentStarRating,
        comment: comment,
        date: new Date().toLocaleDateString(currentLang === 'bn' ? 'bn-IN' : 'en-US')
      };

      reviews.unshift(newReview);
      localStorage.setItem('nc_user_reviews', JSON.stringify(reviews));

      alert(currentLang === 'bn' ? "🎉 ধন্যবাদ! আপনার রিভিউটি সফলভাবে জমা হয়েছে।" : "🎉 Thank you! Your review has been posted.");
      document.getElementById('review_product_name').value = '';
      document.getElementById('review_comment_text').value = '';
      renderCustomerReviewsList();
    }

    function renderCustomerReviewsList() {
      const container = document.getElementById('userReviewsDisplayContainer');
      if (!container) return;

      const reviews = JSON.parse(localStorage.getItem('nc_user_reviews') || '[]');
      if (reviews.length === 0) {
        container.innerHTML = `<div style="font-size:0.72rem; color:#94a3b8; text-align:center; padding:8px;">${currentLang === 'bn' ? 'এখনো কোনো নিজস্ব রিভিউ দেননি।' : 'No reviews added yet.'}</div>`;
        return;
      }

      container.innerHTML = '';
      reviews.slice(0, 8).forEach(r => {
        let starsStr = '';
        for (let i = 0; i < 5; i++) {
          starsStr += i < r.rating ? '★' : '☆';
        }
        const photoHtml = r.photo ? `<div style="margin-top:6px;"><img src="${r.photo}" style="width:65px; height:65px; object-fit:cover; border-radius:8px; border:1px solid #cbd5e1; box-shadow:0 2px 6px rgba(0,0,0,0.06);"></div>` : '';

        container.innerHTML += `
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:10px; margin-bottom:8px; font-size:0.75rem;">
            <div style="display:flex; justify-content:space-between; font-weight:800;">
              <span style="color:#0f172a;">${r.product}</span>
              <span style="color:#f59e0b;">${starsStr}</span>
            </div>
            <div style="font-size:0.68rem; color:#d97706; font-weight:700; margin:2px 0;">${r.ratingLabel || ''}</div>
            <div style="color:#334155; margin:3px 0; line-height:1.3;">"${r.comment}"</div>
            ${photoHtml}
            <div style="font-size:0.65rem; color:#94a3b8; margin-top:4px;">— ${r.name} • ${r.date}</div>
          </div>
        `;
      });
    }

    function saveAccountProfile() {
      const name = document.getElementById('account_cust_name').value.trim();
      const phone = document.getElementById('account_cust_phone').value.trim();
      const addr = document.getElementById('account_cust_addr').value.trim();

      if (!name || !phone) {
        alert(currentLang === 'bn' ? "দয়া করে নাম ও ফোন নম্বর পূরণ করুন!" : "Please enter your name and phone number!");
        return;
      }

      currentCustomer = currentCustomer || {};
      currentCustomer.name = name;
      currentCustomer.phone = phone;
      currentCustomer.address = addr;
      currentCustomer.coins = currentCustomer.coins || 150;

      localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
      loadCustomerAccountHub();
      syncCheckoutWithProfile();
      alert(currentLang === 'bn' ? "✅ আপনার প্রোফাইল ও ডেলিভারি ঠিকানা সেভ হয়েছে!" : "✅ Your profile and delivery address have been saved!");
    }

    
    // ==========================================
    // DYNAMIC CUSTOMER LOGIN, PROFILE & GPS LOCATION
    // ==========================================
    function loadCustomerAccountHub() {
      try {
        const stored = localStorage.getItem('nc_customer_profile');
        currentCustomer = stored ? JSON.parse(stored) : null;
      } catch(e) {
        currentCustomer = null;
      }

      const isLoggedIn = !!(currentCustomer && currentCustomer.phone);
      updateDrawerActiveStates();
      const isEn = (currentLang === 'en');

      const greetEl = document.getElementById('ncGreetingName');
      const coinsEl = document.getElementById('ncCoinBalanceNum');
      const nameEl = document.getElementById('ncAccountCustName');
      const phoneEl = document.getElementById('ncAccountCustPhone');
      const addrEl = document.getElementById('ncAccountCustAddr');
      const guestCard = document.getElementById('ncGuestLoginCard');
      const loggedInActions = document.getElementById('ncLoggedInActions');
      const topAuthBtnTxt = document.getElementById('btnTopAccountAuthTxt');

      if (isLoggedIn) {
        if (greetEl) greetEl.textContent = `Hey, ${currentCustomer.name || (isEn ? 'Valued Customer' : 'সম্মানিত গ্রাহক')}!`;
        if (coinsEl) coinsEl.textContent = currentCustomer.coins !== undefined ? currentCustomer.coins : 50;
        if (nameEl) nameEl.textContent = currentCustomer.name;
        if (phoneEl) phoneEl.textContent = `📞 ${currentCustomer.phone}`;
        if (addrEl) addrEl.textContent = `📍 ${currentCustomer.address || (isEn ? 'No address specified' : 'ঠিকানা দেওয়া হয়নি')}`;

        if (guestCard) guestCard.style.display = 'none';
        if (loggedInActions) loggedInActions.style.display = 'flex';
        if (topAuthBtnTxt) topAuthBtnTxt.textContent = isEn ? 'Edit Profile' : 'প্রোফাইল এডিট';
        const hdrAuth = document.getElementById('headerUserAuthText');
        if (hdrAuth) hdrAuth.textContent = currentCustomer.name ? currentCustomer.name.split(' ')[0] : (isEn ? 'Account' : 'প্রোফাইল');
      } else {
        if (greetEl) greetEl.textContent = isEn ? 'Hey, Guest!' : 'স্বাগতম অতিথি!';
        if (coinsEl) coinsEl.textContent = '0';
        if (nameEl) nameEl.textContent = isEn ? 'Guest Customer (Not Logged In)' : 'অতিথি গ্রাহক (লগইন করা নেই)';
        if (phoneEl) phoneEl.textContent = isEn ? '📞 Please Login' : '📞 লগইন করতে ট্যাপ করুন';
        if (addrEl) addrEl.textContent = isEn ? 'Login with mobile number to save your delivery address & orders.' : 'আপনার স্থায়ী ডেলিভারি ঠিকানা ও অর্ডার হিস্ট্রি সেভ করতে লগইন করুন।';

        if (guestCard) guestCard.style.display = 'block';
        if (loggedInActions) loggedInActions.style.display = 'none';
        if (topAuthBtnTxt) topAuthBtnTxt.textContent = isEn ? 'Login' : 'লগইন';
        const hdrAuth = document.getElementById('headerUserAuthText');
        if (hdrAuth) hdrAuth.textContent = isEn ? 'Login' : 'লগইন';
      }

      updateWishlistBadgesGlobal();
    }

    
    function handleHeaderAuthClick() {
      if (currentCustomer && currentCustomer.phone) {
        showScreen('customer-settings');
      } else {
        openCustomerAuthModal();
      }
    }

    function openCustomerAuthModal() {
      const modal = document.getElementById('customerAuthModal');
      if (!modal) return;

      const isEn = (currentLang === 'en');
      const step1 = document.getElementById('otpStepPhoneSection');
      const step2 = document.getElementById('otpStepVerifySection');
      if (step1) step1.style.display = 'block';
      if (step2) step2.style.display = 'none';

      const phoneInp = document.getElementById('auth_phone');
      if (phoneInp) {
        phoneInp.value = (currentCustomer && currentCustomer.phone) ? currentCustomer.phone : '';
        setTimeout(() => phoneInp.focus(), 150);
      }

      modal.style.display = 'flex';
    }

    function closeCustomerAuthModal() {
      const modal = document.getElementById('customerAuthModal');
      if (modal) modal.style.display = 'none';
      clearInterval(window.otpResendInterval);
    }

    function backToPhoneStep() {
      const step1 = document.getElementById('otpStepPhoneSection');
      const step2 = document.getElementById('otpStepVerifySection');
      if (step1) step1.style.display = 'block';
      if (step2) step2.style.display = 'none';
      clearInterval(window.otpResendInterval);
      const phoneInp = document.getElementById('auth_phone');
      if (phoneInp) setTimeout(() => phoneInp.focus(), 100);
    }

    function sendCustomerOtp() {
      const phoneInp = document.getElementById('auth_phone');
      const rawPhone = phoneInp ? phoneInp.value.replace(/[^0-9]/g, '').trim() : '';
      const isEn = (currentLang === 'en');

      if (!rawPhone || rawPhone.length !== 10) {
        alert(isEn ? 'Please enter a valid 10-digit mobile number!' : 'অনুগ্রহ করে সঠিক ১০ ডিজিটের মোবাইল নম্বর দিন (যেমন: 9832100000)!');
        if (phoneInp) phoneInp.focus();
        return;
      }

      // Generate 4-digit OTP code
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      window.activeOtp = otpCode;
      window.activeOtpPhone = rawPhone;

      // Switch to Step 2
      const step1 = document.getElementById('otpStepPhoneSection');
      const step2 = document.getElementById('otpStepVerifySection');
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';

      // Update UI displays for OTP
      const dispPhone = document.getElementById('displaySentToPhone');
      if (dispPhone) dispPhone.textContent = '+91 ' + rawPhone;

      const liveOtp = document.getElementById('liveOtpDisplayCode');
      if (liveOtp) liveOtp.textContent = otpCode;

      const autoVal = document.getElementById('autoFillOtpVal');
      if (autoVal) autoVal.textContent = otpCode;

      // Clear boxes
      for (let i = 1; i <= 4; i++) {
        const b = document.getElementById('otp_box_' + i);
        if (b) {
          b.value = '';
          b.style.borderColor = '#cbd5e1';
        }
      }

      // Check for saved profile for this phone number
      let savedProfiles = {};
      try {
        savedProfiles = JSON.parse(localStorage.getItem('nc_all_registered_profiles') || '{}');
      } catch(e) {}

      const existing = savedProfiles[rawPhone] || (currentCustomer && currentCustomer.phone === rawPhone ? currentCustomer : null);
      const nameInp = document.getElementById('auth_name');
      const addrInp = document.getElementById('auth_addr');

      if (existing) {
        if (nameInp) nameInp.value = existing.name || '';
        if (addrInp) addrInp.value = existing.address || '';
      } else {
        if (nameInp && !nameInp.value) nameInp.value = '';
        if (addrInp && !addrInp.value) addrInp.value = isEn ? 'Amta, Howrah - 711401' : 'আমতা, হাওড়া - 711401';
      }

      // Focus first OTP box
      const b1 = document.getElementById('otp_box_1');
      if (b1) setTimeout(() => b1.focus(), 150);

      // Start 30s countdown timer
      startOtpResendTimer();

      // Show instant notification on screen
      showToast(`💬 ${isEn ? 'Your Login OTP is' : 'নিশা ক্রিয়েশনস লগইন ওটিপি:'} <b style="color:#fde047; font-size:1.15rem; letter-spacing:3px;">${otpCode}</b>`);
    }

    function handleOtpBoxInput(index) {
      const b = document.getElementById('otp_box_' + index);
      if (!b) return;
      b.value = b.value.replace(/[^0-9]/g, '').slice(-1);
      if (b.value && index < 4) {
        const next = document.getElementById('otp_box_' + (index + 1));
        if (next) next.focus();
      }
    }

    function handleOtpBoxKey(e, index) {
      if (e.key === 'Backspace') {
        const b = document.getElementById('otp_box_' + index);
        if (b && !b.value && index > 1) {
          const prev = document.getElementById('otp_box_' + (index - 1));
          if (prev) {
            prev.focus();
            prev.value = '';
          }
        }
      }
    }

    function autoFillOtp() {
      if (!window.activeOtp) return;
      for (let i = 0; i < 4; i++) {
        const b = document.getElementById('otp_box_' + (i + 1));
        if (b) {
          b.value = window.activeOtp.charAt(i);
          b.style.borderColor = '#10b981';
        }
      }
      const nameInp = document.getElementById('auth_name');
      if (nameInp && !nameInp.value) {
        nameInp.focus();
      }
    }

    function startOtpResendTimer() {
      clearInterval(window.otpResendInterval);
      let timeLeft = 30;
      const btn = document.getElementById('btnResendOtpTimer');
      const isEn = (currentLang === 'en');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = isEn 
          ? `Resend OTP in <span style="font-weight:800; color:var(--primary);">${timeLeft}s</span>` 
          : `পুনরায় ওটিপি পাঠান (<span style="font-weight:800; color:var(--primary);">${timeLeft} সেকেন্ড</span> পর)`;
      }
      window.otpResendInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(window.otpResendInterval);
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = isEn 
              ? `Didn't get OTP? <span style="font-weight:800; color:var(--primary); text-decoration:underline;">Resend OTP</span>` 
              : `ওটিপি পাননি? <span style="font-weight:800; color:var(--primary); text-decoration:underline;">পুনরায় ওটিপি পাঠান</span>`;
          }
        } else if (btn) {
          btn.innerHTML = isEn 
            ? `Resend OTP in <span style="font-weight:800; color:var(--primary);">${timeLeft}s</span>` 
            : `পুনরায় ওটিপি পাঠান (<span style="font-weight:800; color:var(--primary);">${timeLeft} সেকেন্ড</span> পর)`;
        }
      }, 1000);
    }

    function resendCustomerOtp() {
      if (!window.activeOtpPhone) return;
      const isEn = (currentLang === 'en');
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
      window.activeOtp = newOtp;
      
      const liveOtp = document.getElementById('liveOtpDisplayCode');
      if (liveOtp) liveOtp.textContent = newOtp;
      const autoVal = document.getElementById('autoFillOtpVal');
      if (autoVal) autoVal.textContent = newOtp;

      for (let i = 1; i <= 4; i++) {
        const b = document.getElementById('otp_box_' + i);
        if (b) {
          b.value = '';
          b.style.borderColor = '#cbd5e1';
        }
      }
      const b1 = document.getElementById('otp_box_1');
      if (b1) b1.focus();

      startOtpResendTimer();
      showToast(`💬 ${isEn ? 'New OTP code is' : 'নতুন ওটিপি কোড:'} <b style="color:#fde047; font-size:1.15rem; letter-spacing:3px;">${newOtp}</b>`);
    }

    function verifyCustomerOtpAndLogin() {
      const isEn = (currentLang === 'en');
      let enteredOtp = '';
      for (let i = 1; i <= 4; i++) {
        const b = document.getElementById('otp_box_' + i);
        enteredOtp += (b ? b.value.trim() : '');
      }

      if (enteredOtp.length !== 4) {
        alert(isEn ? 'Please enter the complete 4-digit OTP!' : 'অনুগ্রহ করে সম্পূর্ণ ৪ ডিজিটের ওটিপি কোডটি লিখুন!');
        return;
      }

      if (enteredOtp !== window.activeOtp) {
        alert(isEn ? '❌ Incorrect OTP code! Please check the code shown in notification.' : '❌ ভুল ওটিপি কোড! অনুগ্রহ করে নোটিফিকেশনে দেখানো সঠিক ৪ ডিজিটের ওটিপি দিন।');
        for (let i = 1; i <= 4; i++) {
          const b = document.getElementById('otp_box_' + i);
          if (b) {
            b.value = '';
            b.style.borderColor = '#ef4444';
          }
        }
        const b1 = document.getElementById('otp_box_1');
        if (b1) b1.focus();
        return;
      }

      // OTP verified successfully!
      const nameInp = document.getElementById('auth_name');
      const addrInp = document.getElementById('auth_addr');

      const name = nameInp ? nameInp.value.trim() : '';
      const addr = addrInp ? addrInp.value.trim() : '';

      if (!name) {
        alert(isEn ? 'Please enter your full name!' : 'অনুগ্রহ করে আপনার পুরো নাম লিখুন!');
        if (nameInp) nameInp.focus();
        return;
      }

      const phone = window.activeOtpPhone;

      currentCustomer = {
        id: 'CUST-' + phone.slice(-6),
        name: name,
        phone: phone,
        address: addr || (isEn ? 'Amta, Howrah - 711401' : 'আমতা, হাওড়া - 711401'),
        coins: (currentCustomer && currentCustomer.coins !== undefined) ? currentCustomer.coins : 50,
        loggedIn: true,
        updatedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
        let savedProfiles = JSON.parse(localStorage.getItem('nc_all_registered_profiles') || '{}');
        savedProfiles[phone] = { name: name, address: addr };
        localStorage.setItem('nc_all_registered_profiles', JSON.stringify(savedProfiles));
      } catch(e) {}

      checkoutAddress = { name: name, phone: phone, address: addr };

      closeCustomerAuthModal();

      // Update all UI elements
      loadCustomerAccountHub();
      syncCheckoutWithProfile();
      updateDrawerActiveStates();
      renderOrders();

      showToast(isEn ? `🎉 Welcome, ${name}! Logged in successfully.` : `🎉 অভিনন্দন, ${name}! ওটিপি সফলভাবে যাচাই হয়েছে এবং আপনি লগইন হয়েছেন।`);
    }

    function saveCustomerAuthProfile() {
      // Fallback redirect to OTP verification
      verifyCustomerOtpAndLogin();
    }

    function detectCustomerGpsLocation() {
      const statusEl = document.getElementById('authGpsStatus');
      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.style.color = '#0284c7';
        statusEl.textContent = currentLang === 'en' ? '⏳ Detecting GPS Location...' : '⏳ বর্তমান লাইভ GPS লোকেশন নেওয়া হচ্ছে...';
      }

      if (!navigator.geolocation) {
        if (statusEl) {
          statusEl.style.color = '#ef4444';
          statusEl.textContent = currentLang === 'en' ? '❌ GPS is not supported in this browser' : '❌ ব্রাউজারে GPS সনাক্তকরণ সমর্থিত নয়। দয়া করে লিখে দিন।';
        }
        return;
      }

      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          const addrInp = document.getElementById('auth_addr');
          if (addrInp) {
            const existing = addrInp.value.trim();
            const gpsString = `[GPS: ${lat}, ${lng}]`;
            if (!existing.includes('GPS:')) {
              addrInp.value = existing ? `${existing} (📍 ${gpsString})` : `আমতা, হাওড়া - 711401 (📍 ${gpsString})`;
            }
          }
          if (statusEl) {
            statusEl.style.color = '#15803d';
            statusEl.innerHTML = `✓ ${currentLang === 'en' ? 'GPS coordinates captured' : 'লাইভ GPS কো-অর্ডিনেট সফলভাবে নেওয়া হয়েছে'} (${lat}, ${lng})!`;
          }
        },
        err => {
          if (statusEl) {
            statusEl.style.color = '#b91c1c';
            statusEl.textContent = currentLang === 'en' ? '⚠️ Permission denied. Please type address manually.' : '⚠️ লোকেশন পারমিশন পাওয়া যায়নি। ম্যানুয়ালি ঠিকানা লিখে দিন।';
          }
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    }

    function customerLogout() {
      const isEn = currentLang === 'en';
      if (!confirm(isEn ? 'Are you sure you want to log out?' : 'আপনি কি নিশ্চিতভাবে লগআউট করতে চান?')) return;
      localStorage.removeItem('nc_customer_profile');
      currentCustomer = null;
      checkoutAddress = { name: '', phone: '', address: '' };
      loadCustomerAccountHub();
      syncCheckoutWithProfile();
      updateDrawerActiveStates();
      renderOrders();
      showToast(isEn ? '🚪 You have been logged out successfully.' : '🚪 আপনি সফলভাবে লগআউট হয়েছেন।');
    }

    function syncCheckoutWithProfile() {
      const nameEl = document.getElementById('displayCustName');
      const phoneEl = document.getElementById('displayCustPhone');
      const addrEl = document.getElementById('displayCustAddr');
      const inpName = document.getElementById('cust_name');
      const inpPhone = document.getElementById('cust_phone');
      const inpAddr = document.getElementById('cust_addr');
      const editForm = document.getElementById('inlineAddressEditForm');

      if (currentCustomer && currentCustomer.phone) {
        if (nameEl) nameEl.textContent = currentCustomer.name;
        if (phoneEl) phoneEl.textContent = '📞 ' + currentCustomer.phone;
        if (addrEl) addrEl.textContent = '📍 ' + (currentCustomer.address || 'আমতা, হাওড়া');
        if (inpName) inpName.value = currentCustomer.name;
        if (inpPhone) inpPhone.value = currentCustomer.phone;
        if (inpAddr) inpAddr.value = currentCustomer.address || '';
        if (editForm) editForm.style.display = 'none';
      } else {
        if (nameEl) nameEl.textContent = (currentLang === 'en' ? 'Guest Customer (Not Logged In)' : 'অতিথি গ্রাহক (লগইন করা নেই)');
        if (phoneEl) phoneEl.textContent = (currentLang === 'en' ? '📞 Please Enter Phone' : '📞 নিচে মোবাইল নম্বর পূরণ করুন');
        if (addrEl) addrEl.textContent = (currentLang === 'en' ? '📍 Enter delivery address below' : '📍 নিচে ডেলিভারি ঠিকানা দিন');
        if (inpName) inpName.value = '';
        if (inpPhone) inpPhone.value = '';
        if (inpAddr) inpAddr.value = '';
        // Automatically open address edit form for guest so they can easily fill in
        if (editForm) editForm.style.display = 'block';
      }
    }


    function submitOrder() {
      if (cart.length === 0) { alert("ব্যাগ ফাঁকা!"); return; }

      const name = document.getElementById('cust_name').value.trim();
      const phone = document.getElementById('cust_phone').value.trim();
      const addr = document.getElementById('cust_addr').value.trim();
      const payMode = document.querySelector('input[name="pay_mode"]:checked').value;
      const isGift = document.getElementById('giftWrapCheck').checked;

      if (!name || !phone || !addr) {
        alert("দয়া করে আপনার নাম, মোবাইল নম্বর ও ঠিকানা পূরণ করুন!");
        return;
      }

      // Auto-save address to customer profile
      if (currentCustomer) {
        currentCustomer.address = addr;
        currentCustomer.phone = phone;
        currentCustomer.coins = (currentCustomer.coins || 0) + 50; // Earn 50 loyalty coins
        localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
        updateCustomerAuthDisplay();
      }

      const orderId = "NC-" + Math.floor(1000 + Math.random() * 9000);
      const total = cart.reduce((a, b) => a + b.price, 0);
      const dateStr = new Date().toLocaleDateString('bn-IN') + ", " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

      const newOrder = {
        id: orderId,
        date: dateStr,
        name: name,
        phone: phone,
        address: `${addr}, আমতা, হাওড়া - 711401`,
        items: [...cart],
        total: total,
        paymentMode: payMode,
        isGift: isGift,
        status: "Order Placed"
      };

      orders.unshift(newOrder);
      localStorage.setItem('nc_orders', JSON.stringify(orders));

      // Sync order to Google Cloud Firestore in real-time
      if (typeof CloudSync !== 'undefined' && CloudSync.isReady()) {
        try {
          CloudSync.saveOrder(newOrder);
          console.log('☁️ [submitOrder] Order #' + newOrder.id + ' dispatched to Cloud Firestore!');
        } catch(e) {
          console.warn('Notice during cloud order dispatch:', e);
        }
      }

      // AUTOMATIC STOCK DEDUCTION (Subtract ordered quantity from stock)
      cart.forEach(cartItem => {
        const prod = products.find(p => p.id === cartItem.id);
        if (prod) {
          const qty = cartItem.qty || 1;
          prod.stock = Math.max(0, (prod.stock !== undefined ? prod.stock : 100) - qty);
          prod.sold = (prod.sold || 0) + qty;
          if (prod.stock <= 0) {
            prod.stock = 0;
            prod.inStock = false;
          }
        }
      });

      // Save updated stock to both storage keys
      localStorage.setItem('nc_products', JSON.stringify(products));
      const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
      if (customOnly.length > 0) {
        localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));
      }

      // Professional WhatsApp Invoice Text
      const itemsList = cart.map((i, idx) => `${idx + 1}. ${i.title} - ₹${i.price}`).join('%0A');
      const giftNote = isGift ? "%0A🎁 *উপহার প্যাকেজিং:* হ্যাঁ (+ স্পেশাল বার্তা কার্ড)" : "";
      const payDesc = payMode === "UPI" ? "📲 অনলাইন UPI (PhonePe / GPay)" : "💵 Cash on Delivery (ক্যাশ অন ডেলিভারি)";
      
      const waMsg = `*🛍️ নতুন অর্ডার - নিশা ক্রিয়েশনস (আমতা)*%0A━━━━━━━━━━━━━━━━━%0A🧾 *অর্ডার নং:* #${orderId}%0A📅 *তারিখ:* ${encodeURIComponent(dateStr)}%0A%0A👤 *গ্রাহকের নাম:* ${encodeURIComponent(name)}%0A📞 *মোবাইল নম্বর:* ${phone}%0A📍 *ডেলিভারি ঠিকানা:* ${encodeURIComponent(addr)}, আমতা, হাওড়া%0A💳 *পেমেন্ট:* ${encodeURIComponent(payDesc)}${giftNote}%0A%0A👗 *অর্ডার আইটেম:*%0A${itemsList}%0A%0A💰 *মোট বিল:* ₹${total} (ফ্রি হোম ডেলিভারি)%0A━━━━━━━━━━━━━━━━━%0A🙏 *অনুগ্রহ করে অর্ডারটি গ্রহণ করে বুকিং কনফার্ম করুন।*`;

      cart = [];
      localStorage.setItem('nc_cart', JSON.stringify(cart));
      updateCartBadge();
      closeCartModal();

      // Show Order Success Modal with WhatsApp direct link
      document.getElementById('successOrderId').textContent = `#${orderId}`;
      const waUrl = `https://api.whatsapp.com/send?phone=${BOUTIQUE_PHONE}&text=${waMsg}`;
      document.getElementById('successWhatsAppLink').href = waUrl;
      document.getElementById('orderSuccessModal').style.display = 'flex';

      // 100% In-App Processing: No auto-redirect to WhatsApp. Order is recorded in App & Admin!
      renderOrders();
      renderAdminDashboardLive();

      renderOrders();
    }

    function closeOrderSuccessModal() {
      document.getElementById('orderSuccessModal').style.display = 'none';
      showScreen('orders');
    }

    // PWA Install Prompt Handler
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      const banner = document.getElementById('pwaInstallBanner');
      if (banner) banner.style.display = 'flex';
    });

    function triggerAppInstall() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          }
          deferredPrompt = null;
          const banner = document.getElementById('pwaInstallBanner');
          if (banner) banner.style.display = 'none';
        });
      } else {
        alert("আপনার মোবাইলের ব্রাউজার মেনু (উপরে 3টি ডট ⋮) থেকে 'Install App' বা 'Add to Home Screen' চাপুন।");
      }
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.log('SW registration failed: ', err);
        });
      });
    }

    // Live Order Tracking
    function loadAndRenderOrdersSafe() {
      let storedOrders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      
      // No hardcoded or fake orders! Clean empty array for new users.
      orders = Array.isArray(storedOrders) ? storedOrders : [];
      renderOrders();
    }

    function renderOrders(filterList = null) {
      const container = document.getElementById('ordersListContainer');
      if (!container) return;

      const isEn = currentLang === 'en';

      const wHead = document.getElementById('t-ordersHeaderTitleTxt');
      if (wHead) wHead.textContent = isEn ? "MY ORDERS" : "আমার অর্ডার";
      const wHelp = document.getElementById('t-ordersHelpTxt');
      if (wHelp) wHelp.textContent = isEn ? "HELP" : "সাহায্য";

      let stored = localStorage.getItem('nc_orders');
      let allOrders = stored ? JSON.parse(stored) : (orders || []);

      // Filter orders by logged in customer's phone if available
      let currentList = filterList;
      if (!currentList) {
        if (currentCustomer && currentCustomer.phone) {
          const userPhoneClean = currentCustomer.phone.replace(/[^0-9]/g, '');
          currentList = allOrders.filter(o => (o.phone || '').replace(/[^0-9]/g, '') === userPhoneClean);
        } else {
          currentList = allOrders;
        }
      }

      if (!currentList || currentList.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:50px 20px; color:#94a3b8; background:#fff; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
            <i class="fa-solid fa-bag-shopping" style="font-size:2.5rem; color:#cbd5e1; margin-bottom:12px;"></i>
            <div style="font-size:0.95rem; font-weight:800; color:#475569;">${isEn ? "No orders found!" : "কোনো অর্ডার পাওয়া যায়নি!"}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:4px;">${isEn ? "Explore our boutique collection to place your order." : "আপনার পছন্দের শাড়ি ও ড্রেস কিনতে শপে যান।"}</div>
            <button onclick="showScreen('home')" style="background:var(--primary); color:#fff; border:none; padding:8px 18px; border-radius:20px; font-size:0.8rem; font-weight:800; margin-top:14px; cursor:pointer;">
              ${isEn ? "Shop Now" : "শপ দেখুন"}
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = '';
      currentList.forEach((ord, ordIdx) => {
        const firstItem = ord.items && ord.items[0] ? ord.items[0] : {};
        const isDelivered = (ord.status === "Delivered");
        const isOut = (ord.status === "Out for Delivery");
        const isPacked = (ord.status === "Packed");
        const isReviewed = (ord.reviewed === true);
        const currentRating = (ord.reviewData && ord.reviewData.rating) ? ord.reviewData.rating : (ord.quickRating || 0);

        const safeProdTitle = (firstItem.title || 'Pure Dhakai Jamdani Saree').replace(/'/g, "\\'");
        const rawSize = firstItem.selectedSize || 'Free Size';
        const sizeText = isEn ? rawSize.replace(/শাড়ি|শাড়ি/g, 'Saree') : rawSize;
        const qtyText = firstItem.qty || 1;
        const payModeText = ord.paymentMode || 'COD';
        const displayDate = formatOrderDate(ord.date);
        const displayDelivery = formatDeliveryEst(ord.estDelivery);

        // Status Badge text
        let displayStatus = ord.status;
        let statusBadgeBg = '#fef08a';
        let statusBadgeColor = '#854d0e';
        if (ord.status === 'Cancelled') {
          displayStatus = isEn ? 'Cancelled' : 'বাতিল (Cancelled)';
          statusBadgeBg = '#fee2e2';
          statusBadgeColor = '#991b1b';
        } else if (ord.status === 'Delivered') {
          displayStatus = isEn ? 'Delivered' : 'কমপ্লিট (Delivered)';
          statusBadgeBg = '#dcfce7';
          statusBadgeColor = '#16a34a';
        } else if (ord.status === 'Order Placed') {
          displayStatus = isEn ? 'Order Placed' : 'অর্ডার গৃহীত';
        } else if (ord.status === 'Packed') {
          displayStatus = isEn ? 'Packed' : 'প্যাকিং সম্পন্ন';
        } else if (ord.status === 'Out for Delivery') {
          displayStatus = isEn ? 'Out for Delivery' : 'ডেলিভারিতে বেরিয়েছে';
        }

        // =========================================================================
        // CASE A: ORDER COMPLETED (Delivered)
        // =========================================================================
        if (isDelivered) {
          let reviewWidgetHtml = '';
          if (isReviewed || currentRating > 0) {
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
              starsHtml += `<i class="fa-solid fa-star" style="color:${i <= currentRating ? '#f59e0b' : '#cbd5e1'}; font-size:1.4rem;"></i> `;
            }
            reviewWidgetHtml = `
              <div class="nisha-review-card-box" style="background:#f0fdf4; border-bottom:1px solid #bbf7d0;">
                <div style="display:flex; align-items:center; justify-content:space-between;">
                  <div>
                    <div style="font-size:0.82rem; font-weight:800; color:#15803d; display:flex; align-items:center; gap:6px;">
                      <i class="fa-solid fa-circle-check"></i> ${isEn ? "Your review has been submitted!" : "আপনার রিভিউ জমা পড়েছে!"}
                    </div>
                    <div style="margin-top:4px;">${starsHtml} <span style="font-size:0.75rem; font-weight:800; color:#15803d;">(${currentRating}.0 ★)</span></div>
                  </div>
                  <button onclick="openDeliveryReviewModal('${ord.id}', '${safeProdTitle}', '${firstItem.id || ""}')" style="background:#fff; border:1px solid #86efac; color:#15803d; padding:5px 12px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer;">
                    ${isEn ? "View Review" : "রিভিউ দেখুন"}
                  </button>
                </div>
              </div>
            `;
          } else {
            reviewWidgetHtml = `
              <div class="nisha-review-card-box">
                <div class="nisha-review-card-top">
                  <span class="nisha-review-heading">${isEn ? "How was the product?" : "How was the product? (পণ্যটি কেমন লাগলো?)"}</span>
                  <span class="nisha-add-feedback-link" onclick="openDeliveryReviewModal('${ord.id}', '${safeProdTitle}', '${firstItem.id || ""}')">
                    ADD FEEDBACK ❯
                  </span>
                </div>
                <div class="nisha-stars-container" style="display:flex; justify-content:space-between; max-width:320px; margin:4px auto 0 auto; user-select:none;">
                  <div class="nisha-star-column" style="display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;" onclick="quickRateOrderDirect('${ord.id}', 1, '${safeProdTitle}', '${firstItem.id || ""}')">
                    <i class="fa-regular fa-star"></i>
                    <span class="nisha-star-label-text">Very Bad</span>
                  </div>
                  <div class="nisha-star-column" style="display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;" onclick="quickRateOrderDirect('${ord.id}', 2, '${safeProdTitle}', '${firstItem.id || ""}')">
                    <i class="fa-regular fa-star"></i>
                    <span class="nisha-star-label-text">Bad</span>
                  </div>
                  <div class="nisha-star-column" style="display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;" onclick="quickRateOrderDirect('${ord.id}', 3, '${safeProdTitle}', '${firstItem.id || ""}')">
                    <i class="fa-regular fa-star"></i>
                    <span class="nisha-star-label-text">Ok-Ok</span>
                  </div>
                  <div class="nisha-star-column" style="display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;" onclick="quickRateOrderDirect('${ord.id}', 4, '${safeProdTitle}', '${firstItem.id || ""}')">
                    <i class="fa-regular fa-star"></i>
                    <span class="nisha-star-label-text">Good</span>
                  </div>
                  <div class="nisha-star-column" style="display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer;" onclick="quickRateOrderDirect('${ord.id}', 5, '${safeProdTitle}', '${firstItem.id || ""}')">
                    <i class="fa-regular fa-star"></i>
                    <span class="nisha-star-label-text">Very Good</span>
                  </div>
                </div>
              </div>
            `;
          }

          container.innerHTML += `
            <div class="nisha-order-card" style="background:#ffffff; border-radius:14px; border:1px solid #e2e8f0; margin-bottom:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
              <div class="nisha-prod-meta-row" style="display:flex; gap:12px; align-items:center; padding:14px; border-bottom:1px solid #f1f5f9;">
                <img src="${firstItem.img || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150'}" class="nisha-prod-thumb" alt="Product" style="width:68px; height:68px; border-radius:10px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; background:#f8fafc;">
                <div class="nisha-prod-meta-info">
                  <div class="nisha-order-num-id">Order #${ord.id} • ${displayDate}</div>
                  <div class="nisha-prod-name-title">${firstItem.title || 'Pure Dhakai Jamdani Saree'}</div>
                  <div class="nisha-prod-specs-line">
                    <span>Size: ${sizeText}</span>
                    <span>•</span>
                    <span>Qty: ${qtyText}</span>
                    <span>•</span>
                    <span>${payModeText}</span>
                    <span>•</span>
                    <span style="font-weight:800; color:#0f172a;">₹${ord.total}</span>
                  </div>
                  <div class="nisha-easy-returns-tag">
                    <i class="fa-solid fa-arrow-rotate-left"></i> ${isEn ? "All issue easy returns" : "সহজ রিটার্ন সুবিধা"}
                  </div>
                </div>
                <div style="color:${statusBadgeColor}; font-weight:800; font-size:0.75rem; background:${statusBadgeBg}; padding:4px 8px; border-radius:6px; white-space:nowrap;">
                  <i class="fa-solid fa-circle-check"></i> ${displayStatus}
                </div>
              </div>

              ${reviewWidgetHtml}

              <div class="nisha-status-detail-card">
                <div class="nisha-status-title-row">
                  <div class="nisha-status-circle-icon">
                    <i class="fa-solid fa-bolt"></i>
                  </div>
                  <div>
                    <div class="nisha-status-delivered-text">${isEn ? "Delivered" : "Delivered (অর্ডার কমপ্লিট)"}</div>
                    <div class="nisha-status-date-sub">${displayDate}</div>
                  </div>
                </div>
                <div class="nisha-yay-strip-box">
                  <i class="fa-solid fa-bolt" style="color:#059669;"></i>
                  <span>${isEn ? "⚡ Yay! Your order was delivered successfully." : "⚡ Yay! Your order was delivered successfully. (পার্সেলটি আপনার ঠিকানায় পৌঁছে গেছে)"}</span>
                </div>
                <div class="nisha-return-policy-footer" style="flex-direction:column; align-items:stretch; gap:8px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span>${isEn ? "7 Days Easy Exchange & Return Policy" : "7 দিনে সহজ এক্সচেঞ্জ ও রিটার্ন পলিসি"}</span>
                    <span style="color:var(--primary); font-weight:800; cursor:pointer;" onclick="openReturnModal('${ord.id}')">${isEn ? "View Policy &rarr;" : "পলিসি জানুন &rarr;"}</span>
                  </div>
                  ${(() => {
                    const daysPassed = getDaysSinceDelivered(ord);
                    const isExpired = daysPassed > 7;
                    const daysLeft = Math.max(0, 7 - daysPassed);

                    if (ord.returnStatus === 'Requested') {
                      return `
                        <div style="background:#fff7ed; border:1.5px solid #fed7aa; padding:8px 12px; border-radius:8px; font-size:0.75rem; color:#c2410c;">
                          <div style="font-weight:800; display:flex; align-items:center; gap:6px;">
                            <i class="fa-solid fa-rotate-left"></i> ${isEn ? "Return / Exchange Request Received" : "রিটার্ন / এক্সচেঞ্জ আবেদন গৃহীত হয়েছে"}
                          </div>
                          <div style="margin-top:2px; font-size:0.7rem;">
                            ${isEn ? "Reason:" : "কারণ:"} ${ord.returnReason} ${ord.returnType === 'Exchange' ? `(${isEn ? 'New Size:' : 'নতুন সাইজ:'} <strong>${ord.returnExchangeSize}</strong>)` : `(${isEn ? 'Bank Refund' : 'ব্যাংক রিফান্ড'})`}
                          </div>
                          <div style="font-size:0.68rem; color:#9a3412; margin-top:3px;">${isEn ? "⏳ Our Amta delivery team will contact you soon for parcel pickup." : "⏳ আমতায় আমাদের ডেলিভারি টিম পার্সেল পিকআপ করতে শীঘ্রই যোগাযোগ করবে।"}</div>
                        </div>
                      `;
                    } else if (isExpired) {
                      return `
                        <div style="background:#fef2f2; border:1px solid #fecaca; padding:8px 12px; border-radius:8px; font-size:0.75rem; color:#991b1b; display:flex; align-items:center; gap:8px;">
                          <i class="fa-solid fa-lock" style="font-size:1.1rem;"></i>
                          <div>
                            <div style="font-weight:800;">${isEn ? "7-Day Return Window Expired" : "7 দিনের রিটার্ন মেয়াদ উত্তীর্ণ হয়েছে"}</div>
                            <div style="font-size:0.68rem; opacity:0.9;">${isEn ? "Returns or exchanges are not accepted after 7 days of delivery." : "ডেলিভারির 7 দিন পর আর রিটার্ন বা এক্সচেঞ্জ গ্রহণযোগ্য নয়।"}</div>
                          </div>
                        </div>
                      `;
                    } else {
                      return `
                        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:4px 8px; font-size:0.7rem; color:#166534; display:flex; justify-content:space-between; align-items:center;">
                          <span><i class="fa-solid fa-clock-rotate-left"></i> ${isEn ? "7-day return period active" : "7 দিনের রিটার্ন সময় সক্রিয়"}</span>
                          <span style="background:#dcfce7; color:#15803d; font-weight:800; padding:1px 6px; border-radius:10px;">${isEn ? `${daysLeft} days left` : `আর ${daysLeft} দিন বাকি`}</span>
                        </div>
                        <button type="button" onclick="openReturnModal('${ord.id}')" style="width:100%; background:#fdf4ff; border:1.5px solid #f0abfc; color:var(--primary); padding:8px; border-radius:8px; font-size:0.78rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
                          <i class="fa-solid fa-arrow-rotate-left"></i> ${isEn ? "🔄 Exchange or Return within 7 days" : "🔄 সাইজ ছোট/বড় হলে এক্সচেঞ্জ বা রিটার্ন করুন (7 দিনের মধ্যে)"}
                        </button>
                      `;
                    }
                  })()}
                </div>
              </div>

              <div class="nisha-address-display-card">
                <div class="nisha-addr-title-line">
                  <i class="fa-solid fa-location-dot" style="color:var(--primary);"></i>
                  <span>${isEn ? "Delivery Address" : "ডেলিভারি ঠিকানা"}</span>
                </div>
                <div class="nisha-addr-name-bold">${ord.customer || ord.name || (currentLang === 'en' ? 'Valued Customer' : 'সম্মানিত গ্রাহক')}</div>
                <div class="nisha-addr-full-text">${ord.address || ''}</div>
                <div class="nisha-addr-phone-line">📞 ${ord.phone || ''}</div>
              </div>

              <div class="nisha-actions-footer-bar" style="display:flex; gap:10px; padding:10px 14px; background:#ffffff;">
                <a href="tel:9239413517" class="nisha-action-link-btn" style="flex:1; padding:9px; border-radius:8px; font-size:0.78rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; text-decoration:none; border:1px solid #cbd5e1; background:#f8fafc; color:#334155;">
                  <i class="fa-solid fa-phone"></i> ${isEn ? "Call Us" : "কল করুন"}
                </a>
                <a href="https://wa.me/919239413517?text=${encodeURIComponent((isEn ? 'Hello Nisha Boutique, I want to inquire about my order #' : 'নমস্কার নিশা দিদি, আমার অর্ডার #') + ord.id)}" target="_blank" class="nisha-action-link-btn wa" style="flex:1; padding:9px; border-radius:8px; font-size:0.78rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:6px; text-decoration:none; background:#25d366; color:#ffffff; border:1px solid #25d366;">
                  <i class="fa-brands fa-whatsapp"></i> ${isEn ? "WhatsApp" : "WhatsApp"}
                </a>
              </div>
            </div>
          `;
          return;
        }

        // =========================================================================
        // CASE B: IN-PROGRESS / CANCELLED ORDER
        // =========================================================================
        container.innerHTML += `
          <div class="nisha-order-card" style="background:#ffffff; border-radius:14px; border:1px solid #e2e8f0; margin-bottom:16px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
            <!-- Product Header -->
            <div class="nisha-prod-meta-row" style="display:flex; gap:12px; align-items:center; padding:14px; border-bottom:1px solid #f1f5f9;">
              <img src="${firstItem.img || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150'}" class="nisha-prod-thumb" alt="Product" style="width:68px; height:68px; border-radius:10px; object-fit:cover; border:1px solid #e2e8f0; flex-shrink:0; background:#f8fafc;">
              <div class="nisha-prod-meta-info">
                <div class="nisha-order-num-id">Order #${ord.id} • ${displayDate}</div>
                <div class="nisha-prod-name-title">${firstItem.title || 'Pure Dhakai Jamdani Saree'}</div>
                <div class="nisha-prod-specs-line">
                  <span>Size: ${sizeText}</span>
                  <span>•</span>
                  <span>Qty: ${qtyText}</span>
                  <span>•</span>
                  <span>${payModeText}</span>
                  <span>•</span>
                  <span style="font-weight:800; color:#0f172a;">₹${ord.total}</span>
                </div>
              </div>
              <span style="background:${statusBadgeBg}; color:${statusBadgeColor}; font-size:0.72rem; font-weight:800; padding:4px 8px; border-radius:6px; white-space:nowrap;">
                ${displayStatus}
              </span>
            </div>

            <!-- Live 4-Step Tracking Timeline -->
            <div style="padding:14px; background:#ffffff; border-bottom:1px solid #f1f5f9;">
              <div style="font-size:0.82rem; font-weight:800; color:#0f172a; margin-bottom:12px; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-route" style="color:var(--primary);"></i>
                <span>${isEn ? "Live Order Tracking:" : "লাইভ অর্ডার ট্র্যাকিং (Order Tracking):"}</span>
              </div>
              
              <div class="timeline" style="margin-left:8px;">
                <div class="timeline-step completed">
                  <div class="timeline-dot"><i class="fa-solid fa-check"></i></div>
                  <div style="font-size:0.78rem; font-weight:800; color:#0f172a;">${isEn ? "1. Order Placed" : "1. অর্ডার গৃহীত হয়েছে"}</div>
                  <div style="font-size:0.68rem; color:#64748b;">${isEn ? "Order booking verified in system" : "সিস্টেমে অর্ডার বুকিং ভেরিফাই হয়েছে"}</div>
                </div>
                <div class="timeline-step ${isPacked || isOut ? 'completed' : ''}">
                  <div class="timeline-dot"><i class="fa-solid fa-box"></i></div>
                  <div style="font-size:0.78rem; font-weight:800; color:#0f172a;">${isEn ? "2. Packed & Quality Checked" : "2. প্যাকিং ও কোয়ালিটি চেক"}</div>
                  <div style="font-size:0.68rem; color:#64748b;">${isEn ? "Thoroughly checked by Nisha Creations Boutique" : "নিশা ক্রিয়েশনস বুটিক দ্বারা নিখুঁতভাবে চেক করা হয়েছে"}</div>
                </div>
                <div class="timeline-step ${isOut ? 'completed' : ''}">
                  <div class="timeline-dot"><i class="fa-solid fa-motorcycle"></i></div>
                  <div style="font-size:0.78rem; font-weight:800; color:#0f172a;">${isEn ? "3. Out for Delivery" : "3. ডেলিভারির জন্য বেরিয়েছে (Out for Delivery)"}</div>
                  <div style="font-size:0.68rem; color:#64748b;">${isEn ? "With Amta delivery partner" : "আমতার ডেলিভারি পার্টনারের কাছে রয়েছে"}</div>
                </div>
                <div class="timeline-step">
                  <div class="timeline-dot"><i class="fa-solid fa-house-chimney"></i></div>
                  <div style="font-size:0.78rem; font-weight:800; color:#94a3b8;">${isEn ? "4. Delivered" : "4. ডেলিভারি সম্পন্ন (Delivered)"}</div>
                  <div style="font-size:0.68rem; color:#94a3b8;">${isEn ? "Parcel will reach your address" : "পার্সেল আপনার ঠিকানায় পৌঁছাবে"}</div>
                </div>
              </div>

              <!-- Estimated Delivery Strip -->
              <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:8px 12px; font-size:0.75rem; color:#15803d; font-weight:700; margin-top:8px;">
                <i class="fa-solid fa-truck-fast"></i> ${displayDelivery}
              </div>
            </div>

            <!-- Delivery Address Card -->
            <div class="nisha-address-display-card">
              <div class="nisha-addr-title-line">
                <i class="fa-solid fa-location-dot" style="color:var(--primary);"></i>
                <span>${isEn ? "Delivery Address" : "ডেলিভারি ঠিকানা"}</span>
              </div>
              <div class="nisha-addr-name-bold">${ord.customer || ord.name || (currentLang === 'en' ? 'Valued Customer' : 'সম্মানিত গ্রাহক')}</div>
              <div class="nisha-addr-full-text">${ord.address || ''}</div>
              <div class="nisha-addr-phone-line">📞 ${ord.phone || ''}</div>
            </div>

            <!-- Action Buttons Footer with Cancel Order -->
            <div class="nisha-actions-footer-bar" style="flex-wrap:wrap; gap:8px;">
              <a href="tel:9239413517" class="nisha-action-link-btn" style="flex:1;">
                <i class="fa-solid fa-phone"></i> ${isEn ? "Call Us" : "কল করুন"}
              </a>
              <a href="https://wa.me/919239413517?text=${encodeURIComponent((isEn ? 'Hello Nisha Boutique, I want to track my order #' : 'নমস্কার নিশা দিদি, আমার অর্ডার #') + ord.id)}" target="_blank" class="nisha-action-link-btn wa" style="flex:1;">
                <i class="fa-brands fa-whatsapp"></i> ${isEn ? "Track on WhatsApp" : "ট্র্যাকিং"}
              </a>
              ${(ord.status === 'Order Placed' || ord.status === 'Packed') ? `
                <button type="button" onclick="openCancelModal('${ord.id}')" style="width:100%; background:#fff; border:1px solid #fca5a5; color:#dc2626; padding:7px; border-radius:8px; font-size:0.75rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; margin-top:4px;">
                  <i class="fa-solid fa-ban"></i> ${isEn ? "✕ Cancel Order" : "✕ অর্ডার বাতিল / ক্যানসেল করুন"}
                </button>
              ` : ''}
              ${ord.status === 'Cancelled' ? `
                <div style="width:100%; background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:6px 10px; border-radius:6px; font-size:0.72rem; font-weight:700; text-align:center;">
                  ${isEn ? `✕ Order Cancelled (Reason: ${ord.cancelReason === 'ব্যক্তিগত কারণ' ? 'Personal Reason' : (ord.cancelReason || 'Personal')})` : `✕ অর্ডার বাতিল করা হয়েছে (কারণ: ${ord.cancelReason || 'ব্যক্তিগত কারণ'})`}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      });
    }

    function quickRateOrderDirect(orderId, starVal, prodTitle, prodId) {
      setDelivStar(starVal);
      openDeliveryReviewModal(orderId, prodTitle, prodId);
    }

    function trackOrderManual() {
      const q = document.getElementById('trackInput').value.trim().toLowerCase();
      if (!q) { renderOrders(); return; }
      const res = orders.filter(o => o.id.toLowerCase().includes(q) || o.phone.includes(q));
      renderOrders(res);
    }

    // Refer & Earn Modals
    function openReferModal() { document.getElementById('referModal').style.display = 'flex'; }
    function closeReferModal() { document.getElementById('referModal').style.display = 'none'; }
    function shareReferralWhatsApp() {
      const msg = `আমার পছন্দের নিশা ক্রিয়েশনস বুটিক থেকে বিয়ের ও পুজোর সুন্দর শাড়ি ও গহনা কিনুন এবং কোড NISHA50 দিয়ে পান সাথে সাথে ₹50 ছাড়! ফ্রি হোম ডেলিভারি পেতে এই লিংকে অর্ডার করুন: https://smartworkeraluminium-sys.github.io/nishacreations/`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function shareProductWhatsApp() {
      if (!currentPdpProduct) return;
      const text = `নিশা ক্রিয়েশনস বুটিকের এই চমৎকার শাড়িটি দেখুন:%0A*${currentPdpProduct.title}*%0Aদাম: মাত্র ₹${currentPdpProduct.price}%0Aআমতায় ফ্রি হোম ডেলিভারি পেতে এখনই অর্ডার করুন!`;
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    function orderCurrentOnWhatsApp() {
      if (!currentPdpProduct) return;
      const text = `নমস্কার, আমি নিশা ক্রিয়েশনস থেকে এই শাড়িটি অর্ডার করতে চাই:%0A*${currentPdpProduct.title}*%0Aদাম: ₹${currentPdpProduct.price}%0Aআমতায় ডেলিভারির জন্য বুকিং কনফার্ম করুন।`;
      window.open(`https://wa.me/${BOUTIQUE_PHONE}?text=${text}`, '_blank');
    }

    // Screen Switcher
    
    // =========================================================
    // THREE-DOT MENU DRAWER CONTROLLER
    // =========================================================
    function openMenuDrawer() {
      const modal = document.getElementById('menuDrawerModal');
      if (modal) {
        modal.style.display = 'flex';
        updateDrawerActiveStates();
      }
    }

    function closeMenuDrawer() {
      const modal = document.getElementById('menuDrawerModal');
      if (modal) modal.style.display = 'none';
    }

    function closeMenuDrawerOnOutside(e) {
      if (e.target.id === 'menuDrawerModal') {
        closeMenuDrawer();
      }
    }

    function updateDrawerActiveStates() {
      const isBn = currentLang === 'bn';
      const isEn = (currentLang === 'en');
      const btnBn = document.getElementById('drawerBtnLangBn');
      const btnEn = document.getElementById('drawerBtnLangEn');
      const chkBn = document.getElementById('drawerCheckBn');
      const chkEn = document.getElementById('drawerCheckEn');

      if (btnBn && btnEn) {
        if (isBn) {
          btnBn.style.border = '2px solid var(--primary)';
          btnBn.style.background = '#fdf4ff';
          btnBn.style.color = 'var(--primary)';
          if (chkBn) chkBn.style.display = 'inline';
          btnEn.style.border = '1.5px solid #cbd5e1';
          btnEn.style.background = '#fff';
          btnEn.style.color = '#475569';
          if (chkEn) chkEn.style.display = 'none';
        } else {
          btnEn.style.border = '2px solid var(--primary)';
          btnEn.style.background = '#fdf4ff';
          btnEn.style.color = 'var(--primary)';
          if (chkEn) chkEn.style.display = 'inline';
          btnBn.style.border = '1.5px solid #cbd5e1';
          btnBn.style.background = '#fff';
          btnBn.style.color = '#475569';
          if (chkBn) chkBn.style.display = 'none';
        }
      }

      // Handle Drawer Login & Logout Option (দু'নম্বর ছবিতে লগ ইন লগ আউট করার অপশন)
      const isLoggedIn = !!(currentCustomer && currentCustomer.phone);
      const boxLoggedOut = document.getElementById('drawerAuthBoxLoggedOut');
      const boxLoggedIn = document.getElementById('drawerAuthBoxLoggedIn');
      const uName = document.getElementById('drawerUserName');
      const uPhone = document.getElementById('drawerUserPhone');
      const uAvatar = document.getElementById('drawerUserAvatar');
      const authMenuItem = document.getElementById('drawerAuthMenuItem');
      const authIconWrap = document.getElementById('drawerAuthItemIconWrap');
      const authIcon = document.getElementById('drawerAuthItemIcon');
      const authTitle = document.getElementById('drawerAuthItemTitle');
      const authSub = document.getElementById('drawerAuthItemSub');
      const btnLoginTxt = document.getElementById('drawerBtnLoginTxt');
      const btnLogoutTxt = document.getElementById('drawerBtnLogoutTxt');
      const guestTitle = document.getElementById('drawerAuthGuestTitle');
      const guestSub = document.getElementById('drawerAuthGuestSub');

      if (guestTitle) guestTitle.textContent = isEn ? 'Welcome Guest!' : 'স্বাগতম অতিথি!';
      if (guestSub) guestSub.textContent = isEn ? 'Track orders & get rewards' : 'অর্ডার ট্র্যাক ও ছাড় পেতে';
      if (btnLoginTxt) btnLoginTxt.textContent = isEn ? 'Login' : 'লগইন';
      if (btnLogoutTxt) btnLogoutTxt.textContent = isEn ? 'Logout' : 'লগআউট';

      if (isLoggedIn) {
        if (boxLoggedOut) boxLoggedOut.style.display = 'none';
        if (boxLoggedIn) boxLoggedIn.style.display = 'flex';
        if (uName) uName.textContent = currentCustomer.name || (isEn ? 'Valued Customer' : 'সম্মানিত গ্রাহক');
        if (uPhone) uPhone.textContent = '📞 ' + currentCustomer.phone;
        if (uAvatar) uAvatar.textContent = (currentCustomer.name || 'N').trim().charAt(0).toUpperCase();

        if (authIconWrap) {
          authIconWrap.style.background = '#fef2f2';
          authIconWrap.style.color = '#dc2626';
        }
        if (authIcon) authIcon.className = 'fa-solid fa-right-from-bracket';
        if (authTitle) authTitle.textContent = isEn ? 'Logout' : 'লগআউট';
        if (authSub) authSub.textContent = isEn ? 'Sign out of this account' : 'অ্যাকাউন্ট থেকে প্রস্থান করুন';
      } else {
        if (boxLoggedOut) boxLoggedOut.style.display = 'flex';
        if (boxLoggedIn) boxLoggedIn.style.display = 'none';

        if (authIconWrap) {
          authIconWrap.style.background = '#fdf4ff';
          authIconWrap.style.color = 'var(--primary)';
        }
        if (authIcon) authIcon.className = 'fa-solid fa-right-to-bracket';
        if (authTitle) authTitle.textContent = isEn ? 'Login / Register' : 'লগইন বা রেজিস্টার';
        if (authSub) authSub.textContent = isEn ? 'Login with mobile OTP' : 'মোবাইল নম্বর ও ওটিপি দিয়ে প্রবেশ করুন';
      }
    }

    function handleDrawerAuthAction() {
      if (currentCustomer && currentCustomer.phone) {
        customerLogout();
      } else {
        closeMenuDrawer();
        openCustomerAuthModal();
      }
    }

    function triggerPwaInstallPrompt() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted PWA install');
          }
          deferredPrompt = null;
        });
      } else {
        alert(currentLang === 'en' ? "To install this app, tap your browser's menu (⋮ or Share) and select 'Add to Home Screen'." : "অ্যাপটি ফোনে ইনস্টল করতে ব্রাউজারের থ্রি-ডট (⋮) বা শেয়ার মেনুতে গিয়ে 'Add to Home screen' চাপুন।");
      }
    }

    
    // Floating Notification Toast
    function showToast(msg) {
      let toast = document.getElementById('ncFloatingToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'ncFloatingToast';
        toast.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#0f172a; color:#f8fafc; padding:12px 20px; border-radius:12px; font-size:0.85rem; font-weight:800; box-shadow:0 8px 25px rgba(0,0,0,0.3); z-index:999999; display:flex; align-items:center; gap:8px; border:1px solid #334155; transition:all 0.3s ease;';
        document.body.appendChild(toast);
      }
      toast.innerHTML = msg;
      toast.style.display = 'flex';
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => { toast.style.display = 'none'; }, 300);
      }, 3500);
    }

    function showScreen(screenId) {
      document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(`screen-${screenId}`);
      if (target) target.classList.add('active');

      // Hide main Home header on secondary screens (Search Results, PDP, Categories, Admin) so headers never collide
      const appHeader = document.querySelector('.app-header');
      if (appHeader) {
        appHeader.style.display = (screenId === 'home') ? 'block' : 'none';
      }

      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      const navBtn = document.getElementById(`tab-${screenId}`);
      if (navBtn) navBtn.classList.add('active');

      if (screenId === 'wishlist') { renderWishlistScreen(); }
      if (screenId === 'orders') {
        loadAndRenderOrdersSafe();
      }
      if (screenId === 'customer-settings') { loadCustomerAccountHub();
      syncCheckoutWithProfile(); }
      if (screenId === 'search-results') {
        const cartBadge = document.getElementById('ncResultsCartBadge');
        if (cartBadge) cartBadge.textContent = cart.reduce((s, it) => s + (it.qty || 1), 0);
      }
      if (screenId === 'pdp') {
        const pdpCartBadge = document.getElementById('pdpCartBadge');
        if (pdpCartBadge) pdpCartBadge.textContent = cart.reduce((s, it) => s + (it.qty || 1), 0);
      }
      if (screenId === 'categories') {
        selectCategoryTab(currentCategoryTab || 'saree_kurti');
      }

      window.scrollTo(0, 0);
    }

    // Admin Access Protection
    function openAdminSecret() {
      const pin = prompt("অ্যাডমিন পিন কোড লিখুন (Default: 1234):");
      if (pin === "1234") {
        renderAdminOrders();
        showScreen('admin');
      } else if (pin !== null) {
        alert("ভুল পিন কোড!");
      }
    }


    // ==========================================
    // LOGO & MOBILE GALLERY PHOTO UPLOAD LOGIC
    // ==========================================
    let uploadedProductImgBase64 = '';

    function handleLogoFallback(imgEl) {
      imgEl.style.display = 'none';
      const iconEl = document.getElementById('mainBrandLogoIcon');
      if (iconEl) iconEl.style.display = 'flex';
    }

    function uploadCustomLogo(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const base64 = e.target.result;
          localStorage.setItem('nc_boutique_logo', base64);
          const logoImg = document.getElementById('mainBrandLogoImg');
          const logoIcon = document.getElementById('mainBrandLogoIcon');
          logoImg.src = base64;
          logoImg.style.display = 'block';
          if (logoIcon) logoIcon.style.display = 'none';
          alert("🎉 অভিনন্দন! নিশা ক্রিয়েশনসের নিজস্ব লোগো সফলভাবে সেট হয়েছে।");
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function handleProductPhotoFile(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          uploadedProductImgBase64 = e.target.result;
          document.getElementById('new_img_preview').src = uploadedProductImgBase64;
          document.getElementById('new_img_preview_box').style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function addNewProductFromAdmin() {
      const title = document.getElementById('new_title').value.trim();
      const category = document.getElementById('new_category').value;
      const price = parseFloat(document.getElementById('new_price').value);
      const mrp = parseFloat(document.getElementById('new_mrp').value) || price * 1.5;
      const img = uploadedProductImgBase64 || document.getElementById('new_img').value.trim() || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600";
      const desc = document.getElementById('new_desc').value.trim() || "100% প্রিমিয়াম বুটিক কালেকশন।";

      if (!title || !price) {
        alert("দয়া করে নাম ও বিক্রয় মূল্য দিন!");
        return;
      }

      let pType = 'saree';
      if (['necklace', 'earrings', 'bangles'].includes(category)) pType = 'jewel';
      else if (category === 'kurti') pType = 'kurti';
      else if (category === 'bag') pType = 'bag';
      else if (category === 'perfume') pType = 'perfume';
      const newProd = {
        id: "NC-" + Math.floor(100 + Math.random() * 900),
        title: title,
        category: category,
        type: pType,
        price: price,
        mrp: mrp,
        upiOffer: Math.round(price * 0.95),
        rating: 4.8,
        reviews: 1,
        img: img,
        desc: desc
      };

      products.unshift(newProd);
      localStorage.setItem('nc_products', JSON.stringify(products));
      sanitizeBoutiqueRuntime();
    initBrandLogo();
    applyLanguage();
    loadAllProducts();
      renderCustomOfferBanner();
    renderReels();
    loadCustomerAccountHub();
      syncCheckoutWithProfile();

      alert("🎉 নতুন প্রোডাক্ট সফলভাবে লাইভ শপে যুক্ত হয়েছে!");
      showScreen('home');
    }

    function renderAdminOrders() {
      const container = document.getElementById('adminOrdersContainer');
      if (orders.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8;">কোনো কাস্টমার অর্ডার নেই।</div>`;
        return;
      }

      container.innerHTML = '';
      orders.forEach((o) => {
        const giftBadge = o.isGift ? '<span style="background:#fae8ff; color:#86198f; padding:2px 6px; border-radius:4px; font-size:0.68rem; font-weight:800;">🎁 গিফট র‍্যাপ</span>' : '';
        container.innerHTML += `
          <div style="border:1px solid #e2e8f0; border-radius:8px; padding:10px; margin-bottom:10px; background:#f8fafc;">
            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:0.85rem;">
              <span>#${o.id} - ${o.name} ${giftBadge}</span>
              <span style="color:var(--primary);">₹${o.total}</span>
            </div>
            <div style="font-size:0.75rem; color:#64748b; margin:2px 0;">📞 ${o.phone} | 📍 ${o.address}</div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
              <span style="font-size:0.72rem; font-weight:700;">স্ট্যাটাস:</span>
              <select onchange="updateOrderStatus('${o.id}', this.value)" style="flex:1; padding:4px 8px; border-radius:6px; font-size:0.75rem; font-weight:700;">
                <option value="Order Placed" ${o.status === 'Order Placed' ? 'selected' : ''}>Order Placed</option>
                <option value="Packed" ${o.status === 'Packed' ? 'selected' : ''}>Packed & Checked</option>
                <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered & Paid</option>
              </select>
            </div>
          </div>
        `;
      });
    }

    function updateOrderStatus(id, newStatus) {
      const ord = orders.find(o => o.id === id);
      if (ord) {
        ord.status = newStatus;
        localStorage.setItem('nc_orders', JSON.stringify(orders));
        alert(`অর্ডার #${id} এখন '${newStatus}' স্ট্যাটাসে আপডেট হয়েছে! কাস্টমার লাইভ দেখতে পাবে।`);
        renderOrders();
      }
    }
  
    // SIZE GUIDE MODAL CONTROLLERS
    function openSizeGuideModal() {
      const modal = document.getElementById('sizeGuideModal');
      if (!modal) return;
      let targetTab = 'saree';
      if (currentPdpProduct) {
        const eff = currentPdpProduct.effectiveSizeChart || currentPdpProduct.sizeChartType;
        if (eff === 'kids_frock') targetTab = 'frock';
        else if (eff === 'kurti') targetTab = 'kurti';
        else if (eff === 'palazzo') targetTab = 'palazzo';
        else if (eff === 'saree_blouse') targetTab = 'saree';
      }
      switchSizeGuideTab(targetTab);
      modal.style.display = 'flex';
    }

    function closeSizeGuideModal() {
      const modal = document.getElementById('sizeGuideModal');
      if (modal) modal.style.display = 'none';
    }

    function switchSizeGuideTab(tabName) {
      document.querySelectorAll('.sg-tab-btn').forEach(btn => {
        btn.style.background = '#e2e8f0';
        btn.style.color = '#334155';
      });
      const activeBtn = document.getElementById(`sgTabBtn-${tabName}`);
      if (activeBtn) {
        activeBtn.style.background = 'var(--primary)';
        activeBtn.style.color = '#fff';
      }
      document.querySelectorAll('.sg-content-pane').forEach(pane => {
        pane.style.display = 'none';
      });
      const targetPane = document.getElementById(`sgContent-${tabName}`);
      if (targetPane) targetPane.style.display = 'block';
    }

    // PRODUCT VIDEO MODAL CONTROLLERS
    function openProductVideoModal() {
      if (!currentPdpProduct || !currentPdpProduct.videoUrl) return;
      const modal = document.getElementById('productVideoModal');
      const titleEl = document.getElementById('pdpVideoTitle');
      const container = document.getElementById('pdpVideoContainer');
      if (titleEl) titleEl.textContent = currentPdpProduct.title;
      
      let vUrl = currentPdpProduct.videoUrl.trim();
      let embedHtml = '';
      if (vUrl.includes('youtube.com') || vUrl.includes('youtu.be')) {
        let vidId = '';
        if (vUrl.includes('shorts/')) {
          vidId = vUrl.split('shorts/')[1].split('?')[0];
        } else if (vUrl.includes('watch?v=')) {
          vidId = vUrl.split('watch?v=')[1].split('&')[0];
        } else if (vUrl.includes('youtu.be/')) {
          vidId = vUrl.split('youtu.be/')[1].split('?')[0];
        }
        if (vidId) {
          embedHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${vidId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:none;"></iframe>`;
        } else {
          embedHtml = `<iframe width="100%" height="100%" src="${vUrl}" frameborder="0" allowfullscreen></iframe>`;
        }
      } else {
        embedHtml = `<video src="${vUrl}" controls autoplay playsinline style="width:100%; height:100%; object-fit:contain;"></video>`;
      }
      if (container) container.innerHTML = embedHtml;
      if (modal) modal.style.display = 'flex';
    }

    function closeProductVideoModal() {
      const modal = document.getElementById('productVideoModal');
      const container = document.getElementById('pdpVideoContainer');
      if (container) container.innerHTML = '';
      if (modal) modal.style.display = 'none';
    }

    // ADMIN QUICK ACTIONS: TOGGLE SIZE CHART & EDIT VIDEO
    function adminChangeSizeChart(idx, newChart) {
      if (products[idx]) {
        products[idx].sizeChartType = newChart;
        localStorage.setItem('nc_products', JSON.stringify(products));
        const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
        localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));
        renderAdminDashboardLive();
      }
    }

    function adminEditVideoUrl(idx) {
      if (!products[idx]) return;
      const currentVal = products[idx].videoUrl || '';
      const updated = prompt("প্রোডাক্ট ভিডিও লিংক দিন (YouTube Shorts / Reels / MP4):", currentVal);
      if (updated !== null) {
        products[idx].videoUrl = updated.trim();
        localStorage.setItem('nc_products', JSON.stringify(products));
        const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
        localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));
        renderAdminDashboardLive();
      }
    }


    function selectPdpColorVariant(imgSrc, colorName, el) {
      selectedPdpColor = colorName;
      selectedPdpColorImg = imgSrc;
      const mainImg = document.getElementById('pdpMainImg');
      if (mainImg) mainImg.src = imgSrc;
      const cvBadge = document.getElementById('pdpSelectedColorNameBadge');
      if (cvBadge) cvBadge.textContent = colorName;
      
      const strip = document.getElementById('pdpColorVariantsStrip');
      if (strip) {
        strip.querySelectorAll('.pdp-color-card').forEach(card => {
          card.style.border = '1.5px solid #cbd5e1';
          card.style.boxShadow = 'none';
        });
      }
      if (el) {
        el.style.border = '2px solid #0f172a';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)';
      }
    }

    function adminQuickEditSizes(idx) {
      if (!products[idx]) return;
      const cur = (products[idx].availableSizes || []).join(', ') || 'S, M, L, XL';
      const updated = prompt("স্টকে কোন কোন সাইজ আছে লিখুন (কমা দিয়ে আলাদা করুন, যেমন: S, M, XL, XXL বা 2-3Y, 4-5Y):", cur);
      if (updated !== null) {
        const arr = updated.split(',').map(s => s.trim()).filter(Boolean);
        products[idx].availableSizes = arr.length > 0 ? arr : ['Free Size'];
        localStorage.setItem('nc_products', JSON.stringify(products));
        const customOnly = products.filter(p => !p.id.startsWith('NC-10'));
        localStorage.setItem('nc_custom_products', JSON.stringify(customOnly));
        renderAdminDashboardLive();
      }
    }


    // ================= RETURN & CANCELLATION CONTROLLERS =================
    function getDaysSinceDelivered(ord) {
      if (ord.deliveredTimestamp) {
        return Math.floor((Date.now() - ord.deliveredTimestamp) / (1000 * 60 * 60 * 24));
      }
      if (ord.date) {
        try {
          const parts = ord.date.split(',')[0].trim().split('/');
          if (parts.length === 3) {
            const d = parseInt(parts[0]);
            const m = parseInt(parts[1]) - 1;
            const y = parseInt(parts[2]);
            const t = new Date(y, m, d).getTime();
            if (!isNaN(t)) return Math.floor((Date.now() - t) / (1000 * 60 * 60 * 24));
          }
        } catch(e) {}
      }
      return 0;
    }

        function handleRetTypeChange(isExchange) {
      const sizeBox = document.getElementById("retExchangeSizeBox");
      const btn = document.getElementById("btnGoToStep2");
      if (sizeBox) sizeBox.style.display = isExchange ? "block" : "none";
      if (btn) btn.innerHTML = isExchange ? "এক্সচেঞ্জ আবেদন জমা দিন &rarr;" : "পরবর্তী: ব্যাংক বিবরণ দিন &rarr;";
    }

    function toggleExchangeSizeOption(isExchange) {
      handleRetTypeChange(isExchange);
    }

    function openReturnModal(orderId) {
      const orderList = JSON.parse(localStorage.getItem("nc_orders") || "[]");
      const ord = orderList.find(o => o.id === orderId);
      if (!ord) return;

      // 7-DAY RETURN POLICY CHECK
      const daysPassed = getDaysSinceDelivered(ord);
      if (daysPassed > 7) {
        alert("🔒 দুঃখিত! এই অর্ডারটি ডেলিভারির 7 দিন অতিক্রান্ত হয়ে গেছে (" + daysPassed + " দিন পূর্বে ডেলিভারি হয়েছে)।\nনিশা ক্রিয়েশনসের নিয়ম অনুযায়ী 7 দিন পার হয়ে গেলে আর রিটার্ন গ্রহণ করা সম্ভব নয়।");
        return;
      }

      document.getElementById("retOrderId").value = orderId;
      document.getElementById("retModalOrderInfo").textContent = `অর্ডার #${ord.id} • ${ord.date || ""} (7 দিনের মধ্যে)`;
      
      const previewBox = document.getElementById("retProdPreview");
      const firstItem = ord.items && ord.items[0] ? ord.items[0] : {};
      if (previewBox) {
        previewBox.innerHTML = `
          <img src="${firstItem.img || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120"}" style="width:50px; height:50px; object-fit:cover; border-radius:8px; border:1px solid #cbd5e1;">
          <div style="flex:1;">
            <div style="font-weight:800; font-size:0.8rem; color:#0f172a;">${firstItem.title || "বুটিক পোশাক"}</div>
            <div style="font-size:0.7rem; color:#64748b; margin-top:2px;">
              বর্তমান সাইজ: <strong>${firstItem.selectedSize || "Free Size"}</strong> ${firstItem.selectedColor ? `• কালার: ${firstItem.selectedColor}` : ""} • ₹${ord.total}
            </div>
          </div>
        `;
      }
      goToReturnStep1();
      handleRetTypeChange(true);
      const exRadio = document.querySelector('input[name="retActionType"][value="Exchange"]');
      if (exRadio) exRadio.checked = true;

      document.getElementById("returnRequestModal").style.display = "flex";
    }

    function closeReturnModal() {
      document.getElementById("returnRequestModal").style.display = "none";
    }

    function goToReturnStep1() {
      document.getElementById("retStep1Container").style.display = "block";
      document.getElementById("retStep2Container").style.display = "none";
      document.getElementById("retModalStepTitle").textContent = "ধাপ 1/2: রিটার্ন বা পরিবর্তনের কারণ";
    }

    function goToReturnStep2() {
      const actType = document.querySelector('input[name="retActionType"]:checked').value;
      if (actType === "Exchange") {
        submitReturnRequest();
        return;
      }
      // Switch to Step 2 for Refund (Bank details)
      document.getElementById("retStep1Container").style.display = "none";
      document.getElementById("retStep2Container").style.display = "block";
      document.getElementById("retModalStepTitle").textContent = "ধাপ 2/2: রিফান্ডের ব্যাংক ও UPI বিবরণ";
    }

    function submitReturnRequest() {
      const orderId = document.getElementById("retOrderId").value;
      const actType = document.querySelector('input[name="retActionType"]:checked').value;
      const reason = document.querySelector('input[name="retReasonOpt"]:checked').value;
      const customNote = document.getElementById("retCustomNote").value.trim();
      const newSize = actType === "Exchange" ? document.getElementById("retNewSizeSelect").value : "";

      let orderList = JSON.parse(localStorage.getItem("nc_orders") || "[]");
      const idx = orderList.findIndex(o => o.id === orderId);
      if (idx === -1) return;

      // Bank Details validation if Refund
      let bankInfo = null;
      if (actType === "Refund") {
        const acc = document.getElementById("ret_bank_acc") ? document.getElementById("ret_bank_acc").value.trim() : "";
        const ifsc = document.getElementById("ret_bank_ifsc") ? document.getElementById("ret_bank_ifsc").value.trim().toUpperCase() : "";
        const holder = document.getElementById("ret_bank_holder") ? document.getElementById("ret_bank_holder").value.trim() : "";
        const upi = document.getElementById("ret_bank_upi") ? document.getElementById("ret_bank_upi").value.trim() : "";

        if ((!acc || !ifsc) && !upi) {
          alert("📢 ক্যাশ অর্ডারে নগদ ক্যাশ ফেরত হয় না। আপনার রিফান্ডের টাকা ব্যাংক একাউন্টে পাঠাতে দয়া করে আপনার ব্যাংক একাউন্ট নম্বর ও IFSC কোড অথবা UPI ID পূরণ করুন!");
          return;
        }
        bankInfo = { acc: acc, ifsc: ifsc, holder: holder, upi: upi };
      }

      orderList[idx].returnStatus = "Requested";
      orderList[idx].returnType = actType;
      orderList[idx].returnReason = reason;
      orderList[idx].returnDetails = customNote;
      orderList[idx].returnExchangeSize = newSize;
      orderList[idx].bankDetails = bankInfo;
      orderList[idx].returnDate = new Date().toLocaleDateString("bn-IN");

      localStorage.setItem("nc_orders", JSON.stringify(orderList));
      orders = orderList;

      alert(`✅ আপনার ${actType === "Exchange" ? "সাইজ পরিবর্তন (Exchange)" : "রিটার্ন"} আবেদন সফলভাবে গ্রহণ করা হয়েছে!\nব্যাংক বিবরণ সংরক্ষিত হয়েছে এবং তথ্য সরাসরি অ্যাপের অ্যাডমিন প্যানেলে জমা পড়েছে।\nআমতায় আমাদের ডেলিভারি টিম শীঘ্রই আপনার সাথে যোগাযোগ করে প্রোডাক্ট পিকআপ করবে।`);
      closeReturnModal();
      renderOrders();
      renderAdminDashboardLive();
    }

    function openCancelModal(orderId) {
      document.getElementById("cancelOrderId").value = orderId;
      document.getElementById("cancelModalOrderInfo").textContent = `অর্ডার #${orderId}`;
      document.getElementById("cancelCustomNote").value = "";
      document.getElementById("cancelOrderModal").style.display = "flex";
    }

    function closeCancelModal() {
      document.getElementById("cancelOrderModal").style.display = "none";
    }

    function confirmCancelOrder() {
      const orderId = document.getElementById("cancelOrderId").value;
      const reason = document.querySelector('input[name="cancelReasonOpt"]:checked').value;
      const note = document.getElementById("cancelCustomNote").value.trim();

      let orderList = JSON.parse(localStorage.getItem("nc_orders") || "[]");
      const idx = orderList.findIndex(o => o.id === orderId);
      if (idx === -1) return;

      const targetOrder = orderList[idx];
      targetOrder.status = "Cancelled";
      targetOrder.cancelReason = reason;
      targetOrder.cancelDetails = note;
      targetOrder.cancelledDate = new Date().toLocaleDateString("bn-IN");

      // RESTORE STOCK: Add back item quantities to products
      if (targetOrder.items && targetOrder.items.length > 0) {
        targetOrder.items.forEach(it => {
          const p = products.find(prod => prod.id === it.id);
          if (p) {
            p.stock = (p.stock || 0) + (it.qty || 1);
            p.inStock = true;
          }
        });
        localStorage.setItem("nc_products", JSON.stringify(products));
      }

      localStorage.setItem("nc_orders", JSON.stringify(orderList));
      orders = orderList;

      alert(`❌ অর্ডার #${orderId} সফলভাবে বাতিল করা হয়েছে এবং পণ্যের স্টক ইনভেন্টরিতে রিস্টোর হয়েছে।`);
      closeCancelModal();
      renderOrders();
      renderAdminDashboardLive();
    }


    // PROMO CODE MANAGER & BANK COPY
    function adminAddPromoCode() {
      const codeInp = document.getElementById('newPromoCodeInp');
      const discInp = document.getElementById('newPromoDiscountInp');
      if (!codeInp || !discInp) return;
      const code = codeInp.value.trim().toUpperCase();
      const disc = parseFloat(discInp.value);
      if (!code || isNaN(disc) || disc <= 0) {
        alert("দয়া করে সঠিক প্রমো কোড ও ছাড়ের টাকার পরিমাণ (₹) লিখুন!");
        return;
      }
      let coupons = JSON.parse(localStorage.getItem('nc_coupons') || '[{"code":"NISHA50","discount":50,"active":true},{"code":"PUJA100","discount":100,"active":true}]');
      if (coupons.some(c => c.code === code)) {
        alert('"' + code + '" প্রমো কোডটি ইতিমধ্যে রয়েছে!');
        return;
      }
      coupons.push({ code: code, discount: disc, active: true });
      localStorage.setItem('nc_coupons', JSON.stringify(coupons));
      codeInp.value = '';
      discInp.value = '';
      alert('🎉 প্রমো কোড "' + code + '" (ছাড় ₹' + disc + ') সফলভাবে চালু হয়েছে! কাস্টমার চেকআউটে এটি ব্যবহার করতে পারবেন।');
      renderAdminDashboardLive();
    }

    function adminDeletePromoCode(code) {
      if (!confirm('আপনি কি "' + code + '" প্রমো কোডটি মুছে ফেলতে চান?')) return;
      let coupons = JSON.parse(localStorage.getItem('nc_coupons') || '[]');
      coupons = coupons.filter(c => c.code !== code);
      localStorage.setItem('nc_coupons', JSON.stringify(coupons));
      renderAdminDashboardLive();
    }

    function copyBankDetails(acc, ifsc, holder, upi) {
      const text = 'ব্যাংক একাউন্ট: ' + acc + '\nIFSC কোড: ' + ifsc + '\nএকাউন্ট হোল্ডার: ' + holder + '\nUPI ID: ' + (upi || 'নেই');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          alert("📋 ব্যাংক বিবরণ ক্লিপবোর্ডে কপি হয়েছে! PhonePe বা GPay-তে পেস্ট করে রিফান্ডের টাকা পাঠিয়ে দিন।");
        });
      } else {
        alert("ব্যাংক বিবরণ:\n" + text);
      }
    }


    // ADMIN ORDERS FILTER CONTROLLER


// ==========================================

// ==========================================
// CLEAN DIRECT VOICE SEARCH (Zero Alerts!)
// ==========================================
function triggerDirectVoiceSearch() {
  const searchInput = document.getElementById('searchInput') || document.getElementById('ncSearchInput');
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    if (typeof openBoutiqueSearch === 'function') openBoutiqueSearch();
    return;
  }
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'bn-IN';
    
    if (searchInput) {
      searchInput.placeholder = '🎙️ শুনছি... বলুন...';
    }

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      if (searchInput) {
        searchInput.value = transcript;
        searchInput.placeholder = 'শাড়ির নাম, জামদানি বা গহনা খুঁজুন...';
      }
      if (typeof executeBoutiqueSearch === 'function') {
        executeBoutiqueSearch(transcript);
      } else if (typeof handleGlobalSearch === 'function') {
        handleGlobalSearch(transcript);
      }
    };

    recognition.onerror = function() {
      if (searchInput) {
        searchInput.placeholder = 'শাড়ির নাম, জামদানি বা গহনা খুঁজুন...';
      }
    };

    recognition.onend = function() {
      if (searchInput) {
        searchInput.placeholder = 'শাড়ির নাম, জামদানি বা গহনা খুঁজুন...';
      }
    };

    recognition.start();
  } catch(e) {
    if (typeof openBoutiqueSearch === 'function') openBoutiqueSearch();
  }
}


// =========================================================================
// 🌟 1. DYNAMIC AUTO-SLIDING BANNER CAROUSEL SYSTEM (Flipkart / Amazon স্টাইল)
// পরপর স্বয়ংক্রিয়ভাবে নিজে থেকেই স্লাইড হবে, ডটস ইন্ডিকেটর ও সোয়াইপ সহ
// মালিক অ্যাডমিন প্যানেল থেকে যখন ইচ্ছা নতুন ব্যানার বানাতে বা বদলাতে পারবেন।
// =========================================================================
var currentBannerIndex = 0;
let bannerAutoSlideTimer = null;
let touchStartX = 0;
let touchEndX = 0;

function loadAndRenderBanners() {
  const track = document.getElementById('bannerCarouselTrack');
  const dotsContainer = document.getElementById('bannerCarouselDots');
  if (!track || !dotsContainer) return;

  let bannerList = [];
  try {
    const stored = localStorage.getItem('nc_banners');
    if (stored) {
      bannerList = JSON.parse(stored);
    }
  } catch(e) {}

  if (!Array.isArray(bannerList) || bannerList.length === 0) {
    if (typeof DEFAULT_BANNERS !== 'undefined' && Array.isArray(DEFAULT_BANNERS)) {
      bannerList = DEFAULT_BANNERS;
    } else {
      bannerList = [
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
          subtitle: "মাত্র ₹499 থেকে শুরু • আধুনিক ফিটিং ও ফ্যাব্রিক",
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
          subtitle: "ছোট্ট সোনাদের জন্য আকর্ষণীয় কালারফুল ফ্রক",
          badge: "👧 স্পেশাল কিডস কালেকশন",
          image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80",
          bgGradient: "linear-gradient(135deg, #581c87, #7c3aed, #ec4899)",
          targetCategory: "girls",
          active: true
        }
      ];
      localStorage.setItem('nc_banners', JSON.stringify(bannerList));
    }
  }

  const activeBanners = bannerList.filter(b => b.active !== false);
  if (activeBanners.length === 0) {
    const w = document.getElementById('homeBannerCarouselWrapper'); if (w) w.style.display = 'none';
    return;
  }
  const w = document.getElementById('homeBannerCarouselWrapper'); if (w) w.style.display = 'block';

  track.innerHTML = '';
  dotsContainer.innerHTML = '';

  activeBanners.forEach((b, idx) => {
    const slide = document.createElement('div');
    slide.className = 'banner-carousel-slide';
    slide.style.background = b.bgGradient || 'linear-gradient(135deg, #701a75, #9333ea, #db2777)';
    slide.onclick = () => onBannerClick(b.targetCategory);

    slide.innerHTML = `
      <div class="banner-slide-content">
        <div class="banner-badge-tag">${b.badge || '✨ স্পেশাল অফার'}</div>
        <div class="banner-main-title">${b.title || 'নিশা ক্রিয়েশনস বুটিক'}</div>
        <div class="banner-sub-text">${b.subtitle || 'আমতায় সহজ রিটার্ন ও হোম ডেলিভারি'}</div>
        <div class="banner-cta-btn">
          <span>কালেকশন দেখুন</span> <i class="fa-solid fa-chevron-right" style="font-size:0.65rem;"></i>
        </div>
      </div>
      <div class="banner-slide-image-wrap">
        <img class="banner-slide-img" src="${b.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'}" alt="${b.title || 'Banner'}">
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
    dot.onclick = (e) => {
      e.stopPropagation();
      goToBannerSlide(idx);
    };
    dotsContainer.appendChild(dot);
  });

  currentBannerIndex = 0;
  track.style.transform = 'translateX(0%)';

  // Attach touch swipe support
  const viewport = document.getElementById('bannerCarouselViewport');
  if (viewport) {
    viewport.ontouchstart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseBannerAutoSlide();
    };
    viewport.ontouchend = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleBannerSwipe();
      startBannerAutoSlide();
    };
    viewport.onmouseenter = pauseBannerAutoSlide;
    viewport.onmouseleave = startBannerAutoSlide;
  }

  startBannerAutoSlide();
}

function handleBannerSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) nextBannerSlide();
    else prevBannerSlide();
  }
}

function goToBannerSlide(idx) {
  const track = document.getElementById('bannerCarouselTrack');
  const dots = document.querySelectorAll('#bannerCarouselDots .carousel-dot');
  if (!track || dots.length === 0) return;

  const total = dots.length;
  currentBannerIndex = (idx + total) % total;

  track.style.transform = `translateX(-${currentBannerIndex * 100}%)`;

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === currentBannerIndex);
  });

  startBannerAutoSlide(); // Reset interval
}

function nextBannerSlide() {
  goToBannerSlide(currentBannerIndex + 1);
}

function prevBannerSlide() {
  goToBannerSlide(currentBannerIndex - 1);
}

function startBannerAutoSlide() {
  pauseBannerAutoSlide();
  const dots = document.querySelectorAll('#bannerCarouselDots .carousel-dot');
  if (dots.length > 1) {
    bannerAutoSlideTimer = setInterval(nextBannerSlide, 3500);
  }
}

function pauseBannerAutoSlide() {
  if (bannerAutoSlideTimer) {
    clearInterval(bannerAutoSlideTimer);
    bannerAutoSlideTimer = null;
  }
}

function onBannerClick(targetCategory) {
  if (targetCategory && targetCategory !== 'all') {
    filterByUnifiedCat(targetCategory);
  } else {
    filterByUnifiedCat('all');
  }
  scrollToProducts();
}

function scrollToProducts() {
  const el = document.getElementById('productGridContainer') || document.querySelector('.filter-bar');
  if (el) {
    if (typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


// =========================================================================
// 🌟 2. SORT MODAL (relevance, new, price-asc, price-desc, rating)
// =========================================================================
function openSortModal() {
  const modal = document.getElementById('sortModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
  }
}

function closeSortModal() {
  const modal = document.getElementById('sortModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
}

function closeSortModalOnOutside(e) {
  if (e && e.target && e.target.id === 'sortModal') {
    closeSortModal();
  }
}

function applySortOption(sortType, label) {
  document.querySelectorAll('.sort-option-row').forEach(row => row.classList.remove('active'));
  const row = document.getElementById(`sort-opt-${sortType}`);
  if (row) row.classList.add('active');

  const lbl = document.getElementById('sortBtnLabel');
  if (lbl && label) lbl.textContent = label.split('(')[0].trim();

  closeSortModal();

  let sorted = [...products];
  if (sortType === 'price-asc') {
    sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (sortType === 'price-desc') {
    sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (sortType === 'rating') {
    sorted.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
  } else if (sortType === 'new') {
    sorted.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
  } else {
    // relevance: natural catalog order
    sorted = [...products];
  }
  renderProducts(sorted);
}


// =========================================================================
// 🌟 3. GENDER & ADVANCED FILTERS
// =========================================================================
function filterByGender(gender) {
  if (gender === 'women') {
    filterByUnifiedCat('women');
  } else if (gender === 'girls') {
    filterByUnifiedCat('girls');
  }
  scrollToProducts();
}

function openAdvancedFilterModal() {
  const modal = document.getElementById('advancedFilterModal');
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
  }
}

function closeAdvancedFilterModal() {
  const modal = document.getElementById('advancedFilterModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('active');
  }
}

function closeAdvancedFilterOnOutside(e) {
  if (e && e.target && e.target.id === 'advancedFilterModal') {
    closeAdvancedFilterModal();
  }
}

function switchFilterTab(tabKey) {
  document.querySelectorAll('.filter-tab-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.filter-options-panel').forEach(p => p.style.display = 'none');

  const tab = document.getElementById(`ftab-${tabKey}`);
  const panel = document.getElementById(`fpanel-${tabKey}`);
  if (tab) tab.classList.add('active');
  if (panel) panel.style.display = 'block';
}

function updateFilterBadgeCount() {
  const tabs = ['fabric', 'color', 'price', 'occasion'];
  let grandTotal = 0;

  tabs.forEach(t => {
    const panel = document.getElementById(`fpanel-${t}`);
    const badge = document.getElementById(`fbadge-${t}`);
    if (panel && badge) {
      const checkedCount = panel.querySelectorAll('input[type="checkbox"]:checked').length;
      if (checkedCount > 0) {
        badge.textContent = checkedCount;
        badge.style.display = 'inline-block';
        grandTotal += checkedCount;
      } else {
        badge.style.display = 'none';
      }
    }
  });

  const activeBadge = document.getElementById('activeFilterBadge');
  if (activeBadge) {
    if (grandTotal > 0) {
      activeBadge.textContent = grandTotal;
      activeBadge.style.display = 'inline-block';
    } else {
      activeBadge.style.display = 'none';
    }
  }
}

function clearAllAdvancedFilters() {
  document.querySelectorAll('.filter-options-panel input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateFilterBadgeCount();
  renderProducts(products);
  closeAdvancedFilterModal();
}

function applyAdvancedFilters() {
  const checkedBoxes = Array.from(document.querySelectorAll('.filter-options-panel input[type="checkbox"]:checked'));
  if (checkedBoxes.length === 0) {
    renderProducts(products);
    closeAdvancedFilterModal();
    return;
  }

  const selectedValues = checkedBoxes.map(cb => cb.value.toLowerCase());

  const filtered = products.filter(p => {
    const text = (p.title + ' ' + (p.category || '') + ' ' + (p.desc || '') + ' ' + (p.material || '') + ' ' + (p.color || '')).toLowerCase();
    return selectedValues.some(val => text.includes(val));
  });

  renderProducts(filtered);
  closeAdvancedFilterModal();
  scrollToProducts();
}


// =========================================================================
// 🌟 4. CATEGORIES SCREEN SIDEBAR & CARDS (selectCategoryTab)
// =========================================================================
function selectCategoryTab(tabKey) {
  document.querySelectorAll('.cat-sidebar-item').forEach(el => el.classList.remove('active'));
  const btn = document.getElementById(`sidebar-${tabKey}`);
  if (btn) btn.classList.add('active');

  const contentArea = document.getElementById('catContentArea');
  if (!contentArea) return;

  const subcats = {
    popular: [
      { name: "ঢাকাই জামদানি", cat: "jamdani", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=70" },
      { name: "সফট সিল্ক ও কাতান", cat: "silk", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=70" },
      { name: "ট্রেন্ডি কুর্তি ও গাউন", cat: "kurti", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=70" },
      { name: "বাচ্চাদের ফ্রক", cat: "girls", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&auto=format&fit=crop&q=70" },
      { name: "ব্রাইডাল জুয়েলারি", cat: "jewel", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=70" }
    ],
    saree_kurti: [
      { name: "খাঁটি ঢাকাই জামদানি", cat: "jamdani", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=70" },
      { name: "সফট সিল্ক শাড়ি", cat: "silk", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=70" },
      { name: "শান্তিপুরী সুতি তাঁত", cat: "tant", img: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=300&auto=format&fit=crop&q=70" },
      { name: "ডিজাইনার কুর্তি সেট", cat: "kurti", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=70" }
    ],
    jewellery: [
      { name: "চোকার ও নেকলেস সেট", cat: "jewel", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=70" },
      { name: "গোল্ড প্লেটেড বালা ও চুড়ি", cat: "bangles", img: "https://images.unsplash.com/photo-1611591475837-7f9999557a66?w=300&auto=format&fit=crop&q=70" }
    ],
    bags: [
      { name: "বুটিক হ্যান্ডব্যাগ ও ক্লাচ", cat: "all", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=70" }
    ],
    perfume: [
      { name: "রয়েল আতর ও বডি মিস্ট", cat: "all", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&auto=format&fit=crop&q=70" }
    ]
  };

  const currentList = subcats[tabKey] || subcats.popular;
  let html = `
    <div style="padding:14px;">
      <h3 style="font-size:0.95rem; font-weight:800; color:#0f172a; margin-bottom:12px;">কালেকশন বাছুন</h3>
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px;">
  `;
  currentList.forEach(item => {
    html += `
      <div onclick="showScreen('home'); filterByUnifiedCat('${item.cat}');" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.04); text-align:center;">
        <img src="${item.img}" style="width:100%; height:110px; object-fit:cover;">
        <div style="padding:8px 6px; font-size:0.78rem; font-weight:700; color:#0f172a;">${item.name}</div>
      </div>
    `;
  });
  html += `</div></div>`;
  contentArea.innerHTML = html;
}


// =========================================================================
// 🌟 5. CHECKOUT FLOW, PAYMENT & ORDER SUBMISSION
// =========================================================================
var selectedPayMethod = 'UPI';

function renderCheckoutStep1() {
  const countSpan = document.getElementById('cartModalCount');
  const list = document.getElementById('cartStep1ItemsList') || document.getElementById('cartItemsList');
  const billTotal = document.getElementById('billStep1Total');
  const billProdTotal = document.getElementById('billStep1ProdTotal');

  if (countSpan) countSpan.textContent = cart.length;

  if (list) {
    if (cart.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:#94a3b8; font-size:0.85rem;">
          <i class="fa-solid fa-bag-shopping" style="font-size:2.2rem; margin-bottom:10px; color:#cbd5e1;"></i>
          <div style="font-weight:700;">আপনার শপিং ব্যাগ ফাঁকা!</div>
          <div style="font-size:0.75rem; margin-top:4px;">হোমপেজ থেকে শাড়ি বা পোশাক ব্যাগে যোগ করুন</div>
        </div>
      `;
    } else {
      let html = '';
      cart.forEach((item, idx) => {
        html += `
          <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #f1f5f9;">
            <img src="${item.img || ''}" style="width:52px; height:60px; object-fit:cover; border-radius:8px; border:1px solid #e2e8f0;">
            <div style="flex:1;">
              <div style="font-size:0.82rem; font-weight:700; color:#0f172a; line-height:1.3;">${item.title || ''}</div>
              <div style="font-size:0.72rem; color:#64748b; margin-top:2px;">সাইজ: <strong>${item.size || 'Free Size'}</strong> • কালার: <strong>${item.color || 'ডিফল্ট'}</strong></div>
              <div style="font-size:0.85rem; font-weight:800; color:var(--primary); margin-top:3px;">₹${item.price || 0}</div>
            </div>
            <button onclick="removeCartItem(${idx})" style="background:#fee2e2; color:#ef4444; border:none; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">
              <i class="fa-solid fa-trash-can" style="font-size:0.8rem;"></i>
            </button>
          </div>
        `;
      });
      list.innerHTML = html;
    }
  }

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  if (billProdTotal) billProdTotal.textContent = `₹${total}`;
  if (billTotal) billTotal.textContent = `₹${total}`;
}

function goToCheckoutStep1() {
  const step1 = document.getElementById('checkoutStep1View');
  const step2 = document.getElementById('checkoutStep2View');
  const ind1 = document.getElementById('stepIndicator1');
  const ind2 = document.getElementById('stepIndicator2');

  if (step1) step1.style.display = 'block';
  if (step2) step2.style.display = 'none';
  if (ind1) ind1.classList.add('active');
  if (ind2) ind2.classList.remove('active');

  renderCheckoutStep1();
}

function goToCheckoutStep2() {
  if (cart.length === 0) {
    alert("আপনার শপিং ব্যাগ ফাঁকা! আগে প্রোডাক্ট যোগ করুন।");
    return;
  }

  const nameEl = document.getElementById('cust_name');
  const phoneEl = document.getElementById('cust_phone');
  const addrEl = document.getElementById('cust_addr') || document.getElementById('cust_address');
  const pinEl = document.getElementById('cust_pincode');

  const nameVal = nameEl ? nameEl.value.trim() : '';
  const phoneVal = phoneEl ? phoneEl.value.trim() : '';
  const addrVal = addrEl ? addrEl.value.trim() : '';
  const pinVal = (pinEl && pinEl.value.trim()) ? pinEl.value.trim() : (localStorage.getItem('nc_cust_pincode') || '711401');

  const savedName = localStorage.getItem('nc_cust_name') || '';
  const savedPhone = localStorage.getItem('nc_cust_phone') || '';
  const savedAddr = localStorage.getItem('nc_cust_addr') || '';

  const finalName = nameVal || savedName;
  const finalPhone = phoneVal || savedPhone;
  const finalAddr = addrVal || savedAddr;

  if (!finalName || !finalPhone || !finalAddr) {
    alert("দয়া করে আপনার নাম, মোবাইল নম্বর এবং ডেলিভারি ঠিকানা পূরণ করুন!");
    const form = document.getElementById('inlineAddressEditForm');
    if (form) form.style.display = 'block';
    return;
  }

  const dName = document.getElementById('displayCustName');
  const dPhone = document.getElementById('displayCustPhone');
  const dAddr = document.getElementById('displayCustAddr');
  if (dName) dName.textContent = finalName;
  if (dPhone) dPhone.textContent = '📞 ' + finalPhone;
  if (dAddr) dAddr.textContent = '📍 ' + finalAddr + ' - ' + pinVal;

  localStorage.setItem('nc_cust_name', finalName);
  localStorage.setItem('nc_cust_phone', finalPhone);
  localStorage.setItem('nc_cust_addr', finalAddr);
  localStorage.setItem('nc_cust_pincode', pinVal);

  const step1 = document.getElementById('checkoutStep1View');
  const step2 = document.getElementById('checkoutStep2View');
  const ind1 = document.getElementById('stepIndicator1');
  const ind2 = document.getElementById('stepIndicator2');

  if (step1) step1.style.display = 'none';
  if (step2) step2.style.display = 'block';
  if (ind1) ind1.classList.remove('active');
  if (ind2) ind2.classList.add('active');

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const payableBase = Math.max(0, rawSubtotal - (appliedCoinDiscountRupees || 0));
  const codTotal = payableBase;
  const upiTotal = Math.max(0, payableBase - 38);

  const payCodAmount = document.getElementById('payCodFinalAmount');
  const payUpiAmount = document.getElementById('payUpiFinalAmount');
  const payUpiStriked = document.getElementById('payUpiStrikedAmount');
  const upiLink = document.getElementById('upiDirectPayLink');

  if (payCodAmount) payCodAmount.textContent = `₹${codTotal}`;
  if (payUpiAmount) payUpiAmount.textContent = `₹${upiTotal}`;
  if (payUpiStriked) payUpiStriked.textContent = `₹${codTotal}`;
    const officialUpiId = localStorage.getItem('nc_official_upi_id') || '9239413517-1@naviaxis';
  const payeeName = 'Nisha Singh';
  if (upiLink) {
    upiLink.href = `upi://pay?pa=${encodeURIComponent(officialUpiId)}&pn=${encodeURIComponent(payeeName)}&am=${upiTotal}&cu=INR&tn=Nisha%20Creations%20Order`;
  }
  const qrImg = document.getElementById('cartDynamicUpiQrImg');
  if (qrImg) {
    const upiUri = `upi://pay?pa=${officialUpiId}&pn=${encodeURIComponent(payeeName)}&am=${upiTotal}&cu=INR&tn=Nisha%20Creations%20Order`;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}`;
  }
  const activeUpiDisp = document.getElementById('activeUpiIdDisplay');
  if (activeUpiDisp) activeUpiDisp.textContent = officialUpiId;

  selectPaymentMethod(selectedPayMethod || 'UPI');
}

function toggleAddressEdit() {
  const form = document.getElementById('inlineAddressEditForm');
  if (form) {
    form.style.display = (form.style.display === 'none' || !form.style.display) ? 'block' : 'none';
  }
}

function saveAddressInline() {
  const nameEl = document.getElementById('cust_name');
  const phoneEl = document.getElementById('cust_phone');
  const addrEl = document.getElementById('cust_addr') || document.getElementById('cust_address');
  const pinEl = document.getElementById('cust_pincode');

  const nameVal = nameEl ? nameEl.value.trim() : '';
  const phoneVal = phoneEl ? phoneEl.value.trim() : '';
  const addrVal = addrEl ? addrEl.value.trim() : '';
  const pinVal = (pinEl && pinEl.value.trim()) ? pinEl.value.trim() : (localStorage.getItem('nc_cust_pincode') || '711401');

  if (!nameVal || !phoneVal || !addrVal) {
    alert("অনুগ্রহ করে নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন!");
    return;
  }

  const dName = document.getElementById('displayCustName');
  const dPhone = document.getElementById('displayCustPhone');
  const dAddr = document.getElementById('displayCustAddr');

  if (dName) dName.textContent = nameVal;
  if (dPhone) dPhone.textContent = '📞 ' + phoneVal;
  if (dAddr) dAddr.textContent = '📍 ' + addrVal + ' - ' + pinVal;

  localStorage.setItem('nc_cust_name', nameVal);
  localStorage.setItem('nc_cust_phone', phoneVal);
  localStorage.setItem('nc_cust_addr', addrVal);
  localStorage.setItem('nc_cust_pincode', pinVal);

  const form = document.getElementById('inlineAddressEditForm');
  if (form) form.style.display = 'none';
}

function detectCheckoutGpsLocation() {
  const addrEl = document.getElementById('cust_address');
  const pinEl = document.getElementById('cust_pincode');
  if (addrEl) addrEl.value = 'আমতা চাঁদনী ভগবতীর মোড়, রাণাপাড়া, আমতা';
  if (pinEl) pinEl.value = '711401';
  alert("📍 আমতা লোকেশন স্বয়ংক্রিয়ভাবে সেট করা হয়েছে!");
}

function submitFinalOrder() {
  if (cart.length === 0) {
    alert("আপনার শপিং ব্যাগ ফাঁকা!");
    return;
  }

  const name = localStorage.getItem('nc_cust_name') || document.getElementById('cust_name')?.value?.trim() || 'সম্মানীয় গ্রাহক';
  const phone = localStorage.getItem('nc_cust_phone') || document.getElementById('cust_phone')?.value?.trim() || '9239413517';
  const addr = localStorage.getItem('nc_cust_addr') || document.getElementById('cust_addr')?.value?.trim() || document.getElementById('cust_address')?.value?.trim() || 'আমতা, হাওড়া';
  const pin = localStorage.getItem('nc_cust_pincode') || document.getElementById('cust_pincode')?.value?.trim() || '711401';

  const orderId = "NC-" + Math.floor(1000 + Math.random() * 9000);
  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const payableBase = Math.max(0, rawSubtotal - (appliedCoinDiscountRupees || 0));

  const isUpi = (selectedPayMethod === 'UPI');
  const finalTotal = isUpi ? Math.max(0, payableBase - 38) : payableBase;
  const onlineSavings = isUpi ? 38 : 0;
  const totalSavings = onlineSavings + (appliedCoinDiscountRupees || 0);

  const dateStr = new Date().toLocaleDateString('bn-IN') + ", " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    date: dateStr,
    name: name,
    customerName: name,
    phone: phone,
    customerPhone: phone,
    address: `${addr}, আমতা - ${pin}`,
    pincode: pin,
    items: [...cart],
    total: finalTotal,
    totalAmount: finalTotal,
    rawSubtotal: rawSubtotal,
    coinsUsed: appliedCoinsCount || 0,
    coinDiscount: appliedCoinDiscountRupees || 0,
    savings: totalSavings,
    paymentMode: isUpi ? 'UPI' : 'COD',
    paymentMethod: isUpi ? 'অনলাইন UPI' : 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
    status: 'Order Placed',
    warehouseStatus: 'Pending Packing',
    binLocation: cart[0]?.binLocation || 'র‍্যাক A-01 (বুটিক জোন)'
  };

  // Deduct coins if used
  if (appliedCoinsCount > 0) {
    if (currentCustomer) {
      currentCustomer.coins = Math.max(0, (currentCustomer.coins || 1000) - appliedCoinsCount);
      localStorage.setItem('nc_customer_profile', JSON.stringify(currentCustomer));
    }
    let curCoins = parseInt(localStorage.getItem('nc_super_coins') || '1000');
    curCoins = Math.max(0, curCoins - appliedCoinsCount);
    localStorage.setItem('nc_super_coins', String(curCoins));
    updateAllSuperCoinsDisplays();
  }

  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
  } catch(e) { orders = []; }
  orders.unshift(newOrder);
  localStorage.setItem('nc_orders', JSON.stringify(orders));

  // Sync order to Google Cloud Firestore in real-time
  if (typeof CloudSync !== 'undefined' && CloudSync.isReady()) {
    try {
      CloudSync.saveOrder(newOrder);
      console.log('☁️ [submitFinalOrder] Order #' + newOrder.id + ' dispatched to Cloud Firestore!');
    } catch(e) {
      console.warn('Notice during cloud order dispatch:', e);
    }
  }


  // Auto deduct stock for ordered items
  try {
    cart.forEach(cartItem => {
      const prod = (typeof products !== 'undefined' ? products : []).find(p => p.id === cartItem.id);
      if (prod) {
        const qty = cartItem.qty || 1;
        prod.stock = Math.max(0, (prod.stock !== undefined ? prod.stock : 10) - qty);
        prod.sold = (prod.sold || 0) + qty;
      }
    });
    localStorage.setItem('nc_products', JSON.stringify(products));
  } catch(e) {}

  // Clear cart
  cart = [];
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartBadges();

  closeCartModal();

  // Populate Order Success Modal
  const successModal = document.getElementById('orderSuccessModal');
  const sId = document.getElementById('successOrderId');
  const sTot = document.getElementById('successOrderTotal');
  const sCust = document.getElementById('successCustomerDetails');
  const sWa = document.getElementById('successWhatsAppLink');

  if (sId) sId.textContent = '#' + orderId;
  if (sTot) sTot.textContent = '₹' + finalTotal + (selectedPayMethod === 'UPI' ? ' (UPI অনলাইন)' : ' (ক্যাশ অন ডেলিভারি)');
  if (sCust) sCust.textContent = `গ্রাহক: ${name} • 📞 ${phone} • 📍 ${addr}`;

  if (sWa) {
    const waText = encodeURIComponent(`নমস্কার নিশা ক্রিয়েশনস, আমি একটি নতুন অর্ডার করেছি:
অর্ডার আইডি: #${orderId}
মোট প্রদেয় বিল: ₹${finalTotal} (${selectedPayMethod})
নাম: ${name}
ফোন: ${phone}
ঠিকানা: ${addr} - ${pin}

দয়া করে অর্ডারটি কনফার্ম করুন।`);
    sWa.href = `https://wa.me/919239413517?text=${waText}`;
  }

  if (successModal) successModal.style.display = 'flex';
}

function updateCartBadges() {
  const count = cart.length;
  const badges = [
    document.getElementById('navCartBadge'),
    document.getElementById('bottomCartBadge'),
    document.getElementById('catCartCountBadge'),
    document.getElementById('cartModalCount'),
    document.getElementById('pdpCartBadge')
  ];
  badges.forEach(b => {
    if (b) {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-block' : 'none';
    }
  });
}

function buyCurrentLiveProduct() {
  const liveProduct = products[0] || { id: 'NC-101', title: 'লাইভ স্পেশাল ঢাকাই জামদানি', price: 799, img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=75' };
  cart.push(liveProduct);
  localStorage.setItem('nc_cart', JSON.stringify(cart));
  updateCartBadges();
  closeCustomerModal('modalLiveShopping');
  openCartModal();
}

function revealLuckyWelcomeGift() {
  alert("🎉 অভিনন্দন! আপনি 100 টি ওয়েলকাম কয়েন (₹1 ক্যাশ ছাড়) পেয়েছেন!");
  closeWelcomeGiftModal();
}

function closeWelcomeGiftModal() {
  const m = document.getElementById('welcomeGiftModal');
  if (m) m.style.display = 'none';
}

function closeCustomerModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// =========================================================================
// 🌟 REALTIME LIVE SYNC & BULLETPROOF APP BOOTSTRAPPER
// =========================================================================
try {
  const bc = new BroadcastChannel('nc_banner_sync');
  bc.onmessage = (msg) => {
    if (msg && msg.data && msg.data.type === 'BANNER_UPDATED') {
      loadAndRenderBanners();
    }
  };
} catch(e) {}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'nc_banners') {
      loadAndRenderBanners();
    }
  });
  window.addEventListener('focus', () => {
    loadAndRenderBanners();
  });
}

function bootNishaApp() {
  try { sanitizeBoutiqueRuntime(); } catch(e) { console.warn('Runtime sanitize:', e); }
  try { initBrandLogo(); } catch(e) { console.warn('Logo init:', e); }
  try { applyLanguage(); } catch(e) { console.warn('Lang apply:', e); }
  try { loadAllProducts(); } catch(e) { console.warn('Products load:', e); }
  try { loadAndRenderBanners(); } catch(e) { console.warn('Banners load:', e); }
  try { updateCartBadges(); } catch(e) { console.warn('Cart badges:', e); }

  // Continuous Realtime Cloud Firestore Sync for Customer Phones
  let fbRetries = 0;
  const startCloudSyncInterval = setInterval(() => {
    fbRetries++;
    if (typeof CloudSync !== 'undefined' && CloudSync.isReady()) {
      clearInterval(startCloudSyncInterval);
      console.log('☁️ Attaching Realtime Cloud Firestore Listeners on Customer Phone...');
      
      CloudSync.syncProducts((liveProds) => {
        if (Array.isArray(liveProds) && liveProds.length > 0) {
          console.log('☁️ Live products received from Firestore:', liveProds.length);
          products = liveProds;
          try {
            localStorage.setItem('nc_products', JSON.stringify(liveProds));
            localStorage.setItem('nc_demo_cleared', 'true');
          } catch(e) {}
          renderProducts(products);
        }
      });

      CloudSync.syncBanner(() => {
        if (typeof loadAndRenderBanners === 'function') loadAndRenderBanners();
      });

      CloudSync.syncOrders((liveOrders) => {
        if (Array.isArray(liveOrders)) {
          console.log('☁️ Live orders received from Firestore on Customer Phone:', liveOrders.length);
          orders = liveOrders;
          try {
            localStorage.setItem('nc_orders', JSON.stringify(liveOrders));
          } catch(e) {}
          if (typeof renderOrders === 'function') renderOrders();
          if (typeof renderCustomerAccountOrders === 'function') renderCustomerAccountOrders();
          if (typeof renderAdminDashboardLive === 'function') renderAdminDashboardLive();
        }
      });
    }
    if (fbRetries > 20) clearInterval(startCloudSyncInterval);
  }, 500);
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootNishaApp);
  } else {
    bootNishaApp();
  }
}
// Run boot once immediately
bootNishaApp();



// =========================================================================
// COIN SYSTEM (১০০ কয়েনে ১ টাকা) & REWARD LOGIC
// =========================================================================
var appliedCoinDiscountRupees = 0;
var appliedCoinsCount = 0;
var selectedPayMethod = 'UPI'; // 'UPI' or 'COD'

function getAvailableUserCoins() {
  if (currentCustomer && currentCustomer.coins !== undefined) {
    return parseInt(currentCustomer.coins) || 0;
  }
  const stored = localStorage.getItem('nc_super_coins');
  if (!stored) {
    localStorage.setItem('nc_super_coins', '1000'); // Welcome gift of 1000 coins (₹10 value)
    return 1000;
  }
  return parseInt(stored) || 0;
}

function updateAllSuperCoinsDisplays() {
  const coins = getAvailableUserCoins();
  const dCoins = document.querySelectorAll('#checkoutCoinBal, #drawerCoinsDisplay, #ncCoinBalanceNum');
  dCoins.forEach(el => { if (el) el.textContent = coins; });

  const maxRs = Math.floor(coins / 100);
  const rDisp = document.getElementById('checkoutCoinRupees');
  if (rDisp) rDisp.textContent = `₹${maxRs} ছাড় প্রযোজ্য`;
}

function toggleSuperCoinsRedeem() {
  const chk = document.getElementById('useSuperCoinsCheck');
  const isChecked = chk ? chk.checked : false;

  const userCoins = getAvailableUserCoins();
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  // Calculate cart allowed coins based on product limits
  let cartMaxAllowedCoins = 0;
  cart.forEach(item => {
    const itemMax = (item.maxCoins !== undefined && item.maxCoins !== null) ? parseInt(item.maxCoins) : 2000;
    cartMaxAllowedCoins += itemMax * (item.qty || 1);
  });
  if (cartMaxAllowedCoins <= 0) cartMaxAllowedCoins = 2000;

  // Max coins eligible: minimum of user balance and cart allowed limit
  const eligibleCoins = Math.min(userCoins, cartMaxAllowedCoins);

  // 100 Coins = 1 Rupee
  let maxDiscountRupees = Math.floor(eligibleCoins / 100);

  // Safe cap: cannot exceed 50% of bill or total cart price
  const cap50 = Math.floor(cartSubtotal * 0.5);
  if (maxDiscountRupees > cap50) maxDiscountRupees = cap50;

  const coinsToDeduct = maxDiscountRupees * 100;

  if (isChecked && maxDiscountRupees > 0) {
    appliedCoinDiscountRupees = maxDiscountRupees;
    appliedCoinsCount = coinsToDeduct;
  } else {
    appliedCoinDiscountRupees = 0;
    appliedCoinsCount = 0;
    if (chk) chk.checked = false;
  }

  // Update UI in Step 1
  const statusMsg = document.getElementById('coinAppliedStatusMsg');
  const coinText = document.getElementById('coinAppliedText');
  const billCoinRow = document.getElementById('billCoinDiscountRow');
  const billCoinVal = document.getElementById('billCoinDiscountVal');
  const billTotal = document.getElementById('billStep1Total');

  if (statusMsg) statusMsg.style.display = (appliedCoinDiscountRupees > 0) ? 'block' : 'none';
  if (coinText) coinText.textContent = `${appliedCoinsCount} কয়েন সফলভাবে প্রয়োগ হয়েছে (-₹${appliedCoinDiscountRupees} নগদ ছাড়)!`;
  if (billCoinRow) billCoinRow.style.display = (appliedCoinDiscountRupees > 0) ? 'flex' : 'none';
  if (billCoinVal) billCoinVal.textContent = `-₹${appliedCoinDiscountRupees}`;

  const finalStep1 = Math.max(0, cartSubtotal - appliedCoinDiscountRupees);
  if (billTotal) billTotal.textContent = '₹' + finalStep1;
}

// Payment Selection Logic (COD vs UPI)
function selectPaymentMethod(method) {
  selectedPayMethod = method;
  const cardUpi = document.getElementById('payOptCardUpi');
  const cardCod = document.getElementById('payOptCardCod');
  const upiBox = document.getElementById('upiPaymentActionBox');
  const savingsBanner = document.getElementById('paymentSavingsBannerText');
  const savingsContainer = savingsBanner ? savingsBanner.parentElement : null;
  const confirmBtnLbl = document.getElementById('finalConfirmBtnLabel');

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const payableBase = Math.max(0, rawSubtotal - (appliedCoinDiscountRupees || 0));
  const codTotal = payableBase;
  const upiTotal = Math.max(0, payableBase - 38);

  const payCodAmount = document.getElementById('payCodFinalAmount');
  const payUpiAmount = document.getElementById('payUpiFinalAmount');
  const payUpiStriked = document.getElementById('payUpiStrikedAmount');

  if (payCodAmount) payCodAmount.textContent = `₹${codTotal}`;
  if (payUpiAmount) payUpiAmount.textContent = `₹${upiTotal}`;
  if (payUpiStriked) payUpiStriked.textContent = `₹${codTotal}`;

  if (method === 'COD') {
    selectedPayMethod = 'COD';
    if (cardCod) {
      cardCod.classList.add('active');
      cardCod.style.border = '2px solid #16a34a';
      cardCod.style.background = '#f0fdf4';
      cardCod.style.boxShadow = '0 4px 12px rgba(22,163,74,0.15)';
    }
    if (cardUpi) {
      cardUpi.classList.remove('active');
      cardUpi.style.border = '1.5px solid #cbd5e1';
      cardUpi.style.background = '#fff';
      cardUpi.style.boxShadow = 'none';
    }
    if (upiBox) upiBox.style.display = 'none';

    if (savingsContainer) {
      savingsContainer.style.background = '#f8fafc';
      savingsContainer.style.border = '1px solid #cbd5e1';
      savingsContainer.style.color = '#334155';
      savingsBanner.innerHTML = `📦 <strong>ক্যাশ অন ডেলিভারি (COD):</strong> পার্সেল হাতে পাওয়ার পর ডেলিভারি বয়কে ঠিক <strong>₹${codTotal}</strong> নগদ দেবেন।`;
    }
    if (confirmBtnLbl) {
      confirmBtnLbl.innerHTML = `অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি - ₹${codTotal})`;
    }
  } else {
    selectedPayMethod = 'UPI';
    if (cardUpi) {
      cardUpi.classList.add('active');
      cardUpi.style.border = '2px solid #7e22ce';
      cardUpi.style.background = '#faf5ff';
      cardUpi.style.boxShadow = '0 4px 12px rgba(126,34,206,0.15)';
    }
    if (cardCod) {
      cardCod.classList.remove('active');
      cardCod.style.border = '1.5px solid #cbd5e1';
      cardCod.style.background = '#fff';
      cardCod.style.boxShadow = 'none';
    }
    if (upiBox) upiBox.style.display = 'block';

    if (savingsContainer) {
      savingsContainer.style.background = '#f0fdf4';
      savingsContainer.style.border = '1px solid #bbf7d0';
      savingsContainer.style.color = '#15803d';
      savingsBanner.innerHTML = `⚡ অনলাইনে পেমেন্ট করে আপনি মোট <strong>₹38 অতিরিক্ত সাশ্রয়</strong> করছেন!`;
    }
    if (confirmBtnLbl) {
      confirmBtnLbl.innerHTML = `অর্ডার কনফার্ম করুন (Pay ₹${upiTotal} via UPI)`;
    }
  }
}

function updateAllSuperCoinsDisplays() {
  const coins = parseInt(localStorage.getItem('nc_super_coins') || '500');
  const dCoins = document.querySelectorAll('#checkoutCoinBal, #drawerCoinsDisplay');
  dCoins.forEach(el => { if (el) el.textContent = coins; });
}

function copyUpiIdToClipboard() {
  const upiId = localStorage.getItem('nc_official_upi_id') || '9239413517-1@naviaxis';
  navigator.clipboard.writeText(upiId).then(() => {
    alert(`✅ UPI ID (${upiId}) সফলভাবে কপি হয়েছে! PhonePe বা GPay অ্যাপে গিয়ে পেস্ট করুন।`);
  }).catch(() => {
    prompt("নিচের UPI ID-টি কপি করে নিন:", upiId);
  });
}
