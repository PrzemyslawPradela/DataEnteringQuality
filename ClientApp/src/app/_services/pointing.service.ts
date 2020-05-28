import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PointingResult } from '../_models/pointing-result';
import { PointingSettings } from '../_models/pointing-settings';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class PointingService {

  private pointingSettings: PointingSettings;
  private pointingResult: PointingResult;
  private student: Student;
  private numOfTest: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.pointingSettings = new PointingSettings();
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
    return this.http.post(this.baseUrl + 'api/exercises/pointing/' + this.student.id + "/settings", this.pointingSettings);
  }

  getPointingTest() {
    this.pointingSettings.x = [];
    this.pointingSettings.y = [];
    this.pointingSettings.middleX = [];
    this.pointingSettings.middleY = [];
    this.pointingSettings.x2 = [];
    this.pointingSettings.y2 = [];
    this.pointingSettings.middleX2 = [];
    this.pointingSettings.middleY2 = [];
    const w = this.pointingSettings.w;
    const d = this.pointingSettings.d;
    for (let index = 0; index < this.pointingSettings.numOfAttempts; index++) {
      const x = this.randomNumber(0, 1000 - w);
      const y = this.randomNumber(0, 600 - w);
      const middleX = x + (w / 2);
      const middleY = y + (w / 2);
      this.pointingSettings.x.push(x);
      this.pointingSettings.y.push(y);
      this.pointingSettings.middleX.push(middleX);
      this.pointingSettings.middleY.push(middleY);

      let middleX2 = 0;
      let middleY2 = 0;
      let task = this.randomNumber(1, 3);

      if (task == 1) {
        if (middleX > 500) {
          middleX2 = middleX - d / Math.sqrt(2);
        } else {
          middleX2 = middleX + d / Math.sqrt(2);
        }

        if (middleY > 300) {
          middleY2 = middleY - d / Math.sqrt(2);
        } else {
          middleY2 = middleY + d / Math.sqrt(2);
        }
      }

      if (task == 2) {
        if (middleX > 500) {
          middleX2 = middleX - d;
        } else {
          middleX2 = middleX + d;
        }
        middleY2 = middleY;
      }

      if (task == 3) {
        if (middleY > 300) {
          middleY2 = middleY - d;
        } else {
          middleY2 = middleY + d;
        }
        middleX2 = middleX;
      }

      const x2 = middleX2 - (w / 2);
      const y2 = middleY2 - (w / 2);
      this.pointingSettings.x2.push(x2);
      this.pointingSettings.y2.push(y2);
      this.pointingSettings.middleX2.push(middleX2);
      this.pointingSettings.middleY2.push(middleY2);
    }

    return this.pointingSettings;
  }

  setPointingResult(numOfMissClick: number) {
    this.pointingResult.numOfTest = this.numOfTest;
    this.pointingResult.numOfMissClick = numOfMissClick;

    return this.http.post(this.baseUrl + 'api/exercises/pointing/' + this.student.id + "/result", this.pointingResult);
  }

  getPointingResult() {
    return this.pointingResult;
  }

  downloadPointingResult(studentId: string): Observable<Blob> {
    return this.http.get(this.baseUrl + 'api/exercises/pointing/' + studentId + '/result/download', { responseType: 'blob' })
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
