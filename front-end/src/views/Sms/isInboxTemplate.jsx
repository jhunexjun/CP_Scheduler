import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import { getDuration } from './util';

const inboxTpl = (item, index) => (
	<li className="d-flex  mb-1" key={index}>
		<img
			src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
			alt="avatar"
			className="rounded-circle d-flex align-self-start me-3 shadow-1-strong mr-1"
			width="60"
		/>
		<div>
			<MDBCard>
			<MDBCardHeader className="d-flex p-3">
				<p className="fw-bold mb-0 me-3">{item.name}</p>
				<p className="text-muted small mb-0 ml-5">
					<MDBIcon far icon="clock" /> {getDuration(item)}
				</p>
			</MDBCardHeader>
			<MDBCardBody>
				<p className="mb-0">{item.Sms}</p>
			</MDBCardBody>
		</MDBCard>
		</div>
	</li>
);

export default inboxTpl;