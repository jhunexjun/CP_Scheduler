import Appointment from './views/Appointments/Appointment';

const routes = [
	{
		path: "/appointment",  // i.e. /admin/appointment
		name: "Appointments",
		icon: "nc-icon nc-calendar-60",
		component: <Appointment />,
		layout: "/admin"
	},
];

export default routes;