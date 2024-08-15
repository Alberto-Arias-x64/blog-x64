import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  template: '<ng-container><router-outlet /> <app-modal /></ng-container>'
})
export class AppComponent {}
