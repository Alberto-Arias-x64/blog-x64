import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from 'src/app/components/side-panel/side-panel.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [
        CommonModule,
        SidePanelComponent,
        RouterModule
    ],
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
