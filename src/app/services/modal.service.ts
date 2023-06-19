import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private ModalState = new BehaviorSubject(false)

    get State(): Observable<boolean> {
        return this.ModalState.asObservable()
    }
    set State(state: boolean) {
        this.ModalState.next(state)
    }
}
