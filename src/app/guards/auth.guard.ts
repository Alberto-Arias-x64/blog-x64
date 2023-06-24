import { CanActivateFn, Router as RT } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
    const Auth = inject(AuthService)
    const Router = inject(RT)
    if (Auth.getToken) return true
    Router.navigate(['/404'])
    return false
}
