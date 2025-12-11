// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { provideHttpClient } from '@angular/common/http'; 

import { routes } from './app.routes'; 

// 🔑 IMPORTACIONES DE FIREBASE
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// 🚀 CREDENCIALES REALES DE FIREBASE
const firebaseConfig = {
    // API KEY REAL
    apiKey: "AIzaSyAoQMk4S0K5Jb52Craq28fMqLVhQvuAcqg", 
    
    // DOMINIO DE AUTENTICACIÓN REAL
    authDomain: "gestor-proyectos-personales.firebaseapp.com",
    
    // ID DEL PROYECTO REAL
    projectId: "gestor-proyectos-personales",
    
    // BUCKET DE ALMACENAMIENTO REAL
    storageBucket: "gestor-proyectos-personales.firebasestorage.app",
    
    // MESSAGING SENDER ID REAL
    messagingSenderId: "944199391992",
    
    // APP ID REAL
    appId: "1:944199391992:web:bd7462cbd8e03431adb90d",
    
    // ID DE MEDICIÓN (Opcional, pero incluido para completitud)
    measurementId: "G-VD4MJCRJ14"
};

export const appConfig: ApplicationConfig = {
    providers: [
        // 🥇 PROVEEDOR CRÍTICO: Permite que el enrutamiento funcione
        provideRouter(routes),
        
        // Provee las funciones HTTP
        provideHttpClient(),

        // 🔑 PROVEEDORES DE FIREBASE: Inicializan la conexión con la configuración real
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
    ]
};