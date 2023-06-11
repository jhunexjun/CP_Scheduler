import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Routes, Route, useLocation, useParams, useNavigate } from 'react-router-dom';

import PerfectScrollbar from "perfect-scrollbar";
import Navbar from '../components/Navbars/Navbar';

import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes';

import { SystemUserContext } from './../Context/SystemUserContext';

import { extractSessionId } from '../utils/util';

let ps;

export default function AdminLayout() {
    const [backgroundColor] = useState("black");
    const [activeColor] = useState("info");

    const navigate = useNavigate();
    const session = useParams();
    // const [sessionId, setSessionId] = useState('');
    const [rerender, setRerender] = useState(false);

    const mainPanel = useRef();
    const location = useLocation();

    const sysUserContext = useContext(SystemUserContext);

    const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

    const fetchLocation = useCallback(async () => {
        let sess = extractSessionId(session['*']);
        // setSessionId(sess);
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


    return (
            <div className="wrapper">
                <SystemUserContext.Provider value={sysUserContext}>
                    <Sidebar location={location} bgColor={backgroundColor} activeColor={activeColor} />
                    <div className="main-panel" ref={mainPanel}>
                        <Navbar />
                        <Routes>
                            {routes.map((route, key) => {
                                return (
                                    <Route {...route} element={route.component} key={key} />
                                );
                            })}
                        </Routes>
                    </div>
                </SystemUserContext.Provider>
            </div>
    );
}