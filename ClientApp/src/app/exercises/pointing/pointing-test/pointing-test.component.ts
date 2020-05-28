import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { PointingSettings } from 'src/app/_models/pointing-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PointingService } from 'src/app/_services/pointing.service';

@Component({
  selector: 'app-pointing-test',
  templateUrl: './pointing-test.component.html',
  styleUrls: ['./pointing-test.component.css']
})
export class PointingTestComponent implements OnInit {

  testSettings: PointingSettings;
  numOfAttempts: number;
  missClickCounter: number;
  rectClickCounter: number;
  rectClickCounterArray: boolean[];
  x: number;
  y: number;
  middleX: number;
  middleY: number;
  x2: number;
  y2: number;
  middleX2: number;
  middleY2: number;
  w: number;
  distanceFromMiddle: number[];
  moveTime: number[];
  timeStart: number;
  timeStop: number;
  timeLeft: number;
  interval: NodeJS.Timeout;
  running: boolean;

  constructor(private pointingService: PointingService, private router: Router, private alertify: AlertifyService) {
    this.testSettings = pointingService.getPointingTest();
    this.missClickCounter = 0;
    this.rectClickCounter = 2;
    this.rectClickCounterArray = [false, false];
    this.running = true;
    this.distanceFromMiddle = [];
    this.moveTime = [];
  }

  ngOnInit() {
    this.timeLeft = this.testSettings.time;
    this.numOfAttempts = this.testSettings.numOfAttempts;

    this.x = this.testSettings.x[0];
    this.y = this.testSettings.y[0];

    this.middleX = this.testSettings.middleX[0];
    this.middleY = this.testSettings.middleY[0];

    this.x2 = this.testSettings.x2[0];
    this.y2 = this.testSettings.y2[0];

    this.middleX2 = this.testSettings.middleX2[0];
    this.middleY2 = this.testSettings.middleY2[0];

    this.w = this.testSettings.w;

    var c = <HTMLCanvasElement>document.getElementById("pointingCanvas");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.testSettings.w, this.testSettings.w);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(this.x2, this.y2, this.testSettings.w, this.testSettings.w);
    ctx.stroke();

    interval(100).subscribe(
      () => {
        if (this.running) {
          this.generateTest();
        }
      })

    this.startTimer();
  }

  canvasClick(event: { clientX: number; clientY: number; }) {
    var canvas = <HTMLCanvasElement>document.getElementById("pointingCanvas");
    var rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if ((x >= this.middleX - this.w / 2 && x <= this.middleX + this.w / 2) && (y >= this.middleY - this.w / 2 && y <= this.middleY + this.w / 2)) {
      if (this.rectClickCounterArray[0] == false) {

        if (this.rectClickCounter == 2) {
          this.timeStart = new Date().getTime();
        }

        if (this.rectClickCounter == 1) {
          this.timeStop = new Date().getTime();
        }

        this.rectClickCounter--;
        this.rectClickCounterArray[0] = true;
        var ctx = canvas.getContext("2d");
        ctx.fillRect(this.x, this.y, this.w, this.w);

        const dfmX = Math.abs(this.middleX - x);
        const dfmY = Math.abs(this.middleY - y);
        const dfmPow2 = Math.pow(dfmX, 2) + Math.pow(dfmY, 2);
        const dfm = Math.sqrt(dfmPow2);
        this.distanceFromMiddle.push(dfm);
      }
    } else if ((x >= this.middleX2 - this.w / 2 && x <= this.middleX2 + this.w / 2) && (y >= this.middleY2 - this.w / 2 && y <= this.middleY2 + this.w / 2)) {
      if (this.rectClickCounterArray[1] == false) {

        if (this.rectClickCounter == 2) {
          this.timeStart = new Date().getTime();
        }

        if (this.rectClickCounter == 1) {
          this.timeStop = new Date().getTime();
        }

        this.rectClickCounter--;
        this.rectClickCounterArray[1] = true;
        var ctx = canvas.getContext("2d");
        ctx.fillRect(this.x2, this.y2, this.w, this.w);

        const dfmX = Math.abs(this.middleX2 - x);
        const dfmY = Math.abs(this.middleY2 - y);
        const dfmPow2 = Math.pow(dfmX, 2) + Math.pow(dfmY, 2);
        const dfm = Math.sqrt(dfmPow2);
        this.distanceFromMiddle.push(dfm);
      }
    } else {
      this.missClickCounter++;
      console.log('missClick: ' + this.missClickCounter);
    }

    if (this.rectClickCounterArray[0] == true && this.rectClickCounterArray[1] == true) {
      this.numOfAttempts--;
    }

    if (this.numOfAttempts == 0) {
      this.sendResult();
    }
  }

  generateTest() {
    if (this.rectClickCounter == 0) {
      const mT = this.timeStop - this.timeStart;
      this.moveTime.push(mT);

      var c = <HTMLCanvasElement>document.getElementById("pointingCanvas");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 1000, 600);

      this.x = this.testSettings.x[this.numOfAttempts];
      this.y = this.testSettings.y[this.numOfAttempts];
      this.middleX = this.testSettings.middleX[this.numOfAttempts];
      this.middleY = this.testSettings.middleY[this.numOfAttempts];

      this.x2 = this.testSettings.x2[this.numOfAttempts];
      this.y2 = this.testSettings.y2[this.numOfAttempts];
      this.middleX2 = this.testSettings.middleX2[this.numOfAttempts];
      this.middleY2 = this.testSettings.middleY2[this.numOfAttempts];

      this.rectClickCounter = 2;
      this.rectClickCounterArray = [false, false];

      ctx.beginPath();
      ctx.rect(this.x, this.y, this.testSettings.w, this.testSettings.w);
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(this.x2, this.y2, this.testSettings.w, this.testSettings.w);
      ctx.stroke();
    }
  }

  sendResult() {
    this.running = false;
    this.pauseTimer();

    this.pointingService.setPointingResult(this.missClickCounter, this.distanceFromMiddle, this.moveTime, this.numOfAttempts).subscribe(
      () => {
        this.router.navigate(['/wyniki']);
      },
      (error: string) => {
        this.alertify.error(error);
      });
  }

  private startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.sendResult();
      }
    }, 1000)
  }

  private pauseTimer() {
    clearInterval(this.interval);
  }

}
