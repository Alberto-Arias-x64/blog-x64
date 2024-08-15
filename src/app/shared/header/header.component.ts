import { Component, HostListener, OnInit, PLATFORM_ID, inject } from '@angular/core'
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
  private readonly Auth = inject(AuthService)
  isMenuScrolling = false
  isAdmin = false

  ngOnInit() {
    this.Auth.adminStatus.subscribe((value) => (this.isAdmin = value))
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = (isPlatformBrowser(this.platformId) && window.pageYOffset) || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (number > 20) this.isMenuScrolling = true
    else this.isMenuScrolling = false
  }
}
