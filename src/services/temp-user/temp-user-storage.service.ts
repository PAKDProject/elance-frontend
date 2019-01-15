import { Injectable } from '@angular/core';
import { IUser, IEducationItem, ISocialLink } from 'src/models/user-model';
import { getLocaleDateTimeFormat } from '@angular/common';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Observable, of } from 'rxjs';
import { ISkills } from 'src/models/skill-model';

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
      id: '1',
      email: 'johnsmith418@email.com',
      fName: 'John',
      lName: 'Smith',
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
          skillTitle: 'C#',
          category: 'Software'
        },
        {
          skillTitle: 'Python',
          category: 'Software'

        },
        {
          skillTitle: 'HTML',
          category: 'Software'

        }
      ],
      avatarUrl: '',
      backgroundUrl: '',
      socialLinks: [
        {
          name: 'github',
          linkUrl: 'http://github.com'
        },
        {
          name: 'facebook',
          linkUrl: 'http://facebook.com'
        },
        {
          name: 'twitter',
          linkUrl: 'http://twitter.com'
        },
        {
          name: 'linkedin',
          linkUrl: 'http://linkedin.com'
        }
      ],
      tagline: 'Software Developer',
      contacts: [],
      profileCards: 
      [
        {
          title: "About Me",
          type: "bio"
        },
        {
          title: "Education",
          type: "edu"
        },
        {
          title: "Skills",
          type: "skills"
        },
        {
          title: "Job History",
          type: "jobs"
        },
        {
          title: "Custom Card 1",
          type: "custom",
          content: "Custom card body with <h1>MARKDOWN</h1>"
        }
      ],
      jobHistory: [
        "6ad5192f-5e77-4520-9965-e6c37a33f120",
        "2538f969-5db1-4f45-9751-ac5795121444",
        "8df54914-75ef-44b0-b994-3d2a3b6f125e"
       ]
    }

    return of(this.user)
  }
}