import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ISkills } from "../../../models/skill-model";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-skill-modal",
  templateUrl: "./add-skill-modal.component.html",
  styleUrls: ["./add-skill-modal.component.scss"]
})
export class AddSkillModalComponent implements OnInit {
  skillForm: FormGroup;
  skills: ISkills[];
  skillsLoading: boolean;

  selectedSkills: ISkills[] = [];
  addCustomSkill = term => ({
    id: term.toLocaleLowerCase(),
    skillTitle: term,
    category: "Custom"
  });

  constructor(private _fb: FormBuilder, private _http: HttpClient) {}

  ngOnInit() {
    this.getSkills().subscribe(res => {
      console.log(res);
      this.skillsLoading = false;
      this.skills = res;
    });

    this.skillForm = this._fb.group({
      selectedSkill: []
    });
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
}
