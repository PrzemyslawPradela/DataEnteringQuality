import { Injectable } from '@angular/core';
import { SlideringResult } from '../_models/slidering-result';
import { SlideringSettings } from '../_models/slidering-settings';

@Injectable({
  providedIn: 'root'
})
export class SlideringService {

  private slideringSettings: SlideringSettings;
  private values: number[];
  private slideringResult: SlideringResult;

  constructor() {
    this.slideringResult = new SlideringResult();
  }

  public get testSettings(): SlideringSettings {
    return this.slideringSettings;
  }

  setSlideringSettings(slideringSettings: SlideringSettings) {
    this.slideringSettings = slideringSettings;
  }

  getSlideringTest() {
    this.values = [];
    for (let index = 0; index < this.slideringSettings.numOfAttempts; index++) {
      const number = this.randomNumber(this.slideringSettings.numbersFrom, this.slideringSettings.numbersTo);
      this.values.push(number);
    }

    return this.values;
  }

  setSlideringResult(valuesFromTest: number[]) {
    this.slideringResult.numOfMistakes = 0;
    for (let index = 0; index < this.values.length; index++) {
      if (valuesFromTest[index] == 0) {
        this.slideringResult.numOfMistakes++;
      } else if (valuesFromTest[index] != this.values[index]) {
        this.slideringResult.numOfMistakes++;
      }
      const result = valuesFromTest[index] - this.values[index];
      this.slideringResult.valuesAccuracy[index] = Math.abs(result);
    }
  }

  getSlideringResult() {
    return this.slideringResult;
  }

  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
