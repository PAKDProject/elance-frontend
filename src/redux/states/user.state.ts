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
  RequestDeleteOrgFromUser,
  RequestAddPostedJob,
  RequestAddActiveJob
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
  activeJobs?: Partial<IJob>[]; //{jobId, jobTitle, description, progress, employerName, dateAccepted}
  profileCards?: IProfileCard[];
  jobHistory?: Partial<IJob>[]; // {jobId, jobTitle, description, employerName, dateAccepted}
  appliedJobs?: Partial<IJob>[];// {jobId, jobTitle, description, employerName, payment, datePosted}
  postedJobs?: Partial<IJob>[];// {jobId, jobTitle, description, employerName, payment, datePosted}
  organisations?: Partial<IOrganisation>[] // {orgId, logoUrl, name}
  orgInvitations?: Partial<IOrganisation>[] // {orgId, logoUrl, name}
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

    this._userService.updateUser(user, userState.id).subscribe(
      res => {
        dispatch(new RequestUpdateUserSuccess(res));
      },
      err => {
        dispatch(new RequestUpdateUserFail(err.message));
      }
    );
  }

  @Action(RequestUpdateUserSuccess)
  updateUserRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestUpdateUserSuccess) {
    this._notification.showSuccess("User updated successfully!");
    patchState(user);
  }

  @Action(RequestUpdateUserFail)
  updateUserRequestFail(context: StateContext<UserStateModel>, { errorMessage }: RequestUpdateUserFail) {
    this._notification.showError("User did not update!");
    console.log("Failed: " + errorMessage)
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

  @Action(RequestAddPostedJob)
  RequestAddPostedJob({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestAddPostedJob) {
    let postedJobs = getState().postedJobs || [];
    postedJobs.push(payload);

    dispatch(new RequestUpdateUser({ postedJobs: postedJobs }));
  }

  @Action(RequestDeleteOrgFromUser)
  RequestDeleteOrgFromUser({ dispatch, getState }: StateContext<UserStateModel>, { payload }: RequestDeleteOrgFromUser) {
    const orgs = getState().organisations;
    const newOrgs = orgs.filter(org => org.id !== payload);
    dispatch(new RequestUpdateUser({ organisations: newOrgs }));
  }

  @Action(RequestAddActiveJob)
  RequestAddActiveJob(context: StateContext<UserStateModel>, { job, userId }: RequestAddActiveJob) {
    let userToUpdate: IUser;
    this._userService.getUserByID(userId).subscribe(user => {
      userToUpdate = user;
      let activeJobs = userToUpdate.activeJobs || [];
      let appliedJobs = userToUpdate.appliedJobs;
      const index = appliedJobs.findIndex(i => i.id === job.id);
      appliedJobs.splice(index, 1);
      activeJobs.push(job);

      this._userService.updateUser({ activeJobs: activeJobs, appliedJobs: appliedJobs }, userId).subscribe(res => {
        alert(JSON.stringify(res))
      })
    })

  }
  @Action(UserApplyForJob)
  ApplyForJob({ getState, dispatch }: StateContext<UserStateModel>, { payload }: UserApplyForJob) {
    const appliedJobs: Partial<IJob>[] = getState().appliedJobs || []
    appliedJobs.push(payload);

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
