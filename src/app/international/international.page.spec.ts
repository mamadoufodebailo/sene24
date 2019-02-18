import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalPage } from './international.page';

describe('InternationalPage', () => {
  let component: InternationalPage;
  let fixture: ComponentFixture<InternationalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
