import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  year = signal(new Date().getFullYear())
}
