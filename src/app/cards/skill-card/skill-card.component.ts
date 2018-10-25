import { Component, Input } from '@angular/core';
import { ISkill } from 'src/app/models/user-model';
import { SkillsModalComponent } from 'src/app/modals/skills-modal/skills-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent {
  @Input('SkillItem') skill: ISkill

  constructor(public dialog: MatDialog) {}

  openSkillModal(): void {
    const dialogRef = this.dialog.open(SkillsModalComponent, {
      width: '1000px',
      data: this.skill
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dailog was closed');
    });
  }
}
