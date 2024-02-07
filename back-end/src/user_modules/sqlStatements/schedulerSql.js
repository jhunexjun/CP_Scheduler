module.exports = {
	getAppointmentsByDateRange,
	getAppointments,
	addSchedule,
	deleteSchedule,
	getMembersById,
	getTechnicians,
	getWorkOrders,
	getAppointmentByWorkorderNo,
}

function getAppointmentsByDateRange() {
	// return "exec dbo.USER_SP_schedulesGet @sessionId, @technicianId, @robot";
	// return "exec dbo.USER_SP_schedulesGetByDateRange @sessionId, @technicianId, @utcDateFrom, @utcDateTo";
	return "exec dbo.USER_SP_schedulesGetByDateRange @sessionId, @technicianIds, @utcDateFrom, @utcDateTo";
}

function getAppointments() {	// All appointments
	return "exec dbo.USER_SP_schedulesGet @sessionId, @technicianIds";
}

function addSchedule(allDay, recurrenceRule) {
	/*
		exec dbo.USER_SP_scheduleAdd '6796B252-7279-47D1-9BE9-986EDD99D6C8',
								'Test from sp',
								'2023-03-15 12:00PM',
								'2023-03-15 13:00PM',
								'The is the description',
								'PEL-W-214020';
	*/

	// return "exec dbo.USER_SP_scheduleAdd @sessionId, @subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo, 'N'";
	return "exec dbo.USER_SP_scheduleAdd @sessionId, @subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo";
}

function deleteSchedule() {
	return "delete USR_schedules where id = @id; delete USR_schedules_technicians where schedId = @id";
}

function getMembersById() {
	return "select technicianId from USR_schedules_technicians where schedId = @schedId";
}

function getTechnicians() {
	// return "exec dbo.USER_SP_TechniciansGet @sessionId, @robot";
	return "exec dbo.USER_SP_TechniciansGet @sessionId";
}

function getWorkOrders() {
	// return "exec dbo.USER_SP_WorkOrdersGet @sessionId, @robot";
	return "exec dbo.USER_SP_WorkOrdersGet @sessionId";
}

function getAppointmentByWorkorderNo() {
	return 'select description from USR_schedules where invoiceNo = @workorderNo';
}