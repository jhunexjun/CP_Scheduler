import Appointment from './views/Appointments/Appointment';

const routes = [
	{
		path: "/appointment/:sessionId",  // i.e. /admin/appointment/<sessionId>
		name: "Appointments",
		icon: "nc-icon nc-calendar-60",
		component: <Appointment />,
		layout: "/admin",
	},
];

export default routes;