import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
