import { IOrganisation } from "src/models/organisation-model";
import { State, Selector, Action, Store, StateContext } from "@ngxs/store";
import { CreateOrganisation, CreateOrganisationSuccess, CreateOrganisationFail, SetOrganisations, UpdateOrganisation, UpdateOrganisationSuccess, UpdateOrganisationFail, DeleteOrganisation, DeleteOrganisationSuccess, DeleteOrganisationFail } from "../actions/organisation.actions";
import { OrganisationService } from "src/services/organisation-service/organisation.service";
import { NotificationService } from "src/services/notifications/notification.service";
import { RequestAddOrgToUser, RequestUpdateUserOrg, RequestDeleteOrgFromUser } from "../actions/user.actions";

export class OrgsStateModel {
  orgs: Partial<IOrganisation>[];
}

@State({
  name: "orgs",
  defaults: {
    orgs: []
  }
})

export class OrgsState {
  constructor(
    private _orgService: OrganisationService,
    private _store: Store,
    private _notification: NotificationService
  ) { }

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
  createOrg({ dispatch }: StateContext<OrgsStateModel>, { payload }: CreateOrganisation) {
    this._orgService.createOrganisation(payload).subscribe(res => {
      dispatch(new CreateOrganisationSuccess(res));
    }),
      err => {
        dispatch(new CreateOrganisationFail(err.message));
      }
  }
  @Action(CreateOrganisationSuccess)
  createOrgSuccess({ getState, patchState }: StateContext<OrgsStateModel>, { payload }: CreateOrganisationSuccess) {
    const state = getState();

    const partialJob: Partial<IOrganisation> = {
      id: payload.id,
      orgName: payload.orgName,
      logoUrl: payload.logoUrl,
    }
    state.orgs.push(partialJob);
    this._store.dispatch(new RequestAddOrgToUser(partialJob));
    this._notification.showSuccess(`You've created ${payload.orgName}`, "You can now start posting jobs and adding members!")
    patchState({ orgs: state.orgs });
  }
  @Action(CreateOrganisationFail)
  createOrgFail({ errorMessage }: CreateOrganisationFail) {
    this._notification.showError("An error occured!", errorMessage);
  }
  //#endregion

  //#region Update Organisation
  @Action(UpdateOrganisation)
  UpdateOrganisation({ dispatch }: StateContext<OrgsStateModel>, { payload, orgId }: UpdateOrganisation) {
    if (orgId && payload) {
      this._orgService.updateOrganisation(payload, orgId).subscribe((res) => {
        dispatch(new UpdateOrganisationSuccess(res));
      }, error => {
        dispatch(new UpdateOrganisationFail(error.message));
      })
    }
  }

  @Action(UpdateOrganisationSuccess)
  UpdateOrganisationSuccess({ getState, patchState, dispatch }: StateContext<OrgsStateModel>, { payload }: UpdateOrganisationSuccess) {
    const orgs = getState().orgs;

    const partial: Partial<IOrganisation> = {
      id: payload.id,
      orgName: payload.orgName,
      logoUrl: payload.logoUrl
    };

    dispatch(new RequestUpdateUserOrg(partial));

    const index = orgs.findIndex(org => org.id === payload.id);

    orgs[index] = partial;

    patchState({ orgs: orgs });

  }

  @Action(UpdateOrganisationFail)
  UpdateOrganisationFail({ patchState }: StateContext<OrgsStateModel>, { errorMessage }: UpdateOrganisationFail) {
    this._notification.showError("Unfortunately something went wrong!", errorMessage);
  }

  //#endregion


  //#region Delete Org
  @Action(DeleteOrganisation)
  DeleteOrganisation({ getState, dispatch }: StateContext<OrgsStateModel>, { payload }: DeleteOrganisation) {
    const orgs = getState().orgs;

    if (orgs.findIndex(org => org.id === payload) !== -1) {
      this._orgService.deleteOrganisation(payload).subscribe(res => {
        dispatch(new DeleteOrganisationSuccess(res.id));
      }, error => {
        dispatch(new DeleteOrganisationFail(error.message));
      });
    }
  }
  @Action(DeleteOrganisationSuccess)
  DeleteOrganisationSuccess({ getState, patchState, dispatch }: StateContext<OrgsStateModel>, { payload }: DeleteOrganisationSuccess) {
    const orgs = getState().orgs;

    const updatedOrgs = orgs.filter(org => org.id !== payload);
    dispatch(new RequestDeleteOrgFromUser(payload));

    patchState({ orgs: updatedOrgs });
  }
  @Action(DeleteOrganisationFail)
  DeleteOrganisationFail({ patchState }: StateContext<OrgsStateModel>, { errorMessage }: DeleteOrganisationFail) {
    this._notification.showError("Unfortunately something went wrong!", errorMessage);
  }

  //#endregion

}