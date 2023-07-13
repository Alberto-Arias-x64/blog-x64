import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CategoriesInterface, HttpResponse, PostInterface } from 'src/app/interfaces/http.interface'
import { ErrorMock, confirmMock, copyMock, messageSendMock, postCreatedMock } from 'src/app/mocks/modals.mock'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    private readonly Route = inject(ActivatedRoute)
    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    private Modal = inject(ModalService)

    categoriesList?: CategoriesInterface[] | null
    selectedImage: string | null = null
    sendingFlag = false
    editFlag = false

    form = this.Builder.group({
        title: new FormControl(null, [Validators.required]),
        keywords: new FormControl(null, [Validators.required]),
        category: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        document: new FormControl(null, [Validators.required])
    })

    ngOnInit(): void {
        if (this.Router.url.includes('edit_post')) {
            this.editFlag = true
            const { id } = this.Route.snapshot.params
            this.Http.get<HttpResponse<PostInterface>>(`/api/read_post/${id}`).subscribe({
                next: (response) => {
                    this.form.get('title')?.setValue(response.data.title)
                    this.form.get('keywords')?.setValue(response.data.keywords)
                    this.form.get('category')?.setValue(response.data.category)
                    this.form.get('description')?.setValue(response.data.description)
                    this.selectedImage = response.data.image
                    this.form.get("image")?.clearValidators()
                    this.form.get("image")?.updateValueAndValidity()
                    this.form.get("document")?.clearValidators()
                    this.form.get("document")?.updateValueAndValidity()
                },
                error: () => this.Router.navigate(['/404'])
            })
        }
        this.Http.get<HttpResponse<CategoriesInterface[] | null>>('/api/categories').subscribe({
            next: (res) => {
                this.categoriesList = res.data
            }
        })
    }

    sendForm(form: FormGroup) {
        if (form.invalid) return
        this.sendingFlag = true
        this.Modal.setData = copyMock(messageSendMock)

        const formData = new FormData()
        Object.entries(this.form.value).forEach(([clave, valor]: [string, any]) => {
            formData.append(clave, valor)
        })

        this.Http.post<HttpResponse<any>>('/api/admin/send_post', formData).subscribe({
            next: (res) => {
                this.sendingFlag = false
                if (res.status === 'OK') {
                    this.Modal.setData = copyMock(postCreatedMock)
                    this.Modal.setState = true
                    form.reset()
                }
            },
            error: (err) => {
                this.sendingFlag = false
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
                console.log(err)
            }
        })
    }

    selectFile(event: any, control: string) {
        const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null
        this.form.get(control)?.setValue(file)
    }

    selectImage(event: any) {
        const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null
        this.selectedImage = URL.createObjectURL(file)
    }

    touchField(control: string) {
        this.form.get(control)?.markAsTouched()
    }

    deleteBlog(){
        const confirm = copyMock(confirmMock)
        confirm.buttonSecondary.action = () => {
            this.Http.delete('/api/admin/send_post')
            this.Router.navigate(['/admin/posts'])
        }
        this.Modal.setData = confirm
        this.Modal.setState = true
    }

    return() {
        const confirm = copyMock(confirmMock)
        confirm.buttonSecondary.action = () => {
            this.Router.navigate(['/admin/posts'])
        }
        this.Modal.setData = confirm
        this.Modal.setState = true
    }

    get title() {
        return this.form.get('title')
    }
    get keywords() {
        return this.form.get('keywords')
    }
    get category() {
        return this.form.get('category')
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
