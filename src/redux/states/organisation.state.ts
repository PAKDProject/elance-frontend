import { IOrganisation } from "src/models/organisation-model";
import { State, Selector, Action, Store, StateContext } from "@ngxs/store";
import { CreateOrganisation, CreateOrganisationSuccess, CreateOrganisationFail } from "../actions/organisation.actions";
import { OrganisationService } from "src/services/organisation-service/organisation.service";
import { NotificationService } from "src/services/notifications/notification.service";


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
    return state;
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

    let newStateOrgs = state.orgs;
    newStateOrgs.push(payload);
    patchState({ orgs: newStateOrgs });
  }
  @Action(CreateOrganisationFail)
  createOrgFail({ errorMessage }: CreateOrganisationFail) {
    this._notification.showError("An error occured!", errorMessage);
  }
  //#endregion
}