import { PostInterface } from 'src/app/core/interfaces/http.interface'
import { Component, Input, inject } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() list!: PostInterface[]
  private readonly Router = inject(Router)

  navigateTo(URL: string) {
    const route = URL.replace(/\s/g, '_')
    this.Router.navigate(['/post/', route])
  }
}
