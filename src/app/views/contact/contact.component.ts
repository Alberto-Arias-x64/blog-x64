import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { PhoneDirective } from 'src/app/directives/phone.directive';
import { SvgLoaderComponent } from 'src/app/components/svg-loader/svg-loader.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhoneDirective, SvgLoaderComponent],
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
