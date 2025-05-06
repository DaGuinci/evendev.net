import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'projects'
  }
})
export class ProjectsComponent {

}