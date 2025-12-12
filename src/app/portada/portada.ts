// src/app/portada/portada.ts (CÓDIGO COMPLETO Y FINAL)

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';
import { User } from '@angular/fire/auth'; 
// Asegúrate de que esta ruta sea correcta: Portada está en ../services/auth
import { AuthService } from '../services/auth'; 
import { take } from 'rxjs/operators'; 

// Importa el componente de Login para usarlo en el HTML de Portada
// Asegúrate de que esta ruta sea correcta: Portada está en ../auth/login
import { LoginComponent } from '../auth/login/login'; 

@Component({
  selector: 'app-portada',
  standalone: true,
  // Necesitamos importar CommonModule para usar *ngIf
  // Necesitamos importar RouterLink para la navegación (si lo usas)
  // CRÍTICO: Necesitamos importar LoginComponent para usar <app-login> en el HTML
  imports: [CommonModule, RouterLink, LoginComponent], 
  templateUrl: './portada.html',
  styleUrl: './portada.css' 
})
export class PortadaComponent implements OnInit { 
  private authService = inject(AuthService);
  private router = inject(Router);

  // VARIABLE DE CONTROL: Para mostrar/ocultar el formulario de login y el botón "Comenzar Ahora"
  public showLogin: boolean = false; 

  ngOnInit(): void {
    // Suscribirse a user$ para verificar el estado de autenticación al iniciar la página
    this.authService.user$.pipe(take(1)).subscribe((user: User | null) => {
      // Si el usuario ya está logueado, lo redirigimos inmediatamente al dashboard
      if (user) {
        this.router.navigate(['/dashboard/projects']); 
      }
    });
  }

  // FUNCIÓN DE VISIBILIDAD: Llamada por el botón "Comenzar Ahora"
  toggleLoginDisplay(): void {
    this.showLogin = true; 
  }
}