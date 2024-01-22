import { useState, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

import { Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";

import SelectBox from 'devextreme-react/select-box';

import { Button } from 'devextreme-react/button';

import moment from 'moment';
import Datetime from 'react-datetime';  // Don't forget: mport "react-datetime/css/react-datetime.css";

import { PDFViewer } from '@react-pdf/renderer';

// import scheduleDocumentContainer from '../../Appointments/Print/scheduleDocumentContainer';
import Print from './Print';

import { isNullOrWhiteSpace, isSet } from '../../../utils/util';

const EmployeeTimeEntry = () => {
  const cookies = new Cookies();

  const selectedTech = {
    id: 'ALL',
    text: 'All',
    color: '#56ca85',
    avatar: 'coach-man.png',
    age: 0,
    phone1: "",
  };

  const [utcDateFrom, setUtcDateFrom] = useState(moment(new Date()).format('L')); // not actually a utc
  const [utcDateTo, setUtcDateTo] = useState(moment(new Date()).format('L'));
  const [scheduleData, setScheduleData] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [techId] = useState('ALL');
  const [_technicians, setTechnicians] = useState([selectedTech]);
  const [selectBoxTechnicians, setSelectBoxTechnicians] = useState([selectedTech]); // this serves as a master cp.
  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

  const navigate = useNavigate();

  const fetchData = useCallback(async (utcDatFrom, utcDatTo) => {
    let cookie = cookies.get('sessionId');
    if (isNullOrWhiteSpace(cookie)) {
      navigate('/');
      return;
    }

    await fetch(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`)
      .then((res) => res.json())
      .then((technicians) => {
        if (!technicians.hasOwnProperty("error")) {
          appendTechnicians(technicians);
        } else {
          navigate('/');
        }
      });

    // await fetch(`${adminUrl}/workorders?sessionId=${cookies.get('sessionId')}`)
    //   .then((res) => res.json())
    //   .then(fetchedWorkorders => {
    //     if (fetchedWorkorders.status !== 'Error' ) {
    //       appendWorkOrders(fetchedWorkorders);
    //     } else {
    //       navigate('/');
    //     }
    //   });

    // console.log('date', moment(new Date()).format('L'));
    // console.log('utc date', moment.utc(new Date()).format('L'));

    const utc_DatFrom = moment(utcDatFrom).format('L').toString();
    const utc_DatTo = moment(utcDatTo).format('L').toString() + ' 23:59:59';
    await fetch(`${adminUrl}/schedule?sessionId=${cookies.get('sessionId')}&technicianId=${techId}&dateRange=custom&utcDateFrom=${utc_DatFrom}&utcDateTo=${utc_DatTo}`)
      .then((res) => res.json())
      .then(scheds => {
        if (!scheds.data.hasOwnProperty("error")) {
          appendScheds(scheds);
        } else {
          console.log('fetched schedules: ', scheds);
          // navigate('/');
        }
      });
  } ,[]);

  function appendTechnicians(techs) {
    const initTechs = [];

    for(let x = 0; x < techs?.data?.length; x++) {
      let obj = {
        id: techs.data[x].id.toString(),
        text: techs.data[x].text,
        color: '#56ca85',
        avatar: techs.data[x].avatar !== '' ? techs.data[x].avatar : 'coach-man.png',
        age: null,
        phone1: isSet(techs.data[x], "phone1") ?  techs.data[x].phone1.toString() : "",
      }

      initTechs.push(obj);
    }

    setTechnicians(initTechs);
    appendTechniciansForSelectBox(techs)
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

  // function appendWorkOrders(fetchedWorkorders) {
  //   const initWorkOrders2 = fetchedWorkorders.data.reduce((prevValue, curValue) => {
  //     const { id } = curValue;

  //     if (id !== null) {
  //       let obj = prevValue.find(o => o.id === id);

  //       if (obj === undefined) {
  //         let x = {   id: curValue.id,
  //               text: curValue.text,
  //               text2: curValue.id.concat(' ~ ', moment(new Date(curValue.docDate)).format('MM/DD/YYYY'), ' ~ ',
  //                   (curValue.billNam === null) ? '' : curValue.billNam,
  //                   ' (#', curValue.billPhone1 ?? '',') ',
  //                   ' ~ ',
  //                   curValue.plateNo ?? ''),
  //               custNo: curValue.custNo,
  //               billNam: curValue.billNam,
  //               noteDate: curValue.noteDate,
  //               noteUser: curValue.noteUser,
  //               serviceType: curValue.serviceType,
  //               text3: curValue.id.concat(' ~ ',
  //                                         (curValue.billNam === null) ? '' : curValue.billNam,
  //                                         ' ~ ',
  //                                         curValue.plateNo ?? ''),
  //               scheduled: curValue.scheduled
  //             };
  //         prevValue.push(x);
  //       } else {
  //         obj.text += "\n" + curValue.text;
  //       }
  //     }

  //     return prevValue;
  //   }, []);

  //   setWorkOrders(initWorkOrders2);
  // }

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
    setShowPrint(true);
  }

  const printClicked = async () => {
    setShowPrint(false);
    fetchData(utcDateFrom, utcDateTo);
  }


  return (
    <div className="content">
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/admin/reports">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Time Entry</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-start mb-2">
            <Datetime timeFormat={false} onChange={value => { setShowPrint(false); setUtcDateFrom(moment(value).format('L')) }} initialValue={new Date()} />
            <Datetime timeFormat={false} onChange={value => { setShowPrint(false); setUtcDateTo(moment(value).format('L')) }} initialValue={new Date()} />
            <SelectBox
              dataSource={selectBoxTechnicians}
              displayExpr="text"
              searchEnabled={true}
              searchMode="contains"
              searchExpr="text"
              searchTimeout={200}
              minSearchLength={0}
              showDataBeforeSearch={false}
              // onValueChanged={(e) => filterTechnicianByTechnicianId(e.value.id)}
              onValueChanged={() => setShowPrint(false)}
              placeholder="Select technicians"
              defaultValue={selectBoxTechnicians[0]}
            />
            <Button icon="print" type="success" text="OK" className="ms-1" onClick={printClicked} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            showPrint
            ?
            <Card>
              <CardBody>
                <div style={{height: '72vh'}}>
                  <Print
                    // setShowPrintPopup={setShowPrintPopup}
                    selectedView={'custom'}
                    dateFrom={utcDateFrom}
                    dateTo={utcDateTo}
                    scheduleData={scheduleData}
                    currentSchedulerDate={new Date()} // since its custom, you can put any date here.
                    // startTimer={startTimer}
                  />
                </div>
              </CardBody>
            </Card>
            :
            null
          }
        </Col>
      </Row>
    </div>
  )
}

export default EmployeeTimeEntry;