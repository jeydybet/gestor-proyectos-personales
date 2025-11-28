// src/app/services/auth.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private isLoggedIn = false; // Estado para simular si el usuario está loggeado

  async login(email: string, password: string): Promise<any> {
    // Simula una operación de red
    await new Promise(resolve => setTimeout(resolve, 500)); 
    this.isLoggedIn = true;
    this.router.navigate(['/projects']); // Navega a proyectos (tendrá un error 404 por ahora)
  }

  // Método para el guard, si lo tuvieras
  getCurrentUser() {
    return this.isLoggedIn ? { uid: 'mock-user-123' } : null; // Retorna un usuario mock si estamos loggeados
  }
  
  // Agrega un método de logout simple
  async logout(): Promise<void> {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}