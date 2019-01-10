import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ISkills } from 'src/models/skill-model';

@Component({
  selector: 'app-skill-container-modal',
  templateUrl: './skill-container-modal.component.html',
  styleUrls: ['./skill-container-modal.component.scss']
})
export class SkillContainerModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkillContainerModalComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dismissForm(e: boolean) {
    if (e) {
      this.onNoClick();
    }
  }

  addSkills(e: ISkills[]) {
    this.dialogRef.close(e);
  }
}