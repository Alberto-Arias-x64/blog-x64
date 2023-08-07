import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        RouterOutlet
    ],
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
    private readonly Router = inject(ActivatedRoute)

    ngOnInit() {
        this.Router.url.subscribe(() => {
            window.scrollTo(0, 0)
        })
    }
}
