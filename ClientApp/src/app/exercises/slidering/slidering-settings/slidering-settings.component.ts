import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlideringSettings } from 'src/app/_models/slidering-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SlideringService } from 'src/app/_services/slidering.service';

@Component({
  selector: 'app-slidering-settings',
  templateUrl: './slidering-settings.component.html',
  styleUrls: ['./slidering-settings.component.css']
})
export class SlideringSettingsComponent implements OnInit {

  slideringSettings: SlideringSettings;

  constructor(private slideringService: SlideringService, private router: Router, private alertify: AlertifyService) {
    this.slideringSettings = new SlideringSettings();
  }

  ngOnInit() {
    this.slideringSettings.numbersFrom = 1;
    this.slideringSettings.numbersTo = 100;
    this.slideringSettings.time = 5;
  }

  setSlideringSettings() {
    this.slideringService.setSlideringSettings(this.slideringSettings);
    this.slideringService.saveSlideringSettings().subscribe(
      () => {
        this.router.navigate(['/zadania/przeciaganie/test']);
      },
      error => {
        this.alertify.error(error);
      });
  }

}
