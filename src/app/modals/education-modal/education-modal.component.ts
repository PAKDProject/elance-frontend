import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IEducationItem } from 'src/models/user-model';


@Component({
  selector: 'education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.scss']
})
export class EducationModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EducationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEducationItem) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
