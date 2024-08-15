import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TokenInterceptor } from './core/interceptors/token.interceptor'
import { ModalComponent } from './shared/modal/modal.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { BrowserModule } from '@angular/platform-browser'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { NgModule, isDevMode } from '@angular/core'
import { QuicklinkStrategy } from 'ngx-quicklink'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { MarkdownModule } from 'ngx-markdown'
import routes from './router'

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ModalComponent,
    AngularSvgIconModule.forRoot(),
    MarkdownModule.forRoot({ loader: HttpClient }),
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {}
