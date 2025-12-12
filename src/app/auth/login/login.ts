// src/app/auth/login/login.ts (CÓDIGO FINAL CORREGIDO)

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // 🔑 Importado para usar *ngIf
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // CRÍTICO: Importar ReactiveFormsModule, RouterLink y CommonModule
  imports: [ReactiveFormsModule, RouterLink, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  error: string | null = null; 
  passwordVisible: boolean = false; // 🔑 Variable para visibilidad de contraseña

  // 🔑 Función para alternar visibilidad
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
  // Definición del Formulario Reactivo
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    // 🔑 Añadido minLength(6) para coincidir con la política de Firebase
    password: ['', [Validators.required, Validators.minLength(6)]] 
  });

  async onSubmit() {
    this.error = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      // Login exitoso: Redirigir al dashboard
      this.router.navigate(['/dashboard']);
      
    } catch (err: any) {
      // Manejo de errores de Login de Firebase
      // Firebase usa 'auth/invalid-credential' para casi todos los fallos de login (user not found, wrong password, etc.)
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        this.error = 'Correo o contraseña incorrectos. Por favor, verifica tus credenciales.';
      } else {
        this.error = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';
      }
      console.error(err);
    }
  }
}