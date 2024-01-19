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
import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "logo.svg";
import logo from "../../assets/compuTant/img/poshighway-logo_black_green.jpg";
// import logo from "../../assets/compuTant/img/POS Highway - CompuTant Logo White.png";
// import logo from "../../assets/compuTant/img/POS Highway - CompuTant Logo Black.png";
import './sidebar.css';

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = useRef();

  // Verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    const colonIndex = routeName.indexOf(':');

    if (colonIndex === -1) {
      return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    } else {
      const result = routeName.substring(colonIndex);
      const replacedPath = routeName.replace(result, '');

      return location.pathname.indexOf(replacedPath) > -1 ? "active" : "";
    }    
  };

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  function removeUrlParams(routeName) {
    const colonIndex = routeName.indexOf(':');

    if (colonIndex > -1) {
      const result = routeName.substring(colonIndex);
      return routeName.replace(result, '');
    } else {
      return routeName;
    }
  }

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo mt-3">
        <Link to={process.env.REACT_APP_COMPANY_WEBSITE} target="_blank">
          <div className="logo-img">
            <img src={logo} className='rounded mx-auto d-block' alt="POS Highway"  />
          </div>
        </Link>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.category === 'sub')
              return;

            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink to={ prop.layout + removeUrlParams(prop.path) } className="nav-NavLink">
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
        <Nav>
          <li className="cmpt-sidebar-bottom-logo">
            <NavLink to='https://www.poshighway.com/' target="_blank" style={{opacity: 1}}>
              <p className='cmpt-sidebar-addrs'>
                Powered by POS Highway<br />
                www.poshighway.com<br />
                Tel No: 888-881-1988<br />
              </p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
