import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { EducationModalComponent } from "src/app/modals/education-modal/education-modal.component";
import { IEducationItem } from "src/models/user-model";

@Component({
  selector: "add-education",
  templateUrl: "./add-education.component.html",
  styleUrls: ["./add-education.component.scss"]
})
export class AddEducationComponent implements OnInit {
  @Output() educationEmit: EventEmitter<IEducationItem> = new EventEmitter<
    IEducationItem
  >();
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openEducationModal(): void {
    const dialogRef = this.dialog.open(EducationModalComponent, {
      maxWidth: "1000px",
      data: { editing: true }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.educationEmit.emit(data);
      }
    });
  }
}
