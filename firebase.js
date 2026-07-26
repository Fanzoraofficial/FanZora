import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Navigation
window.goTo = (page) => {
  window.location.href = page;
};

// Signup
window.signupUser = async () => {
  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!name || !email || !mobile || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullName: name,
      email: email,
      mobile: mobile,
      wallet: 0,
      winnings: 0,
      bonus: 0,
      createdAt: new Date().toISOString()
    });

    alert("Account Created Successfully!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.code + "\n" + error.message);
  }
};

// Login
window.loginUser = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.code + "\n" + error.message);
  }
};

// Logout
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

// Wallet Load
onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (snap.exists()) {
    const data = snap.data();

    const wallet = document.getElementById("wallet");
    const winnings = document.getElementById("winnings");
    const bonus = document.getElementById("bonus");

    if (wallet) wallet.innerText = "₹" + (data.wallet || 0);
    if (winnings) winnings.innerText = "₹" + (data.winnings || 0);
    if (bonus) bonus.innerText = "₹" + (data.bonus || 0);
  }
});

// Wallet
window.addCash = () => {
  alert("Add Cash feature coming soon.");
};

window.withdrawMoney = () => {
  alert("Withdraw feature coming soon.");
};

// Contest
window.joinContest = () => {
  alert("Contest Joined Successfully!");
};

window.viewContest = () => {
  alert("Contest Details Coming Soon.");
};

// Profile
window.editProfile = () => {
  alert("Edit Profile Coming Soon.");
};

window.backDashboard = () => {
  window.location.href = "dashboard.html";
};

console.log("🏆 FanZora Ready");