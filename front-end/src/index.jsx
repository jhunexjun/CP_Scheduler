import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminLayout from './layout/Admin';
import ErrorPage from './components/error-page';
import reportWebVitals from './reportWebVitals';
// import Login from './views/Login/Login';

import 'bootstrap-scss/bootstrap.scss';	// version 5.2.3.
// import 'bootstrap/dist/css/bootstrap.css';  // the bootstrap 4.6.

// paper-dashboard; This uses-bootstrap.
import "./assets/paper-dashboard/scss/paper-dashboard.scss?v=1.3.0";
// import "./assets/paper-dashboard/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// user-defined.
import './assets/compuTant/themes/custom-styles.scss';
import './assets/compuTant/themes/overridden-styles.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "react-datetime/css/react-datetime.css";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AdminLayout />} />
			<Route path="/admin/*" element={<AdminLayout />} errorElement={<ErrorPage />} />
		</Routes>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();