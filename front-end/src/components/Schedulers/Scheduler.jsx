import { memo, useContext, /** useState, useEffect, useCallback */ } from 'react';

import Scheduler, { Resource, View } from 'devextreme-react/scheduler';
import Query from 'devextreme/data/query';
import notify from 'devextreme/ui/notify';

import Cookies from 'universal-cookie';

import { uriEncode, isSet } from '../../utils/util';

import { SystemUserContext } from '../../Context/SystemUserContext';

import { filters } from './schedulerData';

import './custom.css';
import './styles.css';

import Field from "./Field";
import itemTemplate from './Item';

import ResourceCell from './ResourceCell';


const Sched = ({
				scheduleData,
				technicians,
				workorders,
				stopTimer,
				startTimer,
				techniciansMaster,
				setScheduleData,
				selectedView,
				setSelectedView,
				setCurrentSchedulerDate,
				// filterWorkorders
				// setWorkOrders
			}) => {
	const groups = ['technicianIds'];

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

	const cookies = new Cookies();
	const url = process.env.REACT_APP_API_DOMAIN + `/admin/schedule?sessionId=${cookies.get('sessionId')}`;

	const sysUserContext = useContext(SystemUserContext);


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
			showToast('', 'Please select invoice.', 'warning');
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
			.then(res => res.json())
			.then(json => {
				const newScheduleData = [...scheduleData];
				newScheduleData[newScheduleData.length - 1].id = json.data.id;
				newScheduleData[newScheduleData.length - 1].startDate = addSched.utcDateFrom;
				newScheduleData[newScheduleData.length - 1].endDate = addSched.utcDateTo;
				newScheduleData[newScheduleData.length - 1].text = addSched.subject;
				newScheduleData[newScheduleData.length - 1].description = addSched.description;
				newScheduleData[newScheduleData.length - 1].technicianIds = addSched.technicianIds;
				newScheduleData[newScheduleData.length - 1].invoiceNo = addSched.invoiceNo;

				if (params.allDay)
					newScheduleData[newScheduleData.length - 1].allDay = true;
				if (params.recurrenceRule)
					newScheduleData[newScheduleData.length - 1].recurrenceRule = params.recurrenceRule

				newScheduleData[newScheduleData.length - 1].createdBy = sysUserContext.user.id;

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
		return Query(workorders).filter(['id', id]).toArray()[0];
	}

	async function fetchAppointmentByWorkorderNo(workorderNo) {
		const url = process.env.REACT_APP_API_DOMAIN + `/admin/workordersByworkorderNo?sessionId=${cookies.get('sessionId')}&workorderNo=${workorderNo}`;

		const data = (await fetch(url).then(res => res.json())).data;
		return data.map(val => val.description + '\n\n');
	}

	function dateIsValid(dateString) {
		if (isNaN(Date.parse(dateString)))
			return false;
		else
			return true;
	}

	function getWorkordersByScheduled(filter) {
		if (filter.value === 0)
			return workorders;
		else if (filter.value === 1)	// unscheduled
			return Query(workorders).filter(['scheduled', 'N']).toArray();
		else if (filter.value === 2)	// scheduled
			return Query(workorders).filter(['scheduled', 'Y']).toArray();
		else
			return workorders;
	}

	function onAppointmentFormOpening(e) {
		stopTimer();

		let invoiceInfo = getWorkOrderById(e.appointmentData.invoiceNo) || {};
		const { form } = e;

		const editing = e.appointmentData.text ? true : false;

		form.option('items', [
			{
				label: { text: 'Filter by' },
				name: 'schedFilter',
				editorType: 'dxSelectBox',
				colSpan: 2,
				editorOptions: {
					width: '100%',
					items: filters,
					displayExpr: 'text',
					valueExpr: 'id',
					value: editing ? filters[2].id : filters[1].id,
				},
			},
			{
				label: { text: 'Workorder #', },
				name: 'workorderNoForm',
				editorType: 'dxSelectBox',
				dataField: 'invoiceNo',
				isRequired: true,
				colSpan: 2,
				editorOptions: {
					width: '100%',
					items: getWorkordersByScheduled({value: editing ? 2 : 1}),	// 0=All, 1=Unscheduled, 2=scheduled;
					displayExpr: 'text2',
					valueExpr: 'id',
					searchEnabled: true,
					itemTemplate,
					async onValueChanged(args) {
						let workorder = getWorkOrderById(args.value);

						if (isSet(workorder, "noteDate") && dateIsValid(workorder.noteDate)) {
							form.updateData('noteDate', new Date(workorder.noteDate).toLocaleDateString('en-US'));
						} else {
							form.updateData('noteDate', '');
						}

						form.updateData('subject', (workorder && workorder.text3) || '');
						form.updateData('workOrderDetails', (workorder && workorder.text) || '');
						form.updateData('noteUser', (workorder && workorder.noteUser) || '');

						const descr = await fetchAppointmentByWorkorderNo(workorder.id);
						form.updateData('description', descr);
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
				label: { text: 'Workorder details', },
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
				label: { text: 'Subject' },
				name: 'subject',	// 'name' is being used by Workorder # onValueChanged() form.updateData('subject', (invoice && invoice.serviceType) || '');
				dataField: 'text',
				editorType: 'dxTextBox',
				colSpan: 2,
				isRequired: true,
			},
			{
				label: { text: 'Tasks' },
				dataField: 'description',
				editorType: 'dxTextArea',
				colSpan: 2,
				editorOptions: {
					height: '140px'
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

		form.getEditor('schedFilter')
			.option('onValueChanged', (args) => {
				let wo = getWorkordersByScheduled(args);
				form.getEditor('workorderNoForm').option('items', wo);
			});

		// The following is private API of <Scheduler>.
		// Intends to override. Instead of 00, 01, 02... it becomes 00, 05, 10.. or 00, 55, 50...
    const startDate = form.getEditor('startDate');
		startDate.option('onOpened', (e) => {
			const minuteBox = e.component._strategy._timeView._minuteBox;
			minuteBox.option('step', 5);
			const defaultHandler = minuteBox.option('onValueChanged');
			minuteBox.option('onValueChanged', (args) => {
				if (args.value === -1) {
					args.value = 55;
				}
				defaultHandler(args);
			});
		});

	  const endDate = form.getEditor('endDate');
    endDate.option('onOpened', (e) => {
    	const minuteBox = e.component._strategy._timeView._minuteBox;
			minuteBox.option('step', 5);
			const defaultHandler = minuteBox.option('onValueChanged');
			minuteBox.option('onValueChanged', (args) => {
				if (args.value === -1) {
					args.value = 55;
				}
				defaultHandler(args);
			});
    });
    // End 'Intends to override'.

		e.popup.option('showTitle', true);
		e.popup.option('title', e.appointmentData.text ? e.appointmentData.text : 'Create a new appointment');

		requestAnimationFrame(() => {
		  e.popup.option("width", 950);
		  e.popup.option("height", 700);
		});

		e.popup.option('onHiding', function() {	// with args.
			startTimer();
		});
	}

	const handlePropertyChange = (e) => {
		if (e.name === 'currentView') {
			setSelectedView(e.value);
		}

		if (e.name === 'currentDate') {
			setCurrentSchedulerDate(e.value);
		}
	}

	return (
		<>
			<Scheduler height="74vh"
				dataSource={scheduleData}
				// dataCellComponent={DataCell}
				resourceCellComponent={(e) =>  ResourceCell(e, selectedView)}
				groups={groups}
				defaultCurrentView="day"
				defaultCurrentDate={new Date()}
				startDayHour={parseInt(process.env.REACT_APP_START_DAY_HOUR) ?? 8}
				endDayHour={parseInt(process.env.REACT_APP_END_DAY_HOUR) ?? 18}
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