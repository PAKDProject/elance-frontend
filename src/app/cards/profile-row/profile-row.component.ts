import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISkills } from 'src/models/user-model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IProfileCard } from 'src/models/profile-card';

@Component({
  selector: 'profile-row',
  templateUrl: './profile-row.component.html',
  styleUrls: ['./profile-row.component.scss']
})
export class ProfileRowComponent implements OnInit {
  @Input() card: IProfileCard;
  @Input() editing: boolean;
  @Input() arrayIndex;

  @Output() actionEmit: EventEmitter<any> = new EventEmitter<any>();

  summary: FormControl = new FormControl();

  title: FormControl = new FormControl();
  customSummary: FormControl = new FormControl();

  constructor() {
    this.summary.valueChanges
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(
      summary => {
        this.updateSummary(summary);
      }
    );

    this.title.valueChanges
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(
      title => {
        this.updateTitle(title);
      }
    );
    this.customSummary.valueChanges
    .pipe(debounceTime(1000))
    .pipe(distinctUntilChanged())
    .subscribe(
      summary => {
        this.updateCustomSummary(summary)
      }
    );
  }

  ngOnInit() { }

  //Toggle Editing
  titleEdit: boolean = false;
  toggleEditTitle() {
    if(this.card.type == 'custom')
    { this.titleEdit = !this.titleEdit; }
  }
  summaryEdit: boolean = false;
  toggleEditSummary() { this.summaryEdit = !this.summaryEdit; }

  //Summary editing
  updateSummary(s: string) {
    this.actionEmit.emit(
      {
        type: 'bioChange',
        content: s
      }
    );
  }

  //Skill editing
  addSkill(s) {
    // this.skillAddEmit.emit(s);
    this.actionEmit.emit(
      {
        type: 'addSkill',
        content: s
      }
    );
  }

  removeSkill(s) {
    // this.skillDeleteEmit.emit(s);
    this.actionEmit.emit(
      {
        type: 'removeSkill',
        content: s
      }
    )
  }

  changeSkill(s) {
    // this.skillChangeEmit.emit(s);
    this.actionEmit.emit(
      {
        type: 'changeSkill',
        content: s
      }
    )
  }

  //Education editing
  addEdu(e) {
    // this.eduAddEmit.emit(e);
    this.actionEmit.emit(
      {
        type: 'addEducation',
        content: e
      }
    )
  }

  removeEdu(e) {
    // this.eduDeleteEmit.emit(e);
    this.actionEmit.emit(
      {
        type: 'removeEducation',
        content: e
      }
    )
  }

  changeEdu(e) {
    // this.eduChangeEmit.emit(e);
    this.actionEmit.emit(
      {
        type: 'changeEducation',
        content: e
      }
    )
  }

  //Custom card editing
  updateTitle(t) {
    this.actionEmit.emit(
      {
        type: 'cTitleChange',
        content: 
        {
          newTitle: t,
          indexInArray: this.arrayIndex
        }
      }
    )
  }

  updateCustomSummary(s) {
    this.actionEmit.emit(
      {
        type: 'cSummaryChange',
        content: 
        {
          newSummary: s,
          indexInArray: this.arrayIndex
        }
      }
    )
  }

}