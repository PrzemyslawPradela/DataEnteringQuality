/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlideringTestComponent } from './slidering-test.component';

describe('SlideringTestComponent', () => {
  let component: SlideringTestComponent;
  let fixture: ComponentFixture<SlideringTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideringTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideringTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
