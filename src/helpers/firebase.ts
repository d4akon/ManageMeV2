import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA5MVmMcgwuoJCY7S4hKe7XfnJZW0kW_cQ',
  authDomain: 'managemev2-32a12.firebaseapp.com',
  projectId: 'managemev2-32a12',
  storageBucket: 'managemev2-32a12.appspot.com',
  messagingSenderId: '502933006828',
  appId: '1:502933006828:web:36a8a83344c909562a38c9',
  measurementId: 'G-KG598Q1T9Z',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore();
