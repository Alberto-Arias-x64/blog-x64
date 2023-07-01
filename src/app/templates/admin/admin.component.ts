import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from 'src/app/components/side-panel/side-panel.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,
        SidePanelComponent,
        HeaderComponent,
        RouterModule
    ],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
