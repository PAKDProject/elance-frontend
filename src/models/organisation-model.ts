import { IUser } from "./user-model";
import { IJob } from "./job-model";

export interface IOrganisation {
  id?: string;
  entity?: string;
  orgName: string;
  tagline?: string;
  logoUrl?: {
    url?: string;
  }
  email: string;
  websiteUrl?: string;
  adminUser?: Partial<IUser>;
  jobsPosted?: IJob[];
  activeJobs?: IJob[];
  members?: IUser[];
  contacts?: IUser[];
}