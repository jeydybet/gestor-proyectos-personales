// src/app/auth/login/login.ts

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth'; 
// ❌ ELIMINADO: import { CommonModule } from '@angular/common'; 
// ❌ ELIMINADO: import { CardComponent } from '../../common/card/card'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // 🔑 Solo mantenemos módulos funcionales y de routing
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService); 
  
  error: string | null = null; 

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit() {
    this.error = null; 

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.loginForm.value;

    try {
      // 🔑 Lógica real de Firebase
      await this.authService.login(email, password);
    } catch (err: any) {
      this.error = 'Inicio de sesión fallido. Credenciales incorrectas o usuario no existe.'; 
      console.error(err);
    }
  }
}