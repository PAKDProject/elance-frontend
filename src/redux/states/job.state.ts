import { State, StateContext, Selector, Action } from "@ngxs/store";
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
import { RequestUpdateUser, RequestAddPostedJob } from "../actions/user.actions";



export class JobsStateModel {
  inactiveJobs: IJob[];
  activeJobs: IJob[];
  isLoading: boolean;
}

@State({
  name: "jobs",
  defaults: {
    inactiveJobs: [],
    activeJobs: [],
    isLoading: false
  }
})
export class JobsState {
  constructor(private _jobsService: JobService, private _notification: NotificationService) { }

  //#region Selectors
  @Selector()
  static getJobs(state: JobsStateModel) {
    return state.inactiveJobs;
  }

  @Selector()
  static getIsLoading(state: JobsStateModel) {
    return state.isLoading;
  }

  @Selector()
  static getActiveJobs(state: JobsStateModel) {
    return state.activeJobs
  }
  //#endregion

  //#region Request jobs
  @Action(RequestJobs)
  requestStarted({ getState, patchState, dispatch }: StateContext<JobsStateModel>) {
    const state = getState();
    state.isLoading = true;
    state.inactiveJobs = [];
    state.activeJobs = [];
    patchState(state);

    this._jobsService.getJobs().subscribe(
      jobs => {
        dispatch(new RequestJobsSuccess(jobs));
      },
      err => {
        dispatch(
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
  requestSuccessful({ patchState, getState }: StateContext<JobsStateModel>, { payload }: RequestJobsSuccess) {
    let active = getState().activeJobs || [];
    let inactive = getState().inactiveJobs || [];
    payload.forEach(job => {
      if (job.chosenApplicant !== undefined) active.push(job)
      else inactive.push(job);
    });
    patchState({ isLoading: false, inactiveJobs: inactive, activeJobs: active });
  }

  @Action(RequestJobsFail)
  requestFailed({ patchState }: StateContext<JobsStateModel>, { errorMessage }: RequestJobsFail) {
    patchState({ isLoading: false, inactiveJobs: [], activeJobs: [] });
  }
  //#endregion

  //#region Filter jobs
  @Action(FilterJobs)
  filterStarted({ patchState, dispatch }: StateContext<JobsStateModel>, { filterForm }: FilterJobs) {

    patchState({ isLoading: true, inactiveJobs: [] });

    this._jobsService.filterJob(filterForm).subscribe(
      jobs => {
        dispatch(new RequestJobsSuccess(jobs));
      },
      err => {
        dispatch(
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
  addNewJobSuccess({ getState, patchState, dispatch }: StateContext<JobsStateModel>, { payload }: AddJobSuccess) {
    const inactive = getState().inactiveJobs || [];
    const partial: Partial<IJob> = {
      id: payload.id,
      //jobId, jobTitle, description, employerName, payment, datePosted}
      title: payload.title,
      description: payload.description,
      employerName: payload.employerName,
      payment: payload.payment,
      datePosted: payload.datePosted
    }
    dispatch(new RequestAddPostedJob(partial));
    inactive.push(payload);

    patchState({ isLoading: false, inactiveJobs: inactive });
  }

  @Action(AddJobFail)
  addNewJobFail({ patchState }: StateContext<JobsStateModel>, message: string) {
    patchState({ isLoading: false });
  }
  //#endregion

  //#region Apply for job
  @Action(ApplyForJob)
  applyForJob({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { jobID, user }: ApplyForJob) {
    const state = getState();
    patchState({ isLoading: true });

    const job = state.inactiveJobs.find(j => j.id === jobID);
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
        //dispatch(new UserApplyForJob(updatedJob))
        //BROKEN AF
        dispatch(new ApplyForJobSuccess(updatedJob));

      }),
        err => {
          dispatch(new ApplyForJobFail(err.message));
        };
    }
  }

  @Action(ApplyForJobSuccess)
  applyForJobSuccess({ getState, patchState }: StateContext<JobsStateModel>, { payload }: ApplyForJobSuccess) {
    const jobs = getState().inactiveJobs || [];

    const index = jobs.map(e => e.id).indexOf(payload.id);

    if (index !== -1) {
      jobs[index] = payload;
      this._notification.showSuccess(`Woohoo you applied for ${payload.title}`, "We wish you the best of luck with your application!")
    }
    patchState({ isLoading: false, inactiveJobs: jobs });


  }

  @Action(ApplyForJobFail)
  applyForJobFail({ patchState }: StateContext<JobsStateModel>, { errorMessage }: ApplyForJobFail) {
    this._notification.showError("An error occured in the state", errorMessage);
    patchState({ isLoading: false });
  }
  //#endregion

  //#region Accept Applicant
  @Action(AcceptApplicant)
  acceptApplicant({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { jobID, user }: AcceptApplicant) {
    // get current state
    const state = getState();
    patchState({ isLoading: true });

    // find the relevant job from state
    let job = state.inactiveJobs.find(job => job.id === jobID);

    // Check if the job existed
    if (job !== undefined) {

      //Update the job
      this._jobsService.updateJob({ chosenApplicant: user }, jobID).subscribe((res: { job: IJob }) => {
        const updatedJob = res.job;
        dispatch(new AcceptApplicantSuccess(updatedJob));
      }),
        err => {
          dispatch(new AcceptApplicantFail(err.message));
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
    let jobs = getState().inactiveJobs;
    let active = getState().activeJobs || [];
    //If update in db went succesfully replace old job with new one in state
    const index = jobs.map(j => j.id).indexOf(job.id);
    if (index !== -1) {
      jobs.splice(index, 1);
      active.push(job);
    }
    patchState({ isLoading: false, inactiveJobs: jobs, activeJobs: active });
  }

  @Action(AcceptApplicantFail)
  acceptApplicatnFail({ patchState }: StateContext<JobsStateModel>, { errorMessage }: AcceptApplicantFail) {
    patchState({ isLoading: false });
  }

  //#endregion

}//end of file


