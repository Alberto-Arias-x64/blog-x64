import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, MessagesInterface } from 'src/app/interfaces/http.interface'
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe'
import { RouterModule } from '@angular/router'

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, RelativeDatePipe, RouterModule],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    private readonly Http = inject(HttpClient)

    messages:MessagesInterface[] = []

    ngOnInit(): void {
        this.Http.get<HttpResponse<MessagesInterface[]>>('api/admin/read_messages').subscribe({
            next: (res => {
                if(res && res.data.length > 0) this.messages = res.data
            }),
            error: (res: any) => {}
        })
    }
}
