import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

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
export class PrincipalComponent {

}
