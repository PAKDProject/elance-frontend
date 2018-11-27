import { IUser, IEducationItem, ISocialLink } from 'src/models/user-model'
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions, RequestAddSkillToUser, RequestAddSkillToUserSuccess, RequestAddSkillToUserFail } from '../actions/user.actions';
import { request } from 'http';
import { TempUserStorageService } from 'src/services/temp-user/temp-user-storage.service';
import { UserService } from 'src/services/user-service/user.service';
import { ISkills } from 'src/models/skill-model';
import { NotificationService } from 'src/services/notifications/notification.service';

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

    @Action(RequestUserSuccessAction)
    requestSuccessful({ getState, patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState(payload)
    }

    @Action(RequestUserFailedActions)
    requestFailed({ patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState({})
        // this.store.dispatch() dispatch an error store thingy
    }

    @Action(RequestAddSkillToUser)
    addSkillRequest({ getState }: StateContext<UserStateModel>, { skills }: RequestAddSkillToUser) {
        let user = getState()
        let existingSkills = user.skills
        existingSkills.push(...skills)
        user.skills = existingSkills
        this._userService.updateUser(user as IUser).subscribe(res => {
            this.store.dispatch(new RequestAddSkillToUserSuccess(user))
        }, err => {
            this.store.dispatch(new RequestAddSkillToUserFail(err.message))
        })
    }

    @Action(RequestAddSkillToUserSuccess)
    addSkillRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestAddSkillToUserSuccess) {
        this._notification.showSuccess("Skills added!", "We will now find you more suitable jobs")
        patchState(user)
    }

    @Action(RequestAddSkillToUserFail)
    addNewJobFail({ getState, patchState }: StateContext<UserStateModel>, { errorMessage }: RequestAddSkillToUserFail) {
        this._notification.showError("An error occured in the state", errorMessage);
    }
}