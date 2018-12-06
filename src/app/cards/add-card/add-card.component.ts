import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SkillContainerModalComponent } from 'src/app/modals/skill-container-modal/skill-container-modal.component';

@Component({
  selector: 'add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openSkillModal(): void {
    this.dialog.open(SkillContainerModalComponent, {
      maxWidth: '1000px',
    })
  }
}
