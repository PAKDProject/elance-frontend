import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormBuilder
} from "@angular/forms";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";

@Component({
  selector: "app-add-skill-modal",
  templateUrl: "./add-skill-modal.component.html",
  styleUrls: ["./add-skill-modal.component.scss"]
})
export class AddSkillModalComponent implements OnInit {
  skillForm: FormGroup;
  skillLevel: string = "Novice";

  skills = [
    { id: "1", skill: "JavaScript", area: "Web Programming" },
    { id: "4", skill: "TypeScript", area: "Web Programming" },
    { id: "5", skill: "Angular", area: "Web Programming" },
    { id: "6", skill: "C#", area: "Old School" },
    { id: "7", skill: "Java", area: "Old School" },
    { id: "8", skill: "Asp.Net Mvc", area: "Old School" }
  ];

  refactoredSkills = [];

  selectedSkill: any;
  addCustomSkill = term => ({ id: term, skill: term, area: "Custom" });

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.skills.forEach(skill => {
      let noviceSkill = {
        id: `novice${skill.skill}`,
        skill: `${skill.skill} - Novice`,
        area: skill.area,
        skillType: skill.skill
      };
      let intermediateSkill = {
        id: `intermediate${skill.skill}`,
        skill: `${skill.skill} - Intermediate`,
        area: skill.area,
        skillType: skill.skill
      };
      let expertSkill = {
        id: `expert${skill.skill}`,
        skill: `${skill.skill} - Expert`,
        area: skill.area,
        skillType: skill.skill
      };

      this.refactoredSkills.push(noviceSkill);
      this.refactoredSkills.push(intermediateSkill);
      this.refactoredSkills.push(expertSkill);
    });
    this.skillForm = this._fb.group({
      selectedSkill: []
    });
  }
}
