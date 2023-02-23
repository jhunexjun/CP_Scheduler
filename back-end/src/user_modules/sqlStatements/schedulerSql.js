module.exports = {
	getSchedule,
	addSchedule,
	deleteSchedule,
	getMembersById,
	getTechnicians,
	getInvoices,
}

function getSchedule() {
	return "select scheds.id, scheds.subject, scheds.utcDateFrom, scheds.utcDateTo, scheds.description, scheds.invoiceNo, schedmem.technicianId" +
			", allDay, recurrenceRule " +
			"from USR_schedules scheds left join USR_schedules_technicians schedmem on scheds.id = schedmem.schedId " +
			"order by scheds.id";
}

function addSchedule(allDay, recurrenceRule) {
	let sql = 'insert into USR_schedules(subject, utcDateFrom, utcDateTo, description, invoiceNo';

	if (allDay)
		sql += ', allDay';
	if (recurrenceRule)
		sql += ', recurrenceRule';

	sql += ') values(@subject, @utcDateFrom, @utcDateTo, @description, @invoiceNo';

	if (allDay)
		sql += ', @allDay';
	if (recurrenceRule)
		sql += ', @recurrenceRule';

	sql += '); select @@identity as newId';

	return sql;
}

function deleteSchedule() {
	return "delete USR_schedules where id = @id; delete USR_schedules_technicians where schedId = @id";
}

function getMembersById() {
	return "select technicianId from USR_schedules_technicians where schedId = @schedId";
}

function getTechnicians() {
	return "select USR_ID, NAM, PHONE_1 from SY_USR";
}

function getInvoices() {
	//return "select TKT_NO, STR_ID, STA_ID, CUST_NO, BILL_NAM_UPR from VI_PS_DOC_HDR";
	return "select HDR.TKT_NO, HDR.DOC_ID, NOTES.NOTE_TXT, HDR.CUST_NO, HDR.BILL_NAM " +
			"from VI_PS_DOC_HDR HDR left join VI_PS_DOC_NOTE NOTES " +
				"on HDR.DOC_ID = NOTES.DOC_ID " +
				"and HDR.STA_ID = NOTES.STA_ID and hdr.STR_ID = NOTES.STR_ID " +
			"order by NOTES.NOTE_SEQ_NO";
			//"where HDR.DOC_ID = '102370370894'";
			// need more for filtering as to what document.
}