import { IUser } from "./user-model";

export interface IJob {
  id?: string;
  title: string;
  // employer: IUser;
  employer: string;
  location?: string;
  remote?: boolean;
  description: string;
  datePosted: Date;
  payment: number;
  dateAccepted?: Date;
  dateDue?: Date;
  progress?: number;
  //New field
  applicants?: string[];
}
