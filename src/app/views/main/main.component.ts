import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { HttpClient } from '@angular/common/http';
import { PostInterface } from 'src/app/interfaces/http.interface';

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
        this.Http.get<PostInterface[]>('/uploads/posts/3_Formas_de_Centrar_un_Div_en_HTML_y_CSS.json').subscribe(res => {
            this.posts = [res,res,res,res]
        })
    }
}
