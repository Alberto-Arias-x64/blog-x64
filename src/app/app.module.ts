import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes,  } from '@angular/router';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
    { path: "", loadComponent: () => import('./templates/principal/principal.component').then(c => c.PrincipalComponent), children:[
        {path: "", loadComponent: () => import('./views/main/main.component').then(c => c.MainComponent),},
    ]},
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
