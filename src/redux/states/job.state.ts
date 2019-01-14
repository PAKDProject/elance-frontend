import { State, StateContext, Action, Selector, Store } from "@ngxs/store";
import {
  RequestJobsSuccess,
  RequestJobsFail,
  RequestJobs,
  FilterJobs,
  AddJob,
  AddJobSuccess,
  AddJobFail,
  ApplyForJobSuccess,
  ApplyForJob,
  ApplyForJobFail
} from "../actions/job.actions";
import { IJob } from "src/models/job-model";
import { JobService } from "src/services/job-service/job.service";
import { NotificationService } from "src/services/notifications/notification.service";
import { TempJobStorageService } from "src/services/temp-job/temp-job-storage.service";

export class JobsStateModel {
  jobs: IJob[];
  isLoading: boolean;
}

@State({
  name: "jobs",
  defaults: {
    jobs: [],
    isLoading: false
  }
})
export class JobsState {
  constructor(
    private jobsService: TempJobStorageService,
    private _jobsService: JobService,
    private store: Store,
    private _notification: NotificationService
  ) {}

  @Selector()
  static getJobs(state: JobsStateModel) {
    return state.jobs;
  }

  @Selector()
  static getIsLoading(state: JobsStateModel) {
    return state.isLoading;
  }

  @Action(RequestJobs)
  requestStarted({ getState, patchState }: StateContext<JobsStateModel>) {
    const state = getState();
    state.isLoading = true;
    state.jobs = [];
    patchState(state);

    this._jobsService.getJobs().subscribe(
      jobs => {
        this.store.dispatch(new RequestJobsSuccess(jobs));
      },
      err => {
        this.store.dispatch(
          new RequestJobsFail("Failed to fetch jobs! " + err.message)
        );
      }
    );
    // this.jobsService.getAllJobs().pipe(tap(jobs => {
    //     console.log(jobs)
    //     this.store.dispatch(new RequestJobsSuccess(jobs))
    // }), catchError(err =>
    //     this.store.dispatch(new RequestJobsFail(err))
    // ))
  }

  @Action(RequestJobsSuccess)
  requestSuccessful(
    { getState, patchState }: StateContext<JobsStateModel>,
    { payload }: RequestJobsSuccess
  ) {
    const state = getState();
    state.isLoading = false;
    state.jobs = payload;
    this._notification.showSuccess("New jobs are now available for applying!");
    patchState(state);
  }

  @Action(RequestJobsFail)
  requestFailed(
    { getState, patchState }: StateContext<JobsStateModel>,
    { errorMessage }: RequestJobsFail
  ) {
    const state = getState();
    state.isLoading = false;
    state.jobs = [];
    patchState(state);
  }

  @Action(FilterJobs)
  filterStarted(
    { getState, patchState }: StateContext<JobsStateModel>,
    { filterForm }: FilterJobs
  ) {
    const state = getState();
    state.isLoading = true;
    state.jobs = [];
    patchState(state);

    this._jobsService.filterJob(filterForm).subscribe(
      jobs => {
        this.store.dispatch(new RequestJobsSuccess(jobs));
      },
      err => {
        this.store.dispatch(
          new RequestJobsFail("Failed to fetch jobs! " + err.message)
        );
      }
    );
  }

  @Action(AddJob)
  addNewJob(
    { getState, patchState }: StateContext<JobsStateModel>,
    { payload }: AddJob
  ) {
    const state = getState();
    state.isLoading = true;

    this._jobsService.createNewJob(payload).subscribe(
      (res: { job: IJob }) => {
        let updatedPayload = payload;
        updatedPayload.id = res.job.id;
        this.store.dispatch(new AddJobSuccess(updatedPayload));
      },
      err => {
        this.store.dispatch(new AddJobFail(err));
      }
    );
  }

  @Action(AddJobSuccess)
  addNewJobSuccess(
    { getState, patchState }: StateContext<JobsStateModel>,
    { payload }: AddJobSuccess
  ) {
    const state = getState();
    state.isLoading = false;
    state.jobs.push(payload);
    this._notification.showSuccess(
      "Job Created",
      "Your Job can now be applied for"
    );
    patchState(state);
  }

  @Action(AddJobFail)
  addNewJobFail(
    { getState, patchState }: StateContext<JobsStateModel>,
    message: string
  ) {
    const state = getState();
    state.isLoading = false;

    this._notification.showError("An error occured in the state", message);
    patchState(state);
  }

  @Action(ApplyForJob)
  applyForJob(
    { getState }: StateContext<JobsStateModel>,
    { jobID, userID }: ApplyForJob
  ) {
    const state = getState();
    state.isLoading = true;
    let updatedJob = state.jobs.filter(job => job.id === jobID)[0];
    if (updatedJob.applicants === undefined) {
      updatedJob.applicants = [];
    }
    updatedJob.applicants.push(userID);
    this._jobsService.updateJob(updatedJob).subscribe((res: { job: IJob }) => {
      const updatedJob = res.job;
      this.store.dispatch(new ApplyForJobSuccess(updatedJob));
    });
  }

  @Action(ApplyForJobSuccess)
  applyForJobSuccess(
    { getState, patchState }: StateContext<JobsStateModel>,
    { payload }: ApplyForJobSuccess
  ) {
    const state = getState();
    state.isLoading = false;
    state.jobs.filter(job => job.id === payload.id)[0] = payload;
    patchState(state);
  }

  @Action(ApplyForJobFail)
  applyForJobFail(
    { getState, patchState }: StateContext<JobsStateModel>,
    message: string
  ) {
    const state = getState();
    state.isLoading = false;

    this._notification.showError("An error occured in the state", message);
    patchState(state);
  }
}
