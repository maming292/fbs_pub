import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuningComponent } from './runing.component';

describe('RuningComponent', () => {
  let component: RuningComponent;
  let fixture: ComponentFixture<RuningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
