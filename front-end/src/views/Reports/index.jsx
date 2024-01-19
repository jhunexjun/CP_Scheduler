import { Link } from "react-router-dom";

import { Row, Col, BreadcrumbItem } from 'reactstrap';

import { Breadcrumb, Card, CardBody } from 'reactstrap';

import './reportBox.css';

export default () => {
  return (
    <div className="content">
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem active>Home</BreadcrumbItem>
          </Breadcrumb>
          <div className="d-flex align-items-center p-3 gap-3">
            <Link to="/admin/reports/employee-time-entry" style={{textDecoration: 'none'}}>
              <div className="div-box text-center d-flex justify-content-center align-items-center flex-column gap-2">
                <i className="nc-icon nc-badge"></i>
                <span>Employee <br />Time Entry</span>                
              </div>
            </Link>
            <Link to="/admin/reports/workorders" style={{textDecoration: 'none'}}>
              <div className="div-box text-center d-flex justify-content-center align-items-center flex-column gap-2">
                <i className="nc-icon nc-single-copy-04"></i>
                <span>Workorders</span>                
              </div>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}