/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PointingTestComponent } from './pointing-test.component';

describe('PointingTestComponent', () => {
  let component: PointingTestComponent;
  let fixture: ComponentFixture<PointingTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointingTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
