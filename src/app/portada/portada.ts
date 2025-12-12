// src/app/portada/portada.ts (CÓDIGO CORREGIDO Y COMPLETO)

import { Component, inject, OnInit } from '@angular/core'; // 🔑 Importar OnInit
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router'; // 🔑 Importar Router
import { AuthService } from '../services/auth'; // 🔑 Importar AuthService
import { take } from 'rxjs/operators'; // 🔑 Necesario para RxJS

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './portada.html',
  styleUrl: './portada.css' 
})
// 🔑 Implementar OnInit para la lógica de redirección
export class PortadaComponent implements OnInit { 
  private authService = inject(AuthService);
  private router = inject(Router);

  // Lógica de Redirección: Si ya estás logueado, ve al Dashboard
  ngOnInit(): void {
    // Tomamos el estado actual del usuario y luego nos desuscribimos (take(1))
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      // Si existe un objeto 'user' (está logueado), redirigimos
      if (user) {
        this.router.navigate(['/dashboard']); 
      }
    });
  }
}