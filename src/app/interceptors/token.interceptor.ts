import { Injectable, inject } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private readonly Auth = inject(AuthService)
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this.Auth.getToken
        if (token && request.url.includes('api/admin')) {
            //const token = localStorage.getItem('jwt')

            const authRequest = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            return next.handle(authRequest)
        }

        return next.handle(request)
    }
}
