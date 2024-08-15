import { BlackFilterDirective } from 'src/app/core/directives/black-filter.directive'
import { ZoomFilterDirective } from 'src/app/core/directives/zoom-filter.directive'
import { ShowBadgesDirective } from 'src/app/core/directives/show-badges.directive'
import { ProjectsInterface } from 'src/app/core/interfaces/http.interface'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, OnInit, inject, signal } from '@angular/core'
import { ErrorMock, copyMock } from 'src/app/mocks/modals.mock'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, ZoomFilterDirective, ShowBadgesDirective, BlackFilterDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  private readonly modalService = inject(ModalService)
  private readonly http = inject(HttpClient)
  Projects = signal<ProjectsInterface[]>([])

  ngOnInit() {
    this.http.get<ProjectsInterface[]>('/uploads/documents/projects.json').subscribe({
      next: (res) => {
        this.Projects.set(res)
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  sendTo(URL: string) {
    window.open(URL)
  }
}
