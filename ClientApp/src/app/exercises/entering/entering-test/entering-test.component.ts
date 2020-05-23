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
  testSettings: EnteringSettings;
  timeLeft: number;
  interval: NodeJS.Timeout;

  constructor(private enteringService: EnteringService, private router: Router, private alertify: AlertifyService) {
    this.testSettings = enteringService.testSettings;
    this.wordsFromTest = [];
    this.timeLeft = this.testSettings.time;
  }

  ngOnInit() {
    this.wordsToType = this.enteringService.getWords();

    this.startTimer();
  }

  sendResult() {
    this.pauseTimer();
    this.enteringService.setEnteringResult(this.wordsFromTest).subscribe(
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
        this.enteringService.setEnteringResult(this.wordsFromTest).subscribe(
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

}
