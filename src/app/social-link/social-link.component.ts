import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ISocialLink } from 'src/models/user-model';
import { NotificationService } from 'src/services/notifications/notification.service';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss']
})
export class SocialLinkComponent implements OnInit {
  DEFAULT_IMAGE_LOCATION: string = "../../assets/images/default_url.png"
  socialLinks: FormGroup
  socialLinkImageUrl: string = this.DEFAULT_IMAGE_LOCATION
  socialLink: string = ""
  @Output() emitImageObject: EventEmitter<ISocialLink> = new EventEmitter<ISocialLink>()
  constructor(private formBuilder: FormBuilder,
    private _tempHttp: HttpClient,
    private _notify: NotificationService) {
  }

  ngOnInit() {
    this.socialLinks = this.formBuilder.group({
      socialLink: [""]
    })

    this.socialLinks.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(newValue => {
      this.socialLink = newValue.socialLink
      let companyUrl: string = this.getCompanyUrl(newValue.socialLink)
      this.socialLinkImageUrl = "https://logo.clearbit.com/" + companyUrl
    })
  }

  setDefault() {
    this.socialLinkImageUrl = this.DEFAULT_IMAGE_LOCATION
  }

  getCompanyUrl(fullStr: string): string {
    let returnValue = fullStr

    let temp = document.createElement('a')
    if (!fullStr.includes("http") && !fullStr.includes("https")) {
      fullStr = "https://" + fullStr


    }
    temp.href = fullStr

    if (temp.hostname !== undefined && temp.hostname !== "localhost") {
      returnValue = temp.hostname
    }

    return returnValue
  }

  save() {
    if (this.socialLink === "") {
      this._notify.showInfo("Adding an empty url makes you look like a loser. How about actually being social and setting up some accounts?")
    }
    else if (!this.socialLink.match("[.][a-zA-Z]{1,}.{0,}")) {
      this._notify.showInfo("A URL should have a country extension (.com/.ie etc.) shouldn't it?")
    }
    else {
      this.emitImageObject.emit({
        imageUrl: this.socialLinkImageUrl,
        url: this.addHttp(this.socialLink)
      })
      this.socialLinks.get("socialLink").setValue("")
      this.socialLinkImageUrl = this.DEFAULT_IMAGE_LOCATION
    }
  }

  addHttp(url: string) {
    if (!url.includes("http") && !url.includes("https")) {
      url = "https://" + url
    }
    return url
  }

}