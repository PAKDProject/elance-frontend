import { Component, Inject } from '@angular/core';
import { ISkills } from 'src/models/skill-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss']
})
export class SkillsModalComponent {

  constructor(
    public dialogRef: MatDialogRef<SkillsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISkills) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
