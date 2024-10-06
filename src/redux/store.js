import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./auth/Auth.reducer";
import { thunk } from "redux-thunk";
import { ExamScheduleReducer } from "./examScheduleManagement/ExamScheduleManagement.reducer";


const rootReducers = combineReducers({
  auth: authReducer,
  examScheduleData: ExamScheduleReducer,
  
});
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

