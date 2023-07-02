import { Component, Input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { PostInterface } from 'src/app/interfaces/http.interface'
import { Router } from '@angular/router'

@Component({
    selector: 'app-slider',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
    @Input() list!: PostInterface[]
    private readonly Router = inject(Router)

    navigateTo(URL: string) {
        const route = URL.replace(/\s/g, '_')
        console.log('', route)
        this.Router.navigate(['/post/', route])
    }
}
