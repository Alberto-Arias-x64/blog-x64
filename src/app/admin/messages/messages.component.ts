import type { HttpResponse, MessagesInterface } from 'src/app/core/interfaces/http.interface'
import { ErrorMock, NoDataMock, copyMock } from 'src/app/mocks/modals.mock'
import { RelativeDatePipe } from 'src/app/core/pipes/relative-date.pipe'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, OnInit, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, RelativeDatePipe, RouterModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  private readonly modalService = inject(ModalService)
  private readonly http = inject(HttpClient)

  messages: MessagesInterface[] = []

  ngOnInit() {
    this.http.get<HttpResponse<MessagesInterface[]>>('api/admin/read_messages').subscribe({
      next: (res) => {
        if (res && res.data?.length > 0) this.messages = res.data
        else {
          this.modalService.setData = copyMock(NoDataMock)
          this.modalService.setState = true
        }
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }
}
