import React, { useState, memo } from 'react';

import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

import { uriEncode, isSet } from '../../utils/util';


const Sched = ({scheduleData, technicians, workOrders, stopTimer, startTimer}) => {
	const groups = ['technicianIds'];
	let [currentDate] = useState(new Date());
	const [popupVisible, setPopupVisible] = useState(false);
	

	const url = process.env.REACT_APP_API_DOMAIN + '/admin/schedule';


	function onAppointmentAdding(e) {
		if (e.appointmentData.invoiceNo === undefined || e.appointmentData.invoiceNo === null || e.appointmentData.invoiceNo === "") {
			showToast('', 'Please  select invoice.', 'warning');
			e.cancel = true;
		}

		if (!isSet(e.appointmentData, "technicianIds") || e.appointmentData.technicianIds.length === 0) {
			showToast('', 'Please select technician.', 'warning');
			e.cancel = true;
		}

		// e.cancel = true;
	}

	async function onAppointmentAddedAsync(e) {
		await addScheduleAsync(e.appointmentData);
		showToast('Added', e.appointmentData.text, 'success');
	}

	async function addScheduleAsync(params) {	// params = e.appointmentData
		const addSched = {
			subject: params.text,
			utcDateFrom: params.startDate,
			utcDateTo: params.endDate,
			description: (params.description === undefined || params.description === null) ? "" : params.description,
			technicianIds: params.technicianIds,	// array
			invoiceNo: params.invoiceNo,
		};

		if (params.allDay)
			addSched.allDay = true;
		if (params.recurrenceRule)
			addSched.recurrenceRule = params.recurrenceRule;	// ex. "FREQ=DAILY",

		const uriEncoded = uriEncode(addSched);
		const optionHeaders = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncoded,
		};
		return await fetch(`${url}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				//setToastOpen(true);	// to implement html for toast.
				addedToast(params.text);
				return json;
			});
	}


	function onAppointmentUpdating(e) {
		// console.log('Updating: ', e);

		if (e.newData.invoiceNo === undefined || e.newData.invoiceNo === null || e.newData.invoiceNo === "") {
			showToast('', 'Please  select invoice.', 'warning');
			e.cancel = true;
		}

		if (!isSet(e.newData, "technicianIds") || e.newData.technicianIds.length === 0) {
			showToast('', 'Please select technician.', 'warning');
			e.cancel = true;
		}
	}

	async function onAppointmentUpdatedAsync(e) {
		await updateScheduleAsync(e.appointmentData);
		showToast('Edited', e.appointmentData.text, 'success');
	}

	async function updateScheduleAsync(params) {
		const editSched = {
			id: params.id,
			subject: params.text,
			utcDateFrom: params.startDate,
			utcDateTo: params.endDate,
			description: (params.description === undefined || params.description === null) ? "" : params.description,
			technicianIds: params.technicianIds,	// array
			invoiceNo: params.invoiceNo,
		};

		if (isSet(params, "allDay"))
			editSched.allDay = params.allDay;
		if (params.recurrenceRule)
			editSched.recurrenceRule = params.recurrenceRule;	// ex. "FREQ=DAILY",

		// console.log('editSched: ', editSched);

		const uriEncoded = uriEncode(editSched);
		const optionHeaders = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncoded,
		};

		return await fetch(`${url}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				return json;
			});
	}


	function onAppointmentDeleting(e) {
		console.log("deleting e: ", e);
		// we can add confirmation here.
	}

	async function onAppointmentDeletedAsync(e) {
		await deleteScheduleAsync(e.appointmentData)
	}

	async function deleteScheduleAsync(params) {
		const uriEncoded = uriEncode({ id: params.id });
		const optionHeaders = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncoded,
		};
		return await fetch(`${url}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				deletedToast(params.text);
				return json;
				//setToastOpen(true);	// to implement html for toast.
			});
	}


	function addedToast(text) {
		showToast('Added new task: ', text, 'success');
	}

	function deletedToast(text) {
		showToast(`Deleted schedule task: `, text, 'success');
	}

	function showToast(event, value, type) {
		notify(`${event} "${value}"`, type, 3000);
	}


	function getWorkOrderById(id) {
		return Query(workOrders).filter(['id', id]).toArray()[0];
	}

	function onAppointmentFormOpening(e) {
		stopTimer();

		let invoiceInfo = getWorkOrderById(e.appointmentData.invoiceNo) || {};
		const { form } = e;

		form.option('items', [
			{
				label: { text: 'Subject' },
				dataField: 'text',
				editorType: 'dxTextBox',
				colSpan: 2,
				isRequired: true,
			},
			{
				dataField: 'description',
				editorType: 'dxTextArea',
				colSpan: 2,
				editorOptions: {
					height: '80px'
				}
			},
			{
				dataField: 'startDate',
				editorType: 'dxDateBox',
				isRequired: true,
				editorOptions: {
					width: '100%',
					type: 'datetime',
				},
			},
			{
				// name: 'endDate',
				dataField: 'endDate',
				editorType: 'dxDateBox',
				isRequired: true,
				editorOptions: {
					width: '100%',
					type: 'datetime',
					// readOnly: true,
				},
			},
			{
				label: { text: 'Work order #', },
				editorType: 'dxSelectBox',
				dataField: 'invoiceNo',
				isRequired: true,
				colSpan: 2,
				editorOptions: {
					width: '100%',
					items: workOrders,
					displayExpr: 'text2',
					valueExpr: 'id',
					searchEnabled: true,
					onValueChanged(args) {
						invoiceInfo = getWorkOrderById(args.value);
						form.updateData('workOrderDetails', (invoiceInfo && invoiceInfo.text) || '');
					},
				},
			},
			{
				label: { text: 'Work order details', },
				name: 'workOrderDetails',
				editorType: 'dxTextArea',
				colSpan: 2,
				editorOptions: {
					value: invoiceInfo.text,
					readOnly: true,
					height: '140px'
				},
			},
			{
				dataField: 'technicianIds',
				label: { text: 'Technicians' },
				editorType: 'dxTagBox',
				isRequired: true,
				editorOptions: {
					items: technicians,
					displayExpr: 'id',
					valueExpr: 'id',
					hint: 'Select 1 or more technicians.',
					searchEnabled: true,
				},
				colSpan: 2,
				width: '50%',
			},
		]);

		e.popup.option('onHiding', function(args) {
			startTimer();
		});
	}


	return (
		<>
			<Scheduler height={700}
				dataSource={scheduleData}
				// dataCellComponent={DataCell}
				// resourceCellComponent={ResourceCell}
				groups={groups}
				defaultCurrentView="Week view"
				defaultCurrentDate={currentDate}
				startDayHour={8}
				endDayHour={18}
				crossScrollingEnabled={true}
				showAllDayPanel={false}
				editing={{allowAdding: true, allowEditing: true}}
				onAppointmentAdded={onAppointmentAddedAsync}
				onAppointmentAdding={onAppointmentAdding}
				onAppointmentUpdating={onAppointmentUpdating}
				onAppointmentUpdated={onAppointmentUpdatedAsync}
				onAppointmentDeleting={onAppointmentDeleting}
				onAppointmentDeleted={onAppointmentDeletedAsync}
				onAppointmentFormOpening={onAppointmentFormOpening}>
				<View
					name="Week"
					type="week"
					groupOrientation="vertical"
					cellDuration={30}
					intervalCount={2}
				/>
				<View
					name="Month"
					type="month"
					groupOrientation="horizontal"
					// cellDuration={30}
					// intervalCount={2}
				/>
				<Resource label="Technicians"
					fieldExpr="technicianIds"
					dataSource={technicians}
					allowMultiple={true}
					displayExpr="id"
				/>
			</Scheduler>
		</>
	);
}

export default memo(Sched);