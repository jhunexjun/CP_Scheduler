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
						<MDBCard className="w-100">
							<MDBCardHeader className="d-flex justify-content-between p-3">
								<p className="fw-bold mb-0">{item.name}</p>
								<p className="text-muted small mb-0">
									<MDBIcon far icon="clock" /> {getDuration(item)}
								</p>
							</MDBCardHeader>
							<MDBCardBody>
								<p className="mb-0">{item.Sms}</p>
							</MDBCardBody>
						</MDBCard>
						<img
							//src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
							//src="https://d1nxzqpcg2bym0.cloudfront.net/itunes_connect/449217069/79be1cde-cf95-11ed-afd1-65b6ffb46e2a/128x128"
							src={sentItemLogo}
							alt="avatar"
							className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
							width="60"
						/>
					</li>
};

export default sentItemsTpl;