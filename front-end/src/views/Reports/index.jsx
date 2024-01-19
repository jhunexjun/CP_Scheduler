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
          <Card>
            <CardBody style={{height: '80Vh'}}>
              <div className="div-box d-flex justify-content-center align-items-center p-3">
                <div>
                  <Link to="/admin/reports/employee-time-entry" style={{textDecoration: 'none'}}> 
                    Employee <br />Time Entry
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}