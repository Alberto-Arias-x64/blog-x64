import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import routes from "./router"

import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { ModalComponent } from './components/modal/modal.component';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ModalComponent,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
