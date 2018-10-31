import { IUser, ISkill, IEducationItem, ISocialLink } from 'src/models/user-model'
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { RequestUserSuccessAction, RequestUserFailedActions } from '../actions/user.actions';
import { request } from 'http';
import { TempUserStorageService } from 'src/services/temp-user/temp-user-storage.service';

export class UserStateModel {
    userID?: string
    email?: string
    fName?: string
    lName?: string
    dob?: Date
    phone?: string
    summary?: string
    skills?: ISkill[]
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
    constructor(private userService: TempUserStorageService, private store: Store) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state
    }

    @Action(RequestUserSuccessAction)
    requestSuccessful({ patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState(payload)
    }

    @Action(RequestUserFailedActions)
    requestFailed({ patchState }: StateContext<UserStateModel>, { payload }: RequestUserSuccessAction) {
        patchState({})
        // this.store.dispatch() dispatch an error store thingy
    }
}