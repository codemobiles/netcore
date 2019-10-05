import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bkk2Component } from './bkk2.component';

describe('Bkk2Component', () => {
  let component: Bkk2Component;
  let fixture: ComponentFixture<Bkk2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bkk2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bkk2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
