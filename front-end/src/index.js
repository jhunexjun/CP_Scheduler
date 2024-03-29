/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
// import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import "react-datetime/css/react-datetime.css";

// import AdminLayout from "layouts/Admin.js";

import MainLayout from './layouts/Main';
import ExpiredSession from './views/ExpiredSession';
import CreateSession from './views/CreateSession';
import ErrorPage from './components/error-page';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> */}

      <Route path="/" element={<ExpiredSession />} />
      <Route path="/createsession" element={<CreateSession />} />
      <Route path="/admin/*" element={<MainLayout />} errorElement={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
