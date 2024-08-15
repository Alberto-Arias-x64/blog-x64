import { Component, input, OnInit, signal } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-iconify',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './iconify.component.html',
  styleUrl: './iconify.component.scss'
})
export class IconifyComponent implements OnInit {
  name = input.required<string>()
  iconType = input.required<'archive' | 'folder'>()
  image = signal('')

  ngOnInit() {
    if (this.iconType() === 'folder') this.image.set('/assets/icons/folder.svg')
    if (this.iconType() === 'archive') this.image.set('/assets/icons/file.svg')
  }
}
