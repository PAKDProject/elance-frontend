import { Component, OnInit, Input } from '@angular/core';
import { IEducationItem } from 'src/app/models/user-model';

@Component({
  selector: 'education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent implements OnInit {
  @Input('EducationItem') education: IEducationItem

  ngOnInit() {
  }

}
