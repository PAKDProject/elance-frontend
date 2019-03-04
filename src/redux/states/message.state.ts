import { IInstantMessage } from "src/services/websocket-service/websocket.service";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { AddMessageToState, AddOnlineMemberToState, RemoveOnlineMemberFromState } from "../actions/message.actions";

export class MessageStateModel {
    messages: IInstantMessage[]
    isOnlineList: string[]
}

@State({
    name: "messages",
    defaults: {
        messages: [],
        isOnlineList: []
    }
})
export class MessageState {
    @Selector()
    static getMessages(state: MessageStateModel) {
        return state.messages
    }

    @Selector()
    static getMessagesForUser(state: MessageStateModel) {
        return (userId: string, contactId: string) => {
            return state.messages.filter(user => (user.recipentId === userId && user.senderId === contactId) || (user.senderId === userId && user.recipentId === contactId)).sort((a, b) => {
                return a.timestamp - b.timestamp
            })
        }
    }

    @Selector()
    static userIsOnline(state: MessageStateModel) {
        return state.isOnlineList
    }

    @Action(AddMessageToState)
    AddMessageToState({ getState, patchState }: StateContext<MessageStateModel>, { payload }: AddMessageToState) {
        const messages = getState().messages
        messages.push(payload)

        patchState({ messages: messages })
    }

    @Action(AddOnlineMemberToState)
    AddOnlineMemberToState({ getState, patchState }: StateContext<MessageStateModel>, { payload }: AddOnlineMemberToState) {
        let onlineMembers = getState().isOnlineList

        let index = onlineMembers.findIndex(x => x === payload)

        if (index === -1) {
            onlineMembers.push(payload)
            patchState({ isOnlineList: onlineMembers })
        }
    }

    @Action(RemoveOnlineMemberFromState)
    RemoveOnlineMemberFromState({ getState, patchState }: StateContext<MessageStateModel>, { payload }: RemoveOnlineMemberFromState) {
        let onlineMembers = getState().isOnlineList

        let index = onlineMembers.findIndex(x => x === payload)

        if (index !== -1) {
            onlineMembers.splice(index, 1)
            patchState({ isOnlineList: onlineMembers })
        }
    }
}