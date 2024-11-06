import { initializeApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD2mGcEx0ECIh_VSxtwr9mNQR61ByxnLkA",
  authDomain: "project-manager-3be93.firebaseapp.com",
  projectId: "project-manager-3be93",
  storageBucket: "project-manager-3be93.firebasestorage.app",
  messagingSenderId: "905832494209",
  appId: "1:905832494209:web:28498e2122ae72f13f4980",
  measurementId: "G-GG2M0KGL16"
}

const firebaseApp = initializeApp(firebaseConfig)

const db: Firestore = getFirestore(firebaseApp)

export { db }
