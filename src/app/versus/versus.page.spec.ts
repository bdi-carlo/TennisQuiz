import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersusPage } from './versus.page';

describe('VersusPage', () => {
  let component: VersusPage;
  let fixture: ComponentFixture<VersusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
