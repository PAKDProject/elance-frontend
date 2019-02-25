import { IOrganisation } from "src/models/organisation-model";
import { IUser } from "src/models/user-model";
import { IJob } from "src/models/job-model";

//#region Set Organisations
export class SetOrganisations {
  static readonly type = '[Orgs] Set Organisations';
  constructor(public payload: Partial<IOrganisation>[]) { }
}
//#endregion
export class RequestRefreshOrg {
  static readonly type = '[Orgs] Refresh Organisation'
  constructor() { }
}
//#region Create organisation
export class CreateOrganisation {
  static readonly type = '[Orgs] Create Organisation'
  constructor(public payload: IOrganisation) {
  }
}
export class CreateOrganisationSuccess {
  static readonly type = '[Orgs] Create Organisation Success'
  constructor(public payload: IOrganisation) { }
}
export class CreateOrganisationFail {
  static readonly type = '[Orgs] Create Organisation Fail'
  constructor(public errorMessage: string) { }
}
//#endregion

export class AddMemberToOrg {
  static readonly type = '[Orgs] Add Member to Org'

  constructor(public payload: Partial<IUser>, public orgId: string) { }
}

//#region Update Organisation
export class UpdateOrganisation {
  static readonly type = '[Orgs] Update Organisation'
  constructor(public payload: Partial<IOrganisation>, public orgId: string) { }
}

export class UpdateOrganisationSuccess {
  static readonly type = '[Orgs] Update Organisation Success'
  constructor(public payload: IOrganisation) { }
}
export class UpdateOrganisationFail {
  static readonly type = '[Orgs] Update Organisation Fail'
  constructor(public errorMessage: string) { }
}
//#endregion

//#region Delete Organisation
export class DeleteOrganisation {
  static readonly type = '[Orgs] Delete Org'

  constructor(public payload: string) { }
}

export class DeleteOrganisationSuccess {
  static readonly type = '[Orgs] Delete Org Success'

  constructor(public payload: string) { }
}
export class DeleteOrganisationFail {
  static readonly type = '[Orgs] Delete Org Fail'

  constructor(public errorMessage: string) { }
}


export class OrgAddPostedJob {
  static readonly type = '[Orgs] Add Posted Job To Org';

  constructor(public payload: Partial<IJob>, public orgId: string) { }
}

export class AddActiveJobToOrg {
  static readonly type = '[Orgs] Add Active Job To Org';

  constructor(public payload: Partial<IJob>, public orgId: string) { }
}
export class AddContactToOrg {
  static readonly type = '[Orgs] Add Contact To Org';

  constructor(public payload: Partial<IUser>, public orgId: string) { }
}



//#endregion
