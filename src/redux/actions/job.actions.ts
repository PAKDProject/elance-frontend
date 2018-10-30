import { IJob } from "src/models/job-model";

export class RequestJobsSuccess {
    type = '[Jobs] Request Success'

    constructor(public payload: IJob[]) { }
}

export class RequestJobsFail {
    type = '[Jobs] Request Fail'

    constructor(public errorMessage: string) { }
}