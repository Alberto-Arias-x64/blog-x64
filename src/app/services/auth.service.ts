import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token = ''

    set setToken(token: string) {
        this.token = token
    }
}
