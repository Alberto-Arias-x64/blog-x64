import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [CommonModule, SliderComponent],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private readonly Http = inject(HttpClient)
    posts: any

    ngOnInit(): void {
        this.Http.get('/uploads/documents/posts.json').subscribe(res => {
            this.posts = res
        })
    }
}
