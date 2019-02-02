import { State, StateContext, Selector, Store, Action } from "@ngxs/store";
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
  ApplyForJobFail,
  AcceptApplicant,
  AcceptApplicantSuccess,
  AcceptApplicantFail
} from "../actions/job.actions";
import { IJob } from "src/models/job-model";
import { JobService } from "src/services/job-service/job.service";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserService } from 'src/services/user-service/user.service';


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
    private _jobsService: JobService,
    private store: Store,
    private _notification: NotificationService
  ) { }

  //#region Selectors
  @Selector()
  static getJobs(state: JobsStateModel) {
    return state.jobs;
  }

  @Selector()
  static getIsLoading(state: JobsStateModel) {
    return state.isLoading;
  }
  //#endregion

  //#region Request jobs
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
  //#endregion

  //#region Filter jobs
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
  //#endregion

  //#region Add job
  @Action(AddJob)
  addNewJob({ dispatch, patchState }: StateContext<JobsStateModel>, { payload }: AddJob) {
    patchState({ isLoading: true });

    this._jobsService.createNewJob(payload).subscribe(
      (res: { job: IJob }) => {
        let updatedPayload = res.job;
        dispatch(new AddJobSuccess(updatedPayload));
      },
      err => {
        dispatch(new AddJobFail(err.message));
      }
    );
  }

  @Action(AddJobSuccess)
  addNewJobSuccess({ getState, patchState }: StateContext<JobsStateModel>, { payload }: AddJobSuccess) {
    const state = getState();
    let jobs: IJob[] = [];

    jobs.push(...state.jobs);
    jobs.push(payload);

    patchState({ isLoading: false, jobs: jobs });
    this._notification.showSuccess("Job was Created!", "Get ready for applications to flood in!");
  }

  @Action(AddJobFail)
  addNewJobFail({ patchState }: StateContext<JobsStateModel>, message: string) {
    this._notification.showError("An error occured in the state", message);
    patchState({ isLoading: false });
  }
  //#endregion

  //#region Apply for job
  @Action(ApplyForJob)
  applyForJob({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { jobID, user }: ApplyForJob) {
    const state = getState();
    patchState({ isLoading: true });

    const job = state.jobs.find(j => j.id === jobID);
    let partialJob: Partial<IJob> = {
      applicants: []
    };

    //If job was found
    if (job !== undefined) {
      //If there were previous applicants
      if (job.applicants !== undefined) {
        //If user hadn't previously applied
        if (!job.applicants.includes(user)) {
          partialJob.applicants.push(...job.applicants);
          partialJob.applicants.push(user);
        }
      }
      //Else add applicant to new array 
      else {
        partialJob.applicants.push(user);
      }

      //Update job in database
      this._jobsService.updateJob(partialJob, job.id).subscribe((res: { job: IJob }) => {
        const updatedJob = res.job;
        dispatch(new ApplyForJobSuccess(updatedJob));
      }),
        err => {
          dispatch(new ApplyForJobFail(err.message));
        };
    }
  }

  @Action(ApplyForJobSuccess)
  applyForJobSuccess({ getState, patchState }: StateContext<JobsStateModel>, { payload }: ApplyForJobSuccess) {
    const jobs = getState().jobs;

    const index = jobs.map(e => e.id).indexOf(payload.id);

    jobs[index] = payload;
    this._notification.showSuccess(`Woohoo you applied for ${payload.title}`, "We wish you the best of luck with your application!")
    //this.store.dispatch(new UserApplyForJob(payload))
    patchState({ isLoading: false, jobs: jobs });
  }

  @Action(ApplyForJobFail)
  applyForJobFail(
    { getState, patchState }: StateContext<JobsStateModel>,
    { errorMessage }: ApplyForJobFail
  ) {
    const state = getState();
    state.isLoading = false;

    this._notification.showError("An error occured in the state", errorMessage);
    patchState(state);
  }
  //#endregion

  //#region Accept Applicant
  @Action(AcceptApplicant)
  acceptApplicant({ getState }: StateContext<JobsStateModel>, { jobID, user }: AcceptApplicant) {
    // get current state
    const state = getState();
    state.isLoading = true;

    // find the relevant job from state
    let job = state.jobs.filter(job => job.id === jobID)[0];

    // Check if the job existed
    if (job !== undefined) {
      job.chosenApplicant = user;
      // Make a partial job to update
      const partialJob: Partial<IJob> = {
        chosenApplicant: user
      }
      //Update the job
      this._jobsService.updateJob(partialJob, jobID).subscribe((res: { job: IJob }) => {
        const updatedJob = res.job;
        this.store.dispatch(new AcceptApplicantSuccess(updatedJob));
      }),
        err => {
          this.store.dispatch(new AcceptApplicantFail(err.message));
        };

      //Update the user's active jobs
      // const partialUser: Partial<IUser> = {
      //   activeJobs: []
      // }

      // if (user.activeJobs !== undefined) {
      //   if (!user.activeJobs.includes(job)) {
      //     partialUser.activeJobs.push(job);
      //   }
      // } else {
      //   partialUser.activeJobs.push(job);
      // }

      // this._userService
      // .updateUser(partialUser, user.id)
      // .subscribe((res: { user: IUser }) => {
      //   const updatedUser = res.user;
      //   this.store.dispatch(new ApplyForJobSuccess(updatedUser));
      // }),
      // err => {
      //   this.store.dispatch(new ApplyForJobFail(err.message));
      // };
    }
  }

  @Action(AcceptApplicantSuccess)
  acceptApplicantSuccess({ getState, patchState }: StateContext<JobsStateModel>, { job }: AcceptApplicantSuccess) {
    const state = getState();
    state.isLoading = false;

    //If update in db went succesfully replace old job with new one in state
    let jobs = state.jobs;
    jobs.filter(job => job.id === job.id)[0] = job;
    patchState({ jobs });
  }

  @Action(AcceptApplicantFail)
  acceptApplicatnFail({ getState, patchState }: StateContext<JobsStateModel>, { errorMessage }: AcceptApplicantFail) {
    const state = getState();
    state.isLoading = false;

    this._notification.showError("An error occured in the state", errorMessage);
    patchState(state);
  }

  //#endregion

}//end of file


