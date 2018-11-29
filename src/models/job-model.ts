import { IUser } from "./user-model";

export interface IJob {
  id?: number;
  title: string;
  // employer: IUser;
  employer: string;
  location?: string;
  remote?: boolean;
  description: string;
  datePosted: Date;
  payment: number;
  userId?: string;
  dateAccepted?: Date;
  dateDue?: Date;
  progress?: number;
}
