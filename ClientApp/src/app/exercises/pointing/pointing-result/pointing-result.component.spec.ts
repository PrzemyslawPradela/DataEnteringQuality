/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PointingResultComponent } from './pointing-result.component';

describe('PointingResultComponent', () => {
  let component: PointingResultComponent;
  let fixture: ComponentFixture<PointingResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointingResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
