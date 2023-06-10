import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SvgLoaderComponent],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
    @Input() list!:any[]
}
