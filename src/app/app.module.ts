import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import routes from './router'

import { AngularSvgIconModule } from 'angular-svg-icon'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { QuicklinkStrategy } from 'ngx-quicklink'
import { MarkdownModule } from 'ngx-markdown'
import { ModalComponent } from './shared/modal/modal.component'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ModalComponent,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        MarkdownModule.forRoot({ loader: HttpClient }),
        RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy }),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
