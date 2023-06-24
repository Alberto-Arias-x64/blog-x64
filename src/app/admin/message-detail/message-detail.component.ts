import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-message-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './message-detail.component.html',
    styleUrls: ['./message-detail.component.scss']
})
export class MessageDetailComponent implements OnInit {
    ngOnInit(): void {}
}
