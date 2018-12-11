import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ISkills } from "src/models/skill-model";
import { SkillsModalComponent } from "src/app/modals/skills-modal/skills-modal.component";
import { MatDialog } from "@angular/material";
import { Store } from "@ngxs/store";

@Component({
  selector: "skill-card",
  templateUrl: "./skill-card.component.html",
  styleUrls: ["./skill-card.component.scss"]
})
export class SkillCardComponent {
  @Input("SkillItem") skill: ISkills;
  @Input() editing?: boolean;
  @Output() deleteEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();
  @Output() skillChangeEmit: EventEmitter<ISkills> = new EventEmitter<ISkills>();

  //Slider properties
  skillLevels: string[] = [
    "Novice",
    "Advanced Beginner",
    "Competent",
    "Proficient",
    "Expert"
  ];
  selectedConfidence: string = "Select a value"
  moreInfo: boolean;
  min: number = 1;
  max: number = 5;
  step: number = 1;
  showTicks: boolean = true;
  thumbLabel: boolean = false;
  tickInterval = "auto";
  value: number = 0;

  constructor(public dialog: MatDialog, public _store: Store) { }

  openSkillModal(): void {
    const dialogRef = this.dialog.open(SkillsModalComponent, {
      maxWidth: "1000px",
      data: this.skill
    });
  }

  remove() {
    this.deleteEmit.emit(this.skill);
  }

  toggleMoreInfo() {
    this.moreInfo = !this.moreInfo;
  }

  //slider Methods
  changeLevel() {
    this.selectedConfidence = this.skillLevels[this.value - 1];
  }

  saveConfidenceLevel() {
    this.skill.confidenceLevel = this.selectedConfidence;
    this.skillChangeEmit.emit(this.skill);
    this.moreInfo = false;
  }
}
