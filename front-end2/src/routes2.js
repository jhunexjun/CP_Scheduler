import Appointment from './views/Appointments/Appointment';
import Sms from './views/Sms/Sms';
import WorkOrder from './views/WorkOrders/WorkOrder';

const routes = [
	{
		path: "/appointments/:sessionId",  // i.e. /admin/appointment/<sessionId>
		name: "Appointments",
		icon: "nc-icon nc-calendar-60",
		component: <Appointment />,
		comparisonText: 'appointments',	// to make the sidebar menu highlighted as active.
		layout: "/admin",
	},
	{
		path: "/workorder/:sessionId",  // i.e. /admin/invoice/<sessionId>
		name: "Work Orders",
		icon: "nc-icon nc-single-copy-04",
		component: <WorkOrder />,
		comparisonText: 'workorder',
		layout: "/admin",
	},
	{
		path: "/sms/:sessionId",  // i.e. /admin/sms/<sessionId>
		name: "SMS",
		icon: "nc-icon nc-mobile",
		component: <Sms />,
		comparisonText: 'sms',
		layout: "/admin",
	},
];

export default routes;