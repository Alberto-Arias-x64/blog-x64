import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ProjectsInterface } from 'src/app/interfaces/http.interface'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ZoomFilterDirective } from 'src/app/directives/zoom-filter.directive'
import { ShowBadgesDirective } from 'src/app/directives/show-badges.directive'
import { BlackFilterDirective } from 'src/app/directives/black-filter.directive'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, copyMock } from 'src/app/mocks/modals.mock'

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ZoomFilterDirective, ShowBadgesDirective, BlackFilterDirective],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    private readonly Http = inject(HttpClient)
    private Modal = inject (ModalService)
    public Projects: ProjectsInterface[] = []

    ngOnInit(): void {
        this.Http.get<ProjectsInterface[]>('/uploads/documents/projects.json').subscribe({
            next: (res) => {
                this.Projects = res
            },
            error:() => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }

    sendTo(URL: string) {
        window.open(URL)
    }
}
