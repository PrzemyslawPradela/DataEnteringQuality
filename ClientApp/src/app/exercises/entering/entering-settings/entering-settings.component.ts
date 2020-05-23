import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnteringSettings } from 'src/app/_models/entering-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EnteringService } from 'src/app/_services/entering.service';

@Component({
  selector: 'app-entering-settings',
  templateUrl: './entering-settings.component.html',
  styleUrls: ['./entering-settings.component.css']
})
export class EnteringSettingsComponent implements OnInit {

  enteringSettings: EnteringSettings

  constructor(private enteringService: EnteringService, private router: Router, private alertify: AlertifyService) {
    this.enteringSettings = new EnteringSettings();
  }

  ngOnInit() {
    this.enteringSettings.time = 5;
  }

  setEnteringSettings() {
    this.enteringService.setEnteringSettings(this.enteringSettings);
    this.enteringService.saveEnteringSettings().subscribe(
      () => {
        this.router.navigate(['/zadania/wprowadzanie/test']);
      },
      error => {
        this.alertify.error(error);
      });
  }

}
