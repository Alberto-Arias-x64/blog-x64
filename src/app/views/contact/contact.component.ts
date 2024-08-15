import { ReactiveFormsModule, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { ErrorMock, copyMock, messageSendMock } from 'src/app/mocks/modals.mock'
import type { HttpResponse } from 'src/app/core/interfaces/http.interface'
import { PhoneDirective } from 'src/app/core/directives/phone.directive'
import { ModalService } from 'src/app/core/services/modal.service'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { Component, inject, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneDirective, AngularSvgIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly modalService = inject(ModalService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly http = inject(HttpClient)

  sendingFlag = signal(false)

  form = this.formBuilder.group({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    mail: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.required])
  })

  sendForm(form: FormGroup) {
    if (form.invalid) return
    this.sendingFlag.set(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.post<HttpResponse<any>>('/api/send_message', form.value).subscribe({
      next: (res) => {
        this.sendingFlag.set(false)
        if (res.status === 'OK') {
          this.modalService.setData = copyMock(messageSendMock)
          this.modalService.setState = true
          form.reset()
        }
      },
      error: () => {
        this.sendingFlag.set(false)
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  get name() {
    return this.form.get('name')
  }
  get phone() {
    return this.form.get('phone')
  }
  get mail() {
    return this.form.get('mail')
  }
  get message() {
    return this.form.get('message')
  }
}
