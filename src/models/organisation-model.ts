import { IUser } from "./user-model";
import { IJob } from "./job-model";

export interface IOrganisation {
  id?: string;
  entity?: string;
  organisationName: string;
  tagline?: string;
  logoUrl?: string;
  organisationEmail: string;
  websiteUrl?: string;
  adminUser?: IUser;
  jobsPosted?: IJob[];
  members?: IUser[];
}