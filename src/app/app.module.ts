import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlockerComponent } from './blocker/blocker.component';
import { SquareComponent } from './square/square.component';


@NgModule({
  declarations: [
    AppComponent,
    BlockerComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
