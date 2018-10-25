import { Component, Input } from '@angular/core';
import { IEducationItem } from 'src/app/models/user-model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EducationModalComponent } from 'src/app/modals/education-modal/education-modal.component';

@Component({
  selector: 'education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent {
  @Input('EducationItem') education: IEducationItem

  constructor(public dialog: MatDialog) {}

  openEduModal(): void {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      width: '1000px',
      data: this.education
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dailog was closed');
    });
  }

}
