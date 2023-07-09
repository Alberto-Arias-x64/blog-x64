import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { HttpResponse, SingleMessageInterface } from 'src/app/interfaces/http.interface'
import { RelativeDatePipe } from 'src/app/pipes/relative-date.pipe'

import { LOCALE_ID } from '@angular/core'
import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'
import { AngularSvgIconModule } from 'angular-svg-icon'
registerLocaleData(localeEs, 'es')

@Component({
    selector: 'app-message-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, RelativeDatePipe, AngularSvgIconModule],
    templateUrl: './message-detail.component.html',
    styleUrls: ['./message-detail.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class MessageDetailComponent implements OnInit {
    private readonly Route = inject(ActivatedRoute)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    message?: SingleMessageInterface

    ngOnInit(): void {
        const id = this.Route.snapshot.params['id']
        this.Http.get<HttpResponse<SingleMessageInterface>>(`/api/admin/read_message/${id}`).subscribe({
            next: (response) => {
                this.message = response.data
            },
            error: (error: any) => {
                this.Router.navigate(['/404'])
            }
        })
    }

    return() {
        this.Router.navigate(['/admin/messages'])
    }
}
