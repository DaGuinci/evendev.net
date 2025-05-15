import { Component, Renderer2, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgClass, NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    NgClass,
    NgStyle,
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'evendev.net';
  
  globaleSectionActive: string = '';
  isExiting: boolean = false;
  bgExiting: boolean = false;
  url = '/img/home-bg.jpg';
  currentTheme: 'light' | 'dark' = 'light';
  gradient = 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgb(255, 255, 255) 80%)';
  backgroundImage = `${this.gradient}, url('${this.url}')`;

  constructor(private router: Router, private renderer: Renderer2) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const section = event.urlAfterRedirects.replace('/', '');
        this.onGlobalSectionActive(section);
      }
    });
  }

  ngOnInit() {
    // Appliquer le thème par défaut (light) au chargement
    const htmlElement = document.documentElement;
    this.renderer.addClass(htmlElement, this.currentTheme);
  }

  onGlobalSectionActive(section: string) {
    if (this.globaleSectionActive && this.globaleSectionActive !== section) {
      this.isExiting = true;
      // this.bgExiting = true;
      this.updateBackgroundImage(section);
      setTimeout(() => {
        this.isExiting = false;
        // this.updateBackgroundImage(section);
        this.globaleSectionActive = section;
        this.router.navigate([`/${section}`]);
      }, 500);
    } else {
      // this.bgExiting = true;
      this.updateBackgroundImage(section);
      setTimeout(() => {
        this.globaleSectionActive = section;

        // this.updateBackgroundImage(section);
      }, 500);
      this.router.navigate([`/${section}`]);
    }
  }

  onLogoClicked() {
    this.isExiting = true;
    this.globaleSectionActive = '';
    this.updateBackgroundImage('');
    setTimeout(() => {
      this.isExiting = false;
      this.router.navigate(['/']);
    }, 500);
  }

  updateBackgroundImage(section: string) {
    this.bgExiting = true;
    switch (section) {
      case 'projects':
        this.url = `/img/projects-bg.jpg`;
        break;
      case 'about':
        this.url = '/img/about-bg.jpg';
        break;
      case 'contact':
        this.url = '/img/contact-bg.jpg';
        break;
      default:
        this.url = '/img/home-bg.jpg';
        break;
    }

    console.log('Background URL:', this.url);

    setTimeout(() => {
      this.backgroundImage = `${this.gradient}, url('${this.url}')`;
      this.bgExiting = false;
    }, 1000);
  }

  toggleTheme() {
    const htmlElement = document.documentElement;
    if (this.currentTheme === 'light') {
      this.renderer.removeClass(htmlElement, 'light');
      this.renderer.addClass(htmlElement, 'dark');
      this.currentTheme = 'dark';
      this.gradient = `radial-gradient(circle, rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 1) 80%)`;
    } else {
      this.renderer.removeClass(htmlElement, 'dark');
      this.renderer.addClass(htmlElement, 'light');
      this.currentTheme = 'light';
      this.gradient = `radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 1) 80%)`;
    }
    this.updateBackgroundImage(this.globaleSectionActive);
  }
}
