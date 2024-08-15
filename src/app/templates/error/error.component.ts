import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Component } from '@angular/core'

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {}
