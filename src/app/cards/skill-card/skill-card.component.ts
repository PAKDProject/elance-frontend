import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ISkills } from 'src/models/user-model';
import { SkillsModalComponent } from 'src/app/modals/skills-modal/skills-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss'],
})
export class SkillCardComponent {
  @Input('SkillItem') skill: ISkills
  @Input() editing?: boolean;
  @Output() deleteEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();

  constructor(public dialog: MatDialog) { }

  openSkillModal(): void {
    const dialogRef = this.dialog.open(SkillsModalComponent, {
      maxWidth: '1000px',
      data: this.skill
    })
  }

  remove() {
    console.log('Deleting skill:');
    console.log(this.skill);
    this.deleteEmit.emit(this.skill);
  }

  moreInfo:boolean;
  toggleMoreInfo() {
    this.moreInfo = !this.moreInfo;
  }
}
