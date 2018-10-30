import { State, StateContext, Action, Selector } from "@ngxs/store";
import { RequestJobsSuccess } from "../actions/job.actions";
import { IJob } from "src/models/job-model";

export class JobsStateModel {
    jobs: IJob[]
}

@State({
    name: 'jobs',
    defaults: {}
})
export class JobsState {
    @Selector()
    static getJobs(state: JobsStateModel) {
        return state
    }

    @Action(RequestJobsSuccess)
    requestSuccessful({ getState, patchState }: StateContext<JobsStateModel>, { payload }: RequestJobsSuccess) {
        const state = getState()
        state.jobs = payload
        patchState(state)
    }
}