import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalInterface } from '../interfaces/modal.interface';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _Data: ModalInterface = {
        title: "",
        description: "",
        image: {
            src: "",
            alt: ""
        },
        button: ""
    }
    private ModalState = new BehaviorSubject(false)
    private ModalData = new BehaviorSubject(this._Data)

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
        this.ModalData.next(data)
    }
}
