module.exports = {
	getSchedule,
	addSchedule,
	deleteSchedule,
	getMembersById,
	getTechnicians,
	getWorkOrders,
}

function getSchedule() {
	return "exec dbo.USER_schedulesGet @sessionId, @technicianId, @robot";
}

function addSchedule(allDay, recurrenceRule) {
	/*
		exec dbo.USER_scheduleAdd '6796B252-7279-47D1-9BE9-986EDD99D6C8',
								'Test from sp',
								'2023-03-15 12:00PM',
								'2023-03-15 13:00PM',
								'The is the description',
								'PEL-W-214020';
	*/

	return "exec dbo.USER_scheduleAdd @sessionId, @subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo, 'N'";
}

function deleteSchedule() {
	return "delete USR_schedules where id = @id; delete USR_schedules_technicians where schedId = @id";
}

function getMembersById() {
	return "select technicianId from USR_schedules_technicians where schedId = @schedId";
}

function getTechnicians() {
	return "exec dbo.USER_TechniciansGet @sessionId, @robot";
}

function getWorkOrders() {
	return "exec dbo.USER_WorkOrdersGet @sessionId, @robot";
}