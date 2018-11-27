import { IUser } from "src/models/user-model";
import { ISkills } from "src/models/skill-model";
import { UserStateModel } from "../states/user.state";

export class RequestUserSuccessAction {
    static readonly type = '[User] Request Success'

    constructor(public payload: IUser) { }
}

export class RequestUserFailedActions {
    static readonly type = '[User] Request Fail'

    constructor(public errorMessage: string) { }
}

export class RequestAddSkillToUser {
    static readonly type = '[User] Request Add Skill To User'

    constructor(public skills: ISkills[]) { }
}

export class RequestAddSkillToUserSuccess {
    static readonly type = '[User] Request Add Skill To User Success'

    constructor(public user: UserStateModel) { }
}

export class RequestAddSkillToUserFail {
    static readonly type = '[Jobs] Add Job Fail'
    constructor(public errorMessage: string) { }
}