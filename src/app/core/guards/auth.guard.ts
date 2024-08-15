import { copyMock, ExpiredTimeModal } from '../../mocks/modals.mock'
import { CanActivateFn, Router } from '@angular/router'
import { ModalService } from '../services/modal.service'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import jwt_decode from 'jwt-decode'

export const authGuard: CanActivateFn = () => {
  const modalService = inject(ModalService)
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.getToken) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt_decode(authService.getToken)
    const expirationDate = new Date(decodedToken.exp * 1000)
    const currentTime = new Date()

    if (expirationDate < currentTime) {
      authService.logOut()
      router.navigate(['/404'])
      return false
    } else {
      const timeRemaining = expirationDate.getTime() - currentTime.getTime()
      setTimeout(() => {
        const modalModel = copyMock(ExpiredTimeModal)
        modalModel.buttonPrincipal.action = () => {
          authService.logOut()
          router.navigate(['/'])
        }
        modalService.setData = modalModel
        modalService.setState = true
      }, timeRemaining)
      return true
    }
  }
  router.navigate(['/404'])
  return false
}
