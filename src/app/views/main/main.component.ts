import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SliderComponent } from 'src/app/components/slider/slider.component'
import { HttpClient } from '@angular/common/http'
import { CategoriesInterface, HttpResponse, PostInterface } from 'src/app/interfaces/http.interface'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { Router } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, copyMock } from 'src/app/mocks/modals.mock'

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
    private Modal = inject(ModalService)

    categoriesList?: CategoriesInterface[]
    posts!: PostInterface[]

    ngOnInit(): void {
        this.Http.get<HttpResponse<PostInterface[]>>('/api/read_posts').subscribe({
            next: (res) => {
                this.posts = res.data
            },
            error:() => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
        this.Http.get<HttpResponse<CategoriesInterface[] | null>>('/api/categories').subscribe({
            next: (res) => {
                this.categoriesList = res.data
            }
        })
    }

    like(event: Event,id: string | number) {
        const element = event.target as HTMLElement
        if (window.localStorage.getItem(JSON.stringify(id))) return
        this.Http.post('/api/like_post', { id }).subscribe(() => {
            window.localStorage.setItem(JSON.stringify(id), 'true')
            element.classList.add("liked")
            this.posts = this.posts.map(element => {
                if (element.id === id) {
                    element.likes += 1
                }
                return element
            })
        })
    }

    navigateTo(URL: string) {
        const route = URL.replace(/\s/g, '_')
        this.Router.navigate(['/post/', route])
    }
}
