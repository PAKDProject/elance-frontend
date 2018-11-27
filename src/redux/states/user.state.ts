import { IUser, IEducationItem, ISocialLink } from 'src/models/user-model'
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions, RequestAddSkillToUser, RequestAddSkillToUserSuccess } from '../actions/user.actions';
import { request } from 'http';
import { TempUserStorageService } from 'src/services/temp-user/temp-user-storage.service';
import { UserService } from 'src/services/user-service/user.service';
import { ISkills } from 'src/models/skill-model';

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
    constructor(private userService: TempUserStorageService, private store: Store, private _userService: UserService) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state
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
        })
    }

    @Action(RequestAddSkillToUserSuccess)
    addSkillRequestSuccess({ patchState }: StateContext<UserStateModel>, { user }: RequestAddSkillToUserSuccess) {
        patchState(user)
    }

}