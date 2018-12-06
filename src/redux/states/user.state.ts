import { IUser, IEducationItem, ISocialLink } from 'src/models/user-model'
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions, RequestAddSkillToUser, RequestAddSkillToUserSuccess, RequestAddSkillToUserFail, RequestRemoveSkillFromUser, RequestRemoveSkillFromUserFail, RequestRemoveSkillFromUserSuccess, ApplyForJob, ApplyForJobSuccess, ApplyForJobFail, RequestUpdateUser, RequestUpdateUserSuccess, RequestUpdateUserFail } from '../actions/user.actions';
import { request } from 'http';
import { TempUserStorageService } from 'src/services/temp-user/temp-user-storage.service';
import { UserService } from 'src/services/user-service/user.service';
import { ISkills } from 'src/models/skill-model';
import { NotificationService } from 'src/services/notifications/notification.service';
import { IJob } from 'src/models/job-model';
import { RequestJobs } from '../actions/job.actions';

export class UserStateModel {
    id?: string
    email?: string
    fName?: string
    lName?: string
    dob?: Date
    phone?: string
    summary?: string
    skills?: ISkills[]
    educationItems?: IEducationItem[]
    avatarUrl?: string
    backgroundUrl?: string
    socialLinks?: ISocialLink[]
    tagline?: string
    contacts?: IUser[]
    activeJobs?: IJob[]
}

@State({
    name: 'user',
    defaults: {}
})
export class UserState {
    constructor(private userService: TempUserStorageService, private store: Store, private _userService: UserService, private _notification: NotificationService) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state
    }

    @Selector()
    static getSkillCount(state: UserStateModel) {
        return state.skills.length
    }

    @Selector()
    static getActiveJobs(state: UserStateModel) {
        return state.activeJobs
    }

    @Action(RequestUserSuccessAction)
    requestSuccessful({ getState, patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState(payload)
    }

    @Action(RequestUserFailedActions)
    requestFailed({ patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState({})
    }

    @Action(RequestAddSkillToUser)
    addSkillRequest({ getState }: StateContext<UserStateModel>, { skills }: RequestAddSkillToUser) {
        let user = getState()
        let existingSkills = user.skills
        existingSkills.push(...skills)
        user.skills = existingSkills
        this._userService.updateUser({ skills: existingSkills }, user.id).subscribe(res => {
            this.store.dispatch(new RequestAddSkillToUserSuccess(user))
        }, err => {
            this.store.dispatch(new RequestAddSkillToUserFail(err.message))
        })
    }

    @Action(RequestAddSkillToUserSuccess)
    addSkillRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestAddSkillToUserSuccess) {
        patchState(user)
        this._notification.showSuccess("Skills added!", "We will now find you more suitable jobs")
    }

    @Action(RequestAddSkillToUserFail)
    addNewJobFail({ getState, patchState }: StateContext<UserStateModel>, { errorMessage }: RequestAddSkillToUserFail) {
        this._notification.showError("An error occured in the state", errorMessage);
    }

    @Action(RequestUpdateUser)
    updateUserRequest({ getState }: StateContext<UserStateModel>, { user }: RequestUpdateUser) {
        let userState = getState()
        this._notification.showInfo("Updating user profile...")

        userState = {
            ...user
        }
        alert(JSON.stringify(user))

        this._userService.updateUser({ user }, userState.id).subscribe(res => {
            this.store.dispatch(new RequestUpdateUserSuccess(userState))
        }, err => {
            this.store.dispatch(new RequestUpdateUserFail(err))
        })
    }

    @Action(RequestUpdateUserSuccess)
    updateUserRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestUpdateUserSuccess) {
        this._notification.showSuccess("User updated successfully!")
        patchState(user)
    }

    @Action(RequestUpdateUserFail)
    updateUserRequestFail() {
        this._notification.showError("User did not update!")
    }

    @Action(ApplyForJob)
    applyForJobRequest({ getState }: StateContext<UserStateModel>, { job }: ApplyForJob) {
        const state = getState()
        this._notification.showInfo("Applying for " + job.title + "")
        let appliedJobs = state.activeJobs
        if (appliedJobs === undefined) {
            appliedJobs = []
        }
        appliedJobs.push(job)
        alert(JSON.stringify(appliedJobs))
        alert(job.title)
        alert(state.id)
        this._userService.applyForAJob(appliedJobs, state.id, job.id).subscribe(res => {
            this.store.dispatch(new ApplyForJobSuccess(appliedJobs, job.title))
        }, err => {
            this.store.dispatch(new ApplyForJobFail("Failed to add a job."))
        })
    }

    @Action(ApplyForJobSuccess)
    ApplyForJobSuccess({ patchState }: StateContext<UserStateModel>, { jobs, title }: ApplyForJobSuccess) {
        this._notification.showSuccess(`You have applied for ${title} successfully!`)
        patchState({ activeJobs: jobs })
        this.store.dispatch(new RequestJobs())
    }

    @Action(ApplyForJobFail)
    ApplyForJobFail() {
        this._notification.showError("Failed to apply for the job!")
    }
}