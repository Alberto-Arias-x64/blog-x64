import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
    private Modal = inject(ModalService)
    ModalState$ = this.Modal.getState
    state = false

    ngOnInit(): void {
        this.ModalState$.subscribe(value => {
            this.state = value;
        })
    }

    changeState() {
        this.Modal.setState = !this.state
    }
}
