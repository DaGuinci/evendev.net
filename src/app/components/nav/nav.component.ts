import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  host: {
    class: 'nav'
  }
})
export class NavComponent {

  @Output() globalSectionActive = new EventEmitter<string>();
  @Output() logoClicked = new EventEmitter<void>(); // Nouvel événement

  sectionActive = '';

  setActiveSection(section: string) {
    this.globalSectionActive.emit(section);
    this.sectionActive = section;
  }

  onLogoClick() {
    this.logoClicked.emit(); // Émet l'événement lorsque le logo est cliqué
  }
}
