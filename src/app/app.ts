import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
// Componente principal de la aplicación

@Component({
  selector: 'app-root',
  standalone: true, // Si usas componentes Standalone
  imports: [RouterOutlet], // ¡Importante para usar <router-outlet>!
  templateUrl: './app.html', // o './app.component.html'
  styleUrl: './app.css' // o './app.component.css'
})
export class AppComponent {
  title = 'gestor-proyectos-personales';
}