import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISkills } from 'src/models/user-model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'profile-row',
  templateUrl: './profile-row.component.html',
  styleUrls: ['./profile-row.component.scss']
})
export class ProfileRowComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;

  @Input() editing: boolean;

  @Output() summaryChangeEmit: EventEmitter<string> = new EventEmitter<string>();

  @Output() skillAddEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();
  @Output() skillDeleteEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();
  @Output() skillChangeEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();

  @Output() eduAddEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() eduDeleteEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() eduChangeEmit: EventEmitter<any> = new EventEmitter<any>();

  summary: FormControl = new FormControl();

  constructor() {
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
