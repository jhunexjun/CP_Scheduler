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
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import routes from "../../routes";
// import logo from "../../assets/compuTant/img/poshighway-logo2021-3.jpg";
import logo from "../../assets/compuTant/img/total-offroad-more-logo.png";
import computantLogo from "../../assets/compuTant/img/poshighway-logo2021-3.jpg";

import { extractSessionId } from '../../utils/util'


let ps;

function Sidebar(props) {
		const sidebar = useRef();
		const session = useParams();
		const [sessionId, setSessionId] = useState('');

		// verifies if routeName is the one active (in browser input)
		const activeRoute = (routeName) => {
				// return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
				// console.log("props.location.pathname: ", props.location.pathname);  // /admin/purchases
				return (props.location.pathname.includes(routeName) > -1) ? "active" : "";
		};

		useEffect(() => {
			setSessionId(extractSessionId(session['*']));

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
					<Link to="https://computant.com/" className="simple-text logo-mini" target="_blank">
						<div className="logo-img">
							<img src={logo} alt="react-logo" />
						</div>
					</Link>
					{/*<a href="https://www.creative-tim.com" className="simple-text logo-normal" >
						Creative Tim
					</a>*/}
				</div>
				<div className="sidebar-wrapper" ref={ sidebar }>
					<Nav>
						{routes.map((route, key) => {
							let newPath = route.path.replace(':sessionId', sessionId)
							return (
								<li key={key} className={ activeRoute(route.path) }>
									<NavLink to={ route.layout + newPath }
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
					<Nav>
						<li className="compuTant-logo">
							<NavLink to='https://www.poshighway.com/' target="_blank">
								<img src={computantLogo} className="mb-2" alt="https://www.poshighway.com/" />
								<p className='cmpt-addrs'>1019 Waimanu Street, #103<br/>
									Honolulu, HI 96814 USA<br />
									Sales: 888-881-1988<br />
									Technical Support: 833-214-2715</p>
							</NavLink>
						</li>
					</Nav>
				</div>
			</div>
		);
}

export default Sidebar;
