import { Component } from '@angular/core'
import { ChildrenOutletContexts } from '@angular/router'
import { slideInAnimation } from './app.animation'

@Component({
    selector: 'app-root',
    template: '<div [@routeAnimations]="getRouteAnimationData()" ><router-outlet #outlet="outlet" /> <app-modal /></div>',
    animations: [slideInAnimation]
})
export class AppComponent {
    constructor(private contexts: ChildrenOutletContexts) {}

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
