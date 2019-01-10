import { IUser } from "src/models/user-model";
import { ISkills } from "src/models/skill-model";
import { UserStateModel } from "../states/user.state";
import { IJob } from "src/models/job-model";

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

export class RequestUpdateUser {
    static readonly type = '[User] Request Update User'

    constructor(public user: Partial<IUser>) { }
}

export class RequestUpdateUserSuccess {
    static readonly type = '[User] Request Update User Success'

    constructor(public user: Partial<IUser>) { }
}

export class RequestUpdateUserFail {
    static readonly type = '[User] Request Update User Fail'

    constructor(public errorMessage: string) { }
}

export class ApplyForJob {
    static readonly type = '[Jobs] Apply For Job'

    constructor(public job: IJob) { }
}

export class ApplyForJobSuccess {
    static readonly type = '[Jobs] Apply For Job'

    constructor(public jobs: IJob[], public title: string) { }
}

export class ApplyForJobFail {
    static readonly type = '[Jobs] Apply For Job'

    constructor(public errorMessage: string) { }
}