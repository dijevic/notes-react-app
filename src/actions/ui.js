import { types } from "../tipos/types"

export const setErrorAction = (err) => {
    return {
        type: types.setUiError,
        payload: err

    }
}
export const removeErrorAction = () => {
    return {
        type: types.removeUiError,
    }

}

export const startLoading = () => {
    return {
        type: types.uiStartLoading,

    }
}
export const finishLoading = () => {
    return {
        type: types.uiFinishLoading,

    }
}