import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bkk1Component } from './bkk1.component';

describe('Bkk1Component', () => {
  let component: Bkk1Component;
  let fixture: ComponentFixture<Bkk1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bkk1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bkk1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
