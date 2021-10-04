import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus2]',
})
export class Autofocus2Directive {
  constructor(private host: ElementRef) {
    console.log('construct');
  }

  ngAfterViewInit() {
    console.log('after view??');
    this.host.nativeElement.focus();
  }
}
