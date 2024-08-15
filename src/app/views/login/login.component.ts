import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import type { HttpResponse } from 'src/app/core/interfaces/http.interface'
import { ModalService } from 'src/app/core/services/modal.service'
import { BlockIPMock, copyMock } from 'src/app/mocks/modals.mock'
import { AuthService } from 'src/app/core/services/auth.service'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { Component, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly modalService = inject(ModalService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)

  sendingFlag = false

  form = this.formBuilder.group({
    mail: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  sendForm(form: FormGroup) {
    if (form.invalid) return
    this.sendingFlag = true
    const modalTemplate = copyMock(BlockIPMock)
    modalTemplate.buttonPrincipal.action = () => {
      this.router.navigate(['/'])
    }
    this.modalService.setData = modalTemplate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.post<HttpResponse<any>>('/api/auth/login', form.value).subscribe({
      next: (res) => {
        this.sendingFlag = false
        if (res.status === 'OK') {
          form.reset()
          this.authService.setToken = res.data.token
          this.router.navigate(['admin'])
        } else this.modalService.setState = true
      },
      error: () => {
        this.sendingFlag = false
        this.modalService.setState = true
      }
    })
  }

  get mail() {
    return this.form.get('mail')
  }
  get password() {
    return this.form.get('password')
  }
}
