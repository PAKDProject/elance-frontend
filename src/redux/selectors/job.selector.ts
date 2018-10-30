import { Selector } from "@ngxs/store";
import { JobsStateModel } from "../states/job.state";

export class JobsSelectors {
    @Selector()
    static getJobs(state: JobsStateModel) {
        return state
    }
}