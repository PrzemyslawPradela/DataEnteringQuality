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
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor(private slideringService: SlideringService, private router: Router, private alertify: AlertifyService) {
    this.testSettings = slideringService.testSettings;
    this.valuesFromTest = [];
    this.timeLeft = this.testSettings.time;
  }

  ngOnInit() {
    this.valuesToSet = this.slideringService.getSlideringTest();
    this.fillValuesFromTestWithZero();

    this.startTimer();
  }

  sendResult() {
    this.pauseTimer();
    this.slideringService.setSlideringResult(this.valuesFromTest).subscribe(
      () => {
        this.router.navigate(['/zadania']);
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
        this.pauseTimer();
        this.slideringService.setSlideringResult(this.valuesFromTest).subscribe(
          () => {
            this.router.navigate(['/zadania']);
          },
          error => {
            this.alertify.error(error);
          });
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
