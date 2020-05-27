import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnteringResult } from '../_models/entering-result';
import { EnteringSettings } from '../_models/entering-settings';
import { Student } from '../_models/student';

@Injectable({
  providedIn: 'root'
})
export class EnteringService {

  private enteringSettings: EnteringSettings;
  private enteringResult: EnteringResult;
  private student: Student;
  private numOfTest: number;
  private words: string[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.enteringSettings = new EnteringSettings();
    this.enteringResult = new EnteringResult();
    this.student = JSON.parse(localStorage.getItem('currentStudent'));
    this.numOfTest = 0;
  }

  public get testSettings(): EnteringSettings {
    return this.enteringSettings;
  }

  setEnteringSettings(enteringSettings: EnteringSettings) {
    this.numOfTest++;
    enteringSettings.numOfTest = this.numOfTest;
    this.enteringSettings = enteringSettings;
  }

  saveEnteringSettings() {
    this.words = [];
    return this.http.post(this.baseUrl + 'api/exercises/entering/' + this.student.id + "/settings", this.enteringSettings)
      .pipe(map((resposne: any) => {
        this.words = resposne;
      }));
  }

  getWords(): string[] {
    return this.words;
  }

  setEnteringResult(wordsFromTest: string[], typingTime: number[]) {
    this.enteringResult.numOfTest = this.numOfTest;
    this.enteringResult.numOfWords = this.enteringSettings.numOfWords;
    this.enteringResult.typingTime = typingTime;
    let numOfMistakes = 0;

    for (let index = 0; index < this.words.length; index++) {
      let wordFromTest = wordsFromTest[index];
      let word = this.words[index];
      if (wordFromTest != word) {
        numOfMistakes++;
      }
    }

    let cpsTimeInMs = 0;
    typingTime.forEach(element => {
      if (element != 0) {
        cpsTimeInMs += element;
      }
    });

    const cpsTime = cpsTimeInMs / 1000;

    let cpsChars = 0;
    wordsFromTest.forEach(element => {
      if (element != null) {
        cpsChars += element.length;
      }
    });

    const cps = cpsChars / cpsTime;

    this.enteringResult.cps = cps.toFixed(2).replace('.', ',');

    this.enteringResult.wpm = (cps * 60 / 5).toFixed(2).replace('.', ',');

    this.enteringResult.mistakeProbability = (numOfMistakes / this.enteringResult.numOfWords).toFixed(2).replace('.', ',');

    return this.http.post(this.baseUrl + 'api/exercises/entering/' + this.student.id + "/result", this.enteringResult);
  }

  downloadEnteringResult(studentId: string): Observable<Blob> {
    return this.http.get(this.baseUrl + 'api/exercises/entering/' + studentId + '/result/download', { responseType: 'blob' })
  }
}