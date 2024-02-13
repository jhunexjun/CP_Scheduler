import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

import { Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";

import SelectBox from 'devextreme-react/select-box';

import { Button } from 'devextreme-react/button';

// import ArrayStore from 'devextreme/data/array_store';
import TagBox /*, { TagBoxTypes } */ from 'devextreme-react/tag-box';
// import DataSource from 'devextreme/data/data_source';

import moment from 'moment';
import Datetime from 'react-datetime';  // Don't forget: mport "react-datetime/css/react-datetime.css";

import Print from './Print';

import { isNullOrWhiteSpace } from '../../../utils/util';

function EmployeeTimeEntry(){
  const cookies = new Cookies();

  // const selectedTech = {
  //   id: 'ALL',
  //   text: 'All',
  //   color: '#56ca85',
  //   avatar: 'man-placeholder.png',
  //   age: 0,
  //   phone1: "",
  // };

  const [utcDateFrom, setUtcDateFrom] = useState(moment(new Date()).format('L')); // not actually a utc
  const [utcDateTo, setUtcDateTo] = useState(moment(new Date()).format('L'));
  const [scheduleData, setScheduleData] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  // const [_technicians, setTechnicians] = useState([selectedTech]);

  const [techs, setTechs] = useState([]); // this serves as a master cp.
  const [selectedTechs, setSelectedTechs] = useState([]);
  // const [techId] = useState('All');

  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

  // const [dataSource, setDataSource] = useState(null);

  const navigate = useNavigate();

  // Get all technicians
  useEffect(() => {
    fetch(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`)
      .then((res) => res.json())
      .then((techs) => {
        if (!techs.hasOwnProperty("error")) {
          const lTech = [];
          for(let x = 0; x < techs?.data?.length; x++) {
            lTech.push(techs.data[x].id.toString());
          }

          setTechs(lTech);
        } else {
          navigate('/');
        }
      });
  }, []);





  // const dataSource = new DataSource(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`);
  //   dataSource.load().then(
  //     (techs) => {
  //       const lTech = [];
  //       lTech.push('All');

  //       for(let x = 0; x < techs?.data?.length; x++) {
  //         lTech.push(techs.data[x].id.toString());
  //       }

  //       setTechs(lTech);
  //     },
  //     (error) => {
  //       console.log('Error: ', error);
  //     }
  //   );

  const fetchSchedulesDateRange = useCallback(async (utcDatFrom, utcDatTo, techs) => {
    let cookie = cookies.get('sessionId');
    if (isNullOrWhiteSpace(cookie)) {
      navigate('/');
      return;
    }

    // await fetch(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`)
    //   .then((res) => res.json())
    //   .then((technicians) => {
    //     if (!technicians.hasOwnProperty("error")) {
    //       // appendTechnicians(technicians);
    //       appendTechniciansForSelectBox(technicians);
    //     } else {
    //       navigate('/');
    //     }
    //   });


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
    await fetch(`${adminUrl}/schedule?sessionId=${cookies.get('sessionId')}&technicianIds=${techs.toString()}&dateRange=custom&utcDateFrom=${utc_DatFrom}&utcDateTo=${utc_DatTo}`)
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
    fetchSchedulesDateRange(utcDateFrom, utcDateTo, selectedTechs);
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
        <Col md="2">
          <div className="d-flex justify-content-start mb-2 flex-column">
            <Datetime timeFormat={false} onChange={value => { setShowPrint(false); setUtcDateFrom(moment(value).format('L')) }} initialValue={new Date()} />
            <Datetime timeFormat={false} onChange={value => { setShowPrint(false); setUtcDateTo(moment(value).format('L')) }} initialValue={new Date()} />
            {/*
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
            */}
            <div style={{width: '200px'}}>
              {
                techs.length > 0
                ?
                  <TagBox
                    items={techs}
                    showSelectionControls={true}
                    inputAttr={{ 'aria-label': 'Product' }}
                    applyValueMode="useButtons"
                    // defaultValue={techs}
                    onValueChanged={(e) => setSelectedTechs(e.value)}
                  />
                :
                null
              }
            </div>
            <Button icon="print" type="success" text="OK" className="ms-1" onClick={printClicked} />
          </div>
        </Col>

        <Col md="10">
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