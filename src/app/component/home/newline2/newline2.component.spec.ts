import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newline2Component } from './newline2.component';

describe('Newline2Component', () => {
  let component: Newline2Component;
  let fixture: ComponentFixture<Newline2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newline2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newline2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
