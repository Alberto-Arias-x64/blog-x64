import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, MessagesInterface } from 'src/app/interfaces/http.interface'
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe'
import { RouterModule } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, NoDataMock, copyMock } from 'src/app/mocks/modals.mock'

@Component({
    selector: 'app-messages',
    standalone: true,
    imports: [CommonModule, RelativeDatePipe, RouterModule],
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)

    messages:MessagesInterface[] = []

    ngOnInit(): void {
        this.Http.get<HttpResponse<MessagesInterface[]>>('api/admin/read_messages').subscribe({
            next: (res => {
                if(res && res.data?.length > 0) this.messages = res.data
                else {
                    this.Modal.setData = copyMock(NoDataMock)
                    this.Modal.setState = true
                }
            }),
            error: (res: any) => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }
}
