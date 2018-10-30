import { Injectable } from '@angular/core';
import { IJob } from 'src/models/job-model';

@Injectable({
  providedIn: 'root'
})
export class TempJobStorageService {

  constructor() { }

  private jobs: IJob[]

  getAllJobs() {
    return this.jobs;
  }

  addJob(value: IJob) {
    this.jobs.push(value)
  }

  clearJobs() {
    this.jobs = [];
  }

  addSampleJobs() {
    this.jobs = [
      {
        id: 1,
        title: 'Software Developer',
        employer: 'Bob Bossman',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        payment: 10000,
        isAccepted: false
      },
      {
        id: 2,
        title: 'Frontend Developer',
        employer: 'Susan CEO',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        payment: 1000000,
        isAccepted: false
      },
      {
        id: 3,
        title: 'Backend Developer',
        employer: 'Eddie Employer',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        payment: 10750,
        isAccepted: false
      },
      {
        id: 4,
        title: 'Carpenter',
        employer: 'Jason Jobgiver',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        dateAccepted: new Date(29 / 10 / 2018),
        dateDue: new Date(1 / 12 / 2018),
        payment: 12000,
        isAccepted: true,
        progress: 0.3,
      },
      {
        id: 5,
        title: 'Roofer',
        employer: 'John Smith',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        dateAccepted: new Date(29 / 10 / 2018),
        dateDue: new Date(1 / 12 / 2018),
        payment: 8000,
        isAccepted: true,
        progress: 0.5,
      },
      {
        id: 6,
        title: 'Artist',
        employer: 'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non eros viverra, fringilla massa rhoncus, dictum nulla. In rhoncus nunc sed ante maximus tincidunt. Praesent ut lectus nisl. Etiam elementum dictum elit at aliquet. Sed vitae vehicula massa, sed luctus velit. Morbi aliquam sodales tempor. Praesent tempus, felis et luctus porttitor, quam lectus elementum nulla, sit amet pretium nisi dolor vel eros. Nulla vestibulum eu velit ac semper. Morbi gravida rhoncus libero, a rhoncus sapien. Morbi non sem a ligula viverra fermentum elementum ac odio. Fusce eget justo eros.',
        datePosted: new Date(20 / 10 / 2018),
        dateAccepted: new Date(29 / 10 / 2018),
        dateDue: new Date(1 / 12 / 2018),
        payment: 9000,
        isAccepted: true,
        progress: 0.8,
      }
    ]
  }
}
