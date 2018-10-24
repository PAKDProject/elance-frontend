import { Injectable } from '@angular/core';
import { IUser, IEducationItem, ISkill, ISocialLink } from './models/user-model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable({
  providedIn: 'root'
})
export class TempUserStorageService {

  constructor() { }
  private user: IUser

  //Sample social links, education Items and skills
  private social1: ISocialLink
  private social2: ISocialLink
  private social3: ISocialLink
  private social4: ISocialLink

  private edu1: IEducationItem
  private edu2: IEducationItem
  private edu3: IEducationItem

  private skill1: ISkill
  private skill2: ISkill
  private skill3: ISkill
  
  getUser() {
    //Insert Sample Social Links
    this.social1 = {
      socialPlatformName: 'github',
      linkUrl: 'github.com'
    }
    this.social2 = {
      socialPlatformName: 'facebook',
      linkUrl: 'facebook.com'
    }
    this.social3 = {
      socialPlatformName: 'twitter',
      linkUrl: 'twitter.com'
    }
    this.social4 = {
      socialPlatformName: 'linkedin',
      linkUrl: 'linkedin.com'
    }

    //Insert Sample Education Items
    this.edu1 = {
      degreeTitle: 'BSc Hons in Computing',
      startYear: '2016',
      endYear: '2020',
      collegeName: 'IT Sligo',
      grade: 'A+',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
    }
    this.edu2 = {
      degreeTitle: 'BSc in Perl',
      startYear: '2020',
      endYear: '2023',
      collegeName: 'IT Sligo',
      grade: 'D-',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
    }
    this.edu3 = {
      degreeTitle: 'BA in Design',
      startYear: '2014',
      endYear: '2016',
      collegeName: 'IT Sligo',
      grade: 'C',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
    }
    //Insert Sample Skills
    this.skill1 = {
      title: 'C#',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
      levelOfConfidence: 8
    }
    this.skill2 = {
      title: 'Python',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
      levelOfConfidence: 4
    }
    this.skill3 = {
      title: 'HTML',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
      levelOfConfidence: 10
    }

    //Insert Sample User
    this.user = {
      userID: 1,
      email: 'stocksteve@email.com',
      fName: 'Stock',
      lName: 'Steve',
      // dob: ,
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
      educationItems: [this.edu1, this.edu2, this.edu3],
      skills: [this.skill1, this.skill2, this.skill3],
      avatarUrl: '',
      backgroundUrl: '',
      socialLinks: [this.social1,this.social2,this.social3,this.social4],
      tagline: 'Software Developer',
      contacts: []
    }

    return this.user;
  }

  setUser(value) {
    this.user = value;
  }
}