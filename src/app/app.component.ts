import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: '<router-outlet/> <app-modal />',
})
export class AppComponent {
    title = 'blog-x64';
}
