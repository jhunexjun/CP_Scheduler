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

import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import { SystemUserContext } from './../Context/SystemUserContext';

import { extractSessionId } from '../utils/util';

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [activeColor, setActiveColor] = useState("info");
  const mainPanel = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [rerender, setRerender] = useState(false);

  const sysUserContext = useContext(SystemUserContext);

  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

  const fetchLocation = useCallback(async () => {
    const cookies = new Cookies();
    const sess = cookies.get('sessionId');

    await fetch(`${adminUrl}/location?sessionId=${sess}&robot=N`, )
        .then((res) => {
            return res.json();
        })
        .then((location) => {
            if (location.status === 'Error') {
                navigate('/')
            } else {
                sysUserContext.user = {};
                sysUserContext.location = location.data.locationId;
                sysUserContext.user.id = location.data.userId;
                sysUserContext.sessionId = sess;  // to remove soon.
                setRerender(!rerender);
            }
        });
  } ,[]);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <SystemUserContext.Provider value={sysUserContext}>
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
        />
        <div className="main-panel" ref={mainPanel}>
          <Navbar {...props} />
          <Routes>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  element={prop.component}
                  key={key}
                  exact
                />
              );
            })}
          </Routes>
        </div>
      </SystemUserContext.Provider>
    </div>
  );
}

export default Dashboard;
