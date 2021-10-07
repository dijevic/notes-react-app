import { types } from "../tipos/types";

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                name: action.payload.displayName,
                uid: action.payload.uid
            }


        case types.logOut:
            return {}
        default:
            return state
    }

}