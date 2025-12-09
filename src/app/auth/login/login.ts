// src/app/auth/login/login.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // CRÍTICO: Importar ReactiveFormsModule y RouterLink
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './login.html',
  // CRÍTICO: Enlace a los estilos
  styleUrl: './login.css'
})
export class LoginComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  error: string | null = null; 

  // Definición del Formulario Reactivo
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
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
      // Redirigir al dashboard tras un login exitoso
      this.router.navigate(['/dashboard']);
      
    } catch (err: any) {
      // Manejo de errores visibles para el usuario
      if (err.code === 'auth/invalid-credential') {
        this.error = 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
      } else {
        this.error = 'Ocurrió un error al iniciar sesión. Inténtalo de nuevo.';
      }
      console.error(err);
    }
  }
}