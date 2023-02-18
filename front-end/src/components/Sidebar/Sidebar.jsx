/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import routes from "../../routes";
import logo from "../../assets/compuTant/img/poshighway-logo2021-3.jpg";

let ps;

function Sidebar(props) {
    const sidebar = useRef();
  
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        // return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
        // console.log("props.location.pathname: ", props.location.pathname);  // /admin/purchases
        return (props.location.pathname.indexOf(routeName) > -1) ? "active" : "";
    };

    useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }

        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
        };
    });

    return (
        <div className="sidebar"
            data-color={ props.bgColor }
            data-active-color={ props.activeColor }>
            <div className="logo">
                <a href="https://poshighway.myshopify.com/" className="simple-text logo-mini" target="_blank" rel="noreferrer">
                    <div className="logo-img">
                        <img src={logo} alt="POS Highway" />
                    </div>
                </a>
                <a href="https://poshighway.myshopify.com/" className="simple-text logo-normal" target="_blank" rel="noreferrer">CompuTant</a>
            </div>
            <div className="sidebar-wrapper" ref={ sidebar }>
                <Nav>
                    {routes.map((route, key) => {
                        return (
                            <li key={key} className={ activeRoute(route.path) }>
                                <NavLink to={ route.layout + route.path }
                                    className={ ({ isActive }) => {
                                        return isActive ? "nav-link active" : "nav-link"
                                    } }>
                                    <i className={route.icon} />
                                    <p>{route.name}</p>
                                </NavLink>
                            </li>
                            );
                        })
                    }
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;
