import { HeaderComponent } from 'src/app/components/shared/header/header.component'
import { FooterComponent } from 'src/app/components/shared/footer/footer.component'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Component } from '@angular/core'

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  scrollToTop() {
    window.scrollTo(0, 0)
  }
}
