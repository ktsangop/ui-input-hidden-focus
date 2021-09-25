import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { UiService } from './ui.service';

@Component({
  selector: 'hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
  animations: [
    trigger('expandNoHide', [
      state(
        'false, void, undefined',
        style({ height: '0px', opacity: 0, width: '0px' })
      ),
      state(
        'true',
        style({ height: '{{height}}px', opacity: 1, width: 'unset' }),
        { params: { height: '*' } }
      ),
      transition(
        '* => true',
        animate(
          '250ms',
          keyframes([
            style({ width: 'unset', offset: 0 }),
            style({ height: '{{height}}px', opacity: 1, offset: 1 }),
          ])
        )
      ),
      transition(
        '* => false',
        animate(
          '250ms',
          keyframes([
            style({ height: '0px', opacity: 0, width: '0px', offset: 1 }),
          ])
        )
      ),
    ]),
  ],
})
export class HelloComponent {
  show = false;

  constructor(private uiService: UiService) {
    this.uiService.showInput$.subscribe((show) => (this.show = show));
  }
}
