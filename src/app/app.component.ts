import { Component } from '@angular/core';
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

  onGlobalSectionActive(section: string) {
    this.globaleSectionActive = section;
  }
}
