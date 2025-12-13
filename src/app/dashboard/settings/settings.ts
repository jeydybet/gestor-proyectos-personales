// src/app/dashboard/settings/settings.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.html', 
  styleUrl: './settings.css'
})

export class SettingsComponent {
  // Manejo del estado de la pestaña activa
  activeTab: 'profile' | 'preferences' | 'security' = 'profile';

  setActiveTab(tab: 'profile' | 'preferences' | 'security') {
    this.activeTab = tab;
  }
}