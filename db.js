// filepath: db.js
// IndexedDB wrapper for persistent client-side storage

const DB_NAME = "FixITDatabase";
const DB_VERSION = 1;
const STORE_NAME = "users";

let db = null;

// Initialize the database
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Database error: " + request.error);

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: "username" });
        store.createIndex("email", "email", { unique: false });
      }
    };
  });
}

// Add a new user
function addUser(username, password, email = "") {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    // Hash password before storing (simple base64 for demo - use proper hashing in production)
    const user = {
      username: username,
      password: btoa(password), // Base64 encode (not secure hashing)
      email: email,
      createdAt: new Date().toISOString()
    };

    const request = store.add(user);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Username already exists");
  });
}

// Get user by username
function getUser(username) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(username);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Verify user credentials
function verifyUser(username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await getUser(username);
      if (user && user.password === btoa(password)) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Update user password
function updatePassword(username, newPassword) {
  return new Promise(async (resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    try {
      const user = await getUser(username);
      if (!user) {
        reject("User not found");
        return;
      }

      user.password = btoa(newPassword);
      
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(user);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    } catch (error) {
      reject(error);
    }
  });
}

// Delete user
function deleteUser(username) {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(username);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

// Get all users (for admin purposes)
function getAllUsers() {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject("Database not initialized");
      return;
    }

    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Export functions
window.DB = {
  initDB,
  addUser,
  getUser,
  verifyUser,
  updatePassword,
  deleteUser,
  getAllUsers
};