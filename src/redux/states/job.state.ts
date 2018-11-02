import { State, StateContext, Action, Selector, Store } from "@ngxs/store";
import { RequestJobsSuccess, RequestJobsFail, RequestJobs, SearchJobs } from "../actions/job.actions";
import { IJob } from "src/models/job-model";
import { HttpClient } from "@angular/common/http";
import { TempJobStorageService } from "src/services/temp-job/temp-job-storage.service";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export class JobsStateModel {
    jobs: IJob[]
    isLoading: boolean
}

@State({
    name: 'jobs',
    defaults: {
        jobs: [],
        isLoading: false
    }
})
export class JobsState {
    constructor(private jobsService: TempJobStorageService, private store: Store) { }

    @Selector()
    static getJobs(state: JobsStateModel) {
        return state.jobs
    }

    @Selector()
    static getIsLoading(state: JobsStateModel) {
        return state.isLoading
    }

    @Action(RequestJobs)
    requestStarted({ getState, patchState }: StateContext<JobsStateModel>) {
        const state = getState()
        state.isLoading = true
        state.jobs = []
        patchState(state)

        this.jobsService.getAllJobs().subscribe(jobs => {
            console.log(jobs)
            this.store.dispatch(new RequestJobsSuccess(jobs))
        })
        // this.jobsService.getAllJobs().pipe(tap(jobs => {
        //     console.log(jobs)
        //     this.store.dispatch(new RequestJobsSuccess(jobs))
        // }), catchError(err => 
        //     this.store.dispatch(new RequestJobsFail(err))
        // ))
    }

    @Action(RequestJobsSuccess)
    requestSuccessful({ getState, patchState }: StateContext<JobsStateModel>, { payload }: RequestJobsSuccess) {
        const state = getState()
        state.isLoading = false
        state.jobs = payload
        patchState(state)
    }

    @Action(RequestJobsFail)
    requestFailed({ getState, patchState }: StateContext<JobsStateModel>, { errorMessage }: RequestJobsFail) {
        const state = getState()
        state.isLoading = false
        state.jobs = []
        patchState(state)
    }

    @Action(SearchJobs)
    searchStarted({ getState, patchState }: StateContext<JobsStateModel>, { searchTerm }: SearchJobs) {
        const state = getState()
        // state.isLoading = true;
        state.jobs = []
        patchState(state)

        this.jobsService.performSearch(searchTerm)
    }
}