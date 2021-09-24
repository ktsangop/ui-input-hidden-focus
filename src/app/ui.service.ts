import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UiService {
  showInput: Subject<boolean> = new Subject();
  showInput$: Observable<boolean> = this.showInput.asObservable();

  constructor() {}

  public setShowInput(show: boolean) {
    this.showInput.next(show);
  }
}
