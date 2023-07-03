import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, PostInterface } from 'src/app/interfaces/http.interface'
import { RouterLink } from '@angular/router'
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe'

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule, RouterLink, RelativeDatePipe],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
    private readonly Http = inject(HttpClient)

    posts: PostInterface[] = []

    ngOnInit(): void {
        this.Http.get<HttpResponse<PostInterface[]>>('/api/read_posts').subscribe(res => {
            this.posts = res.data
        })
    }
}
