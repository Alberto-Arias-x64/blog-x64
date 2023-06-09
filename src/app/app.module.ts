import { NgModule } from '@angular/core'
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
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ModalComponent,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        MarkdownModule.forRoot({ loader: HttpClient }),
        RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy })
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
