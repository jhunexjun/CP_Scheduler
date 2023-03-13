import Appointment from './views/Appointments/Appointment';
import Sms from './views/Sms/Sms';

const routes = [
	{
		path: "/appointment/:sessionId",  // i.e. /admin/appointment/<sessionId>
		name: "Appointment",
		icon: "nc-icon nc-calendar-60",
		component: <Appointment />,
		layout: "/admin",
	},
	{
		path: "/sms/:sessionId",  // i.e. /admin/sms/<sessionId>
		name: "SMS",
		icon: "nc-icon nc-mobile",
		component: <Sms />,
		layout: "/admin",
	},
];

export default routes;