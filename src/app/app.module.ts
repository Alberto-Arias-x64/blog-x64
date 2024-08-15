import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ModalComponent } from './components/shared/modal/modal.component'
import { tokenInterceptor } from './core/interceptors/token.interceptor'
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
    ModalComponent,
    BrowserModule,
    ModalComponent,
    AngularSvgIconModule.forRoot(),
    MarkdownModule.forRoot({ loader: HttpClient }),
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [provideHttpClient(withInterceptors([tokenInterceptor]))]
})
export class AppModule {}
