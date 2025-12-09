// src/app/auth/register/register.ts (CÓDIGO CORREGIDO)

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './register.html',
  styleUrl: './register.css'
})
// 🔑 CLAVE: La palabra 'export' debe estar aquí
export class RegisterComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 
  
  error: string | null = null; 

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]] // Mínimo 6 caracteres por Firebase
  });

  async onSubmit() {
    this.error = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.registerForm.value;

    try {
      await this.authService.register(email, password);
    } catch (err: any) {
      this.error = 'Error de registro. El correo ya está en uso o la contraseña es muy débil.'; 
      console.error(err);
    }
  }
}