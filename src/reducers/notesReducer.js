import { types } from "../tipos/types"

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesAddNew:

            return {
                ...state,
                notes: [action.payload, ...state.notes]


            }
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.note.id
                        ? action.payload.note
                        : note
                )
            }
        case types.notesDeleted:
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogOutCleaning:
            return initialState

        default:
            return state
    }
}
