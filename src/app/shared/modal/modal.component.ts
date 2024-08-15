import type { ModalInterface } from 'src/app/core/interfaces/modal.interface'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, OnInit, inject, signal } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  private modalService = inject(ModalService)
  state = signal(false)
  data = signal<ModalInterface>({
    title: '',
    image: {
      src: '',
      alt: ''
    },
    description: '',
    buttonPrincipal: {
      text: '',
      action: () => null
    }
  })

  ngOnInit() {
    this.modalService.getState.subscribe((value) => this.state.set(value))
    this.modalService.getData.subscribe((data) => this.data.set(data))
  }

  principalAction() {
    const action = this.data().buttonPrincipal.action
    if (action) action()
    this.modalService.setState = false
  }

  secondaryAction() {
    const action = this.data().buttonSecondary?.action
    if (action) action()
    this.modalService.setState = false
  }
}
