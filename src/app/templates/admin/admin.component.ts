import { SidePanelComponent } from 'src/app/components/side-panel/side-panel.component'
import { HeaderComponent } from 'src/app/components/shared/header/header.component'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Component } from '@angular/core'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidePanelComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {}
