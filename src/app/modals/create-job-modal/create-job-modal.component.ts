import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { IJob } from "src/models/job-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserService } from "src/services/user-service/user.service";
import { JobService } from "src/services/job-service/job.service";
import { Store, Select } from "@ngxs/store";
import { AddJob, AddJobOrg, AddJobOrgSuccess, AddJobOrgFail } from "src/redux/actions/job.actions";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { IUser } from "src/models/user-model";
import { ISkills } from "src/models/skill-model";
import { IOrganisation } from "src/models/organisation-model";
import { dispatch } from "rxjs/internal/observable/range";
import { HttpClient } from "@angular/common/http";
import { RequestUpdateUser, RequestRefreshUser } from "src/redux/actions/user.actions";

@Component({
  selector: "app-create-job-modal",
  templateUrl: "./create-job-modal.component.html",
  styleUrls: ["./create-job-modal.component.scss"]
})
export class CreateJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;

  jobForm: FormGroup
    = new FormGroup({
      jobTitle: new FormControl([""], [Validators.required, Validators.maxLength(30)]),
      location: new FormControl([""]),
      remote: new FormControl(false),
      dateDue: new FormControl([""], [Validators.required]),
      payment: new FormControl([""], [Validators.required, Validators.min(0), Validators.max(1000000)]),
      description: new FormControl([""], [Validators.required, Validators.max(300)])
    }, {
        validators: [Validators.compose([this.dateValidators('dateDue')])]
      })

  skillForm: FormGroup
    = new FormGroup({
      selectedSkill: new FormControl([], Validators.required)
    })

  skills: ISkills[];
  skillsLoading: boolean;

  dateValidators(date: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let errors = []
      let currentDate = new Date()
      let tempdate = group.controls[date].value
      let dateDue = new Date(tempdate.year, (tempdate.month - 1), tempdate.day)
      if (group.controls[date].value) {
        if (dateDue.getTime() < currentDate.getTime()) { errors.push('Woah that job was finished a bit too soon buddy') }
      }

      if (errors.length == 0) { return {} }
      else { return { date: errors } }
    }
  }
  addCustomSkill = term => ({
    skillTitle: term,
    category: "Custom"
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IOrganisation | IUser,
    private notificationService: NotificationService,
    private _store: Store,
    private _dialogRef: MatDialogRef<CreateJobModalComponent>,
    private _http: HttpClient,
    private _jobService: JobService
  ) { }

  ngOnInit() {
    this.getSkills().subscribe(res => {
      this.skillsLoading = false;
      this.skills = res;
    })
  }

  //#region getters
  get jobTitle() {
    return this.jobForm.get("jobTitle");
  }
  get remote() {
    return this.jobForm.get("remote");
  }
  get location() {
    return this.jobForm.get("location");
  }
  get dateDue() {
    return this.jobForm.get("dateDue");
  }
  get payment() {
    return this.jobForm.get("payment");
  }
  get description() {
    return this.jobForm.get("description");
  }
  get selectedSkill() {
    return this.skillForm.get("selectedSkill")
  }
  //#endregion

  toggleLocation() {
    if (this.remote) { this.location.disable() }
    else { this.location.enable() }
  }


  submitForm(): void {
    let newJob: Partial<IJob> = {
      title: this.jobForm.value.jobTitle,
      description: this.description.value,
      location: this.location.value,
      dateDue: new Date(this.jobForm.value.dateDue.year, (this.jobForm.value.dateDue.month - 1), this.jobForm.value.dateDue.day),
      payment: this.payment.value,
      remote: this.remote.value,
      datePosted: new Date(),
      tags: this.selectedSkill.value
    }

    if ((this.data as IOrganisation).orgName) {
      let tempOrg = this.data as IOrganisation
      newJob.employerID = tempOrg.id
      newJob.employerName = tempOrg.orgName
      this.dispatch(newJob as IJob, 'org');
    }
    else if ((this.data as IUser).fName) {
      this.user$.subscribe(
        res => {
          newJob.employerID = res.id
          newJob.employerName = `${res.fName} ${res.lName}`
          this.dispatch(newJob as IJob, 'user')
        },
        err => { console.error(err) }
      ).unsubscribe()
    }
  }

  dispatch(job: IJob, type: string) {
    switch (type) {
      case 'user':
        this._store.dispatch([new AddJob(job), new RequestRefreshUser()]);
        this._dialogRef.close();
        break;
      case 'org':
        this._jobService.createNewJob(job).subscribe(
          (res: { job: IJob }) => {
            let updatedPayload = res.job;
            this._store.dispatch(new AddJobOrgSuccess(updatedPayload, job.employerID));
            this._dialogRef.close({
              newJob: updatedPayload
            })
          },
          err => {
            this._store.dispatch(new AddJobOrgFail(err.message));
            this._dialogRef.close();
          }
        );
        break;
    }

  }

  //#region tags region
  getSkills(): Observable<ISkills[]> {
    return this._http.get<ISkills[]>("assets/data/skills.json");
  }
  customSearchFn(term: string, item: ISkills) {
    term = term.toLocaleLowerCase();
    return (
      item.skillTitle.toLocaleLowerCase().indexOf(term) > -1 ||
      item.category.toLocaleLowerCase() === term
    );
  }

  //#endregion
}

