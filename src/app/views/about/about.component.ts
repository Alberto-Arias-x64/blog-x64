import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BadgeModel } from 'src/app/models/http.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit{

    private Http = inject(HttpClient)
    public Badges:BadgeModel[] = []

    ngOnInit(): void {
        this.Http.get<BadgeModel[]>('/assets/documents/badges.json').subscribe(res => this.Badges = res)
    }

    sendTo(URL: string) {
        window.open(URL);
    }
}
