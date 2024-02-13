import { Link } from "react-router-dom";

import { Row, Col, BreadcrumbItem } from 'reactstrap';

import { Breadcrumb } from 'reactstrap';

import './custom.css';

export default function Report(){
  return (
    <div className="content">
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem active>Home</BreadcrumbItem>
          </Breadcrumb>
          <div className="d-flex align-items-center">
            <Link to="/admin/reports/employee-time-entry" style={{textDecoration: 'none'}}>
              <div className="div-box text-center d-flex justify-content-center align-items-center flex-column">
                <i className="nc-icon nc-badge" style={{color: 'olive'}}></i>
                <span>Employee <br />Time Entry</span>                
              </div>
            </Link>
            <Link to="/admin/reports/workorders" style={{textDecoration: 'none'}}>
              <div className="div-box text-center d-flex justify-content-center align-items-center flex-column">
                <i className="nc-icon nc-single-copy-04" style={{color: 'forestgreen'}}></i>
                <span>Workorders</span>                
              </div>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}