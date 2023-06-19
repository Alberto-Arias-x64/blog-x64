import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
    selector: 'app-principal',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        RouterOutlet,
        ModalComponent
    ],
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

}
