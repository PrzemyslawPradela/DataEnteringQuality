/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PointingService } from './pointing.service';

describe('Service: Pointing', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PointingService]
    });
  });

  it('should ...', inject([PointingService], (service: PointingService) => {
    expect(service).toBeTruthy();
  }));
});
