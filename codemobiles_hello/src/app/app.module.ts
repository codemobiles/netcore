import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Bkk1Component } from './components/bkk1/bkk1.component';
import { Bkk2Component } from './components/bkk2/bkk2.component';

@NgModule({
  declarations: [
    AppComponent,
    Bkk1Component,
    Bkk2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
