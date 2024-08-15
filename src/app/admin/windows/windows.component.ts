import { ErrorMock, ErrorOpenMock, backupMock, confirmCancelMock, confirmDeleteMock, confirmUpdateMock, copyMock, windowFolderMock, windowUploadedMock } from 'src/app/mocks/modals.mock'
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import type { HttpResponse, WindowsInterface } from 'src/app/core/interfaces/http.interface'
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'
import { IconifyComponent } from 'src/app/components/iconify/iconify.component'
import type { ModalInterface } from 'src/app/core/interfaces/modal.interface'
import { ModalService } from 'src/app/core/services/modal.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { CommonModule } from '@angular/common'
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-windows',
  standalone: true,
  imports: [CommonModule, FormsModule, IconifyComponent, AngularSvgIconModule, ReactiveFormsModule],
  templateUrl: './windows.component.html',
  styleUrl: './windows.component.scss'
})
export class WindowsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef
  @ViewChild('editor') editor!: ElementRef

  private readonly modalService = inject(ModalService)
  private readonly formBuilder = inject(FormBuilder)
  private readonly http = inject(HttpClient)

  path: string[] = []
  folders: string[] = []
  files: string[] = []
  activeElement: string | null = null
  newFolder = false
  openEditor = false
  uploadingFile = false
  editorData: string | null = null
  fileName: string | null = null
  fileData: string | null = null

  folderForm = this.formBuilder.group({
    folderName: new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    this.getPath()
  }

  open(item: string) {
    this.activeElement = null
    this.path.push(item)
    this.getPath()
  }

  active(item: string) {
    this.activeElement = item
  }

  isArchive(item: string | null) {
    return this.files.includes(item as never)
  }

  return() {
    this.activeElement = null
    this.path.pop()
    this.getPath()
  }

  cancel() {
    const confirmModal: ModalInterface = copyMock(confirmCancelMock)
    confirmModal.buttonSecondary!.action = () => {
      this.path.pop()
      this.editorData = null
      this.openEditor = false
    }
    this.modalService.setData = confirmModal
    this.modalService.setState = true
  }

  upload() {
    this.uploadingFile = true
    setTimeout(() => {
      const file = this.fileInput.nativeElement as HTMLInputElement
      file.click()
      file.addEventListener('change', () => {
        if (this.fileData) {
          this.fileName = file.files?.item(0)?.name ?? null
        } else this.uploadingFile = false
      })
    }, 100)
  }

  update() {
    const confirmModal: ModalInterface = copyMock(confirmUpdateMock)
    confirmModal.buttonSecondary!.action = () => {
      this.updateText()
    }
    this.modalService.setData = confirmModal
    this.modalService.setState = true
  }

  cancelUpload() {
    this.uploadingFile = false
  }

  getPath() {
    let route = ''
    if (this.path.length === 0) route = ''
    else if (this.path.length === 1) route = this.path[0]
    else this.path.forEach((item) => (route += `/${item}`))
    this.http.get<HttpResponse<WindowsInterface>>(`/api/admin/windows?path=${route}`).subscribe({
      next: (res) => {
        if (res.data) {
          this.folders = res.data.folders
          this.files = res.data.archives
        } else {
          this.folders = []
          this.files = []
        }
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  openFile(fileName: string | null) {
    let route = ''
    if (this.path.length === 0) route = ''
    else if (this.path.length === 1) route = this.path[0]
    else this.path.forEach((item) => (route += `/${item}`))
    route += `/${fileName}`
    this.http.get<HttpResponse<string>>(`/api/admin/windows/read_file?path=${route}`).subscribe({
      next: (res) => {
        if (res.status === 'OK') {
          this.openEditor = true
          setTimeout(() => {
            this.editorData = res.data ?? ''
            this.path.push(fileName as string)
          }, 100)
        } else {
          this.modalService.setData = copyMock(ErrorOpenMock)
          this.modalService.setState = true
        }
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  folder() {
    this.newFolder = true
  }

  cancelFolder() {
    this.newFolder = false
  }

  createFolder(form: FormGroup) {
    let route = ''
    if (this.path.length === 0) route = ''
    else if (this.path.length === 1) route = this.path[0]
    else this.path.forEach((item) => (route += `/${item}`))
    route += `/${form.get('folderName')?.value}`
    const newPath = {
      path: route
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.http.post<HttpResponse<any>>('/api/admin/windows/create_folder', newPath).subscribe({
      next: (res) => {
        if (res.status === 'OK') {
          this.modalService.setData = copyMock(windowFolderMock)
          this.modalService.setState = true
          this.getPath()
        } else {
          this.modalService.setData = copyMock(ErrorMock)
          this.modalService.setState = true
        }
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      },
      complete: () => {
        this.newFolder = false
        form.reset()
      }
    })
  }

  backup() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    this.http.get<Blob>('/api/admin/windows/backup', { headers, responseType: 'blob' as 'json' }).subscribe({
      next: (res) => {
        const backupModal = copyMock(backupMock)
        backupModal.buttonPrincipal!.action = () => {
          const date = new Date()
          saveAs(res, `backup_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`)
        }
        this.modalService.setData = backupModal
        this.modalService.setState = true
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  uploadFile() {
    const file = this.fileInput.nativeElement.files?.item(0)
    let route = ''
    if (this.path.length === 0) route = ''
    else if (this.path.length === 1) route = this.path[0]
    else this.path.forEach((item) => (route += `/${item}`))
    if (file) {
      const form = new FormData()
      form.append('file', file)
      form.append('route', route)
      this.http.post<HttpResponse<string>>('/api/admin/windows/upload_file', form).subscribe({
        next: () => {
          this.getPath()
          this.uploadingFile = false
          this.modalService.setData = copyMock(windowUploadedMock)
          this.modalService.setState = true
        },
        error: () => {
          this.modalService.setData = copyMock(ErrorMock)
          this.modalService.setState = true
        }
      })
    }
  }

  updateText() {
    let route = ''
    if (this.path.length === 0) route = ''
    else if (this.path.length === 1) route = this.path[0]
    else this.path.forEach((item) => (route += `/${item}`))
    const form = {
      text: this.editorData,
      route: route
    }
    this.http.put<HttpResponse<string>>('api/admin/windows/update_file', form).subscribe({
      next: () => {
        this.modalService.setData = copyMock(windowUploadedMock)
        this.modalService.setState = true
        this.openEditor = false
      },
      error: () => {
        this.modalService.setData = copyMock(ErrorMock)
        this.modalService.setState = true
      }
    })
  }

  deleteFile(fileName: string | null) {
    const confirmModal: ModalInterface = copyMock(confirmDeleteMock)
    confirmModal.buttonSecondary!.action = () => {
      let route = ''
      if (this.path.length === 0) route = ''
      else if (this.path.length === 1) route = this.path[0]
      else this.path.forEach((item) => (route += `/${item}`))
      if (fileName) route += `/${fileName}`
      this.http.delete<HttpResponse<string>>(`/api/admin/windows/delete_file`, { body: { path: route } }).subscribe(() => {
        if (fileName) this.getPath()
        else {
          this.editorData = ''
          this.openEditor = false
          this.return()
        }
      })
    }
    this.modalService.setData = confirmModal
    this.modalService.setState = true
  }

  deleteFolder(fileName: string | null) {
    const confirmModal: ModalInterface = copyMock(confirmDeleteMock)
    confirmModal.buttonSecondary!.action = () => {
      let route = ''
      if (this.path.length === 0) route = ''
      else if (this.path.length === 1) route = this.path[0]
      else this.path.forEach((item) => (route += `/${item}`))
      if (fileName) route += `/${fileName}`
      this.http.delete<HttpResponse<string>>(`/api/admin/windows/delete_folder`, { body: { path: route } }).subscribe(() => {
        if (fileName) this.getPath()
        else {
          this.editorData = ''
          this.openEditor = false
          this.return()
        }
      })
    }
    this.modalService.setData = confirmModal
    this.modalService.setState = true
  }

  clickOut(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (target.id === 'clicOut') this.activeElement = null
  }

  get folderName() {
    return this.folderForm.get('folderName')
  }
}
