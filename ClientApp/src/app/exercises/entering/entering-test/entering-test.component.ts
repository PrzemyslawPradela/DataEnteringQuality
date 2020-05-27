import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnteringSettings } from 'src/app/_models/entering-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EnteringService } from 'src/app/_services/entering.service';

@Component({
  selector: 'app-entering-test',
  templateUrl: './entering-test.component.html',
  styleUrls: ['./entering-test.component.css']
})
export class EnteringTestComponent implements OnInit {

  wordsToType: string[];
  wordsFromTest: string[];
  typingTime: number[];
  typingStart: number[];
  typingStop: number[];
  testSettings: EnteringSettings;
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor(private enteringService: EnteringService, private router: Router, private alertify: AlertifyService) {
    this.testSettings = enteringService.testSettings;
    this.wordsFromTest = [];
    this.typingTime = [];
    this.typingStart = [];
    this.typingStop = [];

    this.timeLeft = this.testSettings.time;
  }

  ngOnInit() {
    this.wordsToType = this.enteringService.getWords();
    this.fillValuesFromTestWithZero();

    this.startTimer();
  }

  checkSpeed(index: number) {
    this.typingStart[index] = new Date().getTime();

    if (this.typingStop[index] != 0) {
      this.typingTime[index] += this.typingStart[index] - this.typingStop[index];
    }

    this.typingStop[index] = this.typingStart[index];
  };

  sendResult() {
    this.pauseTimer();
    this.enteringService.setEnteringResult(this.wordsFromTest, this.typingTime).subscribe(
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
    for (let index = 0; index < this.testSettings.numOfWords; index++) {
      this.typingTime[index] = 0;
      this.typingStart[index] = 0;
      this.typingStop[index] = 0;
    }
  }

}
