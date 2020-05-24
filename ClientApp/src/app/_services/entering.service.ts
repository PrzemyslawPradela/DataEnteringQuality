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

  setEnteringResult(wordsFromTest: string[]) {
    this.enteringResult.numOfTest = this.numOfTest;
    this.enteringResult.numOfWords = this.enteringSettings.numOfWords;
    this.enteringResult.numOfMistypedWords = 0;
    this.enteringResult.averageNumOfMistakesInWords = 0;
    let numOfMistakesInWords = 0;

    if (wordsFromTest.length == 0) {
      this.enteringResult.allWordsEmpty = true;
    } else {
      this.enteringResult.allWordsEmpty = false;
    }

    for (let index = 0; index < this.words.length; index++) {
      let wordFromTest = wordsFromTest[index];
      let word = this.words[index];
      if (wordFromTest != word) {
        this.enteringResult.numOfMistypedWords++;
        if (wordFromTest != null) {
          if (wordFromTest.length == word.length) {
            for (let index = 0; index < this.testSettings.wordLength; index++) {
              if (wordFromTest[index] != word[index]) {
                numOfMistakesInWords++;
              }
            }
          } else {
            const result = word.length - wordFromTest.length;
            const abs = Math.abs(result);
            numOfMistakesInWords += abs;
            for (let index = 0; index < wordFromTest.length; index++) {
              if (wordFromTest[index] != word[index]) {
                numOfMistakesInWords++;
              }
            }
          }
        } else {
          numOfMistakesInWords += word.length;
        }
      }
    }
    this.enteringResult.averageNumOfMistakesInWords = numOfMistakesInWords / this.enteringResult.numOfWords;

    return this.http.post(this.baseUrl + 'api/exercises/entering/' + this.student.id + "/result", this.enteringResult);
  }

  downloadEnteringResult(studentId: string): Observable<Blob> {
    return this.http.get(this.baseUrl + 'api/exercises/entering/' + studentId + '/result/download', { responseType: 'blob' })
  }
}