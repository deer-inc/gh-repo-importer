import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationSheetComponent } from './calculation-sheet.component';

describe('CalculationSheetComponent', () => {
  let component: CalculationSheetComponent;
  let fixture: ComponentFixture<CalculationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
