import { NgModule, TransferState } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes, } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        path: "", loadComponent: () => import('./templates/principal/principal.component').then(c => c.PrincipalComponent), children: [
            { path: "", loadComponent: () => import('./views/main/main.component').then(c => c.MainComponent), },
            { path: "about", loadComponent: () => import('./views/about/about.component').then(c => c.AboutComponent), },
        ]
    },
]
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        AngularSvgIconModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
