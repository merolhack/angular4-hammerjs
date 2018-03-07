import { Component, OnInit, OnChanges } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-blocker',
  templateUrl: './blocker.component.html',
  styles: []
})
export class BlockerComponent implements OnInit, OnChanges {

  // Start SVG blocker
  percent:number = 0;
  boxSize:number = 120;
  radius:number = 0.4*this.boxSize ;
  time:number = 0;
  border:number = 10;
  color:string = 'red';
  backgroundColor:string = '#dddddd';

  lowColor:string = 'red';
  middleColor:string = 'orange';
  interColor:string = 'yellow';
  highColor:string = 'green';

  fontColor:string = 'black';
  fontX:string = '50%';
  fontY:string = '55%';

  innerFill:string = "#EC0000";
  textAnchor:string = "middle";

  angle:number;
  radian:number;
  cx:number;
  cy:number;

  x0:number;
  y0:number;
  rx:number;
  ry:number;

  innerRadius:number;
  circleText:string = '0%';

  x;
  y;

  arcSweep;
  circleM;
  circleL;
  circleA;
  circleEnd;

  canAnimate:boolean = true;
  // End SVG blocker

  timeoutHandler: any;
  counter: number = 0;

  constructor() { }

  ngOnInit() {
    // Get a reference to the element
    const animation = document.getElementById('animation');
    // Create a manager to manager the element
    const manager = new Hammer.Manager(animation);
    // Create a recognizer
    const Press = new Hammer.Press({
      time: 100
    });
    // Add the recognizer to the manager
    manager.add(Press);
    // Subscribe to desired event
    manager.on('press', (e) => {
      this.mousedown();
    });

    this.setInputs();
    this.calculateAll();
    console.log('Hammer:', Hammer);
  }

  ngOnChanges() {
    this.setInputs();
    this.calculateAll();
  }

  mouseup() {
    const that = this;
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
      that.counter = 0;
      that.percent = 0;
      that.ngOnChanges();
    }
  }

  mousedown() {
    console.log('mousedown:');
    this.timeoutHandler = setInterval(() => {
      this.counter+= 150;
      console.log('this.counter:', this.counter);
      this.percent = Math.round((this.counter / 3000)*100);
      this.ngOnChanges();
      if (this.percent >= 100) {
        this.mouseup();
        alert('Completed!!')
      }
    }, 100);
  }

  // SVG animation methods
  private setInputs() {
    if (this.percent <0) {
      this.percent *= -1;
    }
    if (this.time == 0) {
      this.circleText = this.percent+'%';
      this.setColor(this.percent);
      this.angle = this.percToAngle(this.percent);
    } else {
      this.angle = 0;
    }
    this.radian = this.angleToRad(this.angle);
    this.cx = this.boxSize / 2;
    this.cy = this.boxSize / 2;
    this.x0 = this.cx;
    this.y0 = this.cy - this.radius;
    this.rx = this.ry = this.radius;
    this.innerRadius = this.radius - this.border;
  }

  private calculateAll() {
    this.calculateAngle(this.radius, this.radian);
    this.setArcSet(this.angle);
    this.circleM = this.createArgument('M', this.cx, this.cy);
    this.circleL = this.createArgument('L', this.x0, this.y0);
    this.circleA = this.createArgument('A', this.rx, this.ry);
  }

  private calculateAngle(r, rad) {
    this.x = this.cx + r * Math.sin(rad);
    this.y = this.cy - r * Math.cos(rad);
    if (this.percent == 100) {
      this.x--;
    }
    this.circleEnd = this.createArgument(null, this.x, this.y);
  }

  private setArcSet(angle) {
    if (Math.round(angle) <= 180) {
      this.arcSweep = this.createArgument(null, 0, 1);
    } else if (Math.round(angle) > 180) {
      this.arcSweep = this.createArgument(null, 1, 1);
    }
  }

  private createArgument(prefix:string, val1:number, val2:number) {
    if (prefix != null) {
      return prefix + val1 + ',' + val2 + ' ';
    } else {
      return val1 + ',' + val2 + ' ';
    }
  }

  private percToAngle(perc:number){
    return perc*3.6;
  }

  private angleToRad(angle) {
    return (angle * Math.PI) / 180;
  }

  public animate() {
    if (this.canAnimate) {
      this.canAnimate = false;
      let time = this.time * 1000 / this.percent;
      this.animationLoop(1, time);
    } else {
      return;
    }
  }

  private animationLoop(i, time) {
    setTimeout(()=> {
      this.angle = this.percToAngle(i);
      this.radian = this.angleToRad(this.angle);
      this.setArcSet(this.angle);
      this.setColor(i);
      this.circleText = i + '%';
      this.calculateAngle(this.radius, this.radian);
      i++;
      if (i <= this.percent) {
        this.animationLoop(i, time);
      }
    },time)
    if (i >= this.percent) {
      this.canAnimate = true;
    }
  }

  private setColor(percent){
    if (percent <=25) {
      this.color = this.lowColor;
    } else if (percent <=50) {
      this.color = this.middleColor;
    } else if (percent <=75) {
      this.color = this.interColor;
    } else if (percent >75) {
      this.color = this.highColor;
    }
  }

}
