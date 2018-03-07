import { Component, OnInit } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // Get a reference to an element
      const square = document.querySelector('.square');

      // Create a manager to manager the element
      const manager = new Hammer.Manager(square);

      // Create a recognizer
      const Press = new Hammer.Press({
        time: 500
      });

      // Add the recognizer to the manager
      manager.add(Press);

      // Subscribe to desired event
      manager.on('press', function(e) {
        e.target.classList.toggle('expand');
      });

  }

}
