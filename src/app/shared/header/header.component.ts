import { Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { AuthService } from 'src/app/core/services/auth.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID)
  private readonly authService = inject(AuthService)
  isMenuScrolling = signal(false)
  isAdmin = signal(false)

  ngOnInit() {
    this.authService.adminStatus.subscribe((value) => this.isAdmin.set(value))
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = (isPlatformBrowser(this.platformId) && window.pageYOffset) || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (number > 20) this.isMenuScrolling.set(true)
    else this.isMenuScrolling.set(false)
  }
}
