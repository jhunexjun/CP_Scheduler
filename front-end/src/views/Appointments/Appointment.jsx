import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";

import moment from 'moment';

import 'devextreme/dist/css/dx.light.css';

// import './appointment.css';

import { isSet, isSetScalar, isNullOrWhiteSpace } from '../../utils/util';

import Scheduler from '../../components/Schedulers/Scheduler';
import SelectBox from 'devextreme-react/select-box';
import { Button } from 'devextreme-react/button';

import PrintSchedule from './PrintSchedule';

function Appointment() {
  const [selectedTechnicianId] = useState('ALL');
  const selectedTechnician = {
      id: 'ALL',
      text: 'ALL',
      color: '#56ca85',
      avatar: 'coach-man.png',
      age: 0,
      phone1: "",
    };
  let [selectBoxTechnicians, setSelectBoxTechnicians] = useState([selectedTechnician]); // this serves as a master cp.
  let [_technicians, setTechnicians] = useState([selectedTechnician]);

  let [workOrders, setWorkOrders] = useState([]);
  let [scheduleData, setScheduleData] = useState([]);
  const refreshInMinutes = 1; // the frequency of refresh
  const [countdown, setCountdown] = useState(refreshInMinutes * 60);
  let [intervalCounter, setIntervalCounter] = useState();
  const [showPrintPopup, setShowPrintPopup] = useState(false);
  const [selectedView, setSelectedView] = useState('Day');  // Day or Week or Month.
  let [currentSchedulerDate, setCurrentSchedulerDate] = useState(new Date());

  const cookies = new Cookies();

  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    let cookie = cookies.get('sessionId');
    if (isNullOrWhiteSpace(cookie)) {
      navigate('/');
      return;
    }

    await fetch(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`)
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

    await fetch(`${adminUrl}/workorders?sessionId=${cookies.get('sessionId')}`)
      .then((res) => res.json())
      .then((fetchedWorkorders) => {
        if (fetchedWorkorders.status !== 'Error' ) {
          appendWorkOrders(fetchedWorkorders);
        } else {
          navigate('/');
        }
      });

      await fetch(`${adminUrl}/schedule?sessionId=${cookies.get('sessionId')}&technicianId=${selectedTechnicianId}&dateRange=All`)
      .then((res) => res.json())
      .then((scheds) => {
        if (!scheds.data.hasOwnProperty("error")) {
          appendScheds(scheds);
        } else {
          // console.log('fetch schedules: ', scheds);
          navigate('/');
        }
      });
  } ,[]);

  useEffect(() => {
    if (!isSetScalar(cookies.get('sessionId')))
      return;

    fetchData();
  }, []);

  useEffect(() => {
    let interval = startTimer();
    return () => clearInterval(interval);
  }, []);

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

  function appendTechnicians(technicians) {
    const initTechnicians = [];

    for(let x = 0; x < technicians?.data?.length; x++) {
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

  function appendWorkOrders(fetchedWorkorders) {
    const initWorkOrders2 = fetchedWorkorders.data.reduce((prevValue, curValue) => {
      const { id } = curValue;

      if (id !== null) {
        let obj = prevValue.find(o => o.id === id);

        if (obj === undefined) {
          let x = {   id: curValue.id,
                text: curValue.text,
                text2: curValue.id.concat(' ~ ', moment(new Date(curValue.docDate)).format('MM/DD/YYYY'), ' ~ ',
                    (curValue.billNam === null) ? '' : curValue.billNam,
                    ' (#', curValue.billPhone1 ?? '',') ',
                    ' ~ ',
                    curValue.plateNo ?? ''),
                custNo: curValue.custNo,
                billNam: curValue.billNam,
                noteDate: curValue.noteDate,
                noteUser: curValue.noteUser,
                serviceType: curValue.serviceType,
                text3: curValue.id.concat(' ~ ',
                                          (curValue.billNam === null) ? '' : curValue.billNam,
                                          ' ~ ',
                                          curValue.plateNo ?? ''),
                scheduled: curValue.scheduled
              };
          prevValue.push(x);
        } else {
          obj.text += "\n" + curValue.text;
        }
      }

      return prevValue;
    }, []);

    setWorkOrders(initWorkOrders2);
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
              technicianIds: newArray,  // let's try first 1 technician.
              invoiceNo: scheds.data[x].invoiceNo === null ? '' : scheds.data[x].invoiceNo,
              allDay: scheds.data[x].allDay === 'Y' ? true : false,
              recurrenceRule: scheds.data[x].recurrenceRule,
              createdBy: scheds.data[x].createdBy,
            }
      initScheduleData.push(tmp);
    }

    setScheduleData(initScheduleData);
  }

  function updateNow(e) {
    e.event.preventDefault();
    fetchData();
    setCountdown(refreshInMinutes * 60);
  }

  // function techniciansOnValueChanged(e) {
  //   filterTechnicianByTechnicianId(e.value.id);
  // }

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

  function getSDate() {
		if (selectedView.toLowerCase() === 'day') {
			return moment(currentSchedulerDate).format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.
			return moment(currentSchedulerDate).subtract(dayNumOfWeek, 'days').format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'month') {
			return moment().startOf('month').format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'custom') {
			// // This relies on the sorting on desc order.
			// return moment(scheduleData[scheduleData.length - 1].startDate).format('MM/DD/YYYY');
      return 'Unknown';
		} else {
			return 'Unknown';
		}
	}

  function getEDate() {
		if (selectedView.toLowerCase() === 'day') {
			return moment(currentSchedulerDate).format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.

			// return moment(currentSchedulerDate).add((6 - dayNumOfWeek) + dayNumOfWeek, 'days').format('MM/DD/YYYY');
			return moment(currentSchedulerDate).add((6 - dayNumOfWeek), 'days').format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'month') {
			return moment().endOf('month').format('MM/DD/YYYY');
		} else if (selectedView.toLowerCase() === 'custom') {
			// // This relies on the sorting on desc order.
			// return moment(scheduleData[scheduleData.length - 1].startDate).format('MM/DD/YYYY');
      return 'Unknown';
		} else {
			return 'Unknown';
		}
	}

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <div className="d-flex flex-sm-row flex-column align-items-center">
              <div className="p-2">
                Technician
              </div>
              <div className="p-2 mr-auto">
                <SelectBox dataSource={selectBoxTechnicians}
                  displayExpr="text"
                  searchEnabled={true}
                  searchMode="contains"
                  searchExpr="text"
                  searchTimeout={200}
                  minSearchLength={0}
                  showDataBeforeSearch={false}
                  onValueChanged={(e) => filterTechnicianByTechnicianId(e.value.id)}
                  placeholder="Select technicians"
                  defaultValue={selectBoxTechnicians[0]}
                />
              </div>
              <div className="p-2">
                <Button icon="print"
                  type="success"
                  text="Print"
                  onClick={ () => { stopTimer(); setShowPrintPopup(true); } }
                />
              </div>
              <div className="pl-4 p-2">
                <Button type="success"
                  text={`Update in ${countdown}`}
                  onClick={(e) => updateNow(e)}
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="10">
            <Card>
              <CardBody>
                <Scheduler scheduleData={scheduleData}
                  technicians={_technicians}
                  workorders={workOrders}
                  stopTimer={stopTimer}
                  startTimer={startTimer}
                  techniciansMaster={selectBoxTechnicians}
                  setScheduleData={setScheduleData}
                  setSelectedView={setSelectedView}
                  setCurrentSchedulerDate={setCurrentSchedulerDate}
                  // filterWorkorders={filterWorkorders}
                  // setWorkOrders={setWorkOrders}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <PrintSchedule
              popupVisible={showPrintPopup}
              setShowPrintPopup={setShowPrintPopup}
              selectedView={selectedView}
              dateFrom={getSDate()}
              dateTo={getEDate()}
              scheduleData={scheduleData}
              currentSchedulerDate={currentSchedulerDate}
              startTimer={startTimer}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Appointment;
