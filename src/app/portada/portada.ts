// src/app/portada/portada.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-portada',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './portada.html',
  // 🔑 CRÍTICO: Debe apuntar a 'portada.css'
  styleUrl: './portada.css' 
})
export class PortadaComponent { 
  // ...
}