import { IUser, IEducationItem, ISocialLink } from "src/models/user-model";
import { State, Selector, Action, Store, StateContext } from "@ngxs/store";
import {
  RequestUserSuccessAction,
  RequestUserFailedActions,
  RequestAddSkillToUser,
  RequestUpdateUser,
  RequestUpdateUserSuccess,
  RequestUpdateUserFail,
  UserApplyForJob,
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
import { JobService } from "src/services/job-service/job.service";
import { IProfileCard } from "src/models/profile-card";
import { IOrganisation } from "src/models/organisation-model";
import { SetOrganisations, AddMemberToOrg } from "../actions/organisation.actions";
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
  appliedJobs?: Partial<IJob>[];
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
    private _orgService: OrganisationService
  ) { }

  //#region Selectors
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
  @Selector()
  static getAppliedJobs(state: UserStateModel) {
    return state.appliedJobs;
  }
  //#endregion

  //#region Set user Actions
  @Action(RequestUserSuccessAction)
  requestSuccessful({ patchState, dispatch }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
    patchState(payload);

    if (payload.organisations !== undefined) {
      dispatch(new SetOrganisations(payload.organisations));
    }
  }

  @Action(RequestUserFailedActions)
  requestFailed({ patchState }: StateContext<UserStateModel>, { errorMessage }: RequestUserFailedActions) {
    this._notification.showError("Couldn't set user ", errorMessage)
    patchState({});
  }
  //#endregion

  //#region Update User
  @Action(RequestUpdateUser)
  updateUserRequest({ getState, dispatch }: StateContext<UserStateModel>, { user }: RequestUpdateUser) {
    let userState = getState();
    this._notification.showInfo("Updating user profile...");

    this._userService.updateUser({ ...user }, userState.id).subscribe(
      res => {
        dispatch(new RequestUpdateUserSuccess(user));
      },
      err => {
        dispatch(new RequestUpdateUserFail(err));
      }
    );
  }

  @Action(RequestUpdateUserSuccess)
  updateUserRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestUpdateUserSuccess) {
    this._notification.showSuccess("User updated successfully!");
    patchState(user);
  }

  @Action(RequestUpdateUserFail)
  updateUserRequestFail() {
    this._notification.showError("User did not update!");
  }

  //#endregion


  @Action(RequestAddSkillToUser)
  addSkillToUser({ getState, dispatch }: StateContext<UserStateModel>, { skills }: RequestAddSkillToUser) {
    const existingSkills = getState().skills || [];
    existingSkills.push(...skills);
    dispatch(new RequestUpdateUser({ skills: existingSkills }));
  }

  @Action(RequestAddOrgToUser)
  addOrgToUser({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestAddOrgToUser) {
    let existingOrgs = getState().organisations || [];
    existingOrgs.push(payload);
    dispatch(new RequestUpdateUser({ organisations: existingOrgs }));
  }

  @Action(RequestUpdateUserOrg)
  RequestUpdateUserOrg({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestUpdateUserOrg) {
    const userOrgs = getState().organisations;

    const index = userOrgs.findIndex(org => org.id === payload.id);
    if (index !== -1) {
      userOrgs[index] = payload;
      dispatch(new RequestUpdateUser({ organisations: userOrgs }));
    }
    else {
      this._notification.showWarning("Couldn't find organisation to update on user")
    }
  }

  @Action(RequestDeleteOrgFromUser)
  RequestDeleteOrgFromUser({ dispatch, getState }: StateContext<UserStateModel>, { payload }: RequestDeleteOrgFromUser) {
    const orgs = getState().organisations;
    const newOrgs = orgs.filter(org => org.id !== payload);
    dispatch(new RequestUpdateUser({ organisations: newOrgs }));
  }

  @Action(UserApplyForJob)
  ApplyForJob({ getState, dispatch }: StateContext<UserStateModel>, { job }: UserApplyForJob) {
    const appliedJobs: Partial<IJob>[] = getState().appliedJobs || []
    appliedJobs.push({ id: job.id, title: job.title, employerName: job.employerName, dateDue: job.dateDue })
    dispatch(new RequestUpdateUser({ appliedJobs: appliedJobs }))
  }

  @Action(SendOrgInvite)
  sendOrgInvite({ getState }: StateContext<UserStateModel>, { userId, org }: SendOrgInvite) {
    this._userService.getUserByID(userId).subscribe(res => {
      let user = res;

      if (user.orgInvitations === undefined) user.orgInvitations = []

      user.orgInvitations.push(org);

      this._userService.updateUser({ orgInvitations: user.orgInvitations }, user.id).subscribe(res => {
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
