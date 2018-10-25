import { Component, OnInit, Input } from '@angular/core';
import { ISkill } from 'src/app/models/user-model';

@Component({
  selector: 'skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {
  @Input('SkillItem') skill: ISkill

  constructor() { }

  ngOnInit() {
  }

  openSkillModal() {
    
  }
}
