import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du service Router
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    NgClass,
    NgStyle,
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
  bgExiting: boolean = false;
  gradient = 'radial-gradient(circle,rgba(0, 0, 0, .4) 0%, rgba(0, 0, 0, 1) 80%)';
  url = '/img/home-bg.jpg';
  backgroundImage = `${this.gradient}, url('${this.url}')`;


  constructor(private router: Router) {}

  onGlobalSectionActive(section: string) {
    // from section to section and section to home
    if (this.globaleSectionActive && this.globaleSectionActive !== section) {
      this.isExiting = true;
      this.bgExiting = true;
      setTimeout(() => {
        this.isExiting = false;
        this.updateBackgroundImage(section);
        this.globaleSectionActive = section;
        this.router.navigate([`/${section}`]);
      }, 500);
    // from home to section
    } else {
      this.bgExiting = true;
      this.globaleSectionActive = section;
      setTimeout(() => {
        // this.bgExiting = false;
        this.updateBackgroundImage(section);
      }, 500);
      this.router.navigate([`/${section}`]);
    }
  }

  onLogoClicked() {
    this.isExiting = true;
    this.globaleSectionActive = '';
    setTimeout(() => {
      this.isExiting = false;
      this.router.navigate(['/']);
    }, 500);
  }

  updateBackgroundImage(section: string) {
    switch (section) {
      case 'projects':
        // this.backgroundImage = `${this.gradient}, url('/img/projects-bg.jpg')`;
        this.url = `/img/projects-bg.jpg`;
        console.log(this.url);
        break;
      case 'about':
        this.url = '/img/about-bg.jpg';
        console.log(this.url);
        break;
      case 'contact':
        this.url = '/img/contact-bg.jpg';
        console.log(this.url);
        break;
      default:
        this.url = '/img/home-bg.jpg';
        console.log(this.url);
        break;
    }
    this.backgroundImage = `${this.gradient}, url('${this.url}')`;
    setTimeout(() => {
      this.bgExiting = false;
    }, 200);
  }
}
