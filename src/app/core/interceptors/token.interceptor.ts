import { HttpInterceptorFn } from '@angular/common/http'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.getToken
  if (token && req.url.includes('api/admin')) {
    const authRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    return next(authRequest)
  }
  return next(req)
}
