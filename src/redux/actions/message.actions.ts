import { IInstantMessage } from "src/services/websocket-service/websocket.service";

//#region Add Message to State
export class AddMessageToState {
    static readonly type = '[Messages] Add New Message'

    /**
     * Will Add Messages returning from the websocket
     * @param payload : Array of all message objects
     */
    constructor(public payload: IInstantMessage) { }
}

export class AddOnlineMemberToState {
    static readonly type = '[Online] Add Online User'

    constructor(public payload: string) { }
}


export class RemoveOnlineMemberFromState {
    static readonly type = '[Online] Remove Online User'

    constructor(public payload: string) { }
}

//#endregion