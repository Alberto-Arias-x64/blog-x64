import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { HttpResponse } from 'src/app/interfaces/http.interface'
import { messageSendMock } from 'src/app/mocks/modals.mock'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    private Modal = inject(ModalService)

    sendingFlag = false

    form = this.Builder.group({
        title: new FormControl(null, [Validators.required]),
        keywords: new FormControl(null, [Validators.required]),
        tags: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        document: new FormControl(null, [Validators.required])
    })

    sendForm(form: FormGroup) {
        if (form.invalid) return
        this.sendingFlag = true
        this.Modal.setData = messageSendMock

        const formData = new FormData()
        Object.entries(this.form.value).forEach(([clave, valor]: [string, any]) => {
            formData.append(clave, valor)
        })

        this.Http.post<HttpResponse<any>>('/api/admin/send_post', formData).subscribe({
            next: (res) => {
                this.sendingFlag = false
                if (res.status === 'OK') {
                    this.Modal.setState = true
                    form.reset()
                }
            },
            error(err) {
                console.log(err)
            }
        })
    }

    selectFile(event: any, control: string) {
        const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null
        this.form.get(control)?.setValue(file)
    }

    touchField(control: string){
        this.form.get(control)?.markAsTouched()
    }

    get title() {
        return this.form.get('title')
    }
    get keywords() {
        return this.form.get('keywords')
    }
    get tags() {
        return this.form.get('tags')
    }
    get description() {
        return this.form.get('description')
    }
    get image() {
        return this.form.get('image')
    }
    get document() {
        return this.form.get('document')
    }
}
