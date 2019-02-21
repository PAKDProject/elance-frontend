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
  RequestRemovePostedJob,
  RequestAddActiveJob,
  RequestRefreshUser,
  RequestAddContact,
  RequestDeleteContact,
  RequestRemoveActiveJob
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
import { RemoveJob } from '../actions/job.actions';

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
  contacts?: Partial<IUser>[];
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
    private _orgService: OrganisationService,
    private _jobService: JobService
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
  @Action(RequestRefreshUser)
  RequestRefreshUser({ getState, setState }: StateContext<UserStateModel>) {
    const userId = getState().id;
    let user;

    this._userService.getUserByID(userId).subscribe(res => {
      user = res;
    });

    if (user) {
      setState(user);
    }

  }

  @Action(RequestUserFailedActions)
  requestFailed({ patchState }: StateContext<UserStateModel>, { errorMessage }: RequestUserFailedActions) {
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
    patchState(user);
  }

  @Action(RequestUpdateUserFail)
  updateUserRequestFail(context: StateContext<UserStateModel>, { errorMessage }: RequestUpdateUserFail) {
    console.log("Failed: " + errorMessage)
  }

  //#endregion


  @Action(RequestAddSkillToUser)
  addSkillToUser({ getState, dispatch }: StateContext<UserStateModel>, { skills }: RequestAddSkillToUser) {
    const existingSkills = getState().skills || [];
    existingSkills.push(...skills);
    dispatch(new RequestUpdateUser({ skills: existingSkills }));
  }

  @Action(RequestAddContact)
  RequestAddContact({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestAddContact) {
    const contacts = getState().contacts || [];

    const index = contacts.findIndex(c => c.id === payload.id)
    if (index === -1) {
      contacts.push(payload);
      dispatch(new RequestUpdateUser({ contacts: contacts }));
    }

  }

  @Action(RequestDeleteContact)
  RequestDeleteContact({ getState, dispatch }: StateContext<UserStateModel>, { payload }: RequestDeleteContact) {
    const contacts = getState().contacts || [];

    if (contacts !== []) {
      const index = contacts.findIndex(c => c.id === payload);
      if (index !== -1) {
        contacts.splice(index, 1);
        dispatch(new RequestUpdateUser({ contacts: contacts }))
      }
    }
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
      console.log("Couldn't find organisation to update on user")
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

      })
    })
  }

  @Action(RequestRemoveActiveJob)
  RequestRemoveActiveJob(context: StateContext<UserStateModel>, { job, userId }: RequestRemoveActiveJob) {
    let userToUpdate: IUser;
    this._userService.getUserByID(userId).subscribe(user => {
      userToUpdate = user;
      const activeJobs = userToUpdate.activeJobs;
      let jobHistory = userToUpdate.jobHistory || [];
      const index = activeJobs.findIndex(i => i.id === job.id);
      activeJobs.splice(index, 1);
      this._jobService.getJobById(job.id).subscribe((j) => {
        jobHistory.push(j);
      });

      this._userService.updateUser({ activeJobs: activeJobs, jobHistory: jobHistory }, userId).subscribe(res => {

      });
      context.dispatch(new RequestRemovePostedJob(job, job.employerID));
    });
  }

  @Action(RequestRemovePostedJob)
  RequestRemovePostedJob(context: StateContext<UserStateModel>, { job, userId }: RequestRemovePostedJob) {
    let userToUpdate: IUser;
    this._userService.getUserByID(userId).subscribe(user => {
      userToUpdate = user;
      const postedJobs = userToUpdate.postedJobs;
      const index = postedJobs.findIndex(i => i.id === job.id);
      postedJobs.splice(index, 1);

      this._userService.updateUser({ postedJobs: postedJobs }, userId).subscribe(res => {

      });
      // TODO: check if org is the employer and remove from there
      context.dispatch(new RemoveJob(job.id));
    });
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
      })
    }, error => {
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
      this.store.dispatch(new AddMemberToOrg(otherPartialUser, payload));
    }), err => {

    }
  }
}
