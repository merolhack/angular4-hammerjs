import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-square></app-square>
    <app-blocker></app-blocker>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
