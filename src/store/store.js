import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { usersReducer } from "./reducers/usersReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    user: userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))