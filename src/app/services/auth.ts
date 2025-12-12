// src/app/services/auth.service.ts (VERSIÓN FINAL Y OPTIMIZADA)

import { inject, Injectable } from '@angular/core';
import { 
  Auth, 
  user, 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  User 
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators'; // Necesario para estabilidad

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // 🔑 Observable que rastrea el estado de autenticación. 
  // shareReplay asegura que el estado sea estable al cargar la página.
  public user$: Observable<User | null> = user(this.auth).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // 1. 🔑 FUNCIÓN DE INICIO DE SESIÓN
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      // Re-lanza el error para que el componente de Login lo maneje
      throw error; 
    }
  }

  // 2. 🔑 FUNCIÓN DE REGISTRO
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error; 
    }
  }

  // 3. 🔑 FUNCIÓN DE CIERRE DE SESIÓN
  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  // 4. 🔑 FUNCIÓN PARA OBTENER EL UID (ID de usuario de Firebase)
  // CRÍTICO: Este UID se usará en DataService para saber qué proyectos filtrar.
  getCurrentUserId(): string | null {
    // Retorna el UID si existe un usuario logueado, de lo contrario retorna null
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}