import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración directa de Firebase (respaldo)
const firebaseConfig = {
    apiKey: "AIzaSyCLyfQ5JdSBG4dVBQPg0BUnuNIwhR5_crs",
    authDomain: "control-presupuesto-8a7e6.firebaseapp.com",
    projectId: "control-presupuesto-8a7e6",
    storageBucket: "control-presupuesto-8a7e6.firebasestorage.app",
    messagingSenderId: "494162319454",
    appId: "1:494162319454:web:2b8a64209802f261cabccf"
};

console.log('🔥 Firebase Config (directo):', firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 