import { IJob } from "src/models/job-model";

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