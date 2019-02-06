import { IUser } from "./user-model";

export interface IJob {
  id?: string;
  entity?: string;
  title: string;
  employerName: string;
  employerID: string;
  location?: string;
  remote?: boolean;
  description: string;
  datePosted: Date;
  payment: number;
  dateAccepted?: Date;
  dateDue?: Date;
  dateCompleted?: Date;
  progress?: number;
  applicants?: Partial<IUser>[];
  chosenApplicant?: Partial<IUser>;
}
