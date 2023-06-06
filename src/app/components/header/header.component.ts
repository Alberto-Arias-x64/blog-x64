import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private readonly platformId = inject(PLATFORM_ID)
    isMenuScrolling = false

    @HostListener("window:scroll", [])
	onWindowScroll() {
		const number = (isPlatformBrowser(this.platformId) && window.pageYOffset)
			|| document.documentElement.scrollTop
			|| document.body.scrollTop
			|| 0
		if (number > 115) {
			this.isMenuScrolling = true
		} else {
			this.isMenuScrolling = false
		}

	}
}
