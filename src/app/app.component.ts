import { Component, VERSION } from '@angular/core';
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

  onTrigger() {
    // setTimeout(() =>
    this.uiService.setShowInput(!this.show);
    // , 0);
  }
}
