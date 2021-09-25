import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AutofocusDirective } from './auto-focus.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule],
  declarations: [AppComponent, HelloComponent, AutofocusDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
