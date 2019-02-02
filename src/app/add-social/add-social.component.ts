import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ISocialLink } from 'src/models/user-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-social',
  templateUrl: './add-social.component.html',
  styleUrls: ['./add-social.component.scss']
})
export class AddSocialComponent implements OnInit {

  socialForm: FormGroup;
  socials: string[] = ["facebook", "twitter", "linkedin", "github", "gitlab", "bitbucket", "other"];
  socialType: string;

  valid: boolean = false;
  account: ISocialLink;
  @Output() emitNewSocial: EventEmitter<ISocialLink> = new EventEmitter<ISocialLink>();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.account = {
      linkUrl: '',
      name: ''
    }
    this.socialForm = this._fb.group({
      url: ["", [Validators.required]]
    })

    this.socialForm.valueChanges.subscribe(data => {
      this.account.linkUrl = data.url;
    })
  }

  get url() {
    return this.socialForm.get("url");
  }

  socialTypeSelected(type: string) {
    this.account.name = type;
    this.valid = true;
  }

  addAccount(url: string) {
    if (this.valid && this.account.linkUrl !== '') {
      this.emitNewSocial.emit(this.account);
      alert("success")
    }
    else {
      this.valid = false;
    }


  }

}
