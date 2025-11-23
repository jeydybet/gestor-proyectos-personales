import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

// 🛑 LÍNEA 2 CORREGIDA: Usamos AppComponent, que es el nombre de clase estándar
import { AppComponent } from './app/app'; 

// 🛑 LÍNEA 4 CORREGIDA: Importamos la variable como 'routes', el nombre más común
import { routes } from './app/app.routes'; 

// Firebase / AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// ... (el resto de las importaciones de Firebase)

// Config Firebase
const firebaseConfig = { 
  // ... (tus claves) 
};

bootstrapApplication(AppComponent, { // ✅ Usamos AppComponent aquí también
  providers: [
    // FIX CRÍTICO: Usamos 'routes'
    provideRouter(routes), 
    
    // Configuración de Firebase (CRUD, Auth)
    // ... (el resto de providers de Firebase)
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // ...
  ],
});