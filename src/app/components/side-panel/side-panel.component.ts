import { AuthService } from 'src/app/core/services/auth.service'
import { Router, RouterModule } from '@angular/router'
import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  logOut() {
    this.authService.logOut()
    this.router.navigate(['/'])
  }
}
