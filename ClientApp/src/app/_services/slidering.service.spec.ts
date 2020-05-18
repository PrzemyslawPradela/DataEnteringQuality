/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlideringService } from './slidering.service';

describe('Service: Slidering', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlideringService]
    });
  });

  it('should ...', inject([SlideringService], (service: SlideringService) => {
    expect(service).toBeTruthy();
  }));
});
