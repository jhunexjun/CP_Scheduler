import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import { getDuration } from './util';

const inboxTpl = (item, index) => (
	<li className="d-flex justify-content-between mb-4" key={index}>
		<img
			src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
			alt="avatar"
			className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
			width="60"
		/>
		<MDBCard>
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
	</li>
);

export default inboxTpl;