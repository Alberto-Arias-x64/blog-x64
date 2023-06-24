import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, MessagesInterface } from 'src/app/interfaces/http.interface'

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    private readonly Http = inject(HttpClient)

    messages:MessagesInterface[] = []

    ngOnInit(): void {
        this.Http.get<HttpResponse<MessagesInterface[]>>('api/admin/read_messages').subscribe({
            next: (res => {
                this.messages = res.data
            }),
            error: (res: any) => {}
        })
    }
}
