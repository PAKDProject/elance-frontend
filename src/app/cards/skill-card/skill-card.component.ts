import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() editing?: boolean;
  @Output() deleteEmit: EventEmitter<ISkill> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  openSkillModal(): void {
    const dialogRef = this.dialog.open(SkillsModalComponent, {
      maxWidth: '1000px',
      data: this.skill
    })
  }


  remove() {
    this.deleteEmit.emit(this.skill);
  }
}
