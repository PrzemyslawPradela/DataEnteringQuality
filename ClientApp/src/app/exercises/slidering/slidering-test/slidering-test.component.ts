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
    this.Tm = [];
    this.timeStart = [];
    this.timeStop = [];
  }

  ngOnInit() {
    this.valuesToSet = this.slideringService.getSlideringTest();
    this.fillValuesFromTestWithZero();

    this.startTimer();
  }

  getStartTime(i: number) {
    const t = new Date().getTime();
    this.timeStart.push(t);
    console.log('Czas rozpoczęcia: ' + t);
  }

  getStopTime(i: number) {
    const t = new Date().getTime();
    this.timeStop.push(t);
    console.log('Czas zakończenia: ' + t);
  }

  calculateTime() {
    for (let index = 0; index < this.timeStop.length; index++) {
      const Tm = this.timeStop[index] - this.timeStart[index];
      this.Tm.push(Tm);
    }
  }

  sendResult() {
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
    }
  }

}
