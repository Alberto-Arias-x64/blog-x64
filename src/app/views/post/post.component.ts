import type { HttpResponse, PostInterface } from 'src/app/core/interfaces/http.interface'
import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { MarkdownModule } from 'ngx-markdown'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MarkdownModule, AngularSvgIconModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @ViewChild('likeButton') likeButton!: ElementRef

  private readonly route = inject(ActivatedRoute)
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)
  private readonly meta = inject(Meta)
  private readonly title = inject(Title)
  data?: PostInterface
  URL = ''

  ngOnInit() {
    const { id } = this.route.snapshot.params
    this.http.get<HttpResponse<PostInterface>>(`/api/read_post/${id}`).subscribe({
      next: (response) => {
        this.data = response.data
        this.metaTags(response.data as PostInterface)
        if (this.data) {
          if (window.localStorage.getItem(JSON.stringify(this.data.id))) this.data.liked = true
          else this.data.liked = false
        }
      },
      error: () => this.router.navigate(['/404'])
    })
    this.URL = window.location.href
  }

  metaTags(data: PostInterface) {
    this.title.setTitle(`${data.title} | Albeto Arias`)
    this.meta.addTag({ name: 'description', value: data.description })
    this.meta.addTag({ name: 'keywords', content: data.keywords })
    this.meta.addTag({ name: 'author', content: 'Alberto Arias' })
    this.meta.addTag({ name: 'robots', content: 'index, follow' })
    this.meta.addTag({ property: 'og:title', content: data.title })
    this.meta.addTag({ property: 'og:description', content: data.description })
    this.meta.addTag({ property: 'og:image', content: data.image })
  }

  like(id: string | number) {
    const element = this.likeButton.nativeElement as HTMLElement
    if (window.localStorage.getItem(JSON.stringify(id))) return
    this.http.post('/api/like_post', { id }).subscribe(() => {
      window.localStorage.setItem(JSON.stringify(id), 'true')
      element.classList.add('liked')
      this.data!.liked = true
      this.data!.likes++
    })
  }
}
