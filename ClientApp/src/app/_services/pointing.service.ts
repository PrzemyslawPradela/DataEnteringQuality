import { Injectable } from '@angular/core';
import { PointingResult } from '../_models/pointing-result';
import { PointingSettings } from '../_models/pointing-settings';

@Injectable({
  providedIn: 'root'
})
export class PointingService {

  private pointingSettings: PointingSettings;
  private pointingResult: PointingResult;

  constructor() {
    this.pointingSettings = new PointingSettings();
    this.pointingResult = new PointingResult();
  }

  setPointingSettings(pointingSettings: PointingSettings) {
    this.pointingSettings = pointingSettings;
  }

  getPointingTest() {
    this.pointingSettings.btnWidth = [];
    this.pointingSettings.btnDistance = [];
    for (let index = 0; index < this.pointingSettings.numOfAttempts; index++) {

      const btnWidth = this.randomNumber(5, 100);
      this.pointingSettings.btnWidth.push(btnWidth);

      const btnDistance = this.randomNumber(100, 500);
      this.pointingSettings.btnDistance.push(btnDistance);
    }

    return this.pointingSettings;
  }

  setPointingResult(numOfMissClick: number, attemptsLetf: number) {
    this.pointingResult.numOfMissClick = numOfMissClick;
    this.pointingResult.attemptsLeft = attemptsLetf;

    for (let index = 0; index < this.pointingSettings.numOfAttempts; index++) {
      const d = this.pointingSettings.btnDistance[index];
      const w = this.pointingSettings.btnWidth[index];
      const id = Math.log2(d + w / w);
      this.pointingResult.ids[index] = id;
    }
  }

  getPointingResult() {
    return this.pointingResult;
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
