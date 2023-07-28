import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SliderComponent } from 'src/app/components/slider/slider.component'
import { HttpClient } from '@angular/common/http'
import { CategoriesInterface, HttpResponse, PostInterface, PostPaginatorInterface } from 'src/app/interfaces/http.interface'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, NoDataMock, copyMock, subscribedMock } from 'src/app/mocks/modals.mock'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, SliderComponent, AngularSvgIconModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private readonly Route = inject(ActivatedRoute)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    private readonly Builder = inject(FormBuilder)
    private Modal = inject(ModalService)

    categoriesList?: CategoriesInterface[]
    posts: PostInterface[] = []
    title: string | null = null
    showMobile = false
    sendingMail = false
    sendedMail = false

    searchForm = this.Builder.group({
        search: new FormControl(null, [Validators.required])
    })

    subscribeForm = this.Builder.group({
        mail: new FormControl(null, [Validators.required, Validators.email])
    })

    ngOnInit(): void {
        this.Route.params.subscribe((params: any) => {
            this.title = params.id
            if (this.Router.url.includes('category')) {
                this.Http.get<HttpResponse<PostPaginatorInterface>>(`/api/category_posts/${params.id}`).subscribe({
                    next: (res) => {
                        if (res.data && res.data.count > 0) {
                            this.posts = res.data.rows.map((element: PostInterface) => {
                                if (window.localStorage.getItem(JSON.stringify(element.id))) {
                                    element.liked = true
                                } else element.liked = false
                                return element
                            })
                        } else {
                            this.posts = []
                            this.Router.navigate(['/404'])
                        }
                    },
                    error: () => {
                        this.Modal.setData = copyMock(ErrorMock)
                        this.Modal.setState = true
                    }
                })
            } else if (this.Router.url.includes('search')) {
                this.title = params.id
                this.Http.get<HttpResponse<PostPaginatorInterface>>(`/api/filter_posts/${params.id}`).subscribe({
                    next: (res) => {
                        if (res.data && res.data.count > 0) {
                            this.posts = res.data.rows.map((element: PostInterface) => {
                                if (window.localStorage.getItem(JSON.stringify(element.id))) {
                                    element.liked = true
                                } else element.liked = false
                                return element
                            })
                        } else {
                            this.posts = []
                            this.Modal.setData = copyMock(NoDataMock)
                            this.Modal.setState = true
                        }
                    },
                    error: () => {
                        this.Modal.setData = copyMock(ErrorMock)
                        this.Modal.setState = true
                    }
                })
            } else {
                this.title = null
                this.Http.get<HttpResponse<PostPaginatorInterface>>('/api/read_posts').subscribe({
                    next: (res) => {
                        this.posts = res.data.rows
                        this.posts = this.posts.map((element) => {
                            if (window.localStorage.getItem(JSON.stringify(element.id))) {
                                element.liked = true
                            } else element.liked = false
                            return element
                        })
                    },
                    error: () => {
                        this.Modal.setData = copyMock(ErrorMock)
                        this.Modal.setState = true
                    }
                })
            }
        })
        this.Http.get<HttpResponse<CategoriesInterface[] | null>>('/api/categories').subscribe({
            next: (res) => {
                this.categoriesList = res.data
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }

    like(event: Event, id: string | number) {
        const element = event.target as HTMLElement
        if (window.localStorage.getItem(JSON.stringify(id))) return
        this.Http.post('/api/like_post', { id }).subscribe(() => {
            window.localStorage.setItem(JSON.stringify(id), 'true')
            element.classList.add('liked')
            this.posts = this.posts.map((element) => {
                if (element.id === id) {
                    element.likes += 1
                    element.liked = true
                }
                return element
            })
        })
    }

    search(form: FormGroup) {
        this.Http.post<HttpResponse<null>>('/api/search', { mail: form.get('mail')?.value }).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    this.Router.navigate(['/search/'])
                }
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }

    subscribe(form: FormGroup) {
        this.sendingMail = true
        this.Http.post<HttpResponse<null>>('/api/register_mail', { mail: form.get('mail')?.value }).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    this.Modal.setData = copyMock(subscribedMock)
                    this.Modal.setState = true
                    this.subscribeForm.get('mail')?.setValue(null)
                    this.subscribeForm.get('mail')?.disable()
                    this.sendedMail = true
                    this.sendingMail = false
                }
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
                this.sendingMail = false
            }
        })
    }

    toggleMobile() {
        this.showMobile = !this.showMobile
    }

    navigateTo(URL: string) {
        const route = URL.replace(/\s/g, '_')
        this.Router.navigate(['/post/', route])
    }

    get mail() {
        return this.subscribeForm.get('mail')
    }
}
