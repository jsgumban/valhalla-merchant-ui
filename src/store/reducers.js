import { combineReducers } from "redux"
import login from "./auth/login/reducer";
import merchants from "./merchants/reducer";

const rootReducer = combineReducers({
	login,
	merchants
})

export default rootReducer
