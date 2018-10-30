import { IUser } from "src/models/user-model";

export class RequestUserSuccessAction {
    static readonly type = '[User] Request Success'

    constructor(public payload: IUser) { }
}

export class RequestUserFailedActions {
    static readonly type = '[User] Request Fail'

    constructor(public errorMessage: string) { }
}