// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Você também pode importar outros serviços: getAuth, getStorage etc.

const firebaseConfig = {
  apiKey: "AIzaSyCsNNy-q_oVTnX8QwVMd11wzOZJG8VedmI",
  authDomain: "meusappprojetos.firebaseapp.com",
  projectId: "meusappprojetos",
  storageBucket: "meusappprojetos.appspot.com",
  messagingSenderId: "1011168372262",
  appId: "1:1011168372262:web:695944ee9af1bcab6268e7",
  measurementId: "G-G6TV10SDQE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
