import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpResponse } from 'src/app/interfaces/http.interface';
import { ModalService } from 'src/app/services/modal.service';
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BlockIPMock } from 'src/app/mocks/modals.mock';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, AngularSvgIconModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)

    sendingFlag = false

    form = this.Builder.group({
        mail: new FormControl(null, [Validators.required,]),
        password: new FormControl(null, [Validators.required,]),
    })

    sendForm(form: FormGroup) {
        if (form.invalid) return
        this.sendingFlag = true
        this.Modal.setData = BlockIPMock
        this.Http.post<HttpResponse<any>>('/api/admin/login', form.value).subscribe((res) => {
            this.sendingFlag = false
            if (res.status === 'OK') {
                form.reset()
            }
            else {
                this.Modal.setState = true
            }
        })
    }

    get mail() { return this.form.get('mail') }
    get password() { return this.form.get('password') }
}
