import type { ModalInterface } from '../interfaces/modal.interface'
import { cleanMock, copyMock } from 'src/app/mocks/modals.mock'
import { BehaviorSubject, Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly ClearData: ModalInterface = copyMock(cleanMock)
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
