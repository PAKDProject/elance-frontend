import { IUser } from "src/models/user-model";
import { ISkills } from "src/models/skill-model";
import { UserStateModel } from "../states/user.state";
import { IJob } from "src/models/job-model";
import { IOrganisation } from "src/models/organisation-model";

export class RequestUserSuccessAction {
    static readonly type = '[User] Request Success'

    constructor(public payload: IUser) { }
}

export class RequestRefreshUser {
    static readonly type = '[User] Refresh User'
    constructor() { }
}
export class RequestUserFailedActions {
    static readonly type = '[User] Request Fail'

    constructor(public errorMessage: string) { }
}
export class RequestAddSkillToUser {
    static readonly type = '[User] Request Add Skill To User'
    /**
     * Update the skills on the user object. Accepts the new array of skill objects
     * @param skills : Updated skill array
     */
    constructor(public skills: ISkills[]) { }
}
export class RequestAddOrgToUser {
    static readonly type = "[User] Request Add Organisation to User";

    /**
     * Add a reference to an organisation a user has created or is a member of to the user object.
     * Accepts a partial organisation object containing
     * -> Id
     * -> orgName
     * -> logoUrl
     * @param payload : Partial<IOrganisation>
     */
    constructor(public payload: Partial<IOrganisation>) { }
}
export class RequestUpdateUserOrg {
    static readonly type = "[User] Request Update Organisation on User";

    /**
     * Updates the organisation reference stored on the user.
     * Accepts a partial organisation object containing
     * -> Id
     * -> orgName
     * -> logoUrl    
     * @param payload : Partial<IUser> 
     * */
    constructor(public payload: Partial<IOrganisation>) { }
}
export class RequestAddPostedJob {
    static readonly type = "[User] Request Add Posted Job to User";

    /**
     * Add a reference to a posted job to a user
     * @param payload {jobId, jobTitle, description, employerName, payment, datePosted}
     */
    constructor(public payload: Partial<IJob>) { }
}
export class RequestDeleteOrgFromUser {
    static readonly type = "[User] Request Delete Organisation from User";
    /**
     * Delete the organisation reference stored on the user.
     * Accepts an organisation id of type string
     * @param payload : organisations id to delete
     */
    constructor(public payload: string) { }
}
export class RequestUpdateUser {
    static readonly type = '[User] Request Update User'

    /**
     * General purpose user update. Accepts Partial<IUser> object
     * Note - Make sure not to include the entity or id of the user.
     * @param user : Partial<IUser>
     */
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
export class UserApplyForJob {
    static readonly type = '[User] Apply For Job'

    /**
     * Adds a reference to a job the user applied for to the user object.
     * Accepts a job object of the applied job;
     * @param payload {jobId, jobTitle, description, employerName, payment, datePosted}
     */
    constructor(public payload: Partial<IJob>) { }
}
export class RequestAddActiveJob {
    static readonly type = "[user] Add Active Job";
    constructor(public job: Partial<IJob>, public userId: string) { }
}
export class SendOrgInvite {
    static readonly type = '[User] Send Org Invite'

    /**
     * Send an invitation to join an organisation to a specific user
     * @param userId User id of person to invite
     * @param org Partial Organisation
     */
    constructor(public userId: string, public org: Partial<IOrganisation>) { }
}
export class AcceptOrgInvite {
    static readonly type = '[User] Accept Org Invite'

    /**
     * Accept an invitation to join an organisation.
     * Adds reference of organisation to user object and updates org state
     * @param payload : Organisation id : string
     */
    constructor(public payload: string) { }
}

export class RequestAddContact {
    static readonly type = '[User] Add Contact to User';
    constructor(public payload: Partial<IUser>) { }
}

export class RequestDeleteContact {
    static readonly type = '[User] Delete Contact from User'
    constructor(public payload: string) { }
}

