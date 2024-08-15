import type { ModalInterface } from 'src/app/core/interfaces/modal.interface'
import { ModalService } from 'src/app/core/services/modal.service'
import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  private Modal = inject(ModalService)
  state = false
  data!: ModalInterface

  ngOnInit() {
    this.Modal.getState.subscribe((value) => (this.state = value))
    this.Modal.getData.subscribe((data) => (this.data = data))
  }

  principalAction() {
    if (this.data.buttonPrincipal.action) this.data.buttonPrincipal.action()
    this.Modal.setState = false
  }

  secondaryAction() {
    if (this.data.buttonSecondary?.action) this.data.buttonSecondary?.action()
    this.Modal.setState = false
  }
}
