import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { slideInAnimation } from './app.animation'

@Component({
    selector: 'app-root',
    template: '<div><router-outlet #outlet="outlet" /> <app-modal /></div>',
    animations: [slideInAnimation]
})
export class AppComponent {

    getRouteAnimationData(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['']
    }
}
