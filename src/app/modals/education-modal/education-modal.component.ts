import { Component, Inject, OnInit, Input, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IEducationItem } from "src/models/user-model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "education-modal",
  templateUrl: "./education-modal.component.html",
  styleUrls: ["./education-modal.component.scss"]
})
export class EducationModalComponent implements OnInit {
  editing: boolean;
  educationForm: FormGroup;
  educationItem: IEducationItem;
  oldItem: IEducationItem;
  emitEducation: EventEmitter<IEducationItem> = new EventEmitter<
    IEducationItem
  >();

  constructor(
    public dialogRef: MatDialogRef<EducationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.editing = this.data.editing;
    if (this.data.education) {
      this.oldItem = this.data.education;
      this.educationItem = this.data.education;
    }
    else {
      this.educationItem = {};
    }
    this.oldItem = this.data.education;

    //Education form
    if (this.editing) {
      this.educationForm = this._fb.group({
        degreeTitle: [this.educationItem.degreeTitle, [Validators.required]],
        educationStartDate: [
          this.educationItem.startYear,
          [Validators.min(1900), Validators.max((new Date()).getFullYear())]
        ],
        educationEndDate: [this.educationItem.endYear],
        collegeName: [this.educationItem.collegeName],
        finalGrade: [this.educationItem.grade],
        educationDescription: [this.educationItem.description]
      });
    }
    else {
      this.educationForm = this._fb.group({
        degreeTitle: "",
        educationStartDate: [, [Validators.min(1900), Validators.max((new Date()).getFullYear())]],
        educationEndDate: (new Date()).getFullYear(),
        collegeName: "",
        finalGrade: "",
        educationDescription: ""
      });
    }

    this.educationEndDate.valueChanges
      .pipe(debounceTime(1000))
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.checkDate();
      });
  }

  get degreeTitle() {
    return this.educationForm.get("degreeTitle");
  }
  get collegeName() {
    return this.educationForm.get("collegeName");
  }
  get finalGrade() {
    return this.educationForm.get("finalGrade");
  }
  get educationDescription() {
    return this.educationForm.get("educationDescription");
  }
  get educationStartDate() {
    return this.educationForm.get("educationStartDate");
  }
  get educationEndDate() {
    return this.educationForm.get("educationEndDate");
  }

  checkDate() {
    if (this.educationStartDate.value && this.educationEndDate.value) {
      if (this.educationStartDate.value >= this.educationEndDate.value) {
        this.educationEndDate.setErrors({
          incorrect: true
        });
      }
    }
  }

  //Retrieve education from form, check if start date is before end date and then add to array
  addEducation() {
    this.educationItem = {
      degreeTitle: this.degreeTitle.value,
      startYear: this.educationStartDate.value,
      endYear: this.educationEndDate.value,
      grade: this.finalGrade.value,
      description: this.educationDescription.value,
      collegeName: this.collegeName.value
    };
    //HERE I EMIT THE EDUCATION ITEM, Where it ends up? I dont have a notion
    if (this.oldItem != null) { this.dialogRef.close({ old: this.oldItem, new: this.educationItem }) }
    else { this.dialogRef.close({ old: null, new: this.educationItem }) }
  }

  //Remove education
  removeEducation() {
    this.dialogRef.close({ old: this.oldItem, new: null });
  }
}
