import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { HttpClient } from '@angular/common/http';
import { HttpResponse, PostInterface } from 'src/app/interfaces/http.interface';

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
        this.Http.get<HttpResponse<PostInterface[]>>('/api/read_posts').subscribe(res => {
            this.posts = res.data
        })
    }
}
