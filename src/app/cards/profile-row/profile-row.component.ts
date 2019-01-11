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

  @Output() titleChangeEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() summaryChangeEmit: EventEmitter<string> = new EventEmitter<string>();

  @Output() skillAddEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();
  @Output() skillDeleteEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();
  @Output() skillChangeEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();

  @Output() eduAddEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() eduDeleteEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() eduChangeEmit: EventEmitter<any> = new EventEmitter<any>();

  title: FormControl = new FormControl();
  summary: FormControl = new FormControl();

  constructor() {
    this.title.valueChanges
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(
      title => {
        this.titleChangeEmit.emit(title);
      }
    );
    this.summary.valueChanges
    .pipe(debounceTime(500))
    .pipe(distinctUntilChanged())
    .subscribe(
      summary => {
        this.summaryChangeEmit.emit(summary);
      }
    );
  }

  ngOnInit() { }

  //Title Editing (custom cards)
  titleEdit: boolean = false;
  toggleEditTitle() {
    if(this.card.type == 'custom')
    { this.titleEdit = !this.titleEdit; }
  }

  //Summary editing
  summaryEdit: boolean = false;
  toggleEditSummary() { this.summaryEdit = !this.summaryEdit; }

  //Skill editing
  addSkill(s) { this.skillAddEmit.emit(s); }

  removeSkill(s) { this.skillDeleteEmit.emit(s); }

  changeSkill(s) { this.skillChangeEmit.emit(s); }

  //Education editing
  addEdu(e) { this.eduAddEmit.emit(e); }

  removeEdu(e) { this.eduDeleteEmit.emit(e); }

  changeEdu(e) { this.eduChangeEmit.emit(e); }

}