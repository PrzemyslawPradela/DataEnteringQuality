/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { EnteringService } from './entering.service';

describe('Service: Entering', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnteringService]
    });
  });

  it('should ...', inject([EnteringService], (service: EnteringService) => {
    expect(service).toBeTruthy();
  }));
});
