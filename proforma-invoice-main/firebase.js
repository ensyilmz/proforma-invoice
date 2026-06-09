import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD1_glZaaS5doHV0T0uUxFJKYNe67LHFKQ",
    authDomain: "proforma-invoice-1e2a7.firebaseapp.com",
    projectId: "proforma-invoice-1e2a7",
    storageBucket: "proforma-invoice-1e2a7.firebasestorage.app",
    messagingSenderId: "233376036329",
    appId: "1:233376036329:web:cecdbe1145d74fb7068778",
    measurementId: "G-NKQ5VJ9TF0"
  };
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;


window.auth = auth;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
const authScreen = document.getElementById("authScreen");
const appContent = document.getElementById("appContent");

onAuthStateChanged(auth, (user) => {

if(user){

  document.getElementById("panelEmail").textContent = user.email;

  authScreen.classList.add("fade-out");

  setTimeout(() => {

    authScreen.style.display = "none";
    appContent.style.display = "flex";

    appContent.classList.add("fade-in");

  }, 400);

}else{

  appContent.style.display = "none";
  authScreen.style.display = "flex";

  authScreen.classList.remove("fade-out");

}

});
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authMessage = document.getElementById("authMessage");

registerBtn.addEventListener("click", async () => {

  try{

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        authEmail.value,
        authPassword.value
      );

    await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      plan: "free",
      createdAt: new Date().toISOString()
    });

    authMessage.textContent = "Kayıt başarılı.";

  }catch(error){

    authMessage.textContent = error.message;

  }

});

loginBtn.addEventListener("click", async () => {

  try{

    await signInWithEmailAndPassword(
      auth,
      authEmail.value,
      authPassword.value
    );

    authMessage.textContent = "Giriş başarılı.";

  }catch(error){

    authMessage.textContent = error.message;

  }

});
const accountBtn = document.getElementById("accountBtn");
const accountPanel = document.getElementById("accountPanel");

accountBtn.addEventListener("click", () => {

  if(accountPanel.style.display === "block"){

    accountPanel.style.display = "none";

  }else{

    accountPanel.style.display = "block";

  }

});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    console.log("Çıkış yapıldı");
  } catch (error) {
    console.error(error);
  }
});
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", async () => {

  const email = authEmail.value;

  if(!email){
    authMessage.textContent = "Email girmen lazım";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    authMessage.textContent = "Şifre sıfırlama maili gönderildi";
  } catch (error) {
    authMessage.textContent = error.message;
  }

});
loginBtn.addEventListener("click", async () => {

  loginBtn.classList.add("loading");
  loginBtn.innerText = "Giriş yapılıyor...";

  try {

    await signInWithEmailAndPassword(
      auth,
      authEmail.value,
      authPassword.value
    );

    authMessage.style.color = "lightgreen";
    authMessage.textContent = "Giriş başarılı ✓";

    setTimeout(() => {
      loginBtn.classList.remove("loading");
      loginBtn.innerText = "Giriş Yap";
    }, 800);

  } catch (error) {

    authMessage.style.color = "red";
    authMessage.textContent = error.message;

    loginBtn.classList.remove("loading");
    loginBtn.innerText = "Giriş Yap";

  }

});