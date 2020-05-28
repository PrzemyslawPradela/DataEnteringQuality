import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointingSettings } from 'src/app/_models/pointing-settings';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PointingService } from 'src/app/_services/pointing.service';

@Component({
  selector: 'app-pointing-settings',
  templateUrl: './pointing-settings.component.html',
  styleUrls: ['./pointing-settings.component.css']
})
export class PointingSettingsComponent implements OnInit {

  pointingSettings: PointingSettings;

  constructor(private pointingService: PointingService, private router: Router, private alertify: AlertifyService) {
    this.pointingSettings = new PointingSettings();
  }

  ngOnInit() {
    this.pointingSettings.time = 5;
    this.pointingSettings.w = 5;
    this.pointingSettings.d = 100;
  }

  setPointingSettings() {
    this.pointingService.setPointingSettings(this.pointingSettings);
    this.pointingService.savePointingSettings().subscribe(
      () => {
        this.router.navigate(['/zadania/wskazywanie/test']);
      },
      error => {
        this.alertify.error(error);
      });
  }

}
