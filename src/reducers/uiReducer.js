import { types } from "../tipos/types";

const initialState = {
    messageError: null,
    loading: false,
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.setUiError:
            return {
                ...state,
                messageError: action.payload,
            }
        case types.removeUiError:
            return {
                ...state,
                messageError: null
            }
        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
        case types.uiFinishLoading:

            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

