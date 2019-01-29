import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { State, Selector, Action, Store, StateContext } from "@ngxs/store";
import {
  RequestUserSuccessAction,
  RequestUserFailedActions,
  RequestAddSkillToUser,

  RequestUpdateUser,
  RequestUpdateUserSuccess,
  RequestUpdateUserFail,
  // RequestJobHistory,
  // RequestJobHistorySuccess,
  // RequestJobHistoryFail,
  UserApplyForJob,
  UserApplyForJobSuccess,
  UserApplyForJobFail,
  RequestAddOrgToUser
} from "../actions/user.actions";
import { UserService } from "src/services/user-service/user.service";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { IJob } from "src/models/job-model";
import { RequestJobs } from "../actions/job.actions";
import { JobService } from "src/services/job-service/job.service";
import { IProfileCard } from "src/models/profile-card";
import { IOrganisation } from "src/models/organisation-model";
import { SetOrganisations } from "../actions/organisation.actions";

export class UserStateModel {
  id: string;
  entity?: string;
  email: string;
  fName?: string;
  lName?: string;
  dob?: Date;
  phone?: string;
  summary?: string;
  skills?: ISkills[];
  educationItems?: IEducationItem[];
  avatarUrl?: string;
  backgroundUrl?: string;
  socialLinks?: ISocialLink[];
  tagline?: string;
  contacts?: IUser[];
  activeJobs?: IJob[];
  profileCards?: IProfileCard[];
  jobHistory?: IJob[];
  appliedJobs?: IJob[];
  organisations?: IOrganisation[];
}

@State({
  name: "user",
  defaults: {}
})
export class UserState {
  constructor(
    private store: Store,
    private _userService: UserService,
    private _notification: NotificationService,
    private _jobService: JobService
  ) { }

  @Selector()
  static getUser(state: UserStateModel) {
    return state;
  }

  @Selector()
  static getSkillCount(state: UserStateModel) {
    return state.skills.length;
  }

  @Selector()
  static getActiveJobs(state: UserStateModel) {
    return state.activeJobs;
  }

  @Action(RequestUserSuccessAction)
  requestSuccessful({ getState, patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
    patchState(payload);

    if (payload.organisations !== undefined) {
      this.store.dispatch(new SetOrganisations(payload.organisations));
    }
    // if (payload.jobHistory !== undefined) {
    //   this.store.dispatch(new RequestJobHistory(payload.jobHistory));
    // }
  }

  @Action(RequestUserFailedActions)
  requestFailed(
    { patchState }: StateContext<UserStateModel>,
    { payload }: RequestUserSuccessAction
  ) {
    patchState({});
  }

  @Action(RequestUpdateUser)
  updateUserRequest(
    { getState }: StateContext<UserStateModel>,
    { user }: RequestUpdateUser
  ) {
    let userState = getState();
    this._notification.showInfo("Updating user profile...");

    this._userService.updateUser({ ...user }, userState.id).subscribe(
      res => {
        this.store.dispatch(new RequestUpdateUserSuccess(user));
      },
      err => {
        this.store.dispatch(new RequestUpdateUserFail(err));
      }
    );
  }

  @Action(RequestUpdateUserSuccess)
  updateUserRequestSuccess(
    { patchState }: StateContext<UserStateModel>,
    { user }: RequestUpdateUserSuccess
  ) {
    this._notification.showSuccess("User updated successfully!");
    patchState(user);
  }

  @Action(RequestUpdateUserFail)
  updateUserRequestFail() {
    this._notification.showError("User did not update!");
  }

  @Action(RequestAddSkillToUser)
  addSkillToUser(
    { getState }: StateContext<UserStateModel>,
    { skills }: RequestAddSkillToUser
  ) {
    const state = getState();
    let existingSkills = state.skills;
    existingSkills.push(...skills);
    this.store.dispatch(new RequestUpdateUser({ skills: existingSkills }));
  }

  @Action(RequestAddOrgToUser)
  addOrgToUser({ getState }: StateContext<UserStateModel>, { payload }: RequestAddOrgToUser) {
    const state = getState();
    let existingOrgs: IOrganisation[] = [];
    existingOrgs.push(...state.organisations);
    existingOrgs.push(payload);

    this.store.dispatch(new RequestUpdateUser({ organisations: existingOrgs }));
  }

  @Action(UserApplyForJob)
  ApplyForJob({ getState }: StateContext<UserStateModel>, { job }: UserApplyForJob) {
    //Get user from state
    const state = getState();

    //If never applied for a job initialize array
    if (state.appliedJobs === undefined) state.appliedJobs = []
    //Push new job to the array
    state.appliedJobs.push(job)

    const partial: Partial<IUser> = {
      appliedJobs: state.appliedJobs
    }

    //Pass the array to the user service to update the user
    this._userService.updateUser(partial, state.id).subscribe((res) => {
      let updated = res;
      this.store.dispatch(new UserApplyForJobSuccess(updated))
    }),
      err => {
        this.store.dispatch(new UserApplyForJobFail(err.message))
      }
  }

  //If user updated in the database then patch state with the new returned user object
  @Action(UserApplyForJobSuccess)
  ApplyForJobSuccess({ patchState }: StateContext<UserStateModel>, { user }: UserApplyForJobSuccess) {
    patchState(user);
  }

  @Action(UserApplyForJobFail)
  ApplyForJobFail({ getState, patchState }: StateContext<UserStateModel>, { errorMessage }: UserApplyForJobFail) {
    const state = getState();

    this._notification.showError("Error occured in the state", errorMessage);

    patchState(state);
  }
}
