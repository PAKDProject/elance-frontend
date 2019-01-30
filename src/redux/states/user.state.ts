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
  RequestAddOrgToUser,
  SendOrgInvite,
  AcceptOrgInvite,
  RequestUpdateUserOrg,
  RequestDeleteOrgFromUser
} from "../actions/user.actions";
import { UserService } from "src/services/user-service/user.service";
import { ISkills } from "src/models/skill-model";
import { NotificationService } from "src/services/notifications/notification.service";
import { IJob } from "src/models/job-model";
import { RequestJobs } from "../actions/job.actions";
import { JobService } from "src/services/job-service/job.service";
import { IProfileCard } from "src/models/profile-card";
import { IOrganisation } from "src/models/organisation-model";
import { SetOrganisations, AddMemberToOrg } from "../actions/organisation.actions";
import { state } from "@angular/animations";
import { OrganisationService } from "src/services/organisation-service/organisation.service";

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
  organisations?: Partial<IOrganisation>[];
  orgInvitations?: Partial<IOrganisation>[];

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
    private _jobService: JobService,
    private _orgService: OrganisationService
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
    let existingOrgs: Partial<IOrganisation>[] = [];
    existingOrgs.push(...state.organisations);
    existingOrgs.push(payload);

    this.store.dispatch(new RequestUpdateUser({ organisations: existingOrgs }));
  }

  @Action(RequestUpdateUserOrg)
  RequestUpdateUserOrg({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestUpdateUserOrg) {
    const userOrgs = getState().organisations;

    const index = userOrgs.findIndex(org => org.id === payload.id);
    if (index !== -1) {
      userOrgs[index] = payload;

      const partial: Partial<IUser> = {
        organisations: userOrgs
      }

      dispatch(new RequestUpdateUser(partial));
    }
    else {
      this._notification.showWarning("Couldn't find organisation to update on user")
    }
  }

  @Action(RequestDeleteOrgFromUser)
  RequestDeleteOrgFromUser({ dispatch, getState }: StateContext<UserStateModel>, { payload }: RequestDeleteOrgFromUser) {
    const orgs = getState().organisations;

    const newOrgs = orgs.filter(org => org.id !== payload);

    const partial: Partial<IUser> = {
      organisations: newOrgs
    }

    dispatch(new RequestUpdateUser(partial));
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

  @Action(SendOrgInvite)
  sendOrgInvite({ getState }: StateContext<UserStateModel>, { userId, org }: SendOrgInvite) {
    this._userService.getUserByID(userId).subscribe(res => {
      let user = res;

      if (user.orgInvitations === undefined) user.orgInvitations = []

      user.orgInvitations.push(org);

      const partialUser: Partial<IUser> = {
        orgInvitations: user.orgInvitations
      }

      this._userService.updateUser(partialUser, user.id).subscribe(res => {
        this._notification.showSuccess("Invite Sent");
      })
    }, error => {
      this._notification.showError("Unable to send invite to user!", error.message);
    })
  }

  @Action(AcceptOrgInvite)
  acceptOrgInvite({ getState }: StateContext<UserStateModel>, { payload }: AcceptOrgInvite) {
    //Remove invite from the invites 
    const user = getState();
    let orgInvites = user.orgInvitations.filter(org => org.id !== payload);

    //Get the organisation object
    this._orgService.getOrganisationByID(payload).subscribe(res => {
      const partial: Partial<IOrganisation> = {
        id: res.id,
        orgName: res.orgName,
        logoUrl: res.logoUrl
      }

      const organisationsNew = [];
      organisationsNew.push(partial);

      const partialUser: Partial<IUser> = {
        orgInvitations: orgInvites,
        organisations: organisationsNew
      }

      const otherPartialUser: Partial<IUser> = {
        id: user.id,
        fName: user.fName,
        lName: user.lName,
        tagline: user.tagline,
        avatarUrl: user.avatarUrl
      };

      this.store.dispatch(new RequestUpdateUser(partialUser));
      this.store.dispatch(new AddMemberToOrg(otherPartialUser));
    }), err => {

    }
  }
}
