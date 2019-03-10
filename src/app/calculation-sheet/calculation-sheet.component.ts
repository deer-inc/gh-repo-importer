import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Summary } from '../summary/summary.component';

@Component({
  selector: 'app-calculation-sheet',
  templateUrl: './calculation-sheet.component.html',
  styleUrls: ['./calculation-sheet.component.scss']
})
export class CalculationSheetComponent implements OnInit {

  userName = this.data.login;
  totalCost = this.data.totalCost;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CalculationSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Summary
  ) {
    console.log(this.data);
  }

  ngOnInit() { }

  closeSheet() {
    this.bottomSheetRef.dismiss(true);
  }

}
