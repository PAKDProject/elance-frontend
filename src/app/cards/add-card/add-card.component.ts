import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SkillContainerModalComponent } from 'src/app/modals/skill-container-modal/skill-container-modal.component';
import { ISkills } from 'src/models/skill-model';

@Component({
  selector: 'add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  @Output() skillEmit: EventEmitter<ISkills[]> = new EventEmitter<ISkills[]>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openSkillModal(): void {
    const dialaogRef = this.dialog.open(SkillContainerModalComponent, {
      maxWidth: '1000px',
    })
    dialaogRef.afterClosed().subscribe(yeet => {
      if (yeet != null) {
        this.skillEmit.emit(yeet as ISkills[]);
      }
    })
  }
}