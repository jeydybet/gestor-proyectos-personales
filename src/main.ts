import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

// Firebase / AngularFire
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoQMk4S0K5Jb52Craq28fMqLVhQvuAcqg",
  authDomain: "gestor-proyectos-personales.firebaseapp.com",
  projectId: "gestor-proyectos-personales",
  storageBucket: "gestor-proyectos-personales.firebasestorage.app",
  messagingSenderId: "944199391992",
  appId: "1:944199391992:web:bd7462cbd8e03431adb90d",
  measurementId: "G-VD4MJCRJ14"
};

bootstrapApplication(App, {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService
  ],
});
