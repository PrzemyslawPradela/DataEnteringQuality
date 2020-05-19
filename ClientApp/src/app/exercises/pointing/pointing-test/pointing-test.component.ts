import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { PointingSettings } from 'src/app/_models/pointing-settings';
import { PointingService } from 'src/app/_services/pointing.service';

@Component({
  selector: 'app-pointing-test',
  templateUrl: './pointing-test.component.html',
  styleUrls: ['./pointing-test.component.css']
})
export class PointingTestComponent implements OnInit {

  testSettings: PointingSettings;
  numOfAttempts: number;
  btnWidthArray: number[];
  btnWidth: number;
  btnDistanceArray: number[];
  btnDistance: number;
  btnClickCount: number;
  btnClickArray: boolean[]
  missClickCount: number;
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor(private pointingService: PointingService, private router: Router) {
    this.testSettings = pointingService.getPointingTest();
    this.btnClickCount = 2;
    this.btnClickArray = [false, false];
    this.missClickCount = 0;
  }

  ngOnInit() {
    this.timeLeft = this.testSettings.time;
    this.numOfAttempts = this.testSettings.numOfAttempts;
    this.btnWidthArray = this.testSettings.btnWidth;
    this.btnDistanceArray = this.testSettings.btnDistance;

    this.btnWidth = this.btnWidthArray[0];
    this.btnDistance = this.btnDistanceArray[0];

    interval(100).subscribe(
      () => {
        this.generateTest();
      })

    this.startTimer();
  }

  btnClick() {
    this.btnClickCount--;
    this.missClickCount--;

    if (this.btnClickArray[0] == true && this.btnClickArray[0] == true) {
      this.numOfAttempts--;
    }

    if (this.numOfAttempts == 0) {
      this.pointingService.setPointingResult(this.missClickCount, this.numOfAttempts);
      this.router.navigate(['/zadania/wskazywanie/wynik']);
    }

    console.log('btnClick: ' + this.btnClickCount);
    console.log('missClick: ' + this.missClickCount);
  }

  missClick() {
    this.missClickCount++;
  }

  generateTest() {
    if (this.btnClickCount == 0) {
      this.btnWidth = this.btnWidthArray[this.numOfAttempts];
      this.btnDistance = this.btnDistanceArray[this.numOfAttempts];
      this.btnClickCount = 2;
      this.btnClickArray = [false, false];
      console.log(this.btnWidth, this.btnDistance);
    }
  }

  sendResult() {
    this.pauseTimer();
    this.pointingService.setPointingResult(this.missClickCount, this.numOfAttempts);
    this.router.navigate(['/zadania/wskazywanie/wynik']);
  }

  private startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.pointingService.setPointingResult(this.missClickCount, this.numOfAttempts);
        this.router.navigate(['/zadania/wskazywanie/wynik']);
      }
    }, 1000)
  }

  private pauseTimer() {
    clearInterval(this.interval);
  }

}
