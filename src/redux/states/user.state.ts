import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { State, Selector, Action, Store, StateContext } from "@ngxs/store";
import {
  RequestUserSuccessAction,
  RequestUserFailedActions,
  RequestAddSkillToUser,
  ApplyForJob,
  ApplyForJobSuccess,
  ApplyForJobFail,
  RequestUpdateUser,
  RequestUpdateUserSuccess,
  RequestUpdateUserFail
} from "../actions/user.actions";
import { TempUserStorageService } from "src/services/temp-user/temp-user-storage.service";
import { UserService } from "src/services/user-service/user.service";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { IJob } from "src/models/job-model";
import { RequestJobs } from "../actions/job.actions";

export class UserStateModel {
  id?: string;
  email?: string;
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
}

@State({
  name: "user",
  defaults: {}
})
export class UserState {
  constructor(
    private userService: TempUserStorageService,
    private store: Store,
    private _userService: UserService,
    private _notification: NotificationService
  ) {}

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
  requestSuccessful(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: RequestUserSuccessAction
  ) {
    patchState(payload);
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

  // @Action(ApplyForJob)
  // applyForJobRequest({ getState }: StateContext<UserStateModel>, { job }: ApplyForJob) {
  //     const state = getState()
  //     //this._notification.showInfo("Applying for " + job.title + "")
  //     let appliedJobs = state.activeJobs
  //     if (appliedJobs === undefined) {
  //         appliedJobs = []
  //     }
  //     job.dateAccepted = new Date()
  //     appliedJobs.push(job)
  //     this._userService.applyForAJob(appliedJobs, state.id, job.id).subscribe(res => {
  //         this.store.dispatch(new ApplyForJobSuccess(appliedJobs, job.title))
  //     }, err => {
  //         this.store.dispatch(new ApplyForJobFail("Failed to add a job."))
  //     })
  // }

  // @Action(ApplyForJobSuccess)
  // applyForJobSuccess({ patchState }: StateContext<UserStateModel>, { jobs, title }: ApplyForJobSuccess) {
  //     //        this._notification.showSuccess(`You have applied for ${title} successfully!`)
  //     patchState({ activeJobs: jobs })
  //     this.store.dispatch(new RequestJobs())
  // }

  // @Action(ApplyForJobFail)
  // applyForJobFail() {
  //     // this._notification.showError("Failed to apply for the job!")
  // }
}
