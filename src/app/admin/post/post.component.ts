import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { ModalService } from 'src/app/services/modal.service'

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
    private readonly Builder = inject(FormBuilder)
    private readonly Http = inject(HttpClient)
    private readonly Router = inject(Router)
    private Modal = inject(ModalService)
}
