import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import routes from "./router"

import { AppComponent } from './app.component';
import { RouterModule, } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { QuicklinkStrategy } from 'ngx-quicklink';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy  })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
