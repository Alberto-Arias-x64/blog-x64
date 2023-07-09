import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { ModalInterface } from '../interfaces/modal.interface'

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private readonly ClearData: ModalInterface = {
        title: '',
        description: '',
        image: {
            src: '',
            alt: ''
        },
        buttonPrincipal: {
            text: '',
            action: () => {}
        }
    }
    private ModalState = new BehaviorSubject(false)
    private ModalData = new BehaviorSubject(this.ClearData)

    get getState(): Observable<boolean> {
        return this.ModalState.asObservable()
    }
    set setState(state: boolean) {
        this.ModalState.next(state)
    }

    get getData(): Observable<ModalInterface> {
        return this.ModalData.asObservable()
    }
    set setData(data: ModalInterface) {
        this.ModalData.next(this.ClearData)
        this.ModalData.next(data)
    }
}
