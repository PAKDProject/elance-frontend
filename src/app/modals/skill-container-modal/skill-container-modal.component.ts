import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

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

}
