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
      id: 'sad34324-d73fsadas-DAB4GSUS-b801-42069LOL',
      entity: 'user',
      email: 'johnsmith418@email.com',
      fName: 'John',
      lName: 'Smith',
      dob: new Date(19 / 1 / 1999),
      summary: 'loltest.',
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
      organisations: [
        {
          orgName: "Facebook",
          email: "zuck@facebook.com",
          tagline: "### This is Facebook ",
          websiteUrl: "facebook.com",
          adminUser: {
            id: 'sad34324-d73fsadas-DAB4GSUS-b801-42069LOL',
            entity: 'user',
            email: 'johnsmith418@email.com',
          }
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
      avatarUrl: 'www.facebook/killian',
      backgroundUrl: 'www.facebook/killian',
      socialLinks: [
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
        {
          id: "0a7d3ef1-00da-4bb9-9d10-61695207f8ca",
          entity: "job",
          title: "Product Engineer",
          employerID: "d813c1eb-d73f-482f-b801-9519b664e706",
          employerName: "Wordware",
          description: "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
          datePosted: new Date(2, 2, 2018),
          dateAccepted: new Date(1, 2, 2018),
          payment: 5629,
          progress: 100
        }
      ]
    };

    return of(this.user)
  }
}