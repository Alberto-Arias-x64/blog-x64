import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, PostInterface, PostPaginatorInterface } from 'src/app/interfaces/http.interface'
import { RouterLink } from '@angular/router'
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, NoDataMock, copyMock } from 'src/app/mocks/modals.mock'

@Component({
    selector: 'app-posts',
    standalone: true,
    imports: [CommonModule, RouterLink, RelativeDatePipe],
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)

    posts: PostInterface[] = []

    ngOnInit(): void {
        this.Http.get<HttpResponse<PostInterface[]>>('/api/admin/read_posts').subscribe({
            next: (res) => {
                if (res && res.data.length > 0) {
                    this.posts = res.data
                }
                else {
                    this.Modal.setData = copyMock(NoDataMock)
                    this.Modal.setState = true
                }
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }

    convertTitle(title: string) {
        return title.replace(/\s/g, '_')
    }
}
