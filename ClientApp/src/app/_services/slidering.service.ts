import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SlideringResult } from '../_models/slidering-result';
import { SlideringSettings } from '../_models/slidering-settings';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class SlideringService {

  private slideringSettings: SlideringSettings;
  private values: number[];
  private slideringResult: SlideringResult;
  private student: Student;
  private numOfTest: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.slideringSettings = new SlideringSettings();
    this.slideringResult = new SlideringResult();
    this.student = JSON.parse(localStorage.getItem('currentStudent'));
    this.numOfTest = 0;
  }

  public get testSettings(): SlideringSettings {
    return this.slideringSettings;
  }

  setSlideringSettings(slideringSettings: SlideringSettings) {
    this.numOfTest++;
    slideringSettings.numOfTest = this.numOfTest;
    this.slideringSettings = slideringSettings;
  }

  saveSlideringSettings() {
    return this.http.post(this.baseUrl + 'api/exercises/slidering/' + this.student.id + "/settings", this.slideringSettings);
  }

  getSlideringTest() {
    this.values = [];
    for (let index = 0; index < this.slideringSettings.numOfAttempts; index++) {
      const number = this.randomNumber(this.slideringSettings.numbersFrom, this.slideringSettings.numbersTo);
      this.values.push(number);
    }

    return this.values;
  }

  setSlideringResult(valuesFromTest: number[], time: number[]) {
    this.slideringResult.numOfTest = this.numOfTest;
    this.slideringResult.numOfAttempts = this.slideringSettings.numOfAttempts;
    this.slideringResult.valuesToSet = this.values;
    this.slideringResult.valuesFromTest = valuesFromTest;
    this.slideringResult.numOfMistakes = 0;
    for (let index = 0; index < this.values.length; index++) {
      if (valuesFromTest[index] != this.values[index]) {
        this.slideringResult.numOfMistakes++;
      }

      const Bb = valuesFromTest[index] - this.values[index];
      this.slideringResult.Bb[index] = Math.abs(Bb);

      const Bw = Bb / this.values[index];
      this.slideringResult.Bw[index] = Math.abs(Bw).toFixed(2).replace('.', ',');;

      const TmInMs = time.reduce((a, b) => a + b) / time.length;
      const Tm = TmInMs / 1000;
      this.slideringResult.Tm = Tm.toFixed(3).replace('.', ',');
    }

    return this.http.post(this.baseUrl + 'api/exercises/slidering/' + this.student.id + '/result', this.slideringResult);
  }

  downloadSlideringResult(studentId: string): Observable<Blob> {
    return this.http.get(this.baseUrl + 'api/exercises/slidering/' + studentId + '/result/download', { responseType: 'blob' })
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
