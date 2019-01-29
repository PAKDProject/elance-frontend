import { ISkills } from "./skill-model";
import { IJob } from "./job-model";
import { IOrganisation } from "./organisation-model";

export interface IUser {
  id: string;
  entity?: string;
  email: string;
  fName?: string;
  lName?: string;
  dob?: Date;
  phone?: string;
  summary?: string;
  skills?: ISkills[];
  educationItems?: IEducationItem[];
  avatarUrl?: string;
  backgroundUrl?: string;
  socialLinks?: ISocialLink[];
  tagline?: string;
  contacts?: IUser[];
  activeJobs?: IJob[];
  profileCards?: IProfileCard[];
  jobHistory?: IJob[];
  appliedJobs?: IJob[];
  organisations?: IOrganisation[];
}

export interface ISocialLink {
  imageUrl: string
  url: string
}

export interface IEducationItem {
  degreeTitle?: string;
  startYear?: string;
  endYear?: string;
  collegeName?: string;
  grade?: string;
  description?: string;
}

export interface ISkills {
  title?: string;
  description?: string;
  // An idea to be discussed. 1-10 on progress bar or something
  // levelOfConfidence?: number;
}

interface IProfileCard {
  title: string;
  type: string;
  content?: string | ISkills[] | IEducationItem[];
}

