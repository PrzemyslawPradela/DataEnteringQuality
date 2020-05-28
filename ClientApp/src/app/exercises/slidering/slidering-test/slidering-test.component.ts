import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideringSettings } from 'src/app/_models/slidering-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SlideringService } from 'src/app/_services/slidering.service';

@Component({
  selector: 'app-slidering-test',
  templateUrl: './slidering-test.component.html',
  styleUrls: ['./slidering-test.component.css']
})
export class SlideringTestComponent implements OnInit {

  valuesToSet: number[];
  valuesFromTest: number[];
  testSettings: SlideringSettings;
  Tm: number[];
  timeStart: number[];
  timeStop: number[];
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor(private slideringService: SlideringService, private router: Router, private alertify: AlertifyService) {
    this.testSettings = slideringService.testSettings;
    this.valuesFromTest = [];
    this.timeLeft = this.testSettings.time;
    this.Tm = [this.testSettings.numOfAttempts];
    this.timeStart = [this.testSettings.numOfAttempts];
    this.timeStop = [this.testSettings.numOfAttempts];
  }

  ngOnInit() {
    this.valuesToSet = this.slideringService.getSlideringTest();
    this.fillValuesFromTestWithZero();

    this.startTimer();
  }

  getStartTime(i: number) {
    this.timeStart[i] = new Date().getTime();
  }

  getStopTime(i: number) {
    this.timeStop[i] = new Date().getTime();
  }

  calculateTime() {
    for (let index = 0; index < this.testSettings.numOfAttempts; index++) {
      this.Tm[index] = this.timeStop[index] - this.timeStart[index];
    }
  }

  sendResult() {
    console.log(this.Tm);
    this.calculateTime();
    this.pauseTimer();
    this.slideringService.setSlideringResult(this.valuesFromTest, this.Tm).subscribe(
      () => {
        this.router.navigate(['/wyniki']);
      },
      error => {
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

  private fillValuesFromTestWithZero() {
    for (let index = 0; index < this.testSettings.numOfAttempts; index++) {
      this.valuesFromTest[index] = 0;
      this.Tm[index] = 0;
      this.timeStart[index] = 0;
      this.timeStop[index] = 0;
    }
  }

}
