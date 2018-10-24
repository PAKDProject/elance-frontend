import { Component, OnInit, Input } from '@angular/core';
import { IEducationItem } from 'src/app/models/user-model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent implements OnInit {
  @Input('EducationItem') education: IEducationItem

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit() {
  }

}
