import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import Layout from "./components/layout/Layout";
import Login from "./components/pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ROLES } from "./components/constants/role.js"; // Import roles

// Import other components
import AddAdmin from "./components/pages/AddAdmin";
import AddProject from "./components/pages/AddProject";
import IssueGeneration from "./components/pages/IssueGeneration";
import AddProjectincharge from "./components/pages/AddProjectincharge";
import ManageAdmin from "./components/pages/ManageAdmins";
import AddSiteEngineer from "./components/pages/AddSiteEngineer";
import ManageSiteEngineers from "./components/pages/ManageSiteEngineers";
import Dashboard from "./components/Dashboard";
import AllAdmin from "./components/pages/AllAdmins";
import ManageIssues from "./components/pages/ManageIssues";
import AddPlaza from "./components/pages/AddPlaza";
import AllSiteEngineer from "./components/pages/AllSiteEngineers";
import AllProjects from "./components/pages/AllProjects";
import AllPlazas from "./components/pages/AllPlazas";
import EngineersIssues from "./components/pages/EngineersIssues";
import ManageIncharges from "./components/pages/ManageIncharges";

import SingleProject from "./components/pages/SingleProject.jsx";
import ManageProjects from "./components/pages/ManageProjects.jsx";
import AccessDenied from "./components/pages/AccessDenied.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.SITE_ENGINEER, ROLES.PROJECT_INCHARGE]}>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard - Accessible by all roles */}
            <Route path="/" element={<Dashboard />} />

            {/* Add Admin - Accessible by Admin and SuperAdmin */}
            <Route
              path="/add-admin"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AddAdmin />
                </ProtectedRoute>
              }
            />

            {/* Add Project - Accessible by Admin and SuperAdmin */}
            <Route
              path="/add-project"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AddProject />
                </ProtectedRoute>
              }
            />

            {/* Issue Generation - Accessible by siteEngineer */}
            <Route
              path="/issue-generate"
              element={
                <ProtectedRoute roles={[ROLES.SITE_ENGINEER]}>
                  <IssueGeneration />
                </ProtectedRoute>
              }
            />

            {/* Add Project Incharge - Accessible by Admin and SuperAdmin */}
            <Route
              path="/add-incharge"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AddProjectincharge />
                </ProtectedRoute>
              }
            />

            {/* Manage Admin - Accessible by Admin and SuperAdmin */}
            <Route
              path="/manage-admin"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <ManageAdmin />
                </ProtectedRoute>
              }
            />

            {/* Add Site Engineer - Accessible by Admin and SuperAdmin */}
            <Route
              path="/add-engineer"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AddSiteEngineer />
                </ProtectedRoute>
              }
            />

            {/* All Site Engineers - Accessible by Admin and SuperAdmin */}
            <Route
              path="/all-engineers"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AllSiteEngineer />
                </ProtectedRoute>
              }
            />

            {/* All Admins - Accessible by Admin and SuperAdmin */}
            <Route
              path="/all-admins"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AllAdmin />
                </ProtectedRoute>
              }
            />

            {/* Manage Issues - Accessible by Admin and SuperAdmin */}
            <Route
              path="/manage-issue"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <ManageIssues />
                </ProtectedRoute>
              }
            />

            {/* Add Plaza - Accessible by Admin and SuperAdmin */}
            <Route
              path="/add-plaza"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AddPlaza />
                </ProtectedRoute>
              }
            />

            {/* Manage Site Engineers - Accessible by Admin and SuperAdmin */}
            <Route
              path="/manage-engineers"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <ManageSiteEngineers />
                </ProtectedRoute>
              }
            />

            {/* All Projects - Accessible by Admin and SuperAdmin */}
            <Route
              path="/all-projects"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AllProjects />
                </ProtectedRoute>
              }
            />

            {/* All Plazas - Accessible by Admin and SuperAdmin */}
            <Route
              path="/all-plazas"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <AllPlazas />
                </ProtectedRoute>
              }
            />

            {/* All Plazas - Accessible by Admin and SuperAdmin */}
            <Route
              path="/get-projectById"
              element={
                <ProtectedRoute roles={[ROLES.PROJECT_INCHARGE]}>
                 <SingleProject/>
                </ProtectedRoute>
              }
            />

            {/* Engineer Issues - Accessible by siteEngineer */}
            <Route
              path="/all-issuesById"
              element={
                <ProtectedRoute roles={[ROLES.SITE_ENGINEER]}>
                  <EngineersIssues />
                </ProtectedRoute>
              }
            />

            {/* Engineer Issues - Accessible by siteEngineer */}
            <Route
              path="/manage-projects"
              element={
                <ProtectedRoute roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
               <ManageProjects/>
                </ProtectedRoute>
              }
            />

            {/* Manage Incharges - Accessible by Admin and SuperAdmin */}
            <Route
              path="/manage-incharge"
              element={
                <ProtectedRoute roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
                  <ManageIncharges />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<AccessDenied/>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;