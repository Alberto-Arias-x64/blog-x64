import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, WindowsInterface } from 'src/app/interfaces/http.interface'
import { IconifyComponent } from 'src/app/components/iconify/iconify.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ModalService } from 'src/app/services/modal.service'
import { ErrorOpenMock, confirmDeleteMock, copyMock } from 'src/app/mocks/modals.mock'
import { ModalInterface } from 'src/app/interfaces/modal.interface'

@Component({
    selector: 'app-windows',
    standalone: true,
    imports: [CommonModule, IconifyComponent, AngularSvgIconModule],
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
                    this.editor.nativeElement.value = res.data
                } else {
                    this.Modal.setData = copyMock(ErrorOpenMock)
                    this.Modal.setState = true
                }
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
            route += `/${fileName}`
            this.Http.delete<HttpResponse<string>>(`/api/admin/windows/delete_file`, { body: { path: route } }).subscribe(() => this.getPath())
        }
        this.Modal.setData = confirmModal
        this.Modal.setState = true
    }
}
