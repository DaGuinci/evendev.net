import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du service Router
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    NgClass,
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evendev.net';

  globaleSectionActive: string = '';
  isExiting: boolean = false;

  constructor(private router: Router) {} // Injection du service Router

  onGlobalSectionActive(section: string) {
    if (this.globaleSectionActive && this.globaleSectionActive !== section) {
      this.isExiting = true;
      setTimeout(() => {
        this.isExiting = false;
        this.globaleSectionActive = section;
        this.router.navigate([`/${section}`]); // Navigation après le délai
      }, 500); // Durée de l'animation
    } else {
      this.globaleSectionActive = section;
      this.router.navigate([`/${section}`]); // Navigation immédiate
    }
  }

  onLogoClicked() {
    this.isExiting = true;
    this.globaleSectionActive = '';
    setTimeout(() => {
      this.isExiting = false;
      this.router.navigate(['/']); // Navigation vers la page d'accueil après le délai
    }, 500); // Durée de l'animation
  }
}
