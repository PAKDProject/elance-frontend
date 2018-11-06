export interface IUser {
  id: string;
  email: string;
  fName?: string;
  lName?: string;
  dob?: Date;
  phone?: string;
  summary?: string;
  skills?: ISkill[];
  educationItems?: IEducationItem[];
  avatarUrl?: string;
  backgroundUrl?: string;
  socialLinks?: ISocialLink[];
  tagline?: string;
  contacts?: IUser[];
}

export interface ISocialLink {
  socialPlatformName?: string;
  linkUrl: string;
}

export interface IEducationItem {
  degreeTitle?: string;
  startYear?: string;
  endYear?: string;
  collegeName?: string;
  grade?: string;
  description?: string;
}

export interface ISkill {
  title?: string;
  description?: string;
  // An idea to be discussed. 1-10 on progress bar or something
  // levelOfConfidence?: number;
}
