import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from 'src/models/user-model';

@Component({
  selector: 'contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Input('ContactInput') contact: Partial<IUser>;
  @Input('EditingInput') editing: boolean;
  @Output('RemoveEmit') removeEmit: EventEmitter<Partial<IUser>> = new EventEmitter<Partial<IUser>>();

  constructor() { }

  ngOnInit() {
  }

  remove() {
    this.removeEmit.emit(this.contact);
  }


}
