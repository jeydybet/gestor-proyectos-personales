// src/app/app.config.ts (CÓDIGO CORREGIDO PARA LA CONFIGURACIÓN)

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // 🔑 NECESARIO para que el Router funcione
import { provideHttpClient } from '@angular/common/http'; // Buena práctica si usas servicios HTTP

import { routes } from './app.routes'; // Importamos las rutas

// 🔑 IMPORTACIONES DE FIREBASE
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// ⚠️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES REALES DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY_DE_FIREBASE", 
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU-PROJECT-ID",
  storageBucket: "TU-PROJECT-ID.appspot.com",
  messagingSenderId: "TUID_DEL_MENSAJERO",
  appId: "TU_APP_ID"
};

export const appConfig: ApplicationConfig = {
  providers: [
    // 🥇 PROVEEDOR CRÍTICO: Permite que el enrutamiento funcione
    provideRouter(routes),
    
    // Provee las funciones HTTP
    provideHttpClient(),

    // 🔑 PROVEEDORES DE FIREBASE: Inicializan la conexión
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};