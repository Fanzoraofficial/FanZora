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
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Navigation
window.goTo = (page) => {
  window.location.href = page;
};

// Signup
window.signupUser = async () => {
  const name = document.getElementById("fullname")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const mobile = document.getElementById("mobile")?.value.trim();
  const password = document.getElementById("password")?.value;
  const confirmPassword = document.getElementById("confirmPassword")?.value;

  if (!name || !email || !mobile || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", user.user.uid), {
      fullName: name,
      email: email,
      mobile: mobile,
      wallet: 0,
      winnings: 0,
      bonus: 0,
      joinedContests: 0,
      createdAt: new Date().toISOString()
    });

    alert("Account Created Successfully!");
    window.location.href = "dashboard.html";

  } catch (e) {
    alert(e.message);
  }
};

// Login
window.loginUser = async () => {
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;

  if (!email || !password) {
    alert("Enter email and password.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};

// Logout
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

// Dashboard / Wallet
onAuthStateChanged(auth, async (user) => {

  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return;

  const data = snap.data();

  const userName = document.getElementById("userName");
  const wallet = document.getElementById("wallet");
  const winnings = document.getElementById("winnings");
  const bonus = document.getElementById("bonus");
  const joined = document.getElementById("joinedContests");

  if (userName) userName.innerText = "Welcome, " + data.fullName;
  if (wallet) wallet.innerText = "₹" + data.wallet;
  if (winnings) winnings.innerText = "₹" + data.winnings;
  if (bonus) bonus.innerText = "₹" + data.bonus;
  if (joined) joined.innerText = data.joinedContests;

});

// Wallet
window.addCash = () => {
  alert("Coming Soon");
};

window.withdrawMoney = () => {
  alert("Coming Soon");
};

// Contest Join
window.joinContest = async () => {

  const user = auth.currentUser;

  if (!user) {
    alert("Please login first.");
    return;
  }

  const userRef = doc(db, "users", user.uid);

  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const data = snap.data();

  if (data.wallet < 49) {
    alert("Insufficient Wallet Balance");
    return;
  }

  await updateDoc(userRef, {
    wallet: increment(-49),
    joinedContests: increment(1)
  });

  alert("Contest Joined Successfully!");

  location.reload();

};

window.viewContest = () => {
  alert("Coming Soon");
};

// Profile
window.editProfile = () => {
  alert("Coming Soon");
};

console.log("🏆 FanZora Ready");
