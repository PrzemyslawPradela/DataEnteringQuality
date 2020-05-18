/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlideringResultComponent } from './slidering-result.component';

describe('SlideringResultComponent', () => {
  let component: SlideringResultComponent;
  let fixture: ComponentFixture<SlideringResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideringResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideringResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
