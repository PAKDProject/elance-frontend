import { IUser } from "./user-model";
import { IJob } from "./job-model";

export interface IOrganisation {
  id?: string;
  entity?: string;
  orgName: string;
  tagline?: string;
  logoUrl?: string;
  email: string;
  websiteUrl?: string;
  adminUser?: string; //userId
  jobsPosted?: Partial<IJob>[]; // {jobId, jobTitle, description, payment, datePosted};
  activeJobs?: Partial<IJob>[] // {jobId, chosenApplicant, jobTitle, progress, dateDue, description};
  members?: Partial<IUser>[] // {userId, fName, lName, avatarUrl, email};
  contacts?: Partial<IUser>[] // {userId, fName, lName, avatarUrl, email};
}