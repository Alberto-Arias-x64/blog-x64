import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PhoneDirective } from 'src/app/directives/phone.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'src/app/interfaces/http.interface';
import { ModalService } from 'src/app/services/modal.service';
import { messageSendMock } from 'src/app/mocks/modals.mock';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, PhoneDirective, AngularSvgIconModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)

    sendingFlag = false

    form = this.Builder.group({
        name: new FormControl(null, [Validators.required,]),
        phone: new FormControl(null, [Validators.required,]),
        mail: new FormControl(null, [Validators.required, Validators.email]),
        message: new FormControl(null, [Validators.required,]),
    })

    sendForm(form: FormGroup) {
        if (form.invalid) return
        this.sendingFlag = true
        this.Modal.setData = messageSendMock
        this.Http.post<HttpResponse<any>>('/api/send_message', form.value).subscribe((res) => {
            this.sendingFlag = false
            if (res.status === 'OK') {
                this.Modal.setState = true
                form.reset()
            }
        })
    }

    get name () {return this.form.get('name')}
    get phone () {return this.form.get('phone')}
    get mail () {return this.form.get('mail')}
    get message () {return this.form.get('message')}
}
