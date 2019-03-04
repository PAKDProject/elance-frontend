import { IInstantMessage } from "src/services/websocket-service/websocket.service";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { AddMessageToState } from "../actions/message.actions";

export class MessageStateModel {
    messages: IInstantMessage[]
}

@State({
    name: "messages",
    defaults: {
        messages: []
    }
})
export class MessageState {
    @Selector()
    static getMessages(state: MessageStateModel) {
        return state.messages
    }

    @Selector()
    static getMessagesForUser(state: MessageStateModel) {
        return (id: string) => {
            return state.messages.filter(user => user.recipentId === id || user.senderId === id).sort((a, b) => {
                return a.timestamp - b.timestamp
            })
        }
    }

    @Action(AddMessageToState)
    AddMessageToState({ getState, patchState }: StateContext<MessageStateModel>, { payload }: AddMessageToState) {
        const messages = getState().messages
        messages.push(payload)

        patchState({ messages: messages })
    }
}