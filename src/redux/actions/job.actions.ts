import { IJob } from "src/models/job-model";
import { filterForm } from "src/app/browse-jobs/browse-jobs.component";
import { IUser } from 'src/models/user-model';

export class RequestJobs {
    static readonly type = '[Jobs] Request'
}

export class RequestJobsSuccess {
    static readonly type = '[Jobs] Request Success'

    /**
     * Will Return all jobs available in the payload and set them to the state
     * @param payload : Array of all job objects
     */
    constructor(public payload: IJob[]) { }
}

export class RequestJobsFail {
    static readonly type = '[Jobs] Request Fail'

    /**
     * Handles error
     * @param errorMessage string error message to display in popup notification
     */
    constructor(public errorMessage: string) { }
}

export class FilterJobs {
    static readonly type = '[Jobs] Filter'
    constructor(public filterForm: filterForm) { }
}

export class AddJob {
    static readonly type = '[Jobs] Add Job'
    /**
     * Accepts a new job and adds it to the database
     * @param payload New job object to be created
     */
    constructor(public payload: IJob) { }
}

export class AddJobSuccess {
    static readonly type = '[Jobs] Add Job Success'
    /**
     * Adds the new job object to state
     * @param payload The job object created in the database including id and entity
     */
    constructor(public payload: IJob) { }
}
export class AddJobFail {
    static readonly type = '[Jobs] Add Job Fail'
    /**
     * Handles error
     * @param errorMessage string error message
     */
    constructor(public errorMessage: string) { }
}

export class ApplyForJob {
    static readonly type = '[Jobs] Apply For Job';
    /**
     * Accepts the id of the job and the user object. Then adds user to array of applicants for the specified job
     * @param jobID string
     * @param user Partial User object containing id, fName, lName, avatarUrl
     */
    constructor(public jobID: string, public user: Partial<IUser>) { }
}
export class ApplyForJobSuccess {
    static readonly type = '[Jobs] Apply For Job Success';
    constructor(public payload: IJob) { }
}
export class ApplyForJobFail {
    static readonly type = '[Jobs] Apply For Job Fail';
    constructor(public errorMessage: string) { }
}

export class RemoveJob {
    static readonly type = '[Jobs] Remove Job';
    constructor(public jobID: string) { }
}
export class RemoveJobSuccess {
    static readonly type = '[Jobs] Remove Job Success';
    constructor(public jobID: string) { }
}
export class RemoveJobFail {
    static readonly type = '[Jobs] Remove Job Fail';
    constructor(public errorMessage: string) { }
}

export class AcceptApplicant {
    static readonly type = '[Jobs] Accept Applicant';
    /**
     * Moves a user from the applicants array to the selected user field for a specified job
     * @param jobID string id of job
     * @param user user to accept for job
     */
    constructor(public jobID: string, public user: Partial<IUser>, public type: string) { }
}
export class AcceptApplicantSuccess {
    static readonly type = '[Jobs] Accept Applicant Success';
    constructor(public job: IJob) { }
}
export class AcceptApplicantFail {
    static readonly type = '[Jobs] Accept Applicant Fail';
    constructor(public errorMessage: string) { }
}


//#region Add job to org 
export class AddJobOrg {
    static readonly type = '[Jobs] Org Post Job';
    /**
     * Moves a user from the applicants array to the selected user field for a specified job
     * @param jobID string id of job
     * @param user user to accept for job
     */
    constructor(public payload: IJob, public orgId: string) { }
}
export class AddJobOrgSuccess {
    static readonly type = '[Jobs] Org Post Job Success';
    constructor(public job: IJob, public orgId: string) { }
}
export class AddJobOrgFail {
    static readonly type = '[Jobs] Org Post Job Fail';
    constructor(public errorMessage: string) { }
}

//#endregion

export class ChangeBrowseFormat {
    static readonly type = '[Browse Jobs] Changing browse page format';
    constructor(public payload: boolean) {
        console.log(payload)
    }
}
