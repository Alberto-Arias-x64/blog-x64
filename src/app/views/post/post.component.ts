import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MarkdownModule } from 'ngx-markdown'
import { ActivatedRoute } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, MarkdownModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    private readonly Route = inject(ActivatedRoute)
    private readonly Meta = inject(Meta)
    private Title = inject(Title)

    ngOnInit(): void {
        const { id } = this.Route.snapshot.params
        console.log('', id)
    }

    metaTags() {
        this.Title.setTitle(`${1} | Albeto Arias`)
        this.Meta.addTag({name: "description", value: ""})
        this.Meta.addTag({name: "keywords", content: ""})
        this.Meta.addTag({name: "author", content: "Alberto Arias"})
        this.Meta.addTag({name: "robots", content: "index, follow"})
        this.Meta.addTag({property: "og:title", content: ""})
        this.Meta.addTag({property: "og:description", content: ""})
        this.Meta.addTag({property: "og:image", content: ""})
    }
}
