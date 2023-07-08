import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SliderComponent } from 'src/app/components/slider/slider.component'
import { HttpClient } from '@angular/common/http'
import { CategoriesInterface, HttpResponse, PostInterface } from 'src/app/interfaces/http.interface'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { Router } from '@angular/router'

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, SliderComponent, AngularSvgIconModule],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)

    categoriesList?: CategoriesInterface[]
    posts!: PostInterface[]

    ngOnInit(): void {
        this.Http.get<HttpResponse<PostInterface[]>>('/api/read_posts').subscribe((res) => {
            this.posts = res.data
        })
        this.Http.get<HttpResponse<CategoriesInterface[] | null>>('/api/categories').subscribe({
            next: (res) => {
                this.categoriesList = res.data
            }
        })
    }

    navigateTo(URL: string){
        const route = URL.replace(/\s/g, '_')
        this.Router.navigate(['/post/', route])
    }
}
