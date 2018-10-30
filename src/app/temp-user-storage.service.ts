import { Injectable } from '@angular/core';
import { IUser, IEducationItem, ISkill, ISocialLink } from './models/user-model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempUserStorageService {

  constructor() { }
  private user: IUser

  setUser(value) {
    this.user = value;
  }

  getTestUser(): Observable<IUser> {
    this.user = {
      userID: 1,
      email: 'stocksteve@email.com',
      fName: 'Stock',
      lName: 'Steve',
      dob: new Date(19 / 1 / 1999),
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
      educationItems: [
        {
          degreeTitle: 'BSc Hons in Computing',
          startYear: '2016',
          endYear: '2020',
          collegeName: 'IT Sligo',
          grade: 'A+',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
        },
        {
          degreeTitle: 'BSc in Perl',
          startYear: '2020',
          endYear: '2023',
          collegeName: 'IT Sligo',
          grade: 'D-',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
        },
        {
          degreeTitle: 'BA in Design',
          startYear: '2014',
          endYear: '2016',
          collegeName: 'IT Sligo',
          grade: 'C',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.'
        }
      ],
      skills: [
        {
          title: 'C#',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
          levelOfConfidence: 8
        },
        {
          title: 'Python',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
          levelOfConfidence: 4
        },
        {
          title: 'HTML',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
          levelOfConfidence: 10
        }
      ],
      avatarUrl: '',
      backgroundUrl: '',
      socialLinks: [
        {
          socialPlatformName: 'github',
          linkUrl: 'github.com'
        },
        {
          socialPlatformName: 'facebook',
          linkUrl: 'facebook.com'
        },
        {
          socialPlatformName: 'twitter',
          linkUrl: 'twitter.com'
        },
        {
          socialPlatformName: 'linkedin',
          linkUrl: 'linkedin.com'
        }
      ],
      tagline: 'Software Developer',
      contacts: []
    }

    return of(this.user)
  }
}