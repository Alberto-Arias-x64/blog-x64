import type { HttpResponse, PostInterface } from 'src/app/core/interfaces/http.interface'
import { ErrorMock, NoDataMock, copyMock } from 'src/app/mocks/modals.mock'
import { RelativeDatePipe } from 'src/app/core/pipes/relative-date.pipe'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, inject, OnInit, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink, RelativeDatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
  private readonly modalService = inject(ModalService)
  private readonly http = inject(HttpClient)

  posts = signal<PostInterface[]>([])

  ngOnInit() {
    this.http.get<HttpResponse<PostInterface[]>>('/api/admin/read_posts').subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) this.posts.set(res.data)
        else {
          this.modalService.setData = copyMock(NoDataMock)
          this.modalService.setState = true
        }
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  convertTitle(title: string) {
    return title.replace(/\s/g, '_')
  }
}
