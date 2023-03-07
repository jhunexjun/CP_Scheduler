import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import PerfectScrollbar from "perfect-scrollbar";
import Navbar from '../components/Navbars/Navbar';

import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes';

let ps;

export default function AdminLayout() {
    const [backgroundColor] = useState("black");
    const [activeColor] = useState("info");

    const mainPanel = useRef();
    const location = useLocation();

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


    return (
            <div className="wrapper">
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
            </div>
    );
}