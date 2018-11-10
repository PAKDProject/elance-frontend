import { IUser } from "./user-model";

export interface IJob {
  id?: number;
  title: string;
  // employer: IUser;
  employer: string;
  location?: string;
  description: string;
  datePosted: Date;
  payment: number;
  isAccepted: boolean;
  dateAccepted?: Date;
  dateDue?: Date;
  progress?: number;
}
