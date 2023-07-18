import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, WindowsInterface } from 'src/app/interfaces/http.interface'
import { IconifyComponent } from 'src/app/components/iconify/iconify.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorMock, ErrorOpenMock, confirmCancelMock, confirmDeleteMock, copyMock } from 'src/app/mocks/modals.mock'
import { ModalInterface } from 'src/app/interfaces/modal.interface'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-windows',
    standalone: true,
    imports: [CommonModule, FormsModule, IconifyComponent, AngularSvgIconModule],
    templateUrl: './windows.component.html',
    styleUrls: ['./windows.component.scss']
})
export class WindowsComponent implements OnInit {
    @ViewChild('editor') editor!: ElementRef
    private readonly Http = inject(HttpClient)
    private Modal = inject(ModalService)
    folders = []
    files = []
    path: string[] = []
    activeElement: string | null = null
    openEditor = false
    editorData = ''

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
            this.editorData = ''
            this.openEditor = false
        }
        this.Modal.setData = confirmModal
        this.Modal.setState = true
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
}
