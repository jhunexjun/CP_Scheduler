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
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";

import routes from "routes.js";

import { SystemUserContext } from '../../Context/SystemUserContext';
import { uriEncode } from '../../utils/util';

import Cookies from 'universal-cookie';

import MessageNotif from './MessageNotif';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownNotif, setDropdownNotif] = useState(false);
  const [color, setColor] = useState("transparent");
  const sidebarToggle = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';
  const sysUserContext = useContext(SystemUserContext);

  const cookies = new Cookies();

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  function dropdownNotifToggle(e) {
    setDropdownNotif(!dropdownNotif);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  const logout = async () => {
    sysUserContext.loggingOut = true; // prevents the event click listener for excuting in AppLogout.jsx.
    cookies.remove('sessionId');

    const optionHeaders = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: uriEncode({ sessionId: sysUserContext.sessionId }),
    }

    await fetch(`${adminUrl}/logout`, optionHeaders)
    navigate('/');
  }

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  const fetchNotifications = useCallback(async () => {
    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/notifications?sessionId=${cookies.get('sessionId')}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setNotifications(res.data);
      });
  }, []);

  // useEffect(() => {
  //   let notificationsTimer = fetchNotificationsTimer();

  //   return () => {
  //     clearInterval(notificationsTimer);
  //   };
  // }, []);

  function fetchNotificationsTimer() {
    return setInterval(async () => {
      await fetchNotifications();
    }, 8000);
  }

  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <NavItem>
              <p className="mt-2">
                {`Store: ${sysUserContext.location }`}
              </p>
            </NavItem>

            <Dropdown
              nav
              isOpen={dropdownNotif}
              toggle={(e) => dropdownNotifToggle(e)}
            >
              <DropdownToggle nav>
                <i className="nc-icon nc-bell-55" />
                <div className="cmpt-notifcation">{ notifications.length > 0 ? notifications.length : "" }</div>
              </DropdownToggle>
              <MessageNotif notif={notifications} />
            </Dropdown>

            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle nav>
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">User Profile</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">User: { sysUserContext.user.id }</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" onClick={logout}>Log-out</DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
