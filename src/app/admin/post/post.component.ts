/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMock, confirmMock, copyMock, messageSendMock, postCreatedMock, postUpdatedMock } from 'src/app/mocks/modals.mock'
import type { CategoriesInterface, HttpResponse, PostInterface } from 'src/app/core/interfaces/http.interface'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, OnInit, inject } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  private readonly activeRoute = inject(ActivatedRoute)
  private readonly modalService = inject(ModalService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)
  private idPost: string | null = null

  categoriesList?: CategoriesInterface[] | null
  selectedImage: string | null = null
  sendingFlag = false
  editFlag = false

  form = this.formBuilder.group({
    title: new FormControl(null, [Validators.required]),
    keywords: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    document: new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    if (this.router.url.includes('edit_post')) {
      this.editFlag = true
      const { id } = this.activeRoute.snapshot.params
      this.http.get<HttpResponse<PostInterface>>(`/api/read_post/${id}`).subscribe({
        next: (response: any) => {
          this.form.get('title')?.setValue(response.data.title)
          this.form.get('keywords')?.setValue(response.data.keywords)
          this.form.get('category')?.setValue(response.data.category)
          this.form.get('description')?.setValue(response.data.description)
          this.selectedImage = response.data.image
          this.form.get('image')?.clearValidators()
          this.form.get('image')?.updateValueAndValidity()
          this.form.get('document')?.clearValidators()
          this.form.get('document')?.updateValueAndValidity()
          this.idPost = response.data.id
        },
        error: () => this.router.navigate(['/404'])
      })
    }
    this.http.get<HttpResponse<CategoriesInterface[] | null>>('/api/categories').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) this.categoriesList = res.data
      }
    })
  }

  sendForm(form: FormGroup) {
    if (form.invalid) return
    this.sendingFlag = true
    this.modalService.setData = copyMock(messageSendMock)

    const formData = new FormData()
    Object.entries(form.value).forEach(([clave, valor]: [string, any]) => {
      formData.append(clave, valor)
    })

    if (this.router.url.includes('edit_post')) {
      formData.append('id', this.idPost as string)
      this.http.put<HttpResponse<any>>('/api/admin/update_post', formData).subscribe({
        next: (res) => {
          this.sendingFlag = false
          if (res.status === 'OK') {
            this.modalService.setData = copyMock(postUpdatedMock)
            this.modalService.setState = true
            form.reset()
            this.router.navigate(['/admin/posts'])
          }
        },
        error: () => {
          this.sendingFlag = false
          this.modalService.setData = copyMock(ErrorMock)
          this.modalService.setState = true
        }
      })
    } else {
      this.http.post<HttpResponse<any>>('/api/admin/send_post', formData).subscribe({
        next: (res) => {
          this.sendingFlag = false
          if (res.status === 'OK') {
            this.modalService.setData = copyMock(postCreatedMock)
            this.modalService.setState = true
            form.reset()
            this.router.navigate(['/admin/posts'])
          }
        },
        error: () => {
          this.sendingFlag = false
          this.modalService.setData = copyMock(ErrorMock)
          this.modalService.setState = true
        }
      })
    }
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

  deleteBlog() {
    const confirm = copyMock(confirmMock)
    confirm.buttonSecondary.action = () => {
      this.http.delete('/api/admin/delete_post', { body: { id: this.idPost } }).subscribe(() => {
        this.router.navigate(['/admin/posts'])
      })
    }
    this.modalService.setData = confirm
    this.modalService.setState = true
  }

  return() {
    const confirm = copyMock(confirmMock)
    confirm.buttonSecondary.action = () => {
      this.router.navigate(['/admin/posts'])
    }
    this.modalService.setData = confirm
    this.modalService.setState = true
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
