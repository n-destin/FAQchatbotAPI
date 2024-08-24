import { produce } from "immer";
import { action_types } from "../actions/actions";


const initial_state = {conversations : [], conversationKey : "", messages : []}

export const conversations_reducer = produce((previous_state, action) => {
    switch (action.type) {
        case action_types.UPDATE_CONVERSATIONS:
            console.log(action.payload);
            previous_state.conversations = action.payload
            break;
        case action_types.UPDATE_MESSAGES:
            console.log("messages");
            previous_state.messages = action.payload
            break;
        case action_types.UPDATE_CONVERSATION_KEY:
            console.log("conversation key");
            previous_state.conversationKey = action.payload
            break;
        default:
            return previous_state
    }
}, initial_state);