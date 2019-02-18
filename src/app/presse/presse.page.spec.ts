import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressePage } from './presse.page';

describe('PressePage', () => {
  let component: PressePage;
  let fixture: ComponentFixture<PressePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
