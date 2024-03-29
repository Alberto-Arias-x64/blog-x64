import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpResponse, WindowsInterface } from 'src/app/interfaces/http.interface'
import { IconifyComponent } from 'src/app/components/iconify/iconify.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, ErrorOpenMock, backupMock, confirmCancelMock, confirmDeleteMock, confirmUpdateMock, copyMock, windowFolderMock, windowUploadedMock } from 'src/app/mocks/modals.mock'
import { ModalInterface } from 'src/app/interfaces/modal.interface'
import { FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { saveAs } from 'file-saver'
@Component({
    selector: 'app-windows',
    standalone: true,
    imports: [CommonModule, FormsModule, IconifyComponent, AngularSvgIconModule, ReactiveFormsModule],
    templateUrl: './windows.component.html',
    styleUrls: ['./windows.component.scss']
})
export class WindowsComponent implements OnInit {
    @ViewChild('fileInput') fileInput!: ElementRef
    @ViewChild('editor') editor!: ElementRef

    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)

    path: string[] = []
    folders = []
    files = []
    activeElement: string | null = null
    newFolder = false
    openEditor = false
    uploadingFile = false
    editorData: string | null = null
    fileName: string | any = null
    fileData: string | any = null

    folderForm = this.Builder.group({
        folderName: new FormControl(null, [Validators.required])
    })

    ngOnInit(): void {
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
        this.Modal.setData = confirmModal
        this.Modal.setState = true
    }

    upload() {
        this.uploadingFile = true
        setTimeout(() => {
            const file = this.fileInput.nativeElement as HTMLInputElement
            file.click()
            file.addEventListener('change', () => {
                if (this.fileData) {
                    this.fileName = file.files?.item(0)?.name
                } else this.uploadingFile = false
            })
        }, 100)
    }

    update() {
        const confirmModal: ModalInterface = copyMock(confirmUpdateMock)
        confirmModal.buttonSecondary!.action = () => {
            this.updateText()
        }
        this.Modal.setData = confirmModal
        this.Modal.setState = true
    }

    cancelUpload() {
        this.uploadingFile = false
    }

    getPath() {
        let route = ''
        if (this.path.length === 0) route = ''
        else if (this.path.length === 1) route = this.path[0]
        else this.path.forEach((item) => (route += `/${item}`))
        this.Http.get<HttpResponse<WindowsInterface>>(`/api/admin/windows?path=${route}`).subscribe({
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
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
            }
        })
    }

    openFile(fileName: string | null) {
        let route = ''
        if (this.path.length === 0) route = ''
        else if (this.path.length === 1) route = this.path[0]
        else this.path.forEach((item) => (route += `/${item}`))
        route += `/${fileName}`
        this.Http.get<HttpResponse<string>>(`/api/admin/windows/read_file?path=${route}`).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    this.openEditor = true
                    setTimeout(() => {
                        this.editorData = res.data
                        this.path.push(fileName as string)
                    }, 100)
                } else {
                    this.Modal.setData = copyMock(ErrorOpenMock)
                    this.Modal.setState = true
                }
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
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
        this.Http.post<HttpResponse<any>>('/api/admin/windows/create_folder', newPath).subscribe({
            next: (res) => {
                if (res.status === 'OK') {
                    this.Modal.setData = copyMock(windowFolderMock)
                    this.Modal.setState = true
                    this.getPath()
                } else {
                    this.Modal.setData = copyMock(ErrorMock)
                    this.Modal.setState = true
                }
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true

            },
            complete: () => {
                this.newFolder = false
                form.reset()
            }
        })
    }

    backup() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        this.Http.get<Blob>('/api/admin/windows/backup', { headers, responseType: 'blob' as 'json' }).subscribe({
            next: (res) => {
                const backupModal = copyMock(backupMock)
                backupModal.buttonPrincipal!.action = () => {
                    const date = new Date()
                    saveAs(res, `backup_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`)
                }
                this.Modal.setData = backupModal
                this.Modal.setState = true
            },
            error: (err) => {
                console.log(err)
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
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
            this.Http.post<HttpResponse<string>>('/api/admin/windows/upload_file', form).subscribe({
                next: () => {
                    this.getPath()
                    this.uploadingFile = false
                    this.Modal.setData = copyMock(windowUploadedMock)
                    this.Modal.setState = true
                },
                error: () => {
                    this.Modal.setData = copyMock(ErrorMock)
                    this.Modal.setState = true
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
        this.Http.put<HttpResponse<string>>('api/admin/windows/update_file', form).subscribe({
            next: () => {
                this.Modal.setData = copyMock(windowUploadedMock)
                this.Modal.setState = true
                this.openEditor = false
            },
            error: () => {
                this.Modal.setData = copyMock(ErrorMock)
                this.Modal.setState = true
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
            this.Http.delete<HttpResponse<string>>(`/api/admin/windows/delete_file`, { body: { path: route } }).subscribe(() => {
                if (fileName) this.getPath()
                else {
                    this.editorData = ''
                    this.openEditor = false
                    this.return()
                }
            })
        }
        this.Modal.setData = confirmModal
        this.Modal.setState = true
    }

    deleteFolder(fileName: string | null) {
        const confirmModal: ModalInterface = copyMock(confirmDeleteMock)
        confirmModal.buttonSecondary!.action = () => {
            let route = ''
            if (this.path.length === 0) route = ''
            else if (this.path.length === 1) route = this.path[0]
            else this.path.forEach((item) => (route += `/${item}`))
            if (fileName) route += `/${fileName}`
            this.Http.delete<HttpResponse<string>>(`/api/admin/windows/delete_folder`, { body: { path: route } }).subscribe(() => {
                if (fileName) this.getPath()
                else {
                    this.editorData = ''
                    this.openEditor = false
                    this.return()
                }
            })
        }
        this.Modal.setData = confirmModal
        this.Modal.setState = true
    }

    clickOut(event: MouseEvent) {
        const target = event.target as HTMLElement
        if (target.id === 'clicOut') this.activeElement = null
    }

    get folderName() {
        return this.folderForm.get('folderName')
    }
}
