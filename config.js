// Environment Configuration
// This file acts as environment variables for the FixIT application

const ENV = {
  // App Configuration
  appName: "FixIT",
  appVersion: "1.0.0",
  
  // API Configuration (for future backend integration)
  apiBaseUrl: "http://localhost:3000",
  apiTimeout: 30000,
  
  // Database Configuration
  dbName: "FixITDatabase",
  dbVersion: 1,
  
  // Admin Credentials
  adminUser: "admin",
  adminPass: "admin123",
  
  // Feature Flags
  features: {
    enableEmailNotifications: false,
    enableSMSNotifications: false,
    enablePaymentGateway: false,
    enableReviewSystem: true,
    enableChatSupport: false
  },
  
  // Service Categories
  services: [
    { id: "plumber", name: "Plumber", icon: "plumbing.png" },
    { id: "electrician", name: "Electrician", icon: "electrical.png" },
    { id: "cleaning", name: "Cleaning", icon: "clean.png" },
    { id: "carpenter", name: "Carpenter", icon: "hammer.png" }
  ],
  
  // Booking Time Slots
  timeSlots: [
    "9 AM - 12 PM",
    "12 PM - 3 PM",
    "3 PM - 6 PM"
  ],
  
  // UI Configuration
  ui: {
    primaryColor: "#00c896",
    secondaryColor: "#1f1f1f",
    dangerColor: "#e74c3c",
    successColor: "#27ae60",
    warningColor: "#f39c12",
    maxImageSize: 5000000, // 5MB
    itemsPerPage: 10
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ENV;
}