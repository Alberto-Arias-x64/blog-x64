import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { HttpResponse, WindowsInterface } from 'src/app/interfaces/http.interface'
import { IconifyComponent } from 'src/app/components/iconify/iconify.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

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
    folders = []
    files = []
    path: string[] = []

    ngOnInit(): void {
        this.getPath()
    }

    open(item: string) {
        this.path.push(item)
        this.getPath()
    }

    return() {
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
                }
                else {
                    this.folders = []
                    this.files = []
                }
            }
        })
    }

    openFile(fileName: string) {
        let route = ''
        if (this.path.length === 0) route = ''
        else if (this.path.length === 1) route = this.path[0]
        else this.path.forEach((item) => (route += `/${item}`))
        route += `/${fileName}`
        this.Http.get<HttpResponse<string>>(`/api/admin/windows/read_file?path=${route}`).subscribe({
            next: (res) => {
                this.editor.nativeElement.value = res.data
            }
        })
    }
}
