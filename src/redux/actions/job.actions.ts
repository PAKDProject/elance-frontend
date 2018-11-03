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

export class SearchJobs {
    static readonly type = '[Jobs] Search'
    constructor(public searchTerm: string) { }
}

export class FilterJobs {
    static readonly type = '[Jobs] Filter'
    constructor(public filterForm: filterForm) {}
}