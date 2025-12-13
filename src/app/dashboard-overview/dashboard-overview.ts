import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, DashboardSummary } from '../services/data';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.html',
  styleUrls: ['./dashboard-overview.css']
})
export class DashboardOverviewComponent implements OnInit {
  private dataService = inject(DataService);

  // Propiedades individuales para el template
  totalProjects = 0;
  activeProjects = 0;
  completedProjects = 0;
  pendingProjects = 0;
  tareasVencidas = 0;
  tareasHoy = 0;
  completadasSemana = 0;

  ngOnInit() {
    this.dataService.getDashboardSummary().pipe(
      catchError(error => {
        console.error('Error loading dashboard:', error);
        return of({
          totalProjects: 0,
          activeProjects: 0,
          completedProjects: 0,
          pendingProjects: 0,
          tareasVencidas: 0,
          tareasHoy: 0,
          completadasSemana: 0
        });
      })
    ).subscribe((summary: DashboardSummary) => {
      this.totalProjects = summary.totalProjects;
      this.activeProjects = summary.activeProjects;
      this.completedProjects = summary.completedProjects;
      this.pendingProjects = summary.pendingProjects;
      this.tareasVencidas = summary.tareasVencidas;
      this.tareasHoy = summary.tareasHoy;
      this.completadasSemana = summary.completadasSemana;
    });
  }
}