import { Routes } from '@angular/router'
import { authGuard } from './guards/auth.guard'

const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./templates/principal/principal.component').then((c) => c.PrincipalComponent),
        children: [
            { path: '', data: { animation: 'fadeOne' }, loadComponent: () => import('./views/main/main.component').then((c) => c.MainComponent), title: 'Alberto Arias | Blog' },
            { path: 'category/:id', loadComponent: () => import('./views/main/main.component').then((c) => c.MainComponent), title: 'Alberto Arias | Blog' },
            { path: 'search/:id', loadComponent: () => import('./views/main/main.component').then((c) => c.MainComponent), title: 'Alberto Arias | Blog' },
            { path: 'about', loadComponent: () => import('./views/about/about.component').then((c) => c.AboutComponent), title: 'Alberto Arias | Sobre mi' },
            { path: 'contact', loadComponent: () => import('./views/contact/contact.component').then((c) => c.ContactComponent), title: 'Alberto Arias | Contácteme' },
            { path: 'post/:id', data: { animation: 'fadeTwo' }, loadComponent: () => import('./views/post/post.component').then((c) => c.PostComponent), title: 'Alberto Arias | Contácteme' },
        ]
    },
    { path: 'login', loadComponent: () => import('./views/login/login.component').then((c) => c.LoginComponent) },
    {
        path: 'admin',
        loadComponent: () => import('./templates/admin/admin.component').then((c) => c.AdminComponent),
        canActivate: [authGuard],
        title:'Admin',
        children: [
            { path: 'messages/:id', loadComponent: () => import('./admin/message-detail/message-detail.component').then((c) => c.MessageDetailComponent)},
            { path: 'messages', loadComponent: () => import('./admin/messages/messages.component').then((c) => c.MessagesComponent) },
            { path: 'windows', loadComponent: () => import('./admin/windows/windows.component').then((c) => c.WindowsComponent) },
            { path: 'edit_post/:id', loadComponent: () => import('./admin/post/post.component').then((c) => c.PostComponent) },
            { path: 'new_post', loadComponent: () => import('./admin/post/post.component').then((c) => c.PostComponent) },
            { path: 'posts', loadComponent: () => import('./admin/posts/posts.component').then((c) => c.PostsComponent) },
        ]
    },
    { path: '**', loadComponent: () => import('./templates/error/error.component').then((c) => c.ErrorComponent) }
]

export default routes
