import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiePage } from './economie.page';

describe('EconomiePage', () => {
  let component: EconomiePage;
  let fixture: ComponentFixture<EconomiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomiePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
