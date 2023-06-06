import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from 'src/app/components/slider/slider.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, SliderComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
