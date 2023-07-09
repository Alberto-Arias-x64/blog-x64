import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarkdownModule } from 'ngx-markdown'
import { ActivatedRoute, Router } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, PostInterface } from 'src/app/interfaces/http.interface'
import { AngularSvgIconModule } from 'angular-svg-icon'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, MarkdownModule, AngularSvgIconModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    private readonly Route = inject(ActivatedRoute)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    private readonly Meta = inject(Meta)
    private Title = inject(Title)
    data?: PostInterface

    ngOnInit(): void {
        const { id } = this.Route.snapshot.params
        this.Http.get<HttpResponse<PostInterface>>(`/api/read_post/${id}`).subscribe({
            next: (response) => {
                this.data = response.data
                this.metaTags(response.data)
                if (this.data){
                    if (window.localStorage.getItem(JSON.stringify(this.data.id))) {
                        this.data.liked = true
                    }
                    else this.data.liked = false
                }
            },
            error: () => this.Router.navigate(['/404'])
        })
    }

    metaTags(data: PostInterface) {
        this.Title.setTitle(`${data.title} | Albeto Arias`)
        this.Meta.addTag({ name: 'description', value: data.description })
        this.Meta.addTag({ name: 'keywords', content: data.keywords })
        this.Meta.addTag({ name: 'author', content: 'Alberto Arias' })
        this.Meta.addTag({ name: 'robots', content: 'index, follow' })
        this.Meta.addTag({ property: 'og:title', content: data.title })
        this.Meta.addTag({ property: 'og:description', content: data.description })
        this.Meta.addTag({ property: 'og:image', content: data.image })
    }

    like(event: Event,id: string | number) {
        const element = event.target as HTMLElement
        if (window.localStorage.getItem(JSON.stringify(id))) return
        this.Http.post('/api/like_post', { id }).subscribe(() => {
            window.localStorage.setItem(JSON.stringify(id), 'true')
            element.classList.add("liked")
        })
    }

    return() {
        this.Router.navigate(["/"])
    }
}
