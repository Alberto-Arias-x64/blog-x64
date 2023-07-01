import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageInterface, ProjectsInterface } from 'src/app/interfaces/http.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ZoomFilterDirective } from 'src/app/directives/zoom-filter.directive';
import { ShowBadgesDirective } from 'src/app/directives/show-badges.directive';
import { BlackFilterDirective } from 'src/app/directives/black-filter.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ZoomFilterDirective, ShowBadgesDirective, BlackFilterDirective],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    private readonly Http = inject(HttpClient)
    public Projects: ProjectsInterface[] = []

    ngOnInit(): void {
        this.Http.get<ProjectsInterface[]>('/uploads/documents/projects.json').subscribe(res => {
            this.Projects = res
        })
    }

    sendTo(URL: string) {
        window.open(URL);
    }
}
