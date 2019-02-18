import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietePage } from './societe.page';

describe('SocietePage', () => {
  let component: SocietePage;
  let fixture: ComponentFixture<SocietePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocietePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
