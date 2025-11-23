import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-portada', // Selector
  standalone: true,
  imports: [RouterLink], // Importante para la navegación
  templateUrl: './portada.html',
  styleUrl: './portada.css'
})
export class PortadaComponent { 
  // ...
}