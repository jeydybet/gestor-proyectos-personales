// src/app/services/auth.service.ts

import { inject, Injectable } from '@angular/core';
import { 
  Auth, 
  user, // Usa la función 'user'
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword, 
  User 
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);

  // ✅ USAMOS user$ (¡No currentUser$!)
  public user$: Observable<User | null> = user(this.auth).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUserId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}