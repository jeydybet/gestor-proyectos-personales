// src/app/portada/portada.ts (CÓDIGO CORREGIDO Y FINAL)

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
// 🔑 CORRECCIÓN 1: Eliminamos RouterLink de aquí
import { Router } from '@angular/router'; 
import { User } from '@angular/fire/auth'; 
import { AuthService } from '../services/auth'; 
import { take } from 'rxjs/operators'; 

// Importa el componente de Login 
import { LoginComponent } from '../auth/login/login'; 

@Component({
  selector: 'app-portada',
  standalone: true,
  // 🔑 CORRECCIÓN 2: Eliminamos RouterLink de la matriz imports
  imports: [CommonModule, LoginComponent], 
  templateUrl: './portada.html',
  styleUrl: './portada.css' 
})
export class PortadaComponent implements OnInit { 
  private authService = inject(AuthService);
  private router = inject(Router);

  public showLogin: boolean = false; 

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(['/dashboard/projects']); 
      }
    });
  }

  toggleLoginDisplay(): void {
    this.showLogin = true; 
  }
}