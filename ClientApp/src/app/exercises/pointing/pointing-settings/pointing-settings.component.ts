import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PointingSettings } from 'src/app/_models/pointing-settings';
import { PointingService } from 'src/app/_services/pointing.service';

@Component({
  selector: 'app-pointing-settings',
  templateUrl: './pointing-settings.component.html',
  styleUrls: ['./pointing-settings.component.css']
})
export class PointingSettingsComponent implements OnInit {

  pointingSettings: PointingSettings;

  constructor(private pointingService: PointingService, private router: Router) {
    this.pointingSettings = new PointingSettings();
  }

  ngOnInit() {
    this.pointingSettings.time = 5;
  }

  setPointingSettings() {
    this.pointingService.setPointingSettings(this.pointingSettings);
    this.router.navigate(['/zadania/wskazywanie/test']);
  }

}
