import { IUser } from "./user-model";

export interface IJob {
    jobID: number;
    title: string;
    // employer: IUser;
    employer: string;
    description: string;
    datePosted: Date;
    dateAccepted: Date;
    dateDue: Date;
    payment: number;
    active: boolean;
    progress: number;
}