import { Component, OnInit, Input, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IJob } from "src/models/job-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserService } from "src/services/user-service/user.service";
import { JobService } from "src/services/job-service/job.service";
import { Store, Select } from "@ngxs/store";
import { AddJob } from "src/redux/actions/job.actions";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { IUser } from "src/models/user-model";
import { ISkills } from "src/models/skill-model";
import { IOrganisation } from "src/models/organisation-model";
import { dispatch } from "rxjs/internal/observable/range";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-create-job-modal",
  templateUrl: "./create-job-modal.component.html",
  styleUrls: ["./create-job-modal.component.scss"]
})
export class CreateJobModalComponent implements OnInit {
  @Select(UserState.getUser) user$: Observable<IUser>;
  jobForm: FormGroup;
  skillForm: FormGroup;
  skills: ISkills[];
  skillsLoading: boolean;
  selectedSkills: ISkills[] = [];
  addCustomSkill = term => ({
    skillTitle: term,
    category: "Custom"
  });

  newJob: IJob;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IOrganisation | IUser,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private _store: Store,
    private _dialogRef: MatDialogRef<CreateJobModalComponent>,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    //#region Jobs
    this.newJob = {
      title: "",
      employerName: "",
      employerID: "",
      description: "",
      datePosted: new Date(),
      payment: null,
      remote: false
    };
    this.jobForm = this.fb.group({
      jobTitle: ["", [Validators.required, Validators.maxLength(30)]],
      location: [""],
      remote: [this.newJob.remote],
      dateDue: [""],
      payment: [
        "",
        [Validators.required, Validators.min(0), Validators.max(1000000)]
      ],
      description: ["", [Validators.required]]
    });
    this.jobForm.valueChanges.subscribe(data => {
      this.newJob.title = data.jobTitle;
      this.newJob.description = data.description;
      this.newJob.location = data.location;
      this.newJob.dateDue = data.dateDue;
      this.newJob.payment = data.payment;
      this.newJob.remote = data.remote;
    });
    //#endregion
    //#region skill tags
    this.getSkills().subscribe(res => {
      console.log(res);
      this.skillsLoading = false;
      this.skills = res;
    });

    this.skillForm = this.fb.group({
      selectedSkill: []
    });

    this.skillForm.valueChanges.subscribe(data => {
      this.selectedSkills = data.selectedSkill;
    })

    //#endregion
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
  //#endregion

  toggleLocation() {
    if (this.newJob.remote) this.location.disable();
    if (this.newJob.remote === false) this.location.enable();
  }
  submitForm(): void {
    const date = new Date(this.dateDue.value.year, this.dateDue.value.month - 1, this.dateDue.value.day);
    this.newJob.dateDue = date
    console.log(date)
    if (date <= new Date()) {
      this.dateDue.setErrors({ invalid: true });
      this.notificationService.showError("An error occured");
    }
    else {
      this.newJob.tags = this.selectedSkills;
      if ((this.data as IOrganisation).websiteUrl) {
        let tempOrg = this.data as IOrganisation
        this.newJob.employerID = tempOrg.id
        this.newJob.employerName = tempOrg.orgName
        this.dispatch();
      }
      else if ((this.data as IUser).fName) {
        this.user$.subscribe(u => {
          this.newJob.employerID = u.id
          this.newJob.employerName = `${u.fName} ${u.lName}`
          this.dispatch();
        })
      }
    }
  }

  dispatch() {
    console.log(this.newJob)
    this._store.dispatch(new AddJob(this.newJob));
    this._dialogRef.close();
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

