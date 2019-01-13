import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TEMPLATEPage } from './template.page';

describe('TEMPLATEPage', () => {
  let component: TEMPLATEPage;
  let fixture: ComponentFixture<TEMPLATEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TEMPLATEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TEMPLATEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
