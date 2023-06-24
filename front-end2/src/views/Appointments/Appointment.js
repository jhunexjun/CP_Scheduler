/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import moment from 'moment';

import 'devextreme/dist/css/dx.light.css';

import { isSet, isSetScalar, isNullOrWhiteSpace } from '../../utils/util';

// import DropDownBox from 'devextreme-react/drop-down-box';
// import DataGrid, { Selection, Paging, FilterRow, Scrolling, } from 'devextreme-react/data-grid';
// import 'whatwg-fetch';

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

  // const [gridBoxValue, setGridBoxValue] = useState([]);
  // const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
  // const gridColumns = ['id', 'custNo', 'billNam', 'text'];

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

      await fetch(`${adminUrl}/schedule?sessionId=${cookies.get('sessionId')}&technicianId=${selectedTechnicianId}`)
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
    //  const tmp = {
    //          id: workOrders.data[x].id.toString(),
    //          text: workOrders.data[x].text,
    //          text2: workOrders.data[x].id.concat(' - ', (workOrders.data[x].billNam === null) ? '' : workOrders.data[x].billNam),
    //          // docId: workOrders.data[x].docId,
    //          custNo: workOrders.data[x].custNo,
    //          billNam: workOrders.data[x].billNam,
    //        }
    //  initWorkOrders.push(tmp);
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
              technicianIds: newArray,  // let's try first 1 technician.
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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="2">
            <Card>
              <CardBody>
                <Button type="success"
                  text={`Update in ${countdown}`}
                  onClick={(e) => updateNow(e)} />
              </CardBody>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <CardBody>
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
              </CardBody>
            </Card>
          </Col>
          <Col md="2">
            <Card>
              <CardBody>
                <Button icon="print"
                  type="success"
                  text="Print"
                  onClick={() => setShowPrintPopup(true)} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <PrintSchedule popupVisible={showPrintPopup}
              setShowPrintPopup={setShowPrintPopup}
              selectedView={selectedView}
              scheduleData={scheduleData}
              currentSchedulerDate={currentSchedulerDate}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Appointment;
