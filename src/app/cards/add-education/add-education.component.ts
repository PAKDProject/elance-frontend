import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EducationModalComponent } from 'src/app/modals/education-modal/education-modal.component';

@Component({
  selector: 'add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEducationModal(): void {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      maxWidth: '1000px',
      data: { 'education': null, 'editing': true }
    })
}
