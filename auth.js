// filepath: auth.js
// Authentication module integrated with IndexedDB

const DEFAULT_USER = "abcd";
const DEFAULT_PASS = "123456789";

// Session constants
const SESSION_KEY = "isLoggedIn";
const SESSION_USER = "currentUser";

// Initialize database on load
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await window.DB.initDB();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
});

function signup() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value;
  let email = document.getElementById("email")?.value.trim() || "";

  // Input validation
  if (!user || !pass) {
    alert("Please fill in all required fields");
    return;
  }

  if (pass.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // Add user to database
  window.DB.addUser(user, pass, email)
    .then(() => {
      alert("Signup successful! Please login.");
      // Clear form
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    })
    .catch((error) => {
      alert(error);
    });
}

function login() {
  let user = document.getElementById("username").value.trim();
  let pass = document.getElementById("password").value;

  if (!user || !pass) {
    alert("Please fill in all fields");
    return;
  }

  // Check database first
  window.DB.verifyUser(user, pass)
    .then((isValid) => {
      if (isValid) {
        createSession(user);
      } else {
        // Fallback to default credentials
        if (user === DEFAULT_USER && pass === DEFAULT_PASS) {
          createSession(user);
        } else {
          alert("Invalid credentials");
        }
      }
    })
    .catch(() => {
      // Fallback to default credentials on error
      if (user === DEFAULT_USER && pass === DEFAULT_PASS) {
        createSession(user);
      } else {
        alert("Invalid credentials");
      }
    });
}

function createSession(user) {
  sessionStorage.setItem(SESSION_KEY, "true");
  sessionStorage.setItem(SESSION_USER, user);
  window.location.href = "index.html";
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_USER);
  window.location.href = "login.html";
}

function checkAuth() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

function getCurrentUser() {
  return sessionStorage.getItem(SESSION_USER);
}