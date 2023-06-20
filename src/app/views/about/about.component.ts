import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageInterface, ProjectsInterface } from 'src/app/interfaces/http.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BlackFilterDirective } from 'src/app/directives/black-filter.directive';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, BlackFilterDirective],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    @ViewChild('BadgeContainer') BadgeContainer?: ElementRef

    private readonly Http = inject(HttpClient)
    public Badges: ImageInterface[] = []
    public Projects: ProjectsInterface[] = []

    ngOnInit(): void {
        this.Http.get<ImageInterface[]>('/uploads/documents/badges.json').subscribe(res => {
            this.Badges = res
            setTimeout(() => {
                const containerLength = this.BadgeContainer?.nativeElement.scrollWidth
                var stylesheet = document.styleSheets[0]
                var animationName = "autoMove"
                var keyframes = `0%{ transform: translateX(0); } 100%{ transform: translateX(-${(containerLength/2)+4}px); }`
                var rule = "@keyframes " + animationName + " { " + keyframes + " }"
                stylesheet.insertRule(rule, stylesheet.cssRules.length)
            }, 10)
        })
        this.Http.get<ProjectsInterface[]>('/uploads/documents/projects.json').subscribe(res => {
            this.Projects = res
        })
    }

    sendTo(URL: string) {
        window.open(URL);
    }
}
