import { CanActivateFn, Router as RT } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import jwt_decode from 'jwt-decode'
import { ModalService } from '../services/modal.service'
import { ExpiredTimeModal } from '../mocks/modals.mock'

export const authGuard: CanActivateFn = (route, state) => {
    const Auth = inject(AuthService)
    const Router = inject(RT)
    const Modal = inject(ModalService)
    if (Auth.getToken) {
        const decodedToken: any = jwt_decode(Auth.getToken)
        const expirationDate = new Date(decodedToken.exp * 1000)
        const currentTime = new Date()

        if (expirationDate < currentTime) {
            Auth.logOut()
            Router.navigate(['/404'])
            return false
        } else {
            const timeRemaining = expirationDate.getTime() - currentTime.getTime()
            setTimeout(() => {
                const modalModel = JSON.parse(JSON.stringify(ExpiredTimeModal))
                modalModel.buttonPrincipal.action = () => {
                    Auth.logOut()
                    Router.navigate(['/'])
                }
                Modal.setData = modalModel
                Modal.setState = true
            }, timeRemaining)
            return true
        }
    }
    Router.navigate(['/404'])
    return false
}
