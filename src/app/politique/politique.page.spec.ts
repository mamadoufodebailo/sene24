import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolitiquePage } from './politique.page';

describe('PolitiquePage', () => {
  let component: PolitiquePage;
  let fixture: ComponentFixture<PolitiquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolitiquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitiquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
