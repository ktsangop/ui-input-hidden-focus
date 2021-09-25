import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective implements OnChanges {
  @Input()
  focus = false;

  constructor(private host: ElementRef) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['focus']) {
      if (this.focus) {
        this.host.nativeElement.focus();
      } else {
        this.host.nativeElement.blur();
      }
    }
  }
}
