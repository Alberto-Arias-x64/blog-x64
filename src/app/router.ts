import { Routes } from '@angular/router'

const routes: Routes = [
    {
        path: "", loadComponent: () => import('./templates/principal/principal.component').then(c => c.PrincipalComponent), children: [
            { path: "", loadComponent: () => import('./views/main/main.component').then(c => c.MainComponent), },
            { path: "about", loadComponent: () => import('./views/about/about.component').then(c => c.AboutComponent), },
            { path: "contact", loadComponent: () => import('./views/contact/contact.component').then(c => c.ContactComponent), },
        ]
    },
    { path: "**", loadComponent: () => import("./templates/error/error.component").then(c => c.ErrorComponent) }
]

export default routes
