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
import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
} from "reactstrap";

import routes from "../../routes.js";
import { uriEncode } from '../../utils/util'

import Dropdown from 'react-bootstrap/Dropdown';

import { SystemUserContext } from '../../Context/SystemUserContext';


function Header(props) {
	const [isOpen, setIsOpen] = useState(false);
	// const [dropdownOpen, setDropdownOpen] = useState(false);
	const [color, setColor] = useState("transparent");
	const sidebarToggle = useRef();
	const location = useLocation();
	const navigate = useNavigate();
	const sysUserContext = useContext(SystemUserContext);

	const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';
	const toggle = () => {
		if (isOpen) {
			setColor("transparent");
		} else {
			setColor("dark");
		}
		setIsOpen(!isOpen);
	};

	const logout = async () => {
		sysUserContext.loggingOut = true;	// prevents the event click listener for excuting in AppLogout.jsx.

		const optionHeaders = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncode({ sessionId: sysUserContext.sessionId }),
		}

		await fetch(`${adminUrl}/logout`, optionHeaders)
		navigate('/');
	}

	const getBrand = () => {
		let brandName = "Default Brand";
		routes.map((prop, key) => {
			let newPath = prop.path.replace(':sessionId', sysUserContext.sessionId)
			if (window.location.href.includes(prop.layout + newPath)) {
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

  return (
	// add or remove classes depending if we are on full-screen-maps page or not
	<Navbar
		color={-1 !== -1 ? "dark" : color }
		expand="lg"
		className={-1 !== -1 ? "navbar-absolute fixed-top" : "navbar-absolute fixed-top " + (color === "transparent" ? "navbar-transparent " : "")
		}>

		<div className="navbar-wrapper">
			<div className="navbar-toggle">
				<button type="button" ref={sidebarToggle} className="navbar-toggler" onClick={() => openSidebar()}>
					<span className="navbar-toggler-bar bar1" />
					<span className="navbar-toggler-bar bar2" />
					<span className="navbar-toggler-bar bar3" />
				</button>
			</div>
			<NavbarBrand href="https://www.poshighway.com/">{ getBrand() }</NavbarBrand>
		</div>
		<NavbarToggler onClick={toggle}>
			<span className="navbar-toggler-bar navbar-kebab" />
			<span className="navbar-toggler-bar navbar-kebab" />
			<span className="navbar-toggler-bar navbar-kebab" />
		</NavbarToggler>
		<Collapse isOpen={isOpen} navbar className="justify-content-end">
			<div style={{marginRight: '23px'}}>
				<span className="me-3">
					{`Location: ${sysUserContext.location }`}
				</span>
				<span className="float-end">
					<Dropdown>
						<Dropdown.Toggle className="nc-icon nc-settings-gear-65" bsPrefix as="i" style={{fontSize:'23px'}}></Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item href="#">{ sysUserContext.user.id }</Dropdown.Item>
							<Dropdown.Item href="#" onClick={logout}>Log-out</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</span>
			</div>
		</Collapse>
	</Navbar>
  );
}

export default Header;
