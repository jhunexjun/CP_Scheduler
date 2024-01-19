import { useState, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

import { Row, Col, BreadcrumbItem } from "reactstrap";

import { Breadcrumb, Card, CardBody } from 'reactstrap';

import { Button } from 'devextreme-react/button';

import moment from 'moment';
import Datetime from 'react-datetime';  // Don't forget: mport "react-datetime/css/react-datetime.css";

import { PDFViewer } from '@react-pdf/renderer';

import scheduleDocumentContainer from '../../Appointments/Print/scheduleDocumentContainer';

import { isNullOrWhiteSpace } from '../../../utils/util';

const EmployeeTimeEntry = () => {
  const cookies = new Cookies();

  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([]);
  const [showPrint, setShowPrint] = useState(false);
  const [techId] = useState('ALL');
  const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    let cookie = cookies.get('sessionId');
    if (isNullOrWhiteSpace(cookie)) {
      navigate('/');
      return;
    }

    // await fetch(`${adminUrl}/technicians?sessionId=${cookies.get('sessionId')}`)
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((technicians) => {
    //     if (!technicians.hasOwnProperty("error")) {
    //       // appendTechnicians(technicians);
    //     } else {
    //       navigate('/');
    //     }
    //   });

    // await fetch(`${adminUrl}/workorders?sessionId=${cookies.get('sessionId')}`)
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((fetchedWorkorders) => {
    //     if (fetchedWorkorders.status !== 'Error' ) {
    //       appendWorkOrders(fetchedWorkorders);
    //     } else {
    //       navigate('/');
    //     }
    //   });

      await fetch(`${adminUrl}/schedule?sessionId=${cookies.get('sessionId')}&technicianId=${techId}`)
      .then((res) => res.json())
      .then(scheds => {
        if (!scheds.hasOwnProperty("error")) {
          appendScheds(scheds);
        } else {
          console.log('fetch schedules: ', scheds);
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
          <div className="d-flex justify-content-end mb-2">
            <Datetime timeFormat={false} onChange={value => setDateFrom(moment(value).format('L'))} initialValue={dateFrom} />
            <Datetime timeFormat={false} onChange={value => setDateFrom(moment(value).format('L'))} initialValue={dateTo} />
            <Button icon="print" type="success" text="OK" className="ms-1" onClick={ () => setShowPrint(true) } />
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
                  <PDFViewer width={'100%'} height={'100%'}>{scheduleDocumentContainer(null)}</PDFViewer>
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