import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null

    set setToken(token: string) {
        this.token = token
        localStorage.setItem("token", token)
    }

    get getToken() {
        const token = localStorage.getItem("token")
        if (this.token) return this.token
        if (token) return token
        return null
    }
}
