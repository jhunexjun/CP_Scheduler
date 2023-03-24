import Appointment from './views/Appointments/Appointment';
import Sms from './views/Sms/Sms';
import Invoice from './views/Invoices/Invoice';

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
	{
		path: "/invoice/:sessionId",  // i.e. /admin/invoice/<sessionId>
		name: "Invoice",
		icon: "nc-icon nc-single-copy-04",
		component: <Invoice />,
		layout: "/admin",
	},
];

export default routes;