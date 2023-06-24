import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null

    set setToken(token: string) {
        this.token = token
    }

    get getToken() {
        return this.token
    }
}
