import { IUser, IEducationItem, ISocialLink } from 'src/models/user-model'
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions, RequestAddSkillToUser, RequestAddSkillToUserSuccess, RequestAddSkillToUserFail, RequestRemoveSkillFromUser, RequestRemoveSkillFromUserFail, RequestRemoveSkillFromUserSuccess, RequestUpdateSkillForUser, RequestUpdateSkillForUserSuccess, RequestUpdateSkillForUserFail } from '../actions/user.actions';
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
        this._userService.updateUser(existingSkills, user.id).subscribe(res => {
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

    @Action(RequestRemoveSkillFromUser)
    removeSkillRequest({ getState }: StateContext<UserStateModel>, { skill }: RequestRemoveSkillFromUser) {
        let user = getState()
        let existingSkills = user.skills
        let index = existingSkills.findIndex((skills) => {
            return skills === skill
        });

        if (index === -1) {
            this.store.dispatch(new RequestRemoveSkillFromUserFail("Skill doesn't exist!"))
        }
        else {
            existingSkills.splice(index, 1)
            user.skills = existingSkills
            this._userService.updateUser(existingSkills, user.id).subscribe(res => {
                this.store.dispatch(new RequestRemoveSkillFromUserSuccess(user))
            }, err => {
                this.store.dispatch(new RequestRemoveSkillFromUserFail(err))
            })
        }
    }

    @Action(RequestRemoveSkillFromUserSuccess)
    removeSkillRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestRemoveSkillFromUserSuccess) {
        patchState(user)
    }

    @Action(RequestRemoveSkillFromUserFail)
    removeSkillRequestFail({ errorMessage }: RequestAddSkillToUserFail) {
        this._notification.showError("An error occured in the state", errorMessage);
    }

    @Action(RequestUpdateSkillForUser)
    updateSkillRequest({ getState }: StateContext<UserStateModel>, { skill }: RequestUpdateSkillForUser) {
        let user = getState()
        let existingSkills = user.skills
        let index = existingSkills.findIndex((skills) => {
            return skills === skill
        });

        if (index === -1) {
            this.store.dispatch(new RequestUpdateSkillForUserFail("Skill doesn't exist!"))
        }
        else {
            existingSkills[index] = skill
            user.skills = existingSkills
            this._userService.updateUser(existingSkills, user.id).subscribe(res => {
                this.store.dispatch(new RequestUpdateSkillForUserSuccess(user))
            }, err => {
                this.store.dispatch(new RequestUpdateSkillForUserFail(err))
            })
        }
    }
}