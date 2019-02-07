import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IJob } from "src/models/job-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserService } from "src/services/user-service/user.service";
import { JobService } from "src/services/job-service/job.service";
import { Store, Select } from "@ngxs/store";
import { AddJob } from "src/redux/actions/job.actions";
import { MatDialogRef } from "@angular/material";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { IUser } from "src/models/user-model";

@Component({
  selector: "app-create-job-modal",
  templateUrl: "./create-job-modal.component.html",
  styleUrls: ["./create-job-modal.component.scss"]
})
export class CreateJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;
  induvidual: boolean;
  induvidualJobForm: FormGroup;
  newJob: IJob;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private _store: Store,
    private _dialogRef: MatDialogRef<CreateJobModalComponent>
  ) { }

  ngOnInit() {
    this.newJob = {
      title: "",
      employerName: "",
      employerID: "",
      description: "",
      datePosted: new Date(),
      payment: null,
      remote: false
    };
    this.induvidualJobForm = this.fb.group({
      jobTitle: ["", [Validators.required, Validators.maxLength(30)]],
      employer: ["", [Validators.required]],
      location: [""],
      remote: [this.newJob.remote],
      dateDue: [""],
      payment: [
        "",
        [Validators.required, Validators.min(0), Validators.max(1000000)]
      ],
      description: ["", [Validators.required]]
    });

    this.induvidualJobForm.valueChanges.subscribe(data => {
      this.newJob.title = data.jobTitle;
      this.newJob.employerName = data.employer;
      this.newJob.description = data.description;
      this.newJob.location = data.location;
      this.newJob.dateDue = data.dateDue;
      this.newJob.payment = data.payment;
      this.newJob.remote = data.remote;
    });
  }

  //#region getters
  get jobTitle() {
    return this.induvidualJobForm.get("jobTitle");
  }
  get remote() {
    return this.induvidualJobForm.get("remote");
  }
  get employer() {
    return this.induvidualJobForm.get("employer");
  }
  get location() {
    return this.induvidualJobForm.get("location");
  }
  get dateDue() {
    return this.induvidualJobForm.get("dateDue");
  }
  get payment() {
    return this.induvidualJobForm.get("payment");
  }
  get description() {
    return this.induvidualJobForm.get("description");
  }
  //#endregion

  toggleLocation() {
    if (this.newJob.remote) this.location.disable();
    if (this.newJob.remote === false) this.location.enable();
  }
  submitForm(): void {
    const date = new Date(`${this.dateDue.value}T00:00:00`);
    if (date <= new Date()) {
      this.dateDue.setErrors({ invalid: true });
      this.notificationService.showError("An error occured");
    } else {
      this.user$.subscribe(res => {
        this.newJob.employerID = res.id;
      });
      this._store.dispatch(new AddJob(this.newJob));
      this._dialogRef.close();
    }
  }
}
