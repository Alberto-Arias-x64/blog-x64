import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'

@Component({
    selector: 'app-iconify',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule],
    templateUrl: './iconify.component.html',
    styleUrls: ['./iconify.component.scss']
})
export class IconifyComponent implements OnInit {
    @Input() name: string = ''
    @Input() iconType: 'archive' | 'folder' = 'folder'
    @Output() iconClicked = new EventEmitter<string>()
    public image = ''

    ngOnInit(): void {
        if (this.iconType === 'folder') {
            this.image = '/assets/icons/folder.svg'
        }
        if (this.iconType === 'archive') {
            this.image = '/assets/icons/file.svg'
        }
    }
}
