import { initializeApp } from 'firebase/app'
// For Firebase Cloud Storage
import { getStorage } from 'firebase/storage'

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOEsowfs1Zoign2driMNa4O1G8ZL7xJgE",
  authDomain: "charlie-x-ray.firebaseapp.com",
  projectId: "charlie-x-ray",
  storageBucket: "charlie-x-ray.appspot.com",
  messagingSenderId: "640302338113",
  appId: "1:640302338113:web:bbe7a3201e73d8c2ac36c0"
};

// Initialize Firebase
const fbapp = initializeApp(firebaseConfig)

const fbstorage = getStorage(fbapp)

export { fbapp, fbstorage }