import { Component, VERSION } from '@angular/core';
import { BehaviorSubject, combineLatest, of, Subject } from 'rxjs';
import {
  combineLatestAll,
  filter,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { UiService } from './ui.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  show = false;
  constructor(private uiService: UiService) {
    this.uiService.showInput$.subscribe((show) => (this.show = show));
  }
  name = 'Angular ' + VERSION.major;
  timeoutSec = null;

  onTrigger() {
    if (this.timeoutSec === null) {
      this.uiService.setShowInput(!this.show);
    } else {
      setTimeout(
        () => this.uiService.setShowInput(!this.show),
        this.timeoutSec
      );
    }
  }

  account$ = new BehaviorSubject<any>({ isInstantiated: false });
  coupoRefresh$ = new Subject<void>();

  ngOnInit() {
    const textOutput = document.querySelector(`#textOutput`);
    combineLatest([
      this.account$.pipe(tap(() => textOutput.append('account updated\n'))),
      this.coupoRefresh$.pipe(
        tap(() => textOutput.append('coupon reload triggered\n'))
      ),
    ])
      .pipe(
        filter(([account, _void]) => account.isInstantiated),
        // switchMap(() => this.account$),
        mergeMap(() => of(null))
      )
      .subscribe(() =>
        textOutput.append('>> CALL TO REFRESH COUPONS FROM SERVER <<\n')
      );
  }

  onAccountUpdate() {
    this.account$.next({ isInstantiated: true });
  }

  onCouponsReload() {
    this.coupoRefresh$.next();
  }
}
