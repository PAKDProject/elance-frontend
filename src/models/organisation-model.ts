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
  adminUser?: IUser;
  jobsPosted?: IJob[];
  activeJobs?: IJob[];
  members?: IUser[];
  contacts?: IUser[];
}