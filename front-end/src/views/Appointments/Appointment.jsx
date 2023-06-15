import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// import '../../assets/compuTant/themes/custom-styles.scss';

import 'devextreme/dist/css/dx.light.css';

import { isSet, isSetScalar } from '../../utils/util';

// import DropDownBox from 'devextreme-react/drop-down-box';
// import DataGrid, { Selection, Paging, FilterRow, Scrolling, } from 'devextreme-react/data-grid';
// import 'whatwg-fetch';

import Scheduler from '../../components/Schedulers/Scheduler';
import SelectBox from 'devextreme-react/select-box';
import { Button } from 'devextreme-react/button';

import PrintSchedule from './PrintSchedule';

const Appointment = () => {
	const [selectedTechnicianId] = useState('ALL');
	const selectedTechnician = {
			id: 'ALL',
			text: 'ALL',
			color: '#56ca85',
			avatar: 'coach-man.png',
			age: 0,
			phone1: "",
		};
	let [selectBoxTechnicians, setSelectBoxTechnicians] = useState([selectedTechnician]);	// this serves as a master cp.
	let [_technicians, setTechnicians] = useState([selectedTechnician]);

	let [workOrders, setWorkOrders] = useState([]);
	let [scheduleData, setScheduleData] = useState([]);
	const refreshInMinutes = 1;	// the frequency of refresh
	const [countdown, setCountdown] = useState(refreshInMinutes * 60);
	let [intervalCounter, setIntervalCounter] = useState();
	const [showPrintPopup, setShowPrintPopup] = useState(false);
	const [selectedView, setSelectedView] = useState('Day');	// Day or Week or Month.
	let [currentSchedulerDate, setCurrentSchedulerDate] = useState(new Date());

	// const [gridBoxValue, setGridBoxValue] = useState([]);
	// const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
	// const gridColumns = ['id', 'custNo', 'billNam', 'text'];

	const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

	const { sessionId } = useParams();
	const navigate = useNavigate();
	// Note: in the future we have to change the way sessionId is being concatenated in the url, better to use the ?

	const fetchData = useCallback(async () => {
		await fetch(`${adminUrl}/technicians?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((technicians) => {
				if (!technicians.hasOwnProperty("error")) {
					appendTechnicians(technicians);
				} else {
					navigate('/');
				}
			});

		await fetch(`${adminUrl}/workorders?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((workOrders) => {
				if (workOrders.status !== 'Error' ) {
					appendWorkOrders(workOrders);
				} else {
					// console.log(workOrders);
					navigate('/');
				}
			});

	    await fetch(`${adminUrl}/schedule?sessionId=${sessionId}&technicianId=${selectedTechnicianId}`)
			.then((res) => {
				return res.json()
			})
			.then((scheds) => {
				if (!scheds.hasOwnProperty("error")) {
					appendScheds(scheds);
				} else {
					// console.log('fetch schedules: ', scheds);
					navigate('/');
				}
			});

	} ,[]);

	useEffect(() => {
		if (!isSetScalar(sessionId))
			return;

		fetchData();
	}, []);

	useEffect(() => {
		let interval = startTimer();
		return () => clearInterval(interval);
	}, []);


	function appendTechnicians(technicians) {
		const initTechnicians = [];
		//initTechnicians.push(_technicians[0]);

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
		appendTechniciansForSelectBox(technicians)
	}

	function appendTechniciansForSelectBox(technicians) {
		const initTechnicians = [];
		initTechnicians.push(selectBoxTechnicians[0]);

		for(let x = 0; x < technicians.data.length; x++) {
			let obj = {
				id: technicians.data[x].id.toString(),
				text: technicians.data[x].text,
				color: '#56ca85',
				avatar: technicians.data[x].avatar !== '' ? technicians.data[x].avatar : 'coach-man.png',
				age: null,
				phone1: isSet(technicians.data[x], "phone1") ?  technicians.data[x].phone1.toString() : "",
			}

			initTechnicians.push(obj);
		}

		setSelectBoxTechnicians(initTechnicians);
	}

	function appendWorkOrders(workOrders) {
		// const initWorkOrders = [];

		const initWorkOrders2 = workOrders.data.reduce((prevValue, curValue) => {
			const { id } = curValue;

			if (id !== null) {
				let obj = prevValue.find(o => o.id === id);

				if (obj === undefined) {
					let x = { 	id: curValue.id,
								text: curValue.text,
								text2: curValue.id.concat(' ~ ',
										(curValue.billNam === null) ? '' : curValue.billNam,
										' (Tel#', curValue.billPhone1 ?? '',') ',
										' ~ ',
										curValue.plateNo ?? ''),
								custNo: curValue.custNo,
								billNam: curValue.billNam,
								noteDate: curValue.noteDate,
								noteUser: curValue.noteUser,
								serviceType: curValue.serviceType
							};
					prevValue.push(x);
				} else {
					obj.text += "\n" + curValue.text;
				}
			}

			return prevValue;
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
							createdBy: scheds.data[x].createdBy,
						}
			initScheduleData.push(tmp);
		}

		setScheduleData(initScheduleData);
		// scheduleDataMasterCopy = JSON.parse(JSON.stringify(initScheduleData));
		// console.log("scheduleDataMasterCopy: ", scheduleDataMasterCopy);
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

	function updateNow(e) {
		e.event.preventDefault();
		fetchData();
		setCountdown(refreshInMinutes * 60);
	}

	function techniciansOnValueChanged(e) {
		filterTechnicianByTechnicianId(e.value.id);
	}

	function filterTechnicianByTechnicianId(technicianId) {
		let techs = [...selectBoxTechnicians];

		if (technicianId === "ALL") {
			setTechnicians(techs);
			return;
		}

		for(let x = 0; x < techs.length; x++) {
			if (techs[x].id !== technicianId) {
				techs.splice(x, 1);
				x--
			}
		}
		setTechnicians(techs);
	}

	// function showPrintPopup(value) {
	// 	setshowPrintPopup(value);
	// }

    return (
    	<div className="content">
			<div className="row">
				<div className="col-2">
					{/*<div className="cpt-update-box">
						<span className="float-left"><Link to="" className="showDetails" onClick={(e) => updateNow(e)}>Update Now</Link></span>
						<span className="float-end" title="Time before it updates data">{ countdown }</span>
					</div>*/}
					<Button type="success"
							text={`Update in ${countdown}`}
							onClick={(e) => updateNow(e)} />
				</div>
				<div className="col-3">
					<div className="ms-0XXXX">
						<div className="dx-field">
							<div className="dx-field-label">Technician</div>
							<div className="dx-field-value">
								<SelectBox dataSource={selectBoxTechnicians}
									displayExpr="text"
									searchEnabled={true}
									searchMode="contains"
									searchExpr="text"
									searchTimeout={200}
									minSearchLength={0}
									showDataBeforeSearch={false}
									onValueChanged={(e) => techniciansOnValueChanged(e)}
									placeholder="Select technicians"
									defaultValue={selectBoxTechnicians[0]}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-3">
					<div className="ms-5">
						<Button icon="print"
							type="success"
							text="Print"
							onClick={() => setShowPrintPopup(true)} />
					</div>
				</div>
			</div>
			<div className="row mt-2">
				<div className="col">
					<div id="dx-viewport scheduler">
						<Scheduler scheduleData={scheduleData}
							technicians={_technicians}
							workOrders={workOrders}
							stopTimer={stopTimer}
							startTimer={startTimer}
							techniciansMaster={selectBoxTechnicians}
							setScheduleData={setScheduleData}
							setSelectedView={setSelectedView}
							setCurrentSchedulerDate={setCurrentSchedulerDate}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<PrintSchedule popupVisible={showPrintPopup}
						setShowPrintPopup={setShowPrintPopup}
						selectedView={selectedView}
						scheduleData={scheduleData}
						currentSchedulerDate={currentSchedulerDate} />
				</div>
			</div>
		</div>
    );
}

export default Appointment;