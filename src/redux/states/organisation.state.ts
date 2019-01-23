import { IOrganisation } from "src/models/organisation-model";
import { State, Selector, Action, Store, Select, StateContext } from "@ngxs/store";
import { CreateOrganisation, CreateOrganisationSuccess, CreateOrganisationFail, SetOrganisations } from "../actions/organisation.actions";
import { OrganisationService } from "src/services/organisation-service/organisation.service";
import { NotificationService } from "src/services/notifications/notification.service";
import { UserState, UserStateModel } from "./user.state";
import { Observable } from "rxjs";
import { IUser } from "src/models/user-model";
import { RequestAddOrgToUser } from "../actions/user.actions";


export class OrgsStateModel {
  orgs: IOrganisation[];
}

@State({
  name: "orgs",
  defaults: {
    orgs: []
  }
})
export class OrgsState {
  constructor(private _orgService: OrganisationService, private _store: Store, private _notification: NotificationService) { }

  @Selector()
  static getOrgs(state: OrgsStateModel) {
    return state.orgs;
  }

  //Sets organisations at the start of app running
  //Receives array of organisations and appends them to array
  @Action(SetOrganisations)
  setOrganisations({ getState, patchState }: StateContext<OrgsStateModel>, { payload }: SetOrganisations) {
    const state = getState();

    let newState = state.orgs;
    newState.push(...payload);

    patchState({ orgs: newState });
  }

  //#region Create Organisation
  @Action(CreateOrganisation)
  createOrg({ getState }: StateContext<OrgsStateModel>, { payload }: CreateOrganisation) {
    this._orgService.createOrganisation(payload).subscribe(res => {
      this._store.dispatch(new CreateOrganisationSuccess(res));
    }),
      err => {
        this._store.dispatch(new CreateOrganisationFail(err.message));
      }
  }
  @Action(CreateOrganisationSuccess)
  createOrgSuccess({ getState, patchState }: StateContext<OrgsStateModel>, { payload }: CreateOrganisationSuccess) {
    const state = getState();
    state.orgs.push(payload);
    this._store.dispatch(new RequestAddOrgToUser(payload));
    this._notification.showSuccess(`You've created ${payload.orgName}`, "You can now start posting jobs and adding members!")
    patchState(state);
  }
  @Action(CreateOrganisationFail)
  createOrgFail({ errorMessage }: CreateOrganisationFail) {
    this._notification.showError("An error occured!", errorMessage);
  }
  //#endregion


}