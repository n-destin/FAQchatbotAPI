import { produce } from "immer";
import { action_types } from "../actions/actions";

const initial_state = {authenticated : false}

export const authentication_reducer = produce((previousState, action)=>{
    switch(action.type){
        case action_types.AUTHENTICATE_USER:
            previousState.authenticated = true
            break;
        case action_types.DE_AUTHENTICATE_USER:
            previousState.authenticated = false
            break
        case action_types.AUTHENTICATION_ERROR:
            previousState.authenticated = false
            break
        default:
            return previousState
    }
}, initial_state)