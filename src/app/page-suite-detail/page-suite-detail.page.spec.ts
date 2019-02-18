import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuiteDetailPage } from './page-suite-detail.page';

describe('PageSuiteDetailPage', () => {
  let component: PageSuiteDetailPage;
  let fixture: ComponentFixture<PageSuiteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSuiteDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSuiteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
