import type { HttpResponse, SingleMessageInterface } from 'src/app/core/interfaces/http.interface'
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router'
import { RelativeDatePipe } from 'src/app/core/pipes/relative-date.pipe'
import { Component, OnInit, inject, signal } from '@angular/core'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { registerLocaleData } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import localeEs from '@angular/common/locales/es'
import { CommonModule } from '@angular/common'
import { LOCALE_ID } from '@angular/core'

registerLocaleData(localeEs, 'es')

@Component({
  selector: 'app-message-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, RelativeDatePipe, AngularSvgIconModule, RouterLink],
  templateUrl: './message-detail.component.html',
  styleUrl: './message-detail.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class MessageDetailComponent implements OnInit {
  private readonly activeRoute = inject(ActivatedRoute)
  private readonly http = inject(HttpClient)
  private readonly router = inject(Router)
  message = signal<SingleMessageInterface>({
    id: 0,
    name: '',
    mail: '',
    phone: '',
    read: false,
    message: '',
    updatedAt: new Date(),
    createdAt: new Date()
  })

  ngOnInit() {
    const id = this.activeRoute.snapshot.params['id']
    this.http.get<HttpResponse<SingleMessageInterface>>(`/api/admin/read_message/${id}`).subscribe({
      next: (response) => {
        if (response.data) this.message.set(response.data)
      },
      error: () => this.router.navigate(['/404'])
    })
  }
}
