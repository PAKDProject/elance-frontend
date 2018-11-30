import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ISkills } from "../../models/skill-model";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import { RequestAddSkillToUser } from "src/redux/actions/user.actions";

@Component({
  selector: "app-add-skill",
  templateUrl: "./add-skill.component.html",
  styleUrls: ["./add-skill.component.scss"]
})
export class AddSkillComponent implements OnInit {
  @Output() dismissFormEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  skillForm: FormGroup;
  skills: ISkills[];
  skillsLoading: boolean;

  selectedSkills: ISkills[] = [];
  addCustomSkill = term => ({
    skillTitle: term,
    category: "Custom"
  });

  constructor(private _fb: FormBuilder, private _http: HttpClient, private store: Store) { }

  ngOnInit() {

    this.getSkills().subscribe(res => {
      console.log(res);
      this.skillsLoading = false;
      this.skills = res;
    });

    this.skillForm = this._fb.group({
      selectedSkill: []
    });

    this.skillForm.valueChanges.subscribe(data => {
      this.selectedSkills = data.selectedSkill;
    })
  }

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

  addSkills() {
    this.store.dispatch(new RequestAddSkillToUser(this.selectedSkills))
    this.dismissFormEmit.emit(true);

  }

  dismissForm() {
    this.dismissFormEmit.emit(true);
  }
}