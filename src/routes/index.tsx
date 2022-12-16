import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import RequireAuth from "../components/RequireAuth";
import Admin from "../modules/Admin";
import Login from "../modules/Auth/Login";
import Unauthorized from "../modules/Auth/Unauthorized";
import Dashboard from "../pages/Dashboard";
import Exam from "../pages/Exam";
import FinishExample from "../pages/Finish";
import ROLES from "../shared/roles";

const routes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/exam/:id" element={<Exam />} />
              <Route path="/finish" element={<FinishExample />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default routes;
