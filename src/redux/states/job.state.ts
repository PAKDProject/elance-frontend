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
  AcceptApplicantFail,
  RemoveJob,
  RemoveJobSuccess,
  RemoveJobFail,
  AddJobOrg,
  AddJobOrgSuccess,
  AddJobOrgFail,
  ChangeBrowseFormat,
  AddRecommendedJobs,
  SetIsLoading
} from "../actions/job.actions";
import { IJob } from "src/models/job-model";
import { JobService } from "src/services/job-service/job.service";
import { RequestAddPostedJob, RequestAddActiveJob } from "../actions/user.actions";
import { isNullOrUndefined } from 'util';
import { OrgAddPostedJob, AddActiveJobToOrg, AddContactToOrg } from "../actions/organisation.actions";

export class JobsStateModel {
  inactiveJobs: IJob[];
  activeJobs: IJob[];
  isLoading: boolean;
  isList: boolean;
  showRecommended: boolean;
  recommendedJobs: IJob[]
}

@State({
  name: "jobs",
  defaults: {
    inactiveJobs: [],
    activeJobs: [],
    isLoading: false,
    isList: false
  }
})
export class JobsState {
  constructor(private _jobsService: JobService) { }

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

  @Selector()
  static getRecommendedJobs(state: JobsStateModel) {
    return state.recommendedJobs
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
    console.log(payload)
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
      dateDue: payload.dateDue
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
  applyForJob(context: StateContext<JobsStateModel>, action: ApplyForJob) {
    const state = context.getState();
    state.isLoading = true

    const job = state.inactiveJobs.find(j => j.id === action.jobID)
    let partialJob: Partial<IJob> = {
      applicants: []
    };

    //If job was found
    if (job !== undefined) {
      //If there were previous applicants
      if (job.applicants !== undefined) {
        //If user hadn't previously applied
        if (!job.applicants.includes(action.user)) {
          partialJob.applicants.push(...job.applicants);
          partialJob.applicants.push(action.user);
        }
      }
      //Else add applicant to new array 
      else { partialJob.applicants.push(action.user) }

      //Update job in database
      this._jobsService.updateJob(partialJob, job.id).subscribe(
        (res: { job: IJob }) => {
          context.dispatch(new ApplyForJobSuccess(res.job))
        },
        err => {
          context.dispatch(new ApplyForJobFail(err.message));
        }
      )
    }
  }

  @Action(ApplyForJobSuccess)
  applyForJobSuccess({ getState, patchState }: StateContext<JobsStateModel>, { payload }: ApplyForJobSuccess) {
    const jobs = getState().inactiveJobs || [];

    const index = jobs.map(e => e.id).indexOf(payload.id);

    if (index !== -1) {
      jobs[index] = payload;
    }
    patchState({ isLoading: false, inactiveJobs: jobs });


  }

  @Action(ApplyForJobFail)
  applyForJobFail({ patchState }: StateContext<JobsStateModel>, { errorMessage }: ApplyForJobFail) {
    patchState({ isLoading: false });
  }
  //#endregion

  //#region Accept Applicant
  @Action(AcceptApplicant)
  acceptApplicant({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { jobID, user, type }: AcceptApplicant) {
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

        dispatch(new RequestAddActiveJob({
          id: updatedJob.id,
          title: updatedJob.title,
          employerName: updatedJob.employerName,
          employerID: updatedJob.employerID,
          payment: updatedJob.payment,
          progress: updatedJob.progress,
          dateAccepted: updatedJob.dateAccepted,
          dateDue: updatedJob.dateDue
        },
          user.id))

        dispatch(new AddActiveJobToOrg({
          id: updatedJob.id,
          title: updatedJob.title,
          employerName: updatedJob.employerName,
          employerID: updatedJob.employerID,
          description: updatedJob.description,
          payment: updatedJob.payment,
          progress: 50,
          datePosted: updatedJob.datePosted,
          dateAccepted: updatedJob.dateAccepted,
          dateDue: updatedJob.dateDue
        }, updatedJob.employerID));

        dispatch(new AddContactToOrg({
          id: user.id,
          fName: user.fName,
          lName: user.lName,
          tagline: user.tagline,
          avatarUrl: user.avatarUrl,
          email: user.email
        }, updatedJob.employerID));



        dispatch(
          new AcceptApplicantSuccess(updatedJob));
      }),
        err => {
          dispatch(new AcceptApplicantFail(err.message));
        };
    }
  }

  @Action(AcceptApplicantSuccess)
  acceptApplicantSuccess({ getState, patchState }: StateContext<JobsStateModel>, { job }: AcceptApplicantSuccess) {
    let jobs = getState().inactiveJobs;
    //If update in db went succesfully replace old job with new one in state
    const index = jobs.map(j => j.id).indexOf(job.id);
    if (index !== -1) {
      jobs.splice(index, 1);
    }
    patchState({ isLoading: false, inactiveJobs: jobs });
  }

  @Action(AcceptApplicantFail)
  acceptApplicatnFail({ patchState }: StateContext<JobsStateModel>, { errorMessage }: AcceptApplicantFail) {
    patchState({ isLoading: false });
  }
  //#endregion

  //#region Complete Job
  @Action(RemoveJob)
  removeJob({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { jobID }: RemoveJob) {
    const state = getState();
    patchState({ isLoading: true });

    // Get job in state
    const job = state.activeJobs.find(j => j.id === jobID);

    if (!isNullOrUndefined(job)) {
      this._jobsService.deleteJob(jobID);
      try {
        dispatch(new RemoveJobSuccess(jobID));
      } catch (e) {
        dispatch(new RemoveJobFail(jobID));
      }
    }
  }

  @Action(RemoveJobSuccess)
  removeJobSuccess({ getState, patchState }: StateContext<JobsStateModel>, { jobID }: RemoveJobSuccess) {
    const inactiveJobs = getState().inactiveJobs;
    patchState({ isLoading: false, inactiveJobs: inactiveJobs });
  }

  @Action(RemoveJobFail)
  removeJobFail({ patchState }: StateContext<JobsStateModel>, { errorMessage }: RemoveJobFail) {
    patchState({ isLoading: false });
  }
  //#endregion


  //#region Add org job
  @Action(AddJobOrg)
  AddJobOrg({ dispatch, patchState }: StateContext<JobsStateModel>, { payload, orgId }: AddJobOrg) {
    patchState({ isLoading: true });

    this._jobsService.createNewJob(payload).subscribe(
      (res: { job: IJob }) => {
        let updatedPayload = res.job;
        dispatch(new AddJobOrgSuccess(updatedPayload, orgId));
      },
      err => {
        dispatch(new AddJobOrgFail(err.message));
      }
    );
  }

  @Action(AddJobOrgSuccess)
  AddJobOrgSuccess({ getState, dispatch, patchState }: StateContext<JobsStateModel>, { job, orgId }: AddJobOrgSuccess) {
    const jobs = getState().inactiveJobs || [];

    jobs.push(job);

    const partialOrgJob: Partial<IJob> = {
      id: job.id,
      title: job.title,
      employerName: job.employerName,
      payment: job.payment,
      datePosted: job.datePosted,
      description: job.description
    };

    dispatch(new OrgAddPostedJob(partialOrgJob, orgId));

    patchState({ isLoading: false, inactiveJobs: jobs });

  }

  @Action(SetIsLoading)
  SetIsLoading(context: StateContext<JobsStateModel>, action: SetIsLoading) {
    context.patchState({
      isLoading: action.payload
    })
  }

  @Action(AddRecommendedJobs)
  AddRecommendedJobs(context: StateContext<JobsStateModel>, action: AddRecommendedJobs) {
    context.patchState({
      isLoading: false,
      recommendedJobs: action.jobs
    })
  }

  //#endregion
  @Action(ChangeBrowseFormat)
  ChangeBrowseFormat({ dispatch, patchState }: StateContext<JobsStateModel>, { payload }: ChangeBrowseFormat) {
    patchState({ isList: payload });
  }

  @Selector()
  static getBrowseFormat(state: JobsStateModel) {
    return state.isList;
  }
}


