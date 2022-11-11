import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  exhaustMap,
  noop,
  of,
  Subject,
  switchMapTo,
} from 'rxjs';
import {
  combineLatestAll,
  filter,
  mergeMap,
  sample,
  switchMap,
  take,
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
  constructor(private uiService: UiService, private http: HttpClient) {
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

  /**
   * =======================
   * Account Coupons refresh
   * =======================
   */
  account$ = new BehaviorSubject<any>({ isInstantiated: false });
  account2$ = new Subject<void>();
  coupoRefresh$ = new Subject<void>();
  coupoRefresh2$ = new Subject<void>();

  ngOnInit() {
    this.combineBsubjects();
    const textOutput = document.querySelector(`#textOutput`);

    combineLatest([
      this.account$.pipe(
        filter((account) => account.isInstantiated),
        take(1),
        tap((ac) =>
          textOutput.append(
            `account updated, logged in : ${ac.isInstantiated}\n`
          )
        )
      ),
      this.coupoRefresh$.pipe(
        tap(() => textOutput.append('coupon reload triggered\n'))
      ),
    ])
      .pipe(
        // switchMap(() => this.account$),
        mergeMap(() => of(null))
      )
      .subscribe(() =>
        textOutput.append('>> CALL TO REFRESH COUPONS FROM SERVER <<\n')
      );

    this.onCouponsReload();
  }

  onAccountUpdate() {
    this.account$.next({ isInstantiated: true });
  }

  onAccountUpdate2() {
    this.account2$.next();
  }

  onCouponsReload() {
    this.coupoRefresh$.next();
  }

  onCouponsReload2() {
    this.coupoRefresh2$.next();
  }

  combineBsubjects() {
    const merchantName$: BehaviorSubject<string> = new BehaviorSubject('');
    const themeName$: BehaviorSubject<string> = new BehaviorSubject('main');
    const productName$: BehaviorSubject<string> = new BehaviorSubject(
      'Customer App'
    );

    combineLatest([
      merchantName$.pipe(filter((n) => !!n)),
      themeName$,
      productName$,
    ])
      .pipe(tap(() => console.log('refresh will trigger')))
      .subscribe(noop, noop);

    setTimeout(() => merchantName$.next('Marcos'), 1000);
    setTimeout(() => merchantName$.next('Preview'), 5000);
    setTimeout(() => merchantName$.next('Marcos'), 10000);
    // setTimeout(() => merchantName$.next('Preview'), 15000);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    combineLatest([this.account2$, this.coupoRefresh2$])
      .pipe(
        // take(1) is the only way to unsubscribe from source after the first emission...
        take(1),
        // switchMap DOES NOT "SWITCH" to the inner observable
        // It just ensures that there are no multiple subscriptions allowed to the inner observable
        // Thus if we try to resubscribe to the inner observable before it completes, rxjs unsubscribes from the
        // inner observable automatically (think of an http request cancelled...)
        switchMap(() =>
          this.http.get('https://www.fishwatch.gov/api/species/red-snapper')
        )
      )
      .subscribe(() => {
        const textOutput = document.querySelector(`#textOutput`);
        textOutput.append('>> GET DOG FACTS! <<\n');
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////////
  }
}
