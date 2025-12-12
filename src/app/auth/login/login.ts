// src/app/login/login.component.ts (VERSIÓN FINAL CORREGIDA)

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// 🔑 CORRECCIÓN: Usar '../services/auth.service' (Angular maneja la extensión .ts automáticamente)
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // CRÍTICO: Importar ReactiveFormsModule, RouterModule y CommonModule
  imports: [ReactiveFormsModule, RouterModule, CommonModule], 
  templateUrl: './login.html', // 🔑 Usas .html
  styleUrl: './login.css'
})
export class LoginComponent { 
  private fb = inject(FormBuilder);
  // 🔑 El servicio ya está bien inyectado
  private authService = inject(AuthService); 
  private router = inject(Router);
  
  // ... (Resto de las variables y funciones) ...
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null; 
  passwordVisible: boolean = false; 

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]] 
  });

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.loginForm.reset();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    try {
      if (this.isLoginMode) {
        // Ejecutar Login
        await this.authService.login(email, password);
      } else {
        // Ejecutar Registro
        await this.authService.register(email, password);
      }
      
      this.router.navigate(['/dashboard/projects']);
      
    } catch (err: any) {
      this.error = this.getErrorMessage(err.code);
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo o contraseña incorrectos. Verifica tus credenciales.';
      case 'auth/email-already-in-use':
        return 'Esta dirección de correo ya está registrada.';
      case 'auth/weak-password':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error inesperado al autenticar.';
    }
  }
}