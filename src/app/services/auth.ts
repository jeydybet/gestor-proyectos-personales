import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  // CLAVE: Usar BehaviorSubject para garantizar que siempre haya un valor disponible
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();
  
  // Flag para saber si la autenticación ya fue inicializada
  private authInitialized = false;

  constructor() {
    // Inicializar el listener de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      this.authInitialized = true;
    });
  }

  async getCurrentUser(): Promise<User | null> {
    // Si ya tenemos un usuario, devolverlo inmediatamente
    if (this.userSubject.value) {
      return this.userSubject.value;
    }
    
    // Si no, esperar a que la autenticación se inicialice
    return new Promise((resolve) => {
      const checkAuth = () => {
        if (this.authInitialized) {
          resolve(this.userSubject.value);
        } else {
          setTimeout(checkAuth, 50);
        }
      };
      checkAuth();
    });
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/projects']);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/projects']);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }
}