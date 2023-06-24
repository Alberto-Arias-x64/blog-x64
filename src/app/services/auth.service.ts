import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null

    set setToken(token: string) {
        this.token = token
        sessionStorage.setItem('token', token)
    }

    get getToken() {
        const token = sessionStorage.getItem('token')
        if (this.token) return this.token
        if (token) return token
        return null
    }
}
