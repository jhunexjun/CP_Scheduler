module.exports = {
	getSchedule,
	addSchedule,
	deleteSchedule,
	getMembersById,
	getTechnicians,
	getInvoices,
}

function getSchedule() {
	// return "select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedmem.technicianId" +
	// 		", allDay, recurrenceRule " +
	// 		"from USR_schedules scheds left join USR_schedules_technicians schedmem on scheds.id = schedmem.schedId " +
	// 		"order by scheds.id";
	return "exec dbo.USER_SP_GET_Schedules @sessionId, @technicianId";
}

function addSchedule(allDay, recurrenceRule) {
	/*
		exec dbo.USER_SCHD_Add '6796B252-7279-47D1-9BE9-986EDD99D6C8',
								'Test from sp',
								'2023-03-15 12:00PM',
								'2023-03-15 13:00PM',
								'The is the description',
								'PEL-W-214020';
	*/

	return "exec dbo.USER_SCHD_Add @sessionId, @subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo";

	// let sql = 'insert into USR_schedules(subject, utcDateFrom, utcDateTo, description, invoiceNo';

	// if (allDay)
	// 	sql += ', allDay';
	// if (recurrenceRule)
	// 	sql += ', recurrenceRule';

	// sql += ') values(@subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo';

	// if (allDay)
	// 	sql += ', @allDay';
	// if (recurrenceRule)
	// 	sql += ', @recurrenceRule';

	// sql += '); select @@identity as newId';

	// return sql;
}

function deleteSchedule() {
	return "delete USR_schedules where id = @id; delete USR_schedules_technicians where schedId = @id";
}

function getMembersById() {
	return "select technicianId from USR_schedules_technicians where schedId = @schedId";
}

function getTechnicians() {
	return "exec dbo.USER_SP_GET_Technicians @sessionId";
}

function getInvoices() {
	return "exec dbo.USER_getWorkOrders @sessionId";
	// return "select HDR.TKT_NO, HDR.DOC_ID, NOTES.NOTE_TXT, HDR.CUST_NO, HDR.BILL_NAM " +
	// 		"from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES " +
	// 			"on HDR.DOC_ID = NOTES.DOC_ID " +
	// 			"and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID " +
	// 		"where HDR.DOC_TYP = 'O' and HDR.STR_ID =  @locationId" +
	// 		"order by HDR.TKT_DT desc";
}