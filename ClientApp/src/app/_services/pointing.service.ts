import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PointingResult } from '../_models/pointing-result';
import { PointingSettings } from '../_models/pointing-settings';
import { PointingSettingsFile } from '../_models/pointing-settings-file';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class PointingService {

  private pointingSettings: PointingSettings;
  private pointingSettingsFile: PointingSettingsFile;
  private pointingResult: PointingResult;
  private student: Student;
  private numOfTest: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.pointingSettings = new PointingSettings();
    this.pointingSettingsFile = new PointingSettingsFile();
    this.pointingResult = new PointingResult();
    this.student = JSON.parse(localStorage.getItem('currentStudent'));
    this.numOfTest = 0;
  }

  setPointingSettings(pointingSettings: PointingSettings) {
    this.numOfTest++;
    pointingSettings.numOfTest = this.numOfTest;
    this.pointingSettings = pointingSettings;
  }

  savePointingSettings() {
    this.pointingSettingsFile.numOfTest = this.numOfTest;
    this.pointingSettingsFile.numOfAttempts = this.pointingSettings.numOfAttempts;
    this.pointingSettingsFile.time = this.pointingSettings.time;
    return this.http.post(this.baseUrl + 'api/exercises/pointing/' + this.student.id + "/settings", this.pointingSettingsFile);
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
    this.pointingResult.numOfTest = this.numOfTest;
    this.pointingResult.numOfMissClick = numOfMissClick;
    this.pointingResult.attemptsLeft = attemptsLetf;
    this.pointingResult.btnWidth = this.pointingSettings.btnWidth;
    this.pointingResult.btnDistance = this.pointingSettings.btnDistance;

    for (let index = 0; index < this.pointingSettings.numOfAttempts; index++) {
      const d = this.pointingSettings.btnDistance[index];
      const w = this.pointingSettings.btnWidth[index];
      const id = Math.log2(d + w / w);
      this.pointingResult.ids[index] = id;
    }

    return this.http.post(this.baseUrl + 'api/exercises/pointing/' + this.student.id + "/result", this.pointingResult);
  }

  getPointingResult() {
    return this.pointingResult;
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
