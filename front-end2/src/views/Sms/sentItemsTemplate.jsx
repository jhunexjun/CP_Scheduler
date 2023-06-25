import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import { getDuration } from './util';

import sentItemLogo from '../../assets/compuTant/img/POS Highway Logo.jpg';

const sentItemsTpl = (item, index) => {
	return <li className="d-flex justify-content-end mb-1" key={index}>
						<MDBCard className="cmpt-conversation">
							<MDBCardHeader className="d-flex justify-content-between p-3">
								<p className="fw-bold mb-0">{item.name}</p>
								<p className="text-muted small mb-0 ml-5">
									<MDBIcon far icon="clock" /> {getDuration(item)}
								</p>
							</MDBCardHeader>
							<MDBCardBody>
								<p className="mb-0">{item.Sms}</p>
							</MDBCardBody>
						</MDBCard>
						<img
							src={sentItemLogo}
							alt="avatar"
							className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong ml-1"
							width="60"
						/>
					</li>
};

export default sentItemsTpl;