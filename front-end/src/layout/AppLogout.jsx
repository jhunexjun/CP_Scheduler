import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import events from '../utils/events';
import { extractSessionId, uriEncode } from '../utils/util';


export default function AppLogout({ children }) {
	let timer;

	const navigate = useNavigate();
	const session = useParams();
	const [sessionId, setSessionId] = useState('');

	const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

	// this resets the timer if it exists.
	const resetTimer = () => {
		if (timer)
			clearTimeout(timer);
	};

	// logs out user
	async function logoutUser() {
		const optionHeaders = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			// body: uriEncode({ sessionId: extractSessionId(session['*']), robot: 'Y' }),
			body: uriEncode({ sessionId: extractSessionId(session['*']) }),
		}

		await fetch(`${adminUrl}/logout`, optionHeaders)
		navigate('/');
	}

	async function extendSession() {
		const optionHeaders = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncode({ 	sessionId: extractSessionId(session['*']),
								expiryInMinutes: process.env.REACT_APP_INACTIVE_LOGOUT_MINUTES
							}),
		}

		const res = await fetch(`${adminUrl}/extendSession`, optionHeaders)
		if (res.hasOwnProperty('errorNo')) {
			console.log(res.message)
		}
	}

	// this function sets the timer that logs out the user after a certain time.
	const handleLogoutTimer = async () => {
		timer = setTimeout(async () => {
			// clears any pending timer.
			resetTimer();
			// Listener clean up. Removes the existing event listener from the window
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});

			await logoutUser();
		}, parseInt(process.env.REACT_APP_INACTIVE_LOGOUT_MINUTES * 60000));
	};

	useEffect(() => {
		Object.values(events).forEach((item) => {
			window.addEventListener(item, async () => {
				await extendSession()
				console.log('Called event listener and extended session.')
				resetTimer();
				await handleLogoutTimer();
			});
		});
	}, []);

	return children;
}