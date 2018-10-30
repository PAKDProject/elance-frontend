import { State, StateContext, Action } from "@ngxs/store";
import { JobsSelectors } from "../selectors/job.selector";
import { RequestJobsSuccess } from "../actions/job.actions";
import { IJob } from "src/models/job-model";

export class JobsStateModel {
    jobs: IJob[]
}

@State({
    name: 'jobs',
    defaults: {}
})
export class JobsState extends JobsSelectors {
    @Action(RequestJobsSuccess)
    requestSuccessful({ getState, patchState }: StateContext<JobsStateModel>, { payload }: RequestJobsSuccess) {
        const state = getState()
        state.jobs = payload
        patchState(state)
    }
}