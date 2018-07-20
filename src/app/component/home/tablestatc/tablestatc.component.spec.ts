import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablestatcComponent } from './tablestatc.component';

describe('TablestatcComponent', () => {
  let component: TablestatcComponent;
  let fixture: ComponentFixture<TablestatcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablestatcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablestatcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
