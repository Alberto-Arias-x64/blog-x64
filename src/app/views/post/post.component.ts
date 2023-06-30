import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarkdownModule } from 'ngx-markdown'
import { ActivatedRoute, Router } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { PostInterface } from 'src/app/interfaces/http.interface'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, MarkdownModule],
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
        this.Http.get<PostInterface>(`/uploads/posts/${id}.json`).subscribe({
            next: (response) => {
                this.data = response
                this.metaTags(response)
            },
            error: () => this.Router.navigate(['/404'])
        })
    }

    metaTags(data: PostInterface) {
        this.Title.setTitle(`${data.name} | Albeto Arias`)
        this.Meta.addTag({ name: 'description', value: data.description })
        this.Meta.addTag({ name: 'keywords', content: data.keywords })
        this.Meta.addTag({ name: 'author', content: 'Alberto Arias' })
        this.Meta.addTag({ name: 'robots', content: 'index, follow' })
        this.Meta.addTag({ property: 'og:title', content: data.name })
        this.Meta.addTag({ property: 'og:description', content: data.description })
        this.Meta.addTag({ property: 'og:image', content: data.image })
    }
}
