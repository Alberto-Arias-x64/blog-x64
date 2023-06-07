import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PhoneDirective } from 'src/app/directives/phone.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule, PhoneDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    private readonly Builder = inject(FormBuilder)
    form = this.Builder.group({
        name: new FormControl(null, [Validators.required,]),
        phone: new FormControl(null, [Validators.required,]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        message: new FormControl(null, [Validators.required,]),
    })

    sendForm(form: FormGroup){
        if (form.invalid) return

    }
}
