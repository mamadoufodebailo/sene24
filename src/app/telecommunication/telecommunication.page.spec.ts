import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecommunicationPage } from './telecommunication.page';

describe('TelecommunicationPage', () => {
  let component: TelecommunicationPage;
  let fixture: ComponentFixture<TelecommunicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelecommunicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecommunicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
