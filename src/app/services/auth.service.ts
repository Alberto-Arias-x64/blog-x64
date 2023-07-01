import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false)
    private token: string | null = null

    set setToken(token: string) {
        this.token = token
        this.isAdmin.next(true)
        sessionStorage.setItem('token', token)
    }

    get getToken() {
        const token = sessionStorage.getItem('token')
        if (this.token) {
            this.isAdmin.next(true)
            return this.token
        }
        if (token) {
            this.isAdmin.next(true)
            return token
        }
        return null
    }

    get adminStatus() {
        return this.isAdmin.asObservable()
    }

    logOut() {
        sessionStorage.removeItem('token')
        this.token = null
        this.isAdmin.next(false)
    }
}
