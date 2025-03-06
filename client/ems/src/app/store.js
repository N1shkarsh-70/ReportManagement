import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";
import authReducer from "../features/authSlice"
import adminReducer from "../features/adminSlice"
import plazaReducer from "../features/plazaSlice"
import SiteEngineerReducer  from "../features/siteEngineer";
import projectInchargeReducer from "../features/projectInchargeSlice"
import prijectReducer from "../features/projectSlice"
import issueReducer from "../features/issueSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    admins: adminReducer,
    plaza: plazaReducer,
    siteEngineer: SiteEngineerReducer,
    projectIncharge: projectInchargeReducer,
    project: prijectReducer,
    issue: issueReducer
  },
});

export default store;
