import { memo } from 'react';
import { useParams } from 'react-router-dom';

import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

import { uriEncode, isSet } from '../../utils/util';


const Sched = ({
				scheduleData,
				technicians,
				workOrders,
				stopTimer,
				startTimer,
				techniciansMaster,
				setScheduleData,
				setSelectedView,
				setCurrentSchedulerDate,
			}) => {
	const groups = ['technicianIds'];
	// const [popupVisible, setPopupVisible] = useState(false);

	let techs = [], techs2 = [];

	if (technicians !== undefined && technicians.length > 0) {
		techs = JSON.parse(JSON.stringify(technicians));
		if (techs !== undefined && techs.length > 0 && techs[0].id === 'ALL') {
			techs.shift();
		}
	}

	if (techniciansMaster !== undefined && techniciansMaster.length > 0) {
		techs2 = JSON.parse(JSON.stringify(techniciansMaster));
		if (techs2 !== undefined && techs2.length > 0 && techs2[0].id === 'ALL') {
			techs2.shift();
		}
	}

	let { sessionId } = useParams();
	// let robot = 'N';
	const url = process.env.REACT_APP_API_DOMAIN + `/admin/schedule?sessionId=${sessionId}`;


	function datesAreValid(e, startDt, endDt) {
		if (startDt.getYear() !== endDt.getYear()) {
			showToast('', 'Cannot schedule with different years.', 'warning');
			e.cancel = true;
			return;
		}

		if (startDt.getMonth() !== endDt.getMonth()) {
			showToast('', 'Cannot schedule with different months.', 'warning');
			e.cancel = true;
			return;
		}

		if (startDt.getDay() !== endDt.getDay()) {
			showToast('', 'Cannot schedule with different days.', 'warning');
			e.cancel = true;
			return;
		}

		// verify the hours.
	}


	function onAppointmentAdding(e) {
		if (e.appointmentData.invoiceNo === undefined || e.appointmentData.invoiceNo === null || e.appointmentData.invoiceNo === "") {
			showToast('', 'Please  select invoice.', 'warning');
			e.cancel = true;
		}

		if (!isSet(e.appointmentData, "technicianIds") || e.appointmentData.technicianIds.length === 0) {
			showToast('', 'Please select technician.', 'warning');
			e.cancel = true;
		}

		datesAreValid(e, new Date(e.appointmentData.startDate), new Date(e.appointmentData.endDate));
	}

	async function onAppointmentAddedAsync(e) {
		await addScheduleAsync(e.appointmentData);
	}

	async function addScheduleAsync(params) {	// params = e.appointmentData
		const addSched = {
			// subject: params.subject,
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

				const newScheduleData = [...scheduleData];
				newScheduleData[newScheduleData.length - 1].id = json.data.id;
				setScheduleData(newScheduleData);
				addedToast(params.text);
				return json;
			});
	}


	function onAppointmentUpdating(e) {
		if (e.newData.invoiceNo === undefined || e.newData.invoiceNo === null || e.newData.invoiceNo === "") {
			showToast('', 'Please  select invoice.', 'warning');
			e.cancel = true;
		}

		if (!isSet(e.newData, "technicianIds") || e.newData.technicianIds.length === 0) {
			showToast('', 'Please select technician.', 'warning');
			e.cancel = true;
		}

		datesAreValid(e, new Date(e.newData.startDate), new Date(e.newData.endDate));

	}

	async function onAppointmentUpdatedAsync(e) {
		await updateScheduleAsync(e.appointmentData);
		showToast('Edited', e.appointmentData.text, 'success');
	}

	async function updateScheduleAsync(params) {
		const editSched = {
			id: params.id,
			// subject: params.subject,
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
		// console.log("deleting e: ", e);
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

	function dateIsValid(dateString) {
		if (isNaN(Date.parse(dateString)))
			return false;
		else
			return true;
	}

	function onAppointmentFormOpening(e) {
		stopTimer();

		let invoiceInfo = getWorkOrderById(e.appointmentData.invoiceNo) || {};
		const { form } = e;

		form.option('items', [
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
						let invoice = getWorkOrderById(args.value);

						if (isSet(invoice, "noteDate") && dateIsValid(invoice.noteDate)) {
							form.updateData('noteDate', new Date(invoice.noteDate).toLocaleDateString('en-US'));
						} else {
							form.updateData('noteDate', '');
						}

						form.updateData('subject', (invoice && invoice.serviceType) || '');
						form.updateData('workOrderDetails', (invoice && invoice.text) || '');
						form.updateData('noteUser', (invoice && invoice.noteUser) || '');
					},
				},
			},
			{
				label: { text: 'Note Date' },
				name: 'noteDate',
				editorType: 'dxTextBox',
				editorOptions: {
					value: isSet(invoiceInfo, "noteDate") && dateIsValid(invoiceInfo.noteDate)
							? new Date(invoiceInfo.noteDate).toLocaleDateString('en-US')
							: '' ,
					readOnly: true,
				},
			},
			{
				label: { text: 'User' },
				name: 'noteUser',
				editorType: 'dxTextBox',
				editorOptions: {
					value: invoiceInfo.noteUser,
					readOnly: true,
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
			// {
			// 	label: { text: 'Subject' },
			// 	name: 'subject',
			// 	// dataField: 'serviceType',
			// 	// dataField: 'subject',
			// 	editorType: 'dxTextBox',
			// 	colSpan: 2,
			// 	isRequired: true,
			// 	editorOptions: {
			// 		value: invoiceInfo.subject,
			// 	}
			// },
			{
				label: { text: 'Subject' },
				name: 'subject',	// 'name' is being used by Work Order # onValueChanged() form.updateData('subject', (invoice && invoice.serviceType) || '');
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
				dataField: 'technicianIds',
				label: { text: 'Technicians' },
				editorType: 'dxTagBox',
				isRequired: true,
				editorOptions: {
					items: techs2,
					displayExpr: 'id',
					valueExpr: 'id',
					hint: 'Select 1 or more technicians.',
					searchEnabled: true,
				},
				colSpan: 2,
				//width: '50%',
			},
		]);

		// e.popup.option('container', undefined);
		// e.popup.option('width', '150vw');

		// e.popup.option('showTitle', true);
		// e.popup.option('title', e.appointmentData.text ? e.appointmentData.text : 'Create a new appointment');

		e.popup.option('onHiding', function() {	// with args.
			startTimer();
		});
	}

	const handlePropertyChange = (e) => {
		// console.log('e: ', e);
		if (e.name === 'currentView') {
			setSelectedView(e.value);
		}

		if (e.name === 'currentDate') {
			console.log('currentDate: ', e);
			setCurrentSchedulerDate(e.value);
		}
	}

	return (
		<>
			<Scheduler height={695}
				dataSource={scheduleData}
				// dataCellComponent={DataCell}
				// resourceCellComponent={ResourceCell}
				groups={groups}
				defaultCurrentView="day"
				defaultCurrentDate={new Date()}
				startDayHour={8}
				endDayHour={18}
				crossScrollingEnabled={true}
				showAllDayPanel={true}
				editing={{allowAdding: true, allowEditing: true}}
				onAppointmentAdded={onAppointmentAddedAsync}
				onAppointmentAdding={onAppointmentAdding}
				onAppointmentUpdating={onAppointmentUpdating}
				onAppointmentUpdated={onAppointmentUpdatedAsync}
				onAppointmentDeleting={onAppointmentDeleting}
				onAppointmentDeleted={onAppointmentDeletedAsync}
				onAppointmentFormOpening={onAppointmentFormOpening}
				onOptionChanged={handlePropertyChange}>
				<View
					name="Day"
					type="day"
					groupOrientation="vertical"
					cellDuration={30}
				/>
				<View
					name="Week"
					type="week"
					groupOrientation="vertical"
					cellDuration={30}
					intervalCount={1}
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
					dataSource={techs}
					allowMultiple={true}
					displayExpr="id"
				/>
			</Scheduler>
		</>
	);
}

export default memo(Sched);