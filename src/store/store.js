import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { notesReducer } from '../reducers/notesReducer';
import { reducer } from '../reducers/reducer'
import { uiReducer } from '../reducers/uiReducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducers = combineReducers({
    auth: reducer,
    authUiError: uiReducer,
    notes: notesReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
)