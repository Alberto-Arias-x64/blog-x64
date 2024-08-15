import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: '<ng-container><router-outlet /> <app-modal /></ng-container>'
})
export class AppComponent {}
