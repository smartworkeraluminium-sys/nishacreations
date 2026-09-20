// =========================================================================
// NISHA CREATIONS - GOOGLE FIREBASE CLOUD FIRESTORE INTEGRATION
// Seamless Realtime Synchronization for Products, Orders, Banners & Stocks
// =========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBYBRTvmuf3mHuP1kveMv98idLAhJys2-M",
  authDomain: "nisha-creations.firebaseapp.com",
  projectId: "nisha-creations",
  storageBucket: "nisha-creations.firebasestorage.app",
  messagingSenderId: "726716735582",
  appId: "1:726716735582:web:a477dcd273501e5d7dd4cf"
};

let ncFirebaseApp = null;
let ncDb = null;
let ncIsCloudReady = false;

// Initialize Firebase App & Firestore
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps || !firebase.apps.length) {
      ncFirebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      ncFirebaseApp = firebase.app();
    }
    ncDb = firebase.firestore();
    // Enable offline persistence if supported
    try {
      ncDb.enablePersistence({ synchronizeTabs: true }).catch(() => {});
    } catch(e) {}
    ncIsCloudReady = true;
    console.log("☁️ Google Cloud Firestore: Connected successfully to nisha-creations!");
  } else {
    console.log("ℹ️ Firebase SDK not loaded, running in local-first mode.");
  }
} catch (e) {
  console.warn("⚠️ Firebase Initialization fallback:", e);
}

// Global Cloud Sync Utility
window.CloudSync = {
  isReady: () => ncIsCloudReady && ncDb !== null,

  // ==========================================
  // 1. PRODUCTS SYNC
  // ==========================================
  syncProducts: function(onUpdate) {
    if (!this.isReady()) return null;
    try {
      return ncDb.collection('products').onSnapshot((snapshot) => {
        if (!snapshot || snapshot.empty) {
          // If cloud collection is completely empty, seed from localStorage if exists
          this.seedInitialProductsToCloud();
          return;
        }
        const cloudProducts = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data && data.id) {
            // Ensure proper upiOffer
            if (!data.upiOffer && data.price) {
              data.upiOffer = Math.round(data.price * 0.95);
            }
            cloudProducts.push(data);
          }
        });

        if (cloudProducts.length > 0) {
          try {
            localStorage.setItem('nc_products', JSON.stringify(cloudProducts));
            localStorage.setItem('nc_demo_cleared', 'true');
          } catch(e) {}
          if (typeof onUpdate === 'function') {
            onUpdate(cloudProducts);
          }
        }
      }, (error) => {
        console.warn("Products cloud sync listener notice:", error);
      });
    } catch(e) {
      console.warn("Failed to attach products cloud listener:", e);
      return null;
    }
  },

  saveProduct: async function(prod) {
    if (!prod || !prod.id) return false;
    // Always update local cache first
    try {
      let localProds = JSON.parse(localStorage.getItem('nc_products') || '[]');
      localProds = localProds.filter(p => p.id !== prod.id);
      localProds.unshift(prod);
      localStorage.setItem('nc_products', JSON.stringify(localProds));
    } catch(e) {}

    if (!this.isReady()) return false;
    try {
      await ncDb.collection('products').doc(String(prod.id)).set(prod, { merge: true });
      console.log(`☁️ Product #${prod.id} saved to Cloud Firestore!`);
      return true;
    } catch(e) {
      console.warn("Failed to write product to Firestore:", e);
      return false;
    }
  },

  deleteProduct: async function(prodId) {
    if (!prodId) return false;
    if (!this.isReady()) return false;
    try {
      await ncDb.collection('products').doc(String(prodId)).delete();
      console.log(`☁️ Product #${prodId} deleted from Cloud Firestore!`);
      return true;
    } catch(e) {
      console.warn("Failed to delete product from Firestore:", e);
      return false;
    }
  },

  seedInitialProductsToCloud: async function() {
    if (!this.isReady()) return;
    try {
      let localProds = [];
      try {
        localProds = JSON.parse(localStorage.getItem('nc_products') || '[]');
      } catch(e) {}

      if (localProds && localProds.length > 0) {
        const batch = ncDb.batch();
        localProds.forEach(p => {
          if (p.id) {
            const ref = ncDb.collection('products').doc(String(p.id));
            batch.set(ref, p, { merge: true });
          }
        });
        await batch.commit();
        console.log(`☁️ Seeded ${localProds.length} products to Cloud Firestore!`);
      }
    } catch(e) {
      console.warn("Notice during initial products seed:", e);
    }
  },

  // ==========================================
  // 2. ORDERS SYNC
  // ==========================================
    syncOrders: function(onUpdate) {
    if (!this.isReady()) return null;
    try {
      // Listen to all orders without strict order index requirement
      return ncDb.collection('orders').onSnapshot((snapshot) => {
        if (!snapshot) return;
        const cloudOrders = [];
        snapshot.forEach(doc => {
          const ord = doc.data();
          if (ord && ord.id) cloudOrders.push(ord);
        });

        // Sort descending by timestamp or date
        cloudOrders.sort((a, b) => {
          const tA = new Date(a.createdAt || a.date || 0).getTime();
          const tB = new Date(b.createdAt || b.date || 0).getTime();
          return tB - tA;
        });

        if (cloudOrders.length > 0) {
          try {
            localStorage.setItem('nc_orders', JSON.stringify(cloudOrders));
          } catch(e) {}
          if (typeof onUpdate === 'function') {
            onUpdate(cloudOrders);
          }
        }
      }, (error) => {
        console.warn("Orders cloud sync listener notice:", error);
      });
    } catch(e) {
      console.warn("Failed to attach orders cloud listener:", e);
      return null;
    }
  },

  saveOrder: async function(order) {
    if (!order || !order.id) return false;
    if (!order.createdAt) order.createdAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();
    
    // Always update local cache first
    try {
      let localOrders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      localOrders = localOrders.filter(o => o.id !== order.id);
      localOrders.unshift(order);
      localStorage.setItem('nc_orders', JSON.stringify(localOrders));
    } catch(e) {}

    if (!this.isReady()) return false;
    try {
      await ncDb.collection('orders').doc(String(order.id)).set(order, { merge: true });
      console.log(`☁️ Order #${order.id} saved to Cloud Firestore!`);
      return true;
    } catch(e) {
      console.warn("Failed to write order to Firestore:", e);
      return false;
    }
  },

  updateOrderStatus: async function(orderId, newStatus, extraFields = {}) {
    if (!orderId) return false;
    // Update local cache first
    try {
      let localOrders = JSON.parse(localStorage.getItem('nc_orders') || '[]');
      const idx = localOrders.findIndex(o => String(o.id) === String(orderId));
      if (idx !== -1) {
        localOrders[idx].status = newStatus;
        Object.assign(localOrders[idx], extraFields);
        localStorage.setItem('nc_orders', JSON.stringify(localOrders));
      }
    } catch(e) {}

    if (!this.isReady()) return false;
    try {
      const updateData = { status: newStatus, ...extraFields, updatedAt: new Date().toISOString() };
      await ncDb.collection('orders').doc(String(orderId)).update(updateData);
      console.log(`☁️ Order #${orderId} status updated to '${newStatus}' in Cloud Firestore!`);
      return true;
    } catch(e) {
      console.warn("Failed to update order in Firestore:", e);
      return false;
    }
  },

  // ==========================================
  // 3. CUSTOM OFFER BANNER SYNC
  // ==========================================
  syncBanner: function(onUpdate) {
    if (!this.isReady()) return null;
    try {
      return ncDb.collection('settings').doc('banner').onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          try {
            localStorage.setItem('nc_custom_banner', JSON.stringify(data));
          } catch(e) {}
          if (typeof onUpdate === 'function') onUpdate(data);
        }
      }, (error) => {
        console.warn("Banner cloud sync listener notice:", error);
      });
    } catch(e) {
      return null;
    }
  },

  saveBanner: async function(bannerData) {
    if (!bannerData) return false;
    try {
      localStorage.setItem('nc_custom_banner', JSON.stringify(bannerData));
    } catch(e) {}

    if (!this.isReady()) return false;
    try {
      await ncDb.collection('settings').doc('banner').set(bannerData, { merge: true });
      console.log("☁️ Banner saved to Cloud Firestore!");
      return true;
    } catch(e) {
      console.warn("Failed to save banner to Firestore:", e);
      return false;
    }
  },

  clearAllCloudData: async function() {
    if (!this.isReady()) return false;
    try {
      // 1. Delete all products in cloud
      const prodSnap = await ncDb.collection('products').get();
      const batch = ncDb.batch();
      prodSnap.forEach(doc => {
        batch.delete(doc.ref);
      });
      // 2. Delete all orders in cloud
      const orderSnap = await ncDb.collection('orders').get();
      orderSnap.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("☁️ All demo products and orders wiped from Google Cloud Firestore!");
      return true;
    } catch(e) {
      console.warn("Notice during cloud clean:", e);
      return false;
    }
  },

  removeBanner: async function() {
    try {
      localStorage.removeItem('nc_custom_banner');
    } catch(e) {}

    if (!this.isReady()) return false;
    try {
      await ncDb.collection('settings').doc('banner').delete();
      console.log("☁️ Banner deleted from Cloud Firestore!");
      return true;
    } catch(e) {
      return false;
    }
  }
};
