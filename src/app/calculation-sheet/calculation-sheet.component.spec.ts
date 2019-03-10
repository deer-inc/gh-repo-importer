import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationSheetComponent } from './calculation-sheet.component';
import { SharedModule } from '../shared/shared.module';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

describe('CalculationSheetComponent', () => {
  let component: CalculationSheetComponent;
  let fixture: ComponentFixture<CalculationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationSheetComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        {provide: MatBottomSheetRef},
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
      ]
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
