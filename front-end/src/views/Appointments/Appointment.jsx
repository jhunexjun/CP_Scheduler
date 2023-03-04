import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

// import '../../assets/compuTant/themes/custom-styles.scss';

import 'devextreme/dist/css/dx.light.css';

import { isSet, isSetScalar } from '../../utils/util';

// import DropDownBox from 'devextreme-react/drop-down-box';
// import DataGrid, { Selection, Paging, FilterRow, Scrolling, } from 'devextreme-react/data-grid';
// import 'whatwg-fetch';

import Scheduler from '../../components/Schedulers/Scheduler';
// import TagBox from 'devextreme-react/tag-box';
import SelectBox from 'devextreme-react/select-box';


export default () => {

	const [selectedTechnicianId, setSelectedTechnicianId] = useState('ALL');
	const selectedTechnician = {
			id: 'ALL',
			text: 'ALL',
			color: '#56ca85',
			avatar: 'coach-man.png',
			age: 0,
			phone1: "",
		};
	let [_technicians, setTechnicians] = useState([selectedTechnician]);

	let [workOrders, setWorkOrders] = useState([]);
	let [scheduleData, setScheduleData] = useState([]);
	const refreshInMinutes = 1;	// the frequency of refresh
	const [countdown, setCountdown] = useState(refreshInMinutes * 60);
	let [intervalCounter, setIntervalCounter] = useState();

	// const [gridBoxValue, setGridBoxValue] = useState([]);
	// const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
	// const gridColumns = ['id', 'custNo', 'billNam', 'text'];

	const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

	let { sessionId } = useParams();


	const fetchData = useCallback(async () => {
		await fetch(`${adminUrl}/technicians/${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((technicians) => {
				if (!technicians.hasOwnProperty("error"))
					appendTechnicians(technicians);
			});

		await fetch(`${adminUrl}/invoices`)
			.then((res) => {
				return res.json()
			})
			.then((workOrders) => {
				if (!workOrders.hasOwnProperty("error"))
					appendInvoices(workOrders);
			});

	    await fetch(`${adminUrl}/schedule/${sessionId}/${selectedTechnicianId}`)
			.then((res) => {
				return res.json()
			})
			.then((scheds) => {
				if (!scheds.hasOwnProperty("error"))
					appendScheds(scheds);
			});

	} ,[]);

	useEffect(() => {
		if (!isSetScalar(sessionId))
			return;

		fetchData();
	}, []);

	// useEffect(() => {

	// });

	// useEffect(() => {
	// 	let interval = startTimer();
	// 	return () => clearInterval(interval);
	// }, []);

	function appendTechnicians(technicians) {
		const initTechnicians = [];
		initTechnicians.push(_technicians[0]);

		for(let x = 0; x < technicians.data.length; x++) {
			let obj = {
				id: technicians.data[x].id.toString(),
				text: technicians.data[x].text,
				// idText: technicians.data[x].id + '-' + technicians.data[x].text,
				color: '#56ca85',
				avatar: technicians.data[x].avatar !== '' ? technicians.data[x].avatar : 'coach-man.png',
				age: null,
				// discipline: 'ABS, Fitball, StepFit',
				phone1: isSet(technicians.data[x], "phone1") ?  technicians.data[x].phone1.toString() : "",
			}

			initTechnicians.push(obj);
		}

		setTechnicians(initTechnicians);
	}

	function appendInvoices(workOrders) {
		// const initWorkOrders = [];


		const initWorkOrders2 = workOrders.data.reduce((previousValue, currentValue) => {
			const { id } = currentValue;

			if (id != null) {
				let obj = previousValue.find(o => o.id === id);

				if (obj === undefined) {
					let x = { 	id: currentValue.id,
								text: currentValue.text,
								text2: currentValue.id.concat(' - ', (currentValue.billNam === null) ? '' : currentValue.billNam),
								custNo: currentValue.custNo,
								billNam: currentValue.billNam
							};
					previousValue.push(x);
				} else {
					obj.text += "\n" + currentValue.text;
				}
			}

			return previousValue;
		}, []);

		setWorkOrders(initWorkOrders2);

		// for(let x = 0; x < workOrders.data.length; x++) {
		// 	const tmp = {
		// 					id: workOrders.data[x].id.toString(),
		// 					text: workOrders.data[x].text,
		// 					text2: workOrders.data[x].id.concat(' - ', (workOrders.data[x].billNam === null) ? '' : workOrders.data[x].billNam),
		// 					// docId: workOrders.data[x].docId,
		// 					custNo: workOrders.data[x].custNo,
		// 					billNam: workOrders.data[x].billNam,
		// 				}
		// 	initWorkOrders.push(tmp);
		// }
		// setWorkOrders(initWorkOrders);
		// console.log("workOrders: ", workOrders);
	}

	function appendScheds(scheds) {
		const initScheduleData = [];

		for(let x = 0; x < scheds.data.length; x++) {
			// Note: scheds.data[x].technicians is an array.
			// From array of integer to array of string.
			const string = scheds.data[x].technicianIds.toString();
			const newArray = string.split(',');

			const tmp = {
							id: scheds.data[x].id,
							startDate: scheds.data[x].utcDateFrom,
							endDate: scheds.data[x].utcDateTo,
							text: scheds.data[x].subject,
							description: scheds.data[x].description,
							technicianIds: newArray,	// let's try first 1 technician.
							invoiceNo: scheds.data[x].invoiceNo === null ? '' : scheds.data[x].invoiceNo,
							allDay: scheds.data[x].allDay === 'Y' ? true : false,
							recurrenceRule: scheds.data[x].recurrenceRule,
						}
			initScheduleData.push(tmp);
		}

		setScheduleData(initScheduleData);
	}

	const stopTimer = useCallback(() => {
		clearInterval(intervalCounter);
	}, [intervalCounter]);

	const startTimer = useCallback(() => {
		let interval = setInterval(() => {
			setCountdown((countdown) => {
				if (countdown <= 0) {
					fetchData();
					return refreshInMinutes * 60;
				} else {
					return countdown - 1;
				}

			});
		}, 1000);

		setIntervalCounter(interval);
		return interval;
	}, [])


	// function dataGridRender() {
	// 	return (
	// 		<DataGrid dataSource={workOrders}
	// 			columns={gridColumns}
	// 			hoverStateEnabled={true}
	// 			selectedRowKeys={gridBoxValue}
	// 			onSelectionChanged={dataGridOnSelectionChanged}
	// 			height="100%">
	// 			<Selection mode="single" />
	// 			<Scrolling mode="virtual" />
	// 			<Paging enabled={true} pageSize={10} />
	// 			<FilterRow visible={true} />
	// 		</DataGrid>
	// 	);
	// }

	// function syncDataGridSelection(e) {
	// 	// console.log(e.value);
	// 	setGridBoxValue(e.value);
	// }

	// function dataGridOnSelectionChanged(e) {
	// 	setGridBoxValue(e.selectedRowKeys);
	// 	setIsGridBoxOpened(false);
	// }

	// function gridBoxDisplayExpr(item) {
	// 	// console.log("gridBoxDisplayExpr: ", item);
	// 	return item && `${item.id}`;
	// }

	// function onGridBoxOpened(e) {
	// 	if (e.name === 'opened') {
	// 		setIsGridBoxOpened(e.value);
	// 	}
	// }

	function refreshData() {

	}

	function updateNow(e) {
		e.preventDefault();
		refreshData();
	}

	function techniciansOnValueChanged(e) {
		console.log("onValueChanged: ", e);
		//setSelectedTechnicianId(e.value[0]);
	}

    return (
    	<div className="content">
			<div className="row">
				{/*<div className="col-2">
					<div className="cpt-update-box">
						<span className="float-left"><Link to="" className="showDetails" onClick={(e) => updateNow(e)}>Update Now</Link></span>
						<span className="float-end">{ countdown }</span>
					</div>
				</div>*/}
				<div className="col-3">
					{/*<TagBox dataSource={technicians}
						displayExpr="text"
						valueExpr="id"
						searchEnabled={true}
						hint={'Select 1 or more technicians.'}
						placeholder="Technician(s)"
						maxDisplayedTags={3}
						showMultiTagOnly={false}
						onValueChanged={(e) => techniciansOnValueChanged(e)}
					/>*/}
					<SelectBox dataSource={_technicians}
						displayExpr="text"
						searchEnabled={true}
						searchMode="contains"
						searchExpr="text"
						searchTimeout={200}
						minSearchLength={0}
						showDataBeforeSearch={false}
						onValueChanged={(e) => techniciansOnValueChanged(e)}
						placeholder="Select technicians"
						defaultValue={_technicians[0]}
					/>
				</div>
			</div>

    		<div className="row">
    			<div id="dx-viewport scheduler">
					<Scheduler scheduleData={scheduleData}
						technicians={_technicians}
						workOrders={workOrders}
						stopTimer={stopTimer}
						startTimer={startTimer}
					/>
				</div>
    		</div>			
		</div>
    );
}