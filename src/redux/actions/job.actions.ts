import { IJob } from "src/models/job-model";
import { filterForm } from "src/app/browse-jobs/browse-jobs.component";

export class RequestJobs {
    static readonly type = '[Jobs] Request'
}

export class RequestJobsSuccess {
    static readonly type = '[Jobs] Request Success'

    constructor(public payload: IJob[]) { }
}

export class RequestJobsFail {
    static readonly type = '[Jobs] Request Fail'

    constructor(public errorMessage: string) { }
}

export class FilterJobs {
    static readonly type = '[Jobs] Filter'
    constructor(public filterForm: filterForm) { }
}

export class AddJob {
    static readonly type = '[Jobs] Add Job'
    constructor(public payload: IJob) { }
}

export class AddJobSuccess {
    static readonly type = '[Jobs] Add Job Success'
    constructor(public payload: IJob) { }
}
export class AddJobFail {
    static readonly type = '[Jobs] Add Job Fail'
    constructor(public errorMessage: string) { }
}

export class ApplyForJob {
    static readonly type = '[Jobs] Apply For Job';
    constructor(public jobID: string, public userID: string) { }
}
export class ApplyForJobSuccess {
    static readonly type = '[Jobs] Apply For Job Success';
    constructor(public payload: IJob) { }
}
export class ApplyForJobFail {
    static readonly type = '[Jobs] Apply For Job Fail';
    constructor(public errorMessage: string) { }
}
