import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideringSettings } from 'src/app/_models/slidering-settings';
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

  constructor(private slideringService: SlideringService, private router: Router) {
    this.testSettings = slideringService.testSettings;
    this.valuesFromTest = [this.testSettings.numOfAttempts].fill(0);
    this.timeLeft = this.testSettings.time;
  }

  ngOnInit() {
    this.valuesToSet = this.slideringService.getSlideringTest();

    this.startTimer();
  }

  sendResult() {
    this.pauseTimer();
    this.slideringService.setSlideringResult(this.valuesFromTest);
    this.router.navigate(['/zadania/przeciaganie/wynik']);
  }

  private startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.slideringService.setSlideringResult(this.valuesFromTest);
        this.router.navigate(['/zadania/przeciaganie/wynik']);
      }
    }, 1000)
  }

  private pauseTimer() {
    clearInterval(this.interval);
  }

}
