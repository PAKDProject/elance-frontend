import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreateJobModalComponent } from "../modals/create-job-modal/create-job-modal.component";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openModal(): void {
    this.dialog.open(CreateJobModalComponent, {
      maxWidth: "1000px"
    });
  }
}
