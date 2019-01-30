import { IOrganisation } from "src/models/organisation-model";
import { IUser } from "src/models/user-model";

//#region Set Organisations
export class SetOrganisations {
  static readonly type = '[Orgs] Set Organisations';
  constructor(public payload: Partial<IOrganisation>[]) { }
}
//#endregion
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

export class AddMemberToOrg{
  static readonly type = '[Orgs] Add Member to Org'

  constructor(public payload: Partial<IUser>){}
}

//#region Update Organisation
export class UpdateOrganisation{
  static readonly type = '[Orgs] Update Organisation'
  constructor(public payload: Partial<IOrganisation>){}
}

export class UpdateOrganisationSuccess {
  static readonly type = '[Orgs] Update Organisation Success'
  constructor(public payload: IOrganisation){}
}
export class UpdateOrganisationFail {
  static readonly type = '[Orgs] Update Organisation Fail'
  constructor(public errorMessage: string){}
}
//#endregion


