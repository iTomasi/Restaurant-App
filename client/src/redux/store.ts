import { createStore, combineReducers } from "redux";

// Reducers
import userReducer from "./user/userReducer";

const reducers = combineReducers({
    user: userReducer,
});

const store = createStore(reducers);

export default store;
