// src/app/services/auth.ts (CÓDIGO CORREGIDO)
import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  user, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User 
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);

  public currentUser$: Observable<User | null> = user(this.auth);

  constructor() {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']); 
      } else {
        if (this.router.url !== '/' && this.router.url !== '/register') {
             this.router.navigate(['/login']);
        }
      }
    });
  }

  getCurrentUserPromise(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      });
    });
  }

  getCurrentUser(): User | null {
      return this.auth.currentUser;
  }

  // 🔒 LOGIN (Sintaxis corregida)
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error; 
    }
  }

  // 📝 REGISTRO (Sintaxis corregida)
  async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error; 
    }
  }

  // 🚪 LOGOUT (Sintaxis corregida)
  async logout(): Promise<void> {
    await signOut(this.auth);
  }
}