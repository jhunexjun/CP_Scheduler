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
// import Dashboard from "views/Dashboard.js";
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
// import Maps from "views/Map.js";
// import UserPage from "views/User.js";
// import UpgradeToPro from "views/Upgrade.js";

import Appointments from "views/Appointments/Appointment";
import Sms from 'views/Sms/Sms';
import Workorder from 'views/Reports/Workorders';
import Reports from 'views/Reports';
import EmployeeTimeEntry from "views/Reports/EmployeeTimeEntry";

let routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: <Dashboard />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  {
    // path: "/appointments",
    path: "/appointments",  // i.e. /admin/appointment/<sessionId>
    name: "Appointments",
    icon: "nc-icon nc-calendar-60",
    component: <Appointments />,
    category: 'main',
    layout: "/admin",
    searchKey: 'appointment'
  },
  {
    path: "/sms/:custNo?",  // i.e. /admin/invoice/<sessionId>
    name: "SMS",
    icon: "nc-icon nc-mobile",
    component: <Sms />,
    category: 'main',
    layout: "/admin",
    searchKey: 'sms'
  },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-single-copy-04",
    component: <Reports />,
    category: 'main',
    layout: "/admin",
    searchKey: '/reports'
  },
  {
    path: "/reports/workorders",  // i.e. /admin/sms/<sessionId>
    name: "Workorders",
    icon: "nc-icon nc-single-copy-04",
    component: <Workorder />,
    category: 'sub',
    layout: "/admin",
    searchKey: 'workorders'
  },
  {
    path: "/reports/employee-time-entry",
    name: "Employee Time Entry",
    icon: "nc-icon nc-single-copy-04",
    component: <EmployeeTimeEntry />,
    category: 'sub',
    layout: "/admin",
    searchKey: 'employee-time-entry'
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
