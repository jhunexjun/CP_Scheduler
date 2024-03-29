import { useEffect, useCallback } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

import Cookies from 'universal-cookie';

export default function CreateSession() {
	const navigate = useNavigate();

	const cookies = new Cookies();

	const fetchCreateSession = useCallback(async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const userid = urlParams.get('userid');

		// Note: domain for browser (dev), http://locahost:3000
		//		 domain for API (dev), http://localhost:8080
		// http://localhost:8080/createsession?userid=ADAML
		await fetch(`${process.env.REACT_APP_API_DOMAIN + '/createsession'}?userid=${userid}&expiryinminutes=${process.env.REACT_APP_INACTIVE_LOGOUT_MINUTES}`)
			.then((res) => {
				return res.json()
			})
			.then((session) => {
				if (session.status !== 'Error') {
					cookies.set('sessionId', session.data.sessionId, { path: '/' });
					// navigate(`../admin/appointments/${session.data.sessionId}`)
					navigate(`../admin/appointments`)
				}
			});
	}, [])

	useEffect(() => {
		fetchCreateSession();
	}, [])


	return (
		<h1>Creating a session...</h1>
	);
}